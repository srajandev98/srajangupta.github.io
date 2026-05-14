# Data Protection and Durability

## Replication Model

- Primary object write on node1
- Durable job enqueue in PostgreSQL
- Background worker replicates to node2 and node3

## Failure Handling

- Jobs retry with backoff
- Jobs move to terminal `failed` after max attempts
- State transitions guarded in DB layer

## Idempotency

Replica record inserts are idempotent using unique object/node constraints and conflict-safe writes.

