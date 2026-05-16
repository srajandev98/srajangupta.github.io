# Getting Started

This guide helps you run the broker, publish messages, consume them, and validate persistence behavior.

## Requirements

- Go `1.24+`
- `nc` (netcat)

## Start Broker

```bash
go run ./cmd/broker
```

Default listen address: `localhost:9092`.

## Connect Client

```bash
nc localhost 9092
```

## Publish Messages

```text
V1|1|PRODUCE|orders user1:created
V1|2|PRODUCE|orders user1:paid
V1|3|PRODUCE|orders user2:shipped
```

Example response:

```text
V1|1|OK|partition=2 offset=0
```

## Consume Messages

```text
V1|4|CONSUME|orders 2 0
```

## Consumer Group Flow

```text
V1|5|JOIN|analytics orders consumer-a
V1|6|COMMIT|analytics orders 2 1
V1|7|OFFSET|analytics orders 2
```

## Validate Error Handling

```text
V1|8|NOPE|x
V1|9|CONSUME|orders bad 0
```

Expected: `UNKNOWN_COMMAND` or `BAD_REQUEST` responses.

## Validate Persistence

1. Produce a few messages.
2. Stop broker.
3. Start broker again.
4. Consume from an earlier offset.

You should get previously stored messages.

## Validate Local Replica Files

After producing messages, inspect `data/` for files like:

```text
orders-2-replica-1-segment-000000.log
orders-2-replica-2-segment-000000.log
```

## Run Tests

```bash
go test ./...
```
