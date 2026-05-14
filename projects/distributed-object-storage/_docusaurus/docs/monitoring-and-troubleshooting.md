# Monitoring and Troubleshooting

## Current Observability

- Application errors surfaced via HTTP responses
- Replication job status in PostgreSQL

## Common Checks

- Inspect `replication_jobs` for stuck/failed states
- Inspect `replicas` table for per-node completion records
- Verify filesystem paths under `storage/node*`

## Planned Enhancements

- Structured logs with request IDs
- Prometheus metrics and queue depth visibility
- Health and readiness endpoints

