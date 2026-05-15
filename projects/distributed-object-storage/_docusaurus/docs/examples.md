# Examples

## Upload An Object

```bash
curl -X POST \
  --data-binary @./sample.txt \
  -H "Content-Type: text/plain" \
  http://localhost:8080/upload/my-bucket/docs/sample.txt
```

## Create A Presigned Download URL

```bash
curl http://localhost:8080/presign/my-bucket/docs/sample.txt
```

Example response:

```json
{"url":"/download/my-bucket/docs/sample.txt?expires=...&signature=..."}
```

## Download The Latest Version

```bash
curl "http://localhost:8080/download/my-bucket/docs/sample.txt?expires=...&signature=..."
```

## Inspect Replication Progress

```sql
SELECT id, status, attempt_count, next_run_at, last_error
FROM replication_jobs
ORDER BY id DESC
LIMIT 20;
```

## Invalid Object Path

```bash
curl -X POST \
  --data-binary @./sample.txt \
  http://localhost:8080/upload/my-bucket/docs/../../secret.txt
```

Expected result:

- `400 Bad Request`
