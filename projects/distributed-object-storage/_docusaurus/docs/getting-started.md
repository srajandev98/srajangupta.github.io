# Getting Started

This guide takes you through the full first-use path: configure the service, upload one object, create a download link, and verify replication progress.

## What You Will Learn

- which dependencies are required
- how to configure and run the service
- what success looks like after upload
- how to inspect background replication

## Prerequisites

- Go `1.24+`
- PostgreSQL

Helpful locally:

- `psql` for metadata inspection
- a small file such as `sample.txt` for testing

## Step 1: Configure The Service

Create `.env` in `distributed-object-storage/.env`:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=object_storage
DB_HOST=localhost
DB_PORT=5432
DB_SSLMODE=disable
APP_SECRET=replace_with_strong_secret
```

`APP_SECRET` signs presigned download URLs. Use a real secret outside local development.

## Step 2: Prepare The Database

Current state:

- `objects` and `replicas` tables must already exist
- `replication_jobs` is created or ensured at startup

Schema migrations are planned but not yet the source of truth, so database preparation is still partly manual.

## Step 3: Start The Service

```bash
go run ./cmd/server
```

Default address:

- `http://localhost:8080`

## Step 4: Upload One Object

```bash
curl -X POST \
  --data-binary @./sample.txt \
  -H "Content-Type: text/plain" \
  http://localhost:8080/upload/my-bucket/docs/sample.txt
```

After a successful upload:

- the primary file should exist under `storage/node1/...`
- metadata should exist in PostgreSQL
- a durable replication job should be queued

## Step 5: Create A Download Link

```bash
curl http://localhost:8080/presign/my-bucket/docs/sample.txt
```

Expected shape:

```json
{"url":"/download/my-bucket/docs/sample.txt?expires=...&signature=..."}
```

## Step 6: Download The Object

```bash
curl "http://localhost:8080/download/my-bucket/docs/sample.txt?expires=...&signature=..."
```

## Step 7: Verify Replication Progress

```sql
SELECT id, status, attempt_count, last_error
FROM replication_jobs
ORDER BY id DESC
LIMIT 20;
```

What to expect:

- `pending` or `running` shortly after upload is normal
- `completed` means secondary replication finished
- `failed` means retries were exhausted and intervention is needed

## What You Just Proved

You exercised the whole current product loop:

```text
upload -> durable metadata -> queued replication -> presign -> download
```

That is the smallest useful slice of the system.
