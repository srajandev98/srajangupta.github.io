# Architecture

Real-time Event Streaming runs as a broker process that accepts TCP requests, validates protocol frames, executes command handlers, and persists state to disk.

## Runtime Components

| Component | Responsibility |
| --- | --- |
| `cmd/broker` | process startup and TCP listener |
| `network` | per-connection request loop and command routing |
| `protocol` | `V1` parsing + response formatting |
| `storage` | segmented logs, indexes, retention, checksum recovery |
| `coordinator` | group assignment and offset persistence |
| `logging` | structured JSON logs |
| `broker` | composition root for storage + coordinator |

## Request Lifecycle

```text
Client -> network.HandleConnection -> protocol.ParseRequest -> command handler -> storage/coordinator -> protocol response
```

Command routing:

```text
PRODUCE -> storage
CONSUME -> storage
JOIN    -> group manager
COMMIT  -> offset manager
OFFSET  -> offset manager
```

## Storage Lifecycle

For each produced message:

1. key is hashed to a partition
2. message is appended to active segment file
3. offset/time index entries are appended
4. simplified local replica segment files are mirrored
5. retention policy is enforced

On startup:

1. segment files are scanned in order
2. checksums are validated per record
3. valid records rebuild in-memory partition state

## Operational Scope

Current architecture is single-broker with local disk durability and local replica mirrors. Distributed metadata control and network replication are planned in upcoming phases.
