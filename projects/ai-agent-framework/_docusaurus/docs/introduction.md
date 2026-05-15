---
slug: /
---

# AI Agent Framework

AI Agent Framework is a TypeScript framework for building AI applications with composable primitives and an agent runtime.

The project is currently focused on a practical MVP:

- runnable-based composition (`RunnableLambda`, `RunnableSequence`, `RunnableParallel`, `RunnableMap`)
- prompt and output parser layers
- model adapter runnable
- tool-capable agent runtime

## What This Documentation Covers

This documentation is designed for three audiences:

1. Developers integrating the framework into AI apps.
2. Contributors extending primitives and runtime behavior.
3. Reviewers validating architecture and release quality.

If you are new, start with:

- [Getting Started](getting-started.md)
- [User Guide](user-guide.md)
- [Examples](examples.md)

If you are implementing or reviewing changes, start with:

- [Architecture](architecture.md)
- [API Reference](api-reference.md)
- [MVP Roadmap](mvp-roadmap.md)

## Current MVP Snapshot

As of `v0.1.0-mvp`:

- Runnable composition works end-to-end.
- Prompt formatting and JSON parsing layers are available.
- OpenAI provider adapter is integrated.
- Agent runtime supports tool execution and memory context loop.
- Core behavior is covered by unit tests and contract tests.

## Source of Truth

- [Repository README](https://github.com/srajandev98/ai-agent-framework/blob/main/README.md)
- [Core Contract](https://github.com/srajandev98/ai-agent-framework/blob/main/CORE_CONTRACT.md)
- [Changelog](https://github.com/srajandev98/ai-agent-framework/blob/main/CHANGELOG.md)
