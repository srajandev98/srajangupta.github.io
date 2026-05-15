---
slug: /
---

# Distributed Object Storage

Distributed Object Storage is an S3-inspired object storage service for storing versioned files, issuing presigned download URLs, and replicating objects asynchronously across storage nodes.

## Key Capabilities

- object upload by bucket and key
- immutable object versions with latest-version reads
- presigned download URLs
- PostgreSQL-backed metadata
- durable asynchronous replication jobs
- strict bucket and object-key validation

## When To Use It

Use Distributed Object Storage when you need:

- a file/object API rather than block or database storage
- temporary signed download access
- versioned object writes
- durable replication work that can survive worker restarts

## Core Concepts

| Concept | Meaning |
| --- | --- |
| Bucket | namespace for stored objects |
| Object key | object identifier within a bucket |
| Version | immutable uploaded revision of an object |
| Presigned URL | temporary signed download URL |
| Replication job | durable background task for secondary copies |

## Current Scope

The current release provides the core upload, presign, download, versioning, and replication workflow. It is not yet fully S3-compatible and does not yet include multipart upload, API-key authentication, lifecycle policies, or production-grade observability.

## Documentation

1. [Getting Started](getting-started.md): run the service and complete the first object flow.
2. [User Guide](user-guide.md): product behavior and common workflows.
3. [Examples](examples.md): practical API examples.
4. [API Reference](api-reference.md): endpoint contract.
5. [Security and Access](security-and-access.md): current controls and gaps.
6. [Data Protection and Durability](data-protection-and-durability.md): replication guarantees.
7. [Monitoring and Troubleshooting](monitoring-and-troubleshooting.md): operational checks.

## Source of Truth

- [Execution Plan](https://github.com/srajandev98/distributed-object-storage/blob/main/PLAN.md)
- [Repository README](https://github.com/srajandev98/distributed-object-storage/blob/main/README.md)
- [Release Notes](release-notes.md)
