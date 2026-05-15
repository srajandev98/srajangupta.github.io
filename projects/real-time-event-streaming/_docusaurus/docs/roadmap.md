# Roadmap

This page explains what the project is trying to become next. It is intentionally separate from the usage docs so readers can distinguish current behavior from future design.

## How To Read This Roadmap

The project is being built in layers:

1. harden the current broker behavior
2. strengthen storage and durability
3. add real distributed-system behavior
4. add production operations and safety

## Major Phases

| Phase | Goal |
| --- | --- |
| Prototype hardening | stronger parsing, configuration, logging, and baseline tests |
| Storage engine v1 | segmented logs, indexes, retention, recovery, durability knobs |
| Replication and leadership | follower replication, ISR, high watermark, ack modes |
| Consumer coordination v2 | heartbeats, rebalances, generation-aware commits |
| Metadata quorum | controller service, leader election, broker registration, fencing |
| Security and multi-tenancy | TLS, auth, ACLs, quotas |
| Observability and operations | metrics, traces, admin tooling, runbooks |
| Performance validation | benchmarks, soak tests, chaos tests, optimization |

## Near-Term Work

The immediate engineering focus is on the pieces that make the current product safer to evolve:

- explicit protocol envelopes and error codes
- configuration validation
- segmented log storage
- broader unit-test coverage
- CI automation
- initial metrics support

## What “Production-Ready” Would Mean

The project should only claim production readiness after it demonstrates:

- durable storage with recovery guarantees
- proven replication behavior under failure
- operational visibility and runbooks
- secure defaults
- repeatable performance targets

Until then, the product should be described as an early-stage streaming broker rather than a production-grade distributed platform.

For the full execution plan, see the [production plan](https://github.com/srajandev98/real-time-event-streaming/blob/main/PLAN.md).
