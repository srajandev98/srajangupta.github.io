# Monitoring and Troubleshooting

## Current Observability

- Application errors surfaced via HTTP responses
- Replication job status in PostgreSQL

## Diagnostic Entry Points

When something breaks, start with:

1. HTTP status and response body from failing endpoint.
2. Latest rows in `replication_jobs`.
3. Corresponding rows in `objects` and `replicas`.
4. Physical file presence across `storage/node*`.

## Common Checks

- Inspect `replication_jobs` for stuck/failed states
- Inspect `replicas` table for per-node completion records
- Verify filesystem paths under `storage/node*`

Useful SQL:

```sql
SELECT id, object_id, status, attempt_count, max_attempts, next_run_at, last_error
FROM replication_jobs
ORDER BY id DESC
LIMIT 50;
```

```sql
SELECT object_id, node_name, file_path, status
FROM replicas
ORDER BY object_id DESC
LIMIT 50;
```

## Failure Patterns and Interpretation

- Many `failed` jobs:
  - likely persistent filesystem permission/path issue or DB write failures in replica tracking.
- Jobs stuck in `pending` with future `next_run_at`:
  - expected during backoff windows after failure.
- No jobs claiming:
  - worker may not be running or claim query path may be blocked.

## Planned Enhancements

- Structured logs with request IDs
- Prometheus metrics and queue depth visibility
- Health and readiness endpoints
