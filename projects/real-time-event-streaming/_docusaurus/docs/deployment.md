# Deployment Guide

This guide covers product deployment for local and server environments.

## Deployment Modes

1. Docker Compose (recommended)
2. Docker run
3. Native binary

## Prerequisites

- Docker 24+ and Docker Compose v2 (container deployment)
- Go 1.24+ (native deployment)
- TCP `9092` reachable for clients

## Runtime Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `RTES_LISTEN_ADDR` | `:9092` | broker listen address |
| `RTES_DATA_DIR` | `data` (native) / `/app/data` (container) | storage root |
| `RTES_NUM_PARTITIONS` | `3` | partition count |
| `RTES_REPLICATION_FACTOR` | `3` | total replicas per partition (leader + followers, local simulation) |
| `RTES_MIN_ISR` | `2` | minimum ISR required for committed writes |
| `RTES_REPLICA_MAX_LAG` | `0` | max offset lag to remain in ISR |
| `RTES_REPLICA_LAG_TIMEOUT_MS` | `10000` | follower freshness timeout for ISR |
| `RTES_ACK_ALL_TIMEOUT_MS` | `2000` | timeout for `acks=all` produce waits |
| `RTES_SEGMENT_MAX_BYTES` | `1048576` | segment rollover threshold |
| `RTES_RETENTION_MAX_BYTES` | `52428800` | retention by max bytes |
| `RTES_RETENTION_MAX_AGE_SECONDS` | `86400` | retention by max age |
| `RTES_FLUSH_INTERVAL_MS` | `1000` | interval for interval fsync mode |
| `RTES_FLUSH_BYTES` | `65536` | bytes threshold for interval fsync mode |
| `RTES_FSYNC_MODE` | `always` | one of `always`, `interval`, `never` |

## Option 1: Docker Compose

From project root (`real-time-event-streaming/`):

```bash
docker compose up --build -d
```

Verify:

```bash
docker compose ps
docker compose logs -f broker
```

Stop:

```bash
docker compose down
```

Stop and remove persisted data:

```bash
docker compose down -v
```

## Option 2: Docker Run

Build image:

```bash
docker build -t rtes-broker:latest .
```

Run container:

```bash
docker run -d \
  --name rtes-broker \
  -p 9092:9092 \
  -e RTES_LISTEN_ADDR=:9092 \
  -e RTES_DATA_DIR=/app/data \
  -e RTES_NUM_PARTITIONS=3 \
  -v rtes_data:/app/data \
  --restart unless-stopped \
  rtes-broker:latest
```

## Option 3: Native Binary

Build:

```bash
go build -o bin/rtes-broker ./cmd/broker
```

Run:

```bash
RTES_LISTEN_ADDR=:9092 \
RTES_DATA_DIR=./data \
RTES_NUM_PARTITIONS=3 \
RTES_REPLICATION_FACTOR=3 \
RTES_MIN_ISR=2 \
./bin/rtes-broker
```

## Post-Deploy Functional Check

```bash
nc localhost 9092
```

Send:

```text
V1|1|PRODUCE|orders user1:created
V1|2|CONSUME|orders 2 0
```

Expected: `V1|...|OK|...` responses.

## Data Layout (Current)

Typical files under `RTES_DATA_DIR`:

```text
orders-2-segment-000000.log
orders-2-offset.idx
orders-2-time.idx
orders-2-replica-1-segment-000000.log
orders-2-replica-2-segment-000000.log
offsets.json
```

## Current Deployment Limits

- single broker process
- no distributed metadata quorum
- no network replication failover behavior
- local replica files are same-node mirrors, not cluster replication
