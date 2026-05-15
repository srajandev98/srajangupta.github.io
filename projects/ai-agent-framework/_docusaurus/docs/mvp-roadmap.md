# MVP Roadmap

This page separates what is usable today from what the framework is growing toward next.

## Current Stage

`v0.1.0-mvp` core is implemented and documented.

## Completed

- runnable primitives and composition
- prompt template and parser layer
- model runnable adapter
- tool-based agent runtime
- baseline tests and docs

## Next Priorities

1. integration-style golden chain tests
2. retriever and memory primitives
3. agent executor refinements built on top of primitives
4. more provider adapters

## Why This Order

The framework becomes more useful when the small pieces are trustworthy first. Broader features matter, but they should be added on top of contracts that are already easy to test and understand.

## Out Of Scope For MVP

- full production orchestration platform
- hosted control plane
- UI-heavy workflow builder
