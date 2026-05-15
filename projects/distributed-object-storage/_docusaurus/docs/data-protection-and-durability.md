# Data Protection and Durability

## Replication Model

- Primary object content is written first to node1.
- Metadata + replication work intent is persisted durably in PostgreSQL.
- Worker asynchronously copies data to node2 and node3.

## Failure Handling

Replication jobs use controlled transitions and retry:

- claim: `pending -> running`
- transient failure: `running -> pending` with delayed `next_run_at`
- terminal failure: `running -> failed` at `max_attempts`
- success: `running -> completed`

Backoff strategy is currently quadratic by attempt count.

## Idempotency

At-least-once worker execution means duplicate processing can occur after process restarts or transient errors.
To make this safe:

- replica writes are conflict-safe
- replica identity is modeled by object/node uniqueness
- stale transition attempts are rejected by guarded state updates

## Durability Boundary (Current MVP)

What is protected:

- object metadata durability (PostgreSQL)
- replication work durability (job table)

What is not fully production-hardened yet:

- cross-node checksum scrub / anti-entropy reconciliation
- multi-region durability guarantees
- erasure coding
- formal RPO/RTO operational drills

## Recovery Expectations

- If worker is down, jobs remain queued and recover once worker resumes.
- If a job repeatedly fails, it becomes `failed` for manual/automated replay support (replay tooling planned).
- Primary object availability is independent of secondary replication completion.
