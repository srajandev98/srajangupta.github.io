---
slug: /
---

# Real-time Event Streaming

Real-time Event Streaming is a Go-based event streaming broker for publishing, storing, and consuming ordered event streams.

## Product Capabilities (Current)

- text-based TCP protocol (`V1`) with correlation IDs
- deterministic key-based partition routing
- segmented append-only storage per topic-partition
- offset and timestamp side indexes per partition
- checksum validation during startup recovery
- size- and age-based retention enforcement
- consumer groups with partition assignment
- persisted committed offsets (`offsets.json`)
- structured JSON logs for runtime events
- Docker and Docker Compose deployment flow

## Current Deployment Model

The product currently runs as a single broker process with local filesystem persistence. It is suitable for local deployment, integration testing, and architecture exploration.

## Not Yet Available

- multi-node network replication and ISR
- leader election and metadata quorum
- production-grade failover semantics
- authn/authz and transport security defaults

## Product Concepts

| Concept | Meaning |
| --- | --- |
| Topic | named stream of related events |
| Partition | ordered shard within a topic |
| Offset | message position in a partition |
| Segment | bounded log file chunk for a partition |
| Consumer group | consumers sharing partition ownership |

## Documentation

1. [Getting Started](getting-started.md): run and test broker behavior quickly.
2. [Deployment](deployment.md): container and native deployment options.
3. [Protocol](protocol.md): wire format and command contract.
4. [Architecture](architecture.md): runtime modules and request flow.
5. [TypeScript SDK](typescript-sdk.md): integrate RTES from Node.js projects.
6. [Storage](storage.md): segment format, indexes, retention, recovery, durability knobs.
7. [Replication](replication.md): current local replica behavior and next replication milestones.
8. [Roadmap](roadmap.md): completed and upcoming phases.
9. [Contributing](contributing.md): development workflow.

## Source of Truth

- [Repository README](https://github.com/srajandev98/real-time-event-streaming/blob/main/README.md)
- [Production Plan](https://github.com/srajandev98/real-time-event-streaming/blob/main/PLAN.md)
