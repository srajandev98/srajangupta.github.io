# Storage and Replication

This page explains how messages are placed on disk, how consumers read them back, and what the current replication model does and does not mean.

## What You Will Learn

- how topics and partitions map to files
- how keys choose partitions
- how offsets make replay possible
- what replication behavior is and is not available today

## Storage Model

Each topic partition is stored in its own append-only log file:

```text
data/orders-0.log
data/orders-1.log
data/orders-2.log
```

Each line is stored as:

```text
<offset>:<value>
```

Example:

```text
0:created
1:paid
```

When the broker starts, it scans existing log files and rebuilds in-memory partition state from those records.

## Partitioning

The storage layer hashes the message key with FNV-1a and maps the result into the configured partition count.

What that means in practice:

- the same key always maps to the same partition for a fixed partition count
- messages for that key keep their order within that partition
- different keys may land on different partitions and progress independently

## Reads and Replay

Consumers do not ask for “the latest message.” They ask for:

```text
<topic> <partition> <offset>
```

A consume call returns all currently available messages from that offset onward. This makes replay possible: reading from offset `0` reprocesses the whole partition log, while reading from a later offset resumes from a known position.

## Consumer Offsets

Committed consumer progress is stored separately from the log files in:

```text
data/offsets.json
```

This separation matters because:

- logs represent what exists
- offsets represent what a consumer group has processed

A broker restart can therefore recover both the data and the last committed progress.

## Replication Status Today

Replication is currently a design target, not a working broker capability in the implementation shown here. The codebase is already shaped to make room for replication work later, but today's executable path is still centered on local partition logs.

## What Replication Still Requires

A production-style replication design would need:

- follower fetch over the network
- in-sync replica tracking
- high watermark handling
- leader/follower role changes
- acknowledgement modes such as `acks=1` and `acks=all`

## Current Limits

The storage layer does not yet provide:

- segmented logs
- retention or compaction
- checksums
- indexed reads
- compression
- crash-hardening suitable for production workloads

These are storage-engine problems, not just documentation details, and they are tracked in the [roadmap](roadmap.md).
