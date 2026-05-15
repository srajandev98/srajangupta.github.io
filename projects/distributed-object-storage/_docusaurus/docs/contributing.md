# Contributing

## Workflow

1. Pick next open item from `PLAN.md`
2. Implement in small focused commits
3. Add or adjust tests
4. Update docs pages and release notes

## Engineering Standards

- Preserve system invariants:
  - object path safety
  - transaction boundaries for metadata + replication intent
  - legal job-state transitions
- Prefer explicit state handling over implicit side effects.
- Keep changes scoped; avoid unrelated refactors in same PR.
- Add tests proportional to risk:
  - small behavior change: focused unit test
  - boundary/contract change: broader suite + integration coverage

## Checks

```bash
gofmt -w ./...
GOCACHE=/private/tmp/go-build go test ./...
```

## PR Template (Recommended)

Include:

1. Problem statement
2. Design choice and tradeoff
3. Invariants affected
4. Test evidence
5. Docs updated (yes/no with links)

## Documentation Rule

Every merged engineering milestone updates both project docs and this website docs section.
