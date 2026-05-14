# Release Notes

## 2026-05-15

- Refactored into `cmd/server` and `internal/*` package structure
- Added durable PostgreSQL replication jobs
- Implemented retry with terminal failure state
- Added DB-level idempotency + state transition guards
- Added unit tests for upload and replication failure paths
- Added strict path validation for bucket and object keys

