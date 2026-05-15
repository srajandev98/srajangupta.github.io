---
slug: /
---

# Real-time Event Streaming

Real-time Event Streaming is a Go-based event streaming broker for publishing, storing, and consuming ordered event streams.

It provides a small streaming platform with:

- append-only topic-partition logs
- deterministic key-based partition routing
- offset-based message consumption
- consumer groups with partition assignment
- persisted consumer offsets

## When To Use It

Use Real-time Event Streaming when you need to:

- publish domain events such as order, payment, or activity updates
- preserve message order within a partition
- replay events from a known offset
- distribute partition work across consumers in a group

## Product Concepts

| Concept | Meaning |
| --- | --- |
| Topic | named stream of related events |
| Partition | ordered shard within a topic |
| Offset | position of a message within a partition |
| Consumer group | consumers that share partition ownership |

## Current Scope

The current release supports a single-process broker with local file persistence and a text-based TCP protocol. It is suitable for local use, experimentation, and continued product development, but it is not yet a production-grade clustered streaming service.

Not yet available:

- distributed broker replication
- leader election and metadata quorum
- retention, compaction, batching, and compression
- authentication and authorization

## Documentation

1. [Getting Started](getting-started.md): run the broker and publish your first events.
2. [Protocol](protocol.md): request and response formats.
3. [Architecture](architecture.md): runtime components and request flow.
4. [Storage and Replication](storage-and-replication.md): persistence behavior and replication status.
5. [Roadmap](roadmap.md): planned product capabilities.
6. [Contributing](contributing.md): development workflow.

## Source of Truth

- [Repository README](https://github.com/srajandev98/real-time-event-streaming/blob/main/README.md)
- [Production Plan](https://github.com/srajandev98/real-time-event-streaming/blob/main/PLAN.md)
