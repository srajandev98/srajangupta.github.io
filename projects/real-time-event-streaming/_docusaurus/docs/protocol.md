# Protocol

The current broker uses a simple text-based TCP protocol with explicit versioning and correlation IDs.

## Request format

```text
V1|<correlation_id>|<command>|<args>
```

Example:

```text
V1|42|PRODUCE|orders user1:created
```

## Response format

Success:

```text
V1|<correlation_id>|OK|<payload>
```

Error:

```text
V1|<correlation_id>|ERR|<code>|<message>
```

## Supported commands

| Command | Arguments | Purpose |
| --- | --- | --- |
| `PRODUCE` | `<topic> <key>:<value>` | Append a message to the partition selected by the key |
| `CONSUME` | `<topic> <partition> <offset>` | Read messages from a partition starting at an offset |
| `JOIN` | `<group> <topic> <consumer_id>` | Join a consumer group and receive assigned partitions |
| `COMMIT` | `<group> <topic> <partition> <offset>` | Persist consumer progress |
| `OFFSET` | `<group> <topic> <partition>` | Fetch the committed offset |

## Validation rules

The parser currently enforces:

- protocol version must be `V1`
- correlation ID must be present
- command must be present
- arguments are split on whitespace

The roadmap calls for continued hardening of request envelopes, error codes, and compatibility rules as the protocol evolves.
