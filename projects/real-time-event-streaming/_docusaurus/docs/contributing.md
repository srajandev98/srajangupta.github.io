# Contributing

## Development principles

Contributions should preserve the project's main design goals:

- clear subsystem boundaries
- correctness before feature breadth
- incremental evolution toward production semantics
- readable code that keeps distributed-systems behavior explicit

## Before opening a pull request

Run:

```bash
gofmt -w ./...
go test ./...
```

When changing behavior, update the relevant documentation and add tests close to the subsystem you changed.

## Good contribution areas

Useful near-term contributions include:

- protocol validation and error handling
- storage tests and recovery work
- configuration hardening
- offset and rebalance edge cases
- metrics and observability scaffolding
- documentation improvements that keep README, docs, and `PLAN.md` aligned
