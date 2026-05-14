# Contributing

## Workflow

1. Pick next open item from `PLAN.md`
2. Implement in small focused commits
3. Add or adjust tests
4. Update docs pages and release notes

## Checks

```bash
gofmt -w ./...
GOCACHE=/private/tmp/go-build go test ./...
```

## Documentation Rule

Every merged engineering milestone updates both project docs and this website docs section.

