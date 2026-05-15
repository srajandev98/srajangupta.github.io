# API Reference

Base URL examples assume local dev: `http://localhost:8080`

## Upload Object

`POST /upload/{bucket}/{objectKey}`

### Purpose

Stores a new object version and schedules background replication.

### Request

- Path params:
  - `bucket` (validated bucket name)
  - `objectKey` (validated key path, traversal-safe)
- Body:
  - raw binary bytes
- Headers:
  - optional `Content-Type` persisted as metadata

### Behavior

1. Writes object file to primary node.
2. Computes checksum/version metadata.
3. Persists metadata row.
4. Persists replication job row in same DB transaction.

### Success Response

- `200 OK`
- Body: `"versioned object uploaded successfully"`

### Error Responses

- `400 Bad Request`: invalid bucket/key path
- `500 Internal Server Error`: storage or metadata persistence failure

## Create Presigned URL

`GET /presign/{bucket}/{objectKey}`

### Purpose

Generates a short-lived signed URL for downloading the latest version of an object.

### Request

- Path params:
  - `bucket`
  - `objectKey`

### Success Response

- `200 OK`
- JSON:

```json
{"url":"/download/my-bucket/docs/sample.txt?expires=...&signature=..."}
```

Current expiry duration: 15 minutes.

### Error Responses

- `400 Bad Request`: invalid bucket/key path

## Download Object

`GET /download/{bucket}/{objectKey}?expires=...&signature=...`

### Purpose

Downloads latest object version if presign query is valid.

### Required Query Parameters

- `expires`: unix timestamp
- `signature`: HMAC signature generated from bucket/key/expiry

### Validation Rules

- both query params must be present
- `expires` must parse as int64
- URL must not be expired
- signature must match expected HMAC value

### Success Response

- `200 OK`
- Body: object bytes
- Headers:
  - `Content-Disposition` with filename
  - `Content-Type` if metadata has value

### Error Responses

- `400 Bad Request`: invalid bucket/key path
- `401 Unauthorized`: missing/invalid/expired signature
- `404 Not Found`: object does not exist
- `500 Internal Server Error`: metadata lookup or file read failure

## API Versioning Status

Current routes are unversioned (`/upload`, `/download`, `/presign`).
Versioned API surface (`/v1/...`) is planned as part of MVP Phase 3.
