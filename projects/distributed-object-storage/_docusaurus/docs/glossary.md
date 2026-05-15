# Glossary

- **At-least-once processing**: a worker may execute the same logical job more than once.
- **Idempotency**: repeating an operation produces the same logical end state.
- **Latest version**: the object version currently selected for normal download reads.
- **Presigned URL**: temporary signed URL that grants download access without permanent credentials.
- **Replication lag**: time between primary commit and secondary-copy completion.
- **State transition guard**: database condition that only allows legal state changes.
- **Outbox-style durability**: storing asynchronous work intent durably with the primary state change.
- **Terminal failure**: final non-retry job state after exhausting attempts.
