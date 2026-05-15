---
slug: /
---

# AI Agent Framework

AI Agent Framework is a TypeScript framework for building AI chains and tool-using agents from composable primitives.

## Key Capabilities

- runnable composition for deterministic workflows
- prompt templates and output parsers
- model adapters for provider integration
- agent runtime with tool execution
- typed building blocks for application code

## When To Use It

Use AI Agent Framework when you need to:

- build structured prompt/model/parser pipelines
- compose reusable AI workflow stages
- add tool calling to an assistant
- keep provider integration separate from application flow

## Core Concepts

| Concept | Meaning |
| --- | --- |
| Runnable | executable composable unit |
| Chain | fixed sequence of runnables |
| Prompt template | formatter for prompt variables |
| Output parser | converter from model text to application output |
| Agent | runtime that can call tools before returning a response |

## Current Scope

The current MVP includes runnable composition, prompt templates, parsers, OpenAI provider integration, and a tool-capable agent runtime. Retriever primitives, richer memory support, and additional provider adapters remain planned work.

## Documentation

1. [Getting Started](getting-started.md): install and run the first chain and agent.
2. [User Guide](user-guide.md): choose primitives for common use cases.
3. [Examples](examples.md): practical usage patterns.
4. [API Reference](api-reference.md): public API surface.
5. [Architecture](architecture.md): runtime behavior.

## Source of Truth

- [Repository README](https://github.com/srajandev98/ai-agent-framework/blob/main/README.md)
- [Core Contract](https://github.com/srajandev98/ai-agent-framework/blob/main/CORE_CONTRACT.md)
- [Changelog](https://github.com/srajandev98/ai-agent-framework/blob/main/CHANGELOG.md)
