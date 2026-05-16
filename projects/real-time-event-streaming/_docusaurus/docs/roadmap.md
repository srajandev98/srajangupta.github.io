# Roadmap

This roadmap tracks product phases from current broker maturity to distributed production capabilities.

## Phase Status

| Phase | Status |
| --- | --- |
| Phase 0: Prototype hardening | Completed |
| Phase 1: Storage engine v1 | Completed |
| Phase 2: Replication and partition leadership | In progress |
| Phase 3: Consumer coordination v2 | Planned |
| Phase 4: Metadata quorum and control plane | Planned |
| Phase 5: Security and multi-tenancy | Planned |
| Phase 6: Observability and operations | Planned |
| Phase 7: Performance and scale validation | Planned |

## Completed Work

### Phase 0

- protocol parsing hardening and response envelopes
- environment-driven configuration and validation
- structured JSON logging
- baseline test coverage for core modules
- protocol compatibility and error code registry

### Phase 1

- segmented append-only logs
- offset/time side indexes
- startup replay and checksum validation
- age/size retention flow
- durability knobs for flush/fsync behavior
- simplified local replica segment mirroring

## Next Focus (Phase 2)

- follower fetch replication protocol
- partition leader/follower role transitions
- ISR tracking and lag management
- high watermark behavior
- ack mode semantics for replication durability

## Production-Readiness Criteria

Before production-grade claims, the product still needs:

- distributed failover and replication correctness
- security baseline (transport + authn/authz)
- operational telemetry and runbooks
- repeatable benchmark targets

For the detailed execution plan, see [Production Plan](https://github.com/srajandev98/real-time-event-streaming/blob/main/PLAN.md).
