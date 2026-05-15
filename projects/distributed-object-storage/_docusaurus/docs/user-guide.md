# User Guide

## Concepts

- **Bucket**: logical namespace for object ownership and listing boundaries.
- **Object Key**: canonical object identifier inside a bucket. Key format is validated at ingress.
- **Versioning**: each upload creates a new immutable object version and marks prior version as non-latest.
- **Presigned URL**: time-limited signed URL authorizing download access without long-lived credentials.

## Current Guarantees

- Durable metadata in PostgreSQL
- Asynchronous replication via durable jobs
- At-least-once job processing with idempotent replica records

### What These Guarantees Mean in Practice

1. Upload acknowledgement means primary write + metadata transaction succeeded.
2. Secondary replicas may complete slightly later because replication is asynchronous.
3. Worker retries can replay the same logical work safely because replica persistence is idempotent.

## Consistency Model (Current)

- **Read path** (`/download`) serves the latest version recorded in metadata.
- **Replication path** is eventually consistent across secondary nodes.
- **Metadata** is authoritative for object existence and version selection.

This is intentionally a pragmatic MVP model: strong metadata durability plus eventual replica convergence.

## Object Path Rules

For security and deterministic storage behavior:

- bucket names must match strict safe pattern rules
- object keys reject traversal patterns (e.g. `..`)
- absolute-path and backslash style inputs are rejected

This prevents filesystem escape and cross-node path ambiguity.

## Upload-to-Download Lifecycle

1. Client uploads object bytes.
2. Service stores primary file on node1.
3. Service writes metadata and replication job in a single DB transaction.
4. Worker claims the job and attempts replication to node2/node3.
5. Client obtains presigned URL and downloads latest version.

## Current Limitations

- No multipart upload yet
- No API key auth yet
- No bucket lifecycle or policy controls yet

See [MVP Roadmap](mvp-roadmap.md) for execution order and planned milestones.
