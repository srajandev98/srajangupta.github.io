# FAQ

## Is this S3-compatible today?

No. It is S3-inspired and currently focused on a reliable core before broad API parity.

## What does upload success actually mean?

It means the primary copy exists, metadata is committed, and replication intent is durable. It does not mean all secondary replicas already exist.

## Does it support multipart upload?

Not yet.

## Is replication durable?

Yes. Replication jobs are persisted in PostgreSQL and retried on failure.

## How are duplicate replica writes handled?

The worker is designed for at-least-once execution, so replica persistence uses idempotent constraints and conflict-safe writes.

## Why not wait for all replicas before upload response?

That would couple write availability and latency to every secondary node. The current design chooses durable primary acknowledgement plus asynchronous convergence.
