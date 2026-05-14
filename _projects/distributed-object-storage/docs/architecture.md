# Architecture

## Layers

- HTTP API: request validation, presign, download responses
- Service: upload orchestration and metadata flow
- Repository: object metadata, replication jobs, state transitions
- Storage: primary and secondary filesystem adapters
- Worker: durable replication job processing

## Upload Flow

1. Validate bucket and object key
2. Write primary object to storage
3. Persist metadata and replication job transactionally
4. Worker claims and executes replication

## Job State Model

`pending -> running -> completed`  
Retry path: `running -> pending`  
Terminal path: `running -> failed`

