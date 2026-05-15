# Architecture

Real-time Event Streaming runs as a broker process that accepts TCP requests, routes commands, persists messages, and manages consumer-group state.

## Runtime Components

| Component | Responsibility |
| --- | --- |
| `network` | accepts TCP connections and dispatches commands |
| `protocol` | parses request frames and formats responses |
| `storage` | routes keys, appends messages, and loads partition logs |
| `coordinator` | manages group assignments and committed offsets |
| `broker` | wires runtime components together |

## Request Flow

```text
Client -> TCP handler -> protocol parser -> storage or coordinator -> response
```

Command routing:

```text
PRODUCE -> storage
CONSUME -> storage
JOIN    -> group manager
COMMIT  -> offset manager
OFFSET  -> offset manager
```

## Produce Flow

For:

```text
V1|1|PRODUCE|orders user1:created
```

The broker:

1. parses the protocol frame
2. extracts the topic, key, and value
3. hashes the key to choose a partition
4. appends the message to the partition log
5. returns the partition and offset

## Current Deployment Model

The current broker is single-process and stores data on the local filesystem. Distributed metadata, network replication, and broker failover are planned product capabilities rather than current runtime behavior.
