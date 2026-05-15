# FAQ

## Is this S3-compatible today?

No. It is S3-inspired and currently in MVP build stage.
The focus today is reliable core behavior before broad API parity.

## Does it support multipart upload?

Not yet. Planned for post-MVP expansion.

## Is replication durable?

Yes, replication jobs are persisted in PostgreSQL and retried on failure.

## How are duplicate replica writes handled?

Idempotency is enforced through DB constraints and conflict-safe writes.

## What consistency model does download use?

Download resolves latest version from metadata (`objects.is_latest = TRUE`) and serves that version.
Secondary-node replication is asynchronous, so replica convergence is eventual.

## Why not replicate synchronously before upload response?

That would increase client latency and couple availability to every replica node.
Current design acknowledges upload after durable primary + metadata + replication intent, then processes replicas in background.
