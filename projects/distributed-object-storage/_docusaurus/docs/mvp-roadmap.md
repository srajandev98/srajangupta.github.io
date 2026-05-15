# MVP Roadmap

This page mirrors the execution plan in the repository and is intentionally execution-oriented.
The rule is simple: complete safety and correctness milestones before feature-surface expansion.

## Completed

- Durable replication jobs
- Retry/failure handling
- Replication state transition guards
- Path validation and enforcement

## In Progress

- Streaming uploads
- Upload request size limits

## Next

- DB migrations and full schema constraints
- API key auth
- Observability and health endpoints

## Execution Order Rationale

1. **Correctness first**
   - Data loss and corruption risks must be controlled before adding more APIs.
2. **Safety second**
   - Input validation and bounded resource usage reduce exploit and outage risk.
3. **Operability third**
   - Without observability and runbooks, production incidents become guesswork.
4. **Surface expansion after stability**
   - More APIs increase blast radius unless core invariants are already stable.

## Exit Criteria for MVP

MVP is considered complete when:

- upload/download/presign flows are reliable under expected load
- replication jobs are durable and observable
- auth and access control are enabled
- schema lifecycle is migration-managed
- integration tests cover happy path + key failures
- operational docs are enough for a new maintainer to run/debug system

Source: [PLAN.md](https://github.com/srajandev98/distributed-object-storage/blob/main/PLAN.md)
