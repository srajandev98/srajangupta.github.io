# Storage

This page describes the current storage engine behavior.

## Storage Engine (Current)

Each topic-partition is persisted in segmented files:

```text
data/<topic>-<partition>-segment-<segment_id>.log
```

Example:

```text
data/orders-2-segment-000000.log
```

Record format per line:

```text
<offset>|<timestamp_ms>|<crc32_hex>|<value>
```

Example:

```text
0|1715840400000|8c736521|created
```

## Index Files

Each topic-partition has side index files:

```text
data/orders-2-offset.idx
data/orders-2-time.idx
```

These indexes track offset/time to segment mapping and support future optimized reads.

## Partitioning

Keys are hashed with FNV-1a into configured partition count.

Effects:

- same key -> same partition (for fixed partition count)
- per-partition order is preserved
- different keys can progress independently

## Recovery Behavior

On broker startup:

1. segment files are discovered and sorted
2. records are replayed into memory
3. checksum is verified per record
4. corrupt records are skipped

## Retention Behavior

Retention runs during write flow and can remove old segments by:

- max age (`RTES_RETENTION_MAX_AGE_SECONDS`)
- max total bytes (`RTES_RETENTION_MAX_BYTES`)

## Durability Controls

Available knobs:

- `RTES_FLUSH_INTERVAL_MS`
- `RTES_FLUSH_BYTES`
- `RTES_FSYNC_MODE` (`always`, `interval`, `never`)

## Consumer Offsets

Committed offsets are persisted in:

```text
data/offsets.json
```

This is separate from segment logs.
