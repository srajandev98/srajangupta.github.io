# Contributing

## Development Principles

- preserve documented public behavior
- keep provider integrations isolated from framework abstractions
- add tests for new primitives and runtime behavior
- update user-facing docs when APIs or behavior change

## Before Opening A Pull Request

```bash
pnpm lint
pnpm test --run
pnpm --filter @ai-agent-framework/core build
pnpm --filter @ai-agent-framework/openai build
```
