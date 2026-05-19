# API Reference

Base URL examples assume local development at `http://localhost:8080`.

## `POST /upload/{bucket}/{objectKey}`

Stores a new object version and schedules background replication.

After success, you can rely on:

- primary file write completed
- metadata persisted
- replication job persisted

Success:

- `200 OK`
- body: `"versioned object uploaded successfully"`

Common failures:

- `400 Bad Request`: invalid bucket or object path
- `500 Internal Server Error`: storage or metadata failure

Notes:

- upload currently reads full request body into memory before writing (streaming upload path is planned)
- each successful upload creates a new immutable `version_id`
- the latest marker for the same `(bucket, objectKey)` is atomically switched in metadata

## `GET /presign/{bucket}/{objectKey}`

Generates a short-lived signed URL for downloading the latest object version.

Success:

```json
{"url":"/download/my-bucket/docs/sample.txt?expires=...&signature=..."}
```

Current expiry duration:

- `15 minutes`

Notes:

- signature is HMAC-SHA256 over `<bucket>/<objectKey>:<expires>`
- response returns a relative URL path; prepend service host

## `GET /download/{bucket}/{objectKey}?expires=...&signature=...`

Returns the latest metadata-selected object version when the signature is valid.

Required query params:

- `expires`
- `signature`

Common responses:

- `200 OK`: object bytes
- `400 Bad Request`: invalid path
- `401 Unauthorized`: missing, invalid, or expired signature
- `404 Not Found`: object does not exist
- `500 Internal Server Error`: metadata lookup or file-read failure

Notes:

- returns metadata-selected latest version only
- validates both expiration and signature before file read

## API Versioning Status

Routes are currently unversioned. A `/v1/...` surface is planned as part of MVP hardening.

## Path Validation Rules

Bucket name:

- lowercase letters, numbers, dots, and hyphen
- length pattern equivalent to `^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$`
- no `..` sequence

Object key:

- must not be empty
- must not start with `/`
- must not include `\`
- canonicalized key must exactly match input (rejects traversal-like forms)
