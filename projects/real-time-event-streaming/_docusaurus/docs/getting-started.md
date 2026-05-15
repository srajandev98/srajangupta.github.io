# Getting Started

This guide shows how to run the broker, publish events, consume them, and track consumer progress.

## Requirements

- Go `1.22+`
- `nc` (netcat) for manual TCP requests

## Start The Broker

```bash
go run ./cmd/broker
```

The broker listens on `localhost:9092` by default.

## Connect A Client

```bash
nc localhost 9092
```

## Publish Events

```text
V1|1|PRODUCE|orders user1:created
V1|2|PRODUCE|orders user1:paid
V1|3|PRODUCE|orders user2:shipped
```

Example response:

```text
V1|1|OK|partition=2 offset=0
```

The broker selects a partition from the message key and returns the assigned offset.

## Consume Events

```text
V1|4|CONSUME|orders 2 0
```

This reads topic `orders`, partition `2`, starting at offset `0`.

## Use A Consumer Group

```text
V1|5|JOIN|analytics orders consumer-a
V1|6|COMMIT|analytics orders 2 1
V1|7|OFFSET|analytics orders 2
```

- `JOIN` assigns partitions to a consumer.
- `COMMIT` stores processed progress.
- `OFFSET` reads the last committed offset.

## Common Usage Patterns

| Goal | Pattern |
| --- | --- |
| keep events for one entity ordered | use that entity ID as the message key |
| replay historical events | consume from an earlier offset |
| resume after restart | read the committed group offset |
| share work across consumers | use the same consumer group |

## Run Tests

```bash
go test ./...
```
