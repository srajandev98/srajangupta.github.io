# User Guide

## Object Lifecycle

1. Upload bytes to `/upload/{bucket}/{objectKey}`.
2. The service writes the primary object and stores metadata.
3. A replication job is persisted for secondary copies.
4. Request `/presign/{bucket}/{objectKey}` when a client needs temporary download access.
5. Download the latest version through the signed URL.

## Operation Guarantees

| Operation | Success Means |
| --- | --- |
| Upload | primary file stored, metadata committed, replication job durable |
| Presign | a time-limited download URL was generated |
| Download | the latest metadata-selected version was returned |

## Versioning

Each upload creates a new immutable version. Reads resolve the version currently marked as latest in metadata.

## Replication Behavior

Replication is asynchronous. Uploads do not wait for every secondary node before returning success. Use replication-job state when you need to know whether copies have converged.

## Path Rules

Bucket names and object keys are validated before storage operations. Traversal paths, absolute paths, and unsupported path styles are rejected.

## Current Limitations

- no multipart upload
- no API-key authentication
- no bucket lifecycle or policy controls
- no streaming upload path yet
