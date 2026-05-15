# Security and Access

## Current Security Controls

- HMAC-based presigned URL validation
- Expiry enforcement on download links
- Bucket/object path validation to block traversal patterns

## Request-Surface Threats Addressed

Current controls explicitly mitigate:

- path traversal attempts in object keys
- key canonicalization ambiguity across OS path styles
- indefinite URL reuse via expiry checks
- signature tampering of presigned URLs

## Current Security Gaps

- no API key auth on upload/presign routes yet
- no fine-grained authorization policies yet
- no formal audit trail of all data-plane actions yet
- no key rotation workflow documented yet

## Planned Controls

- API key authentication
- Scoped authorization per bucket/action
- Audit logging for data and control plane actions
- Signature V4-compatible signing model

## Security Posture Guidance

Until auth is implemented:

- run this service only in trusted/private environments
- do not expose write endpoints publicly
- rotate `APP_SECRET` in controlled intervals
- monitor replication/job tables for suspicious or anomalous patterns
