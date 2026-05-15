# Getting Started

## Requirements

- Go `1.22+`
- A terminal client such as `nc` for manually testing the TCP protocol

## Start the broker

From the repository root:

```bash
go run ./cmd/broker
```

The broker listens on port `9092` by default.

## Produce messages

Open a TCP connection:

```bash
nc localhost 9092
```

Then send framed protocol requests:

```text
V1|1|PRODUCE|orders user1:created
V1|2|PRODUCE|orders user1:paid
V1|3|PRODUCE|orders user2:shipped
```

A successful response includes the request correlation ID:

```text
V1|1|OK|partition=2 offset=0
```

## Consume messages

```text
V1|4|CONSUME|orders 2 0
```

This reads from topic `orders`, partition `2`, starting at offset `0`.

## Work with consumer groups

Join a group:

```text
V1|5|JOIN|analytics orders consumer-a
```

Commit an offset:

```text
V1|6|COMMIT|analytics orders 2 1
```

Fetch the committed offset:

```text
V1|7|OFFSET|analytics orders 2
```

## Run tests

```bash
go test ./...
```

## What to expect today

The current broker is intentionally small:

- single-process runtime
- local filesystem persistence
- text-based protocol
- simplified replication model
- no authentication, retention, batching, compression, or cluster control plane yet
