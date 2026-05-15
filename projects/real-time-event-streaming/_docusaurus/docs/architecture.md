# Architecture

The codebase is organized around subsystem boundaries rather than UI-facing features.

```text
real-time-event-streaming/
├── cmd/broker/              # application entrypoint
├── internal/broker/          # composition root
├── internal/config/          # runtime configuration
├── internal/network/         # TCP request handling
├── internal/protocol/        # protocol parsing and response framing
├── internal/storage/         # append-only logs and reads
├── internal/coordinator/     # groups and offsets
└── internal/types/           # shared message types
```

## Request flow

```text
Client
  │
  ▼
TCP handler
  │
  ▼
Protocol parser
  │
  ├── PRODUCE ──> Storage
  ├── CONSUME ─> Storage
  ├── JOIN ─────> GroupManager
  ├── COMMIT ───> OffsetManager
  └── OFFSET ───> OffsetManager
```

## Subsystem responsibilities

### `broker`

Wires the core dependencies together. `Broker` owns the storage layer and the coordinator.

### `storage`

Owns topic-partition message storage, deterministic key-to-partition routing, append-only file writes, and startup recovery.

### `coordinator`

Owns consumer-group membership, partition assignment, and persisted offset management.

### `network`

Owns TCP connection handling and command dispatch.

### `protocol`

Owns request parsing, response formatting, correlation IDs, and common integer parsing helpers.

## Current architecture tradeoff

The implementation intentionally keeps several distributed concerns local and synchronous. That makes the architecture easy to understand while the project is still stabilizing the protocol, storage model, and coordination semantics. The roadmap then expands those same boundaries toward segmentation, ISR tracking, leadership, and a quorum-backed control plane.
