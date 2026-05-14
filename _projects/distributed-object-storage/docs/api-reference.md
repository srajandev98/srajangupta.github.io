# API Reference

## Upload Object

`POST /upload/{bucket}/{objectKey}`

- Body: binary object data
- Headers: optional `Content-Type`
- Errors:
  - `400` invalid path
  - `500` server failure

## Create Presigned URL

`GET /presign/{bucket}/{objectKey}`

- Response: JSON with relative download URL
- Expiry: currently 15 minutes

## Download Object

`GET /download/{bucket}/{objectKey}?expires=...&signature=...`

- Requires valid signature and non-expired timestamp
- Returns latest object version
- Errors:
  - `401` signature/expiry issues
  - `404` object not found

