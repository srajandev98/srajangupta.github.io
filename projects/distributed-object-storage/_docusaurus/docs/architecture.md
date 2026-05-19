# Architecture

Distributed Object Storage separates request handling, metadata transactions, file storage, and replication work so product behavior remains explicit.

## Components

| Component | Responsibility |
| --- | --- |
| HTTP API | validates requests and serves upload, presign, and download routes |
| Service layer | coordinates object operations |
| Repository | performs PostgreSQL transactions |
| Storage adapter | reads and writes object bytes |
| Replication worker | processes durable replication jobs |
| Migrator | auto-applies embedded SQL migrations on startup |

## Upload Path

```text
request -> path validation -> primary write -> metadata transaction -> replication job -> response
```

The metadata row and replication job are committed together so secondary-copy work is not lost after a successful upload.

Within the same upload transaction:

1. previous latest row for `(bucket, object_key)` is unset
2. new object row is inserted with `is_latest=true`
3. replication job row is inserted

## Replication Path

```text
pending -> running -> completed
pending -> running -> pending
pending -> running -> failed
```

The worker retries transient failures and records terminal failures after retry exhaustion.

Current implementation details:

- job claiming uses `FOR UPDATE SKIP LOCKED` for safe concurrent workers
- retry backoff is quadratic (`attempt_count^2` seconds)
- replica records are idempotent per `(object_id, node_name)`

## Deployment Model

The current release uses local filesystem nodes and PostgreSQL with startup schema migration application. Future releases are expected to add stronger operational controls, authentication, and broader object-storage APIs.
