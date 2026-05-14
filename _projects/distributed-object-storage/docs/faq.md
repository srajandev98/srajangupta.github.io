# FAQ

## Is this S3-compatible today?

No. It is S3-inspired and currently in MVP build stage.

## Does it support multipart upload?

Not yet. Planned for post-MVP expansion.

## Is replication durable?

Yes, replication jobs are persisted in PostgreSQL and retried on failure.

## How are duplicate replica writes handled?

Idempotency is enforced through DB constraints and conflict-safe writes.

