# Security And Access

This page distinguishes the security controls that exist now from the ones still required before public deployment.

## Implemented Today

- HMAC-signed presigned download URLs
- expiry enforcement on download links
- bucket and object-key validation to block traversal-style paths

## Threats These Controls Address

- path traversal attempts
- path canonicalization ambiguity across operating systems
- indefinite reuse of download links
- query tampering on presigned URLs

## Not Implemented Yet

- API key authentication for upload and presign routes
- scoped authorization policies
- audit logging across all data-plane actions
- documented key rotation workflow

## How To Use The Service Safely Today

- keep it in trusted/private environments
- do not expose write endpoints publicly
- use a strong `APP_SECRET`
- treat the current service as an MVP, not an internet-facing storage product
