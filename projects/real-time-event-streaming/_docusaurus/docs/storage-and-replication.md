# Storage and Replication

## Storage model

Each topic partition is represented by an append-only log file:

```text
data/orders-0.log
data/orders-1.log
data/orders-2.log
```

Messages are persisted as offset/value pairs:

```text
0:created
1:paid
```

On startup, the storage layer scans existing log files and reconstructs in-memory partition state.

## Partitioning

The current implementation hashes the message key with FNV-1a and maps the result into the configured partition count. Messages with the same key therefore stay on the same partition, preserving order for that key.

## Reads

Consumers read from an explicit offset within a partition. A read returns all currently available messages from that offset onward.

## Consumer offsets

Consumer progress is managed separately from the logs by the coordinator layer and persisted so committed offsets survive broker restarts.

## Replication model

The prototype models:

- one leader log per partition
- additional local replica logs
- synchronous local replication

This is intentionally not yet true distributed replication. The roadmap expands it into:

- follower fetch and replication protocol
- in-sync replica tracking
- high watermark handling
- acknowledgement modes
- leader/follower transitions

## Current limitations

The storage layer does not yet include segmented logs, retention policies, checksums, compression, indexed reads, or crash-hardening suitable for production workloads.
