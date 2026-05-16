# Replication

This page describes current replication behavior and planned replication milestones.

## Replication Status (Current)

Current replication is simplified local mirroring on the same node.

For produced records, broker also writes local replica segment files:

```text
data/orders-2-replica-1-segment-000000.log
data/orders-2-replica-2-segment-000000.log
```

This helps with development visibility and storage-flow validation, but it is not distributed replication.

## What It Does Today

- mirrors produced records into local replica files
- preserves record payload and log-line format in replicas
- keeps replica files separate from leader segment files

## What It Does Not Do Yet

- follower fetch over network
- in-sync replica (ISR) management
- high watermark-based read visibility
- leader/follower role transitions
- replica lag metrics and ISR shrink/expand
- replication ack quorum semantics (`acks=1`, `acks=all`)

## Planned Direction

Replication will move from local file mirrors to networked broker-to-broker replication in upcoming phases.

Near-term goals:

1. follower replication protocol
2. partition leadership transitions
3. ISR + lag tracking
4. high watermark semantics
5. acknowledgement mode support
