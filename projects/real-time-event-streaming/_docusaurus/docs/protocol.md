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

The parser always expects four `|`-separated fields. Commands with no args must still include a trailing `|`, for example:

```text
V1|99|PING|
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

If a request cannot be parsed, broker responds with correlation id `0`:

```text
V1|0|ERR|BAD_REQUEST|...
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

Additional handler-level validation:

- `PRODUCE` requires `key:value` message payload
- `PRODUCE` ack mode must be exactly `acks=0`, `acks=1`, or `acks=all`
- `CONSUME`, `COMMIT`, `OFFSET`, `REPLICA_FETCH` numeric fields must be valid integers
- `REPLICA_FETCH` `replica_id` must be in range `1..(replication_factor-1)` (`0` is the leader)

## Replication Semantics (Current)

- `acks=0`: accepted by protocol, currently behaves like immediate leader success response.
- `acks=1`: leader append acknowledgement.
- `acks=all`: waits until partition high watermark reaches produced offset and min ISR is satisfied, otherwise returns `REPLICATION_TIMEOUT`.
- `CONSUME` returns only committed records (up to high watermark).

## Command Payloads (Current)

Response payloads are plain key-value text and may evolve additively.

- `PRODUCE`: `partition=<n> offset=<n> hw=<n>`
- `CONSUME`: `messages=<offset:value,...> hw=<n>` (empty `messages=` when nothing committed at requested offset)
- `JOIN`: `assigned=[<partition ids>]`
- `COMMIT`: `committed=true`
- `OFFSET`: `offset=<n>`
- `REPLICA_FETCH`: `replica=<id> acked_offset=<n> hw=<n> isr=[...] under_replicated=<bool>`

## Compatibility Policy (Current)

- `V1` is the active protocol version.
- New additive commands can be introduced without breaking existing `V1` commands.
- Breaking envelope or command semantics requires a new major version token.
