# Contributing

Thanks for contributing.

## Development Workflow

1. Fork and create a feature branch.
2. Keep changes scoped and test-backed.
3. Run checks before opening PR:

```bash
pnpm lint
pnpm test --run
pnpm --filter @ai-agent-framework/core build
pnpm --filter @ai-agent-framework/openai build
```

## Contribution Principles

- prefer small composable primitives over broad one-off abstractions
- keep public API changes explicit and documented
- add tests for every behavioral contract change
- update docs when developer-facing behavior changes

## Pull Request Checklist

- [ ] tests added or updated
- [ ] docs updated
- [ ] changelog updated for user-visible behavior
- [ ] no unrelated refactors bundled into same PR
