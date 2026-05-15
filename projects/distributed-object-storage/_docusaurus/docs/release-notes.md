# Release Notes

## 2026-05-15

### Added

- durable PostgreSQL replication jobs
- retry handling with terminal failure state
- DB-level idempotency and guarded state transitions
- strict bucket/object-key validation
- tests for upload and replication failure paths

### Changed

- reorganized runtime into `cmd/server` and `internal/*`

### Why It Matters

- replication work now survives process restarts
- duplicate retry execution is safer
- traversal-style paths are rejected at ingress
- the package layout is easier to test and evolve
