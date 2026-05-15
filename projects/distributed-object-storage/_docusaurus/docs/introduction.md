---
slug: /
---

# Distributed Object Storage

Distributed Object Storage is an S3-inspired system focused on reliability-first design:

- durable metadata persistence
- durable replication scheduling
- explicit failure handling and retries
- strict input validation on all object paths

The project is currently in MVP execution mode. The goal is to complete a production-worthy core (correctness, safety, observability, and operations) before expanding into broader S3-compatible feature breadth.

## What This Documentation Covers

This documentation is designed for three audiences:

1. Users who want to run and use the service.
2. Engineers who want to understand internal architecture and guarantees.
3. Contributors who want to implement roadmap items safely.

If you are new, start with:

- [Getting Started](getting-started.md)
- [User Guide](user-guide.md)
- [API Reference](api-reference.md)

If you are implementing or reviewing changes, start with:

- [Architecture](architecture.md)
- [Data Protection and Durability](data-protection-and-durability.md)
- [Monitoring and Troubleshooting](monitoring-and-troubleshooting.md)

## Current Implementation Snapshot

As of the latest release:

- Upload, presign, and download APIs are implemented.
- Object metadata is stored in PostgreSQL.
- Replication is asynchronous and durable via `replication_jobs`.
- Worker processing is at-least-once with retry and terminal failure.
- Replica writes are idempotent via DB constraints.
- Object path validation blocks traversal-style keys.

Pending MVP priorities:

- Streaming upload path (bounded memory ingest)
- Upload request-size controls
- Migration-based schema lifecycle
- API key authentication and scoped authorization

## Source of Truth

- [Execution Plan (PLAN.md)](https://github.com/srajandev98/distributed-object-storage/blob/main/PLAN.md)
- [Repository README](https://github.com/srajandev98/distributed-object-storage/blob/main/README.md)
- [Release Notes](release-notes.md)
