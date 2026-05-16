# Protocol

The broker uses a line-based TCP protocol with a versioned envelope.

## Request Format

```text
V1|<correlation_id>|<command>|<args>
```

Example:

```text
V1|42|PRODUCE|orders user1:created
```

## Response Format

Success:

```text
V1|<correlation_id>|OK
V1|<correlation_id>|OK|<payload>
```

Error:

```text
V1|<correlation_id>|ERR|<code>|<message>
```

## Supported Commands

| Command | Arguments | Purpose |
| --- | --- | --- |
| `PRODUCE` | `<topic> <key>:<value>` | append one message |
| `CONSUME` | `<topic> <partition> <offset>` | read messages from offset |
| `JOIN` | `<group> <topic> <consumer_id>` | join a group and get assignments |
| `COMMIT` | `<group> <topic> <partition> <offset>` | persist processed progress |
| `OFFSET` | `<group> <topic> <partition>` | read committed progress |

## Error Codes

| Code | Meaning |
| --- | --- |
| `BAD_REQUEST` | malformed envelope or invalid command args |
| `UNKNOWN_COMMAND` | unsupported command |

## Validation Rules

The parser enforces:

- exactly four `|`-separated sections
- protocol version must be `V1`
- non-empty correlation ID
- non-empty command

Handlers then enforce command-specific argument rules.

## Compatibility Policy (Current)

- `V1` is the active protocol version.
- New additive commands can be introduced without breaking existing `V1` commands.
- Breaking envelope or command semantics requires a new major version token.
