# Protocol

The broker uses a small text protocol over TCP so the request/response flow is easy to read while the project is still evolving.

## What You Will Learn

- the exact wire format for requests and responses
- what each command does
- how correlation IDs help pair responses with requests
- which validation rules exist today

## Request Format

```text
V1|<correlation_id>|<command>|<args>
```

Example:

```text
V1|42|PRODUCE|orders user1:created
```

The four fields mean:

| Field | Meaning |
| --- | --- |
| `V1` | protocol version |
| `42` | client-provided correlation ID |
| `PRODUCE` | command name |
| `orders user1:created` | command-specific arguments |

## Response Format

Success:

```text
V1|<correlation_id>|OK|<payload>
```

Error:

```text
V1|<correlation_id>|ERR|<code>|<message>
```

The correlation ID is echoed back so a client can match a response to the request that caused it.

## Supported Commands

| Command | Arguments | Example | Purpose |
| --- | --- | --- | --- |
| `PRODUCE` | `<topic> <key>:<value>` | `V1|1|PRODUCE|orders user1:created` | Append one message |
| `CONSUME` | `<topic> <partition> <offset>` | `V1|2|CONSUME|orders 2 0` | Read messages from an offset |
| `JOIN` | `<group> <topic> <consumer_id>` | `V1|3|JOIN|analytics orders consumer-a` | Join a group and receive partitions |
| `COMMIT` | `<group> <topic> <partition> <offset>` | `V1|4|COMMIT|analytics orders 2 1` | Persist group progress |
| `OFFSET` | `<group> <topic> <partition>` | `V1|5|OFFSET|analytics orders 2` | Read committed progress |

## Response Examples

Produce success:

```text
V1|1|OK|partition=2 offset=0
```

Consume success:

```text
V1|2|OK|messages=0:created,1:paid
```

Group join success:

```text
V1|3|OK|assigned=[0 1 2]
```

Validation error:

```text
V1|0|ERR|BAD_REQUEST|expected format V1|<correlation_id>|<command>|<args>
```

## Validation Rules Today

The parser currently enforces:

- exactly four pipe-separated sections
- protocol version must be `V1`
- correlation ID must be present
- command must be present
- command arguments are split on whitespace

Individual handlers then validate the argument count and numeric fields required by each command.

## Current Tradeoff

The text protocol is easy to inspect and debug by hand with `nc`, but it is not yet optimized for compatibility, performance, or richer typing. Future protocol work will need stronger envelopes, explicit error catalogs, and a versioning strategy as the system becomes more production-oriented.
