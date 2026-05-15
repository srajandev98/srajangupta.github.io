---
slug: /
---

# Real-time Event Streaming

Real-time Event Streaming is a Go project for exploring the internals of distributed log-based messaging systems by building one from scratch.

The current prototype already demonstrates several core ideas found in systems such as Kafka, Redpanda, Pulsar, and NATS:

- append-only partition logs
- deterministic key-based partitioning
- offset-based reads
- consumer groups with round-robin partition assignment
- persisted offsets
- simplified local replication

## What This Documentation Covers

This documentation is for three audiences:

1. Developers who want to run the broker locally and try the wire protocol.
2. Engineers who want to understand the current subsystem boundaries.
3. Contributors who want to evolve the prototype toward the production roadmap.

If you are new, start with:

- [Getting Started](getting-started.md)
- [Protocol](protocol.md)
- [Architecture](architecture.md)

If you are extending the system, continue with:

- [Storage and Replication](storage-and-replication.md)
- [Roadmap](roadmap.md)
- [Contributing](contributing.md)

## Current Status

The project is under active development and is **not production-ready** yet. The current codebase is best understood as a deliberately small but working foundation for a future distributed streaming platform.

## Source of Truth

- [Repository README](https://github.com/srajandev98/real-time-event-streaming/blob/main/README.md)
- [Production Plan](https://github.com/srajandev98/real-time-event-streaming/blob/main/PLAN.md)
