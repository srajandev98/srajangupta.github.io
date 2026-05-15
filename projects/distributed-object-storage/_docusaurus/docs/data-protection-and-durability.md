# Data Protection And Durability

This page explains exactly what is durable today and where the boundary still stops.

## What Is Protected Today

After upload success, the system has:

- a primary object copy
- durable object metadata in PostgreSQL
- durable replication intent in `replication_jobs`

That combination means a worker crash does not erase the knowledge that replicas still need to be created.

## Failure Handling

Replication jobs follow controlled transitions:

```text
pending -> running -> completed
pending -> running -> pending
pending -> running -> failed
```

Retries use backoff, and terminal failure records preserve the fact that work did not complete.

## Why Idempotency Matters

Workers are at-least-once. The same logical work can run again after a crash or retry. To keep replay safe:

- replica records use conflict-safe persistence
- replica identity is unique per object and node
- guarded state updates reject stale transitions

## What This Means For Users

- upload success does not mean every replica already exists
- a temporary worker outage should delay replication, not lose the job
- a repeated job should not create duplicate logical replicas

## Not Yet Production-Hardened

- cross-node checksum scrub
- anti-entropy repair
- multi-region durability
- erasure coding
- formal RPO/RTO drills

## Recovery Expectations

- stopped workers can resume queued jobs later
- repeated failures end in `failed` for later replay or repair tooling
- primary availability is independent of secondary completion
