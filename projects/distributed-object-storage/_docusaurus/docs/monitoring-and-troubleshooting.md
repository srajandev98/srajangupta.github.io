# Monitoring And Troubleshooting

Until richer metrics exist, the most useful operating signals are still HTTP responses, PostgreSQL state, and filesystem evidence.

## Start Here When Something Breaks

1. Check the HTTP status and body from the failed request.
2. Inspect the newest `replication_jobs` rows.
3. Compare `objects` and `replicas` records.
4. Verify files under `storage/node*`.

## Useful Queries

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

## Common Situations

| Symptom | Likely Meaning |
| --- | --- |
| many `failed` jobs | persistent filesystem or DB-side issue |
| `pending` with future `next_run_at` | normal retry backoff window |
| no jobs being claimed | worker may not be running |
| upload succeeds but replicas missing | expected until async replication completes |

## Current Observability Gap

The project does not yet expose the richer signals an operator would want in production, such as request IDs, Prometheus metrics, queue depth dashboards, or health endpoints. Those are planned work, not hidden features.
