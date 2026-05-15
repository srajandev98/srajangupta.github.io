# Roadmap

The project roadmap is defined in the repository `PLAN.md`. The major execution phases are:

1. **Prototype hardening** — stronger parsing, configuration, logging, and baseline tests
2. **Storage engine v1** — segmented logs, indexes, retention, recovery, and durability knobs
3. **Replication and leadership** — follower replication, ISR, high watermark, and ack modes
4. **Consumer coordination v2** — heartbeats, rebalances, generation-aware commits
5. **Metadata quorum** — controller service, leader election, broker registration, fencing
6. **Security and multi-tenancy** — TLS, auth, ACLs, quotas
7. **Observability and operations** — metrics, traces, admin tooling, runbooks
8. **Performance validation** — benchmarks, soak tests, chaos tests, optimization

## Immediate backlog

The near-term backlog currently emphasizes:

- explicit protocol envelopes and error codes
- configuration validation
- segmented log storage
- broader unit-test coverage
- CI automation
- initial metrics support

## Production definition

The project should only claim production readiness once it has proven durability, replication guarantees, fault tolerance, security defaults, actionable observability, validated runbooks, and repeatable performance targets.

For the full detail, see the [production plan](https://github.com/srajandev98/real-time-event-streaming/blob/main/PLAN.md).
