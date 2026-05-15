# Architecture

The service uses a layered architecture to keep runtime behavior explicit and testable.

## Component Topology

1. **HTTP API Layer**
   - validates input paths and query params
   - handles request/response encoding
   - applies presign verification on download

2. **Service Layer**
   - orchestrates upload use-cases
   - binds storage writes with metadata persistence operations
   - computes object checksum/version metadata

3. **Repository Layer**
   - executes transactional DB logic
   - manages object version updates (`is_latest`)
   - manages replication job claim/update transitions

4. **Storage Adapter**
   - writes primary object content
   - reads source content for worker replication
   - writes secondary replicas

5. **Replication Worker**
   - continuously polls claimable jobs
   - executes replication attempts
   - marks completion/failure with retry scheduling

## Write Path (Upload) Sequence

1. Parse and validate `{bucket}/{objectKey}`.
2. Generate `version_id`.
3. Persist object bytes to primary storage path.
4. Open DB transaction.
5. Mark previous versions for same `(bucket, object_key)` as non-latest.
6. Insert new object metadata row.
7. Insert replication job row.
8. Commit transaction.

Critical property:

- metadata and replication-job insertion are atomic with each other.
- worker processing is decoupled and asynchronous by design.

## Replication Path Sequence

1. Worker atomically claims next due `pending` job (`FOR UPDATE SKIP LOCKED` pattern).
2. Job state becomes `running`.
3. Worker reads primary object bytes and writes secondary replicas.
4. Worker records per-node replica status rows.
5. On success, job transitions to `completed`.
6. On failure, job transitions back to `pending` with incremented attempt and delayed `next_run_at`, or to `failed` at retry limit.

## Job State Machine

- `pending -> running -> completed`
- `pending -> running -> pending` (retry path)
- `pending -> running -> failed` (terminal path)

State changes are guarded at SQL update time (update requires expected current status) to reduce stale-worker race effects.

## Idempotency Strategy

- Worker model is at-least-once; duplicate execution is expected.
- Replica records use conflict-safe insertion plus unique object/node semantics.
- Replayed work should not create duplicate logical replica rows.

## Failure Boundaries

- If primary file write fails: request fails, no metadata commit.
- If metadata transaction fails: request fails; job not enqueued.
- If replication fails: upload remains valid (primary + metadata), job retries asynchronously.

## Current Architectural Tradeoffs

- Local filesystem nodes are used for simplicity in MVP.
- Upload path currently needs streaming optimization to bound memory usage.
- Schema lifecycle still needs migration-driven management.
