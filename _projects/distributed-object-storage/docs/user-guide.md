# User Guide

## Concepts

- **Bucket**: logical namespace for objects
- **Object Key**: hierarchical key-like path inside bucket
- **Versioning**: each upload creates a new immutable version id
- **Presigned URL**: time-limited URL authorized by signature

## Current Guarantees

- Durable metadata in PostgreSQL
- Asynchronous replication via durable jobs
- At-least-once job processing with idempotent replica records

## Current Limitations

- No multipart upload yet
- No API key auth yet
- No bucket lifecycle or policy controls yet

