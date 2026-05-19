# Replication

This page describes current replication behavior and near-term direction.

## Replication Status (Current)

Current implementation has two layers:

1. Local replica file mirroring (same node) for storage-flow visibility.
2. In-memory replication manager for ISR, high watermark, and `acks=all` behavior.

For produced records, broker writes local replica segment files:

```text
data/orders-2-replica-1-segment-000000.log
data/orders-2-replica-2-segment-000000.log
```

This is still not true multi-broker network replication.

## What It Does Today

- mirrors produced records into local replica files
- tracks leader offset per partition
- tracks follower progress via `REPLICA_FETCH`
- maintains ISR membership using lag + freshness rules
- computes partition high watermark from ISR offsets
- supports `acks=1` and `acks=all` semantics in produce path
- gates consume visibility to committed data (up to high watermark)
- emits under-replicated partition warnings

Important details:

- leader replica id is implicit `0`
- follower replica ids are `1..(replication_factor-1)`
- `acks=all` waits until:
  - high watermark reaches produced offset
  - ISR size is at least `min.insync.replicas`
- follower ISR eligibility requires:
  - last ack seen within `replica lag timeout`
  - offset lag less than or equal to `max replica lag`

## What It Does Not Do Yet

- follower fetch over network
- leader/follower role transitions
- metadata quorum-backed replica membership
- broker-to-broker transport security
- persistent replication metadata across process restarts

## Planned Direction

Replication will move from local file mirrors to networked broker-to-broker replication in upcoming phases.

Near-term goals:

1. network follower fetch/replication protocol
2. deterministic partition leadership transitions
3. replica lag metrics and alerting hooks
4. durable metadata/controller integration
5. failover tests for committed-read guarantees
