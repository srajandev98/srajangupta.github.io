# Glossary

- **At-least-once processing**: worker may execute the same logical job multiple times; safe systems must tolerate replay.
- **Idempotency**: applying same operation repeatedly produces the same logical end state.
- **Replication lag**: time between primary commit and secondary-replica completion.
- **Presigned URL**: URL containing temporary access authorization derived from a signature and expiry time.
- **State transition guard**: DB update condition that only permits legal state changes (for example `running -> completed` only if current status is `running`).
- **Outbox-style durability**: pattern where intent for asynchronous work is written durably in same transaction as primary state change.
- **Terminal failure**: final non-retry job state reached after exhausting configured retry attempts.
