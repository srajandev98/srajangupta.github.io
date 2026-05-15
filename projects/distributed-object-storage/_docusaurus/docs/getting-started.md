# Getting Started

## Prerequisites

- Go 1.24+
- PostgreSQL

Recommended:

- `make` or shell aliases for repeatable local runs
- `psql` CLI for quick metadata inspection

## Setup

Create `.env` in the project root (`distributed-object-storage/.env`):

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=object_storage
DB_HOST=localhost
DB_PORT=5432
DB_SSLMODE=disable
APP_SECRET=replace_with_strong_secret
```

`APP_SECRET` is required for HMAC signing of presigned download URLs.

## Database Preparation

Current state:

- the service expects `objects` and `replicas` tables to exist
- `replication_jobs` is created/ensured at startup

Until migrations are introduced, you should create `objects`/`replicas` schema before first run.

## Run

```bash
go run ./cmd/server
```

Service default bind: `:8080`

## First Request Flow

1. Upload object to a bucket/key:
   `POST /upload/{bucket}/{key}`
2. Generate presigned URL:
   `GET /presign/{bucket}/{key}`
3. Download with signed URL:
   `GET /download/{bucket}/{key}?expires=...&signature=...`

Example:

```bash
curl -X POST \
  --data-binary @./sample.txt \
  -H "Content-Type: text/plain" \
  http://localhost:8080/upload/my-bucket/docs/sample.txt
```

```bash
curl http://localhost:8080/presign/my-bucket/docs/sample.txt
```

```bash
curl "http://localhost:8080/download/my-bucket/docs/sample.txt?expires=...&signature=..."
```

## Validate Replication Progress

After upload:

1. Primary file should exist under `storage/node1/...`.
2. Replication worker should create secondary copies under `storage/node2/...` and `storage/node3/...`.
3. `replication_jobs` should move from `pending` to `completed` (or retry if failures occur).

Use direct DB checks while observability endpoints are still pending:

```sql
SELECT id, status, attempt_count, last_error
FROM replication_jobs
ORDER BY id DESC
LIMIT 20;
```
