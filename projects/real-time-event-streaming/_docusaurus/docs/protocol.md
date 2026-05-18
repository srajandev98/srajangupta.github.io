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

With explicit ack mode:

```text
V1|43|PRODUCE|orders user1:created acks=all
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
| `PRODUCE` | `&lt;topic&gt; &lt;key&gt;:&lt;value&gt; [acks=0|1|all]` | append one message |
| `CONSUME` | `&lt;topic&gt; &lt;partition&gt; &lt;offset&gt;` | read messages from offset |
| `JOIN` | `&lt;group&gt; &lt;topic&gt; &lt;consumer_id&gt;` | join a group and get assignments |
| `COMMIT` | `&lt;group&gt; &lt;topic&gt; &lt;partition&gt; &lt;offset&gt;` | persist processed progress |
| `OFFSET` | `&lt;group&gt; &lt;topic&gt; &lt;partition&gt;` | read committed progress |
| `REPLICA_FETCH` | `&lt;topic&gt; &lt;partition&gt; &lt;replica_id&gt; &lt;offset&gt;` | report follower replication progress |

## Error Codes

| Code | Meaning |
| --- | --- |
| `BAD_REQUEST` | malformed envelope or invalid command args |
| `UNKNOWN_COMMAND` | unsupported command |
| `REPLICATION_TIMEOUT` | `acks=all` could not be satisfied before timeout |

## Validation Rules

The parser enforces:

- exactly four `|`-separated sections
- protocol version must be `V1`
- non-empty correlation ID
- non-empty command

Handlers then enforce command-specific argument rules.

## Replication Semantics (Current)

- `acks=0`: accepted by protocol, currently behaves like immediate leader success response.
- `acks=1`: leader append acknowledgement.
- `acks=all`: waits until partition high watermark reaches produced offset and min ISR is satisfied, otherwise returns `REPLICATION_TIMEOUT`.
- `CONSUME` returns only committed records (up to high watermark).

## Compatibility Policy (Current)

- `V1` is the active protocol version.
- New additive commands can be introduced without breaking existing `V1` commands.
- Breaking envelope or command semantics requires a new major version token.
