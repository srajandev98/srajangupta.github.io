# MVP Roadmap

This page explains what must become true before the project should claim MVP completeness.

## Completed

- durable replication jobs
- retry and terminal-failure handling
- guarded replication state transitions
- strict bucket/object path validation

## In Progress

- streaming uploads
- upload request-size limits

## Next

- database migrations and full schema constraints
- API key authentication
- observability and health endpoints

## Why This Order

1. Correctness first: data loss and corruption risks must be controlled before API breadth expands.
2. Safety second: bounded resource use and validation reduce exploit and outage risk.
3. Operability third: maintainers need evidence before they can debug incidents well.
4. Surface expansion later: more APIs are useful only when the core is trustworthy.

## MVP Exit Criteria

MVP is complete when:

- upload, download, and presign flows are reliable under expected load
- replication jobs are durable and observable
- auth and access control are enabled
- schema lifecycle is migration-managed
- integration tests cover both success and key failure paths
- docs let a new maintainer run and debug the service

Source: [PLAN.md](https://github.com/srajandev98/distributed-object-storage/blob/main/PLAN.md)
