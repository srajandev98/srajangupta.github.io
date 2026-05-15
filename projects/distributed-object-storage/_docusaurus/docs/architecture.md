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

## Upload Path

```text
request -> path validation -> primary write -> metadata transaction -> replication job -> response
```

The metadata row and replication job are committed together so secondary-copy work is not lost after a successful upload.

## Replication Path

```text
pending -> running -> completed
pending -> running -> pending
pending -> running -> failed
```

The worker retries transient failures and records terminal failures after retry exhaustion.

## Deployment Model

The current release uses local filesystem nodes and PostgreSQL. Future releases are expected to add migrations, stronger operational controls, authentication, and broader object-storage APIs.
