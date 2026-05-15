# Contributing

## Development Principles

- keep protocol behavior explicit
- preserve subsystem boundaries
- add tests for behavior changes
- update user-facing docs when product behavior changes

## Before Opening A Pull Request

```bash
gofmt -w ./...
go test ./...
```

## Good Contribution Areas

- protocol validation and error handling
- storage recovery tests
- configuration hardening
- offset and rebalance edge cases
- metrics and observability
- documentation updates that keep behavior and product docs aligned
