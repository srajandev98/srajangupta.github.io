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

## `GET /presign/{bucket}/{objectKey}`

Generates a short-lived signed URL for downloading the latest object version.

Success:

```json
{"url":"/download/my-bucket/docs/sample.txt?expires=...&signature=..."}
```

Current expiry duration:

- `15 minutes`

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

## API Versioning Status

Routes are currently unversioned. A `/v1/...` surface is planned as part of MVP hardening.
