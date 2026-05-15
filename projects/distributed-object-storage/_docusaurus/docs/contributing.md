# Contributing

## Development Principles

- preserve documented durability guarantees
- keep retryable operations idempotent
- add tests for success and failure behavior
- update product docs when user-visible behavior changes

## Before Opening A Pull Request

```bash
gofmt -w ./...
go test ./...
```

## Good Contribution Areas

- streaming uploads
- request-size limits
- schema migrations
- API-key authentication
- observability and health endpoints
