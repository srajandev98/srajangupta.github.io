# User Guide

## Core Concepts

- **Runnable**: a unit with `invoke` + `pipe`.
- **Chain**: composition of runnables into deterministic pipelines.
- **PromptTemplate**: runtime prompt formatting using named placeholders.
- **OutputParser**: conversion from raw model text into structured outputs.
- **Agent Runtime**: iterative loop that can execute tools and continue until final response.

## Choosing the Right Primitive

- Use `RunnableLambda` for custom transformation logic.
- Use `RunnableMap` when one input needs multiple named derived values.
- Use `RunnableParallel` for independent branches that can run concurrently.
- Use `RunnablePassthrough` when downstream stage needs the original input unchanged.
- Use `ModelRunnable` when adapting a provider model into runnable pipelines.

## Error Handling Pattern

The framework exposes explicit error types:

- `ModelError`
- `ToolNotFoundError`
- `ToolValidationError`
- `MaxStepsExceededError`
- `PromptTemplateError`
- `OutputParserError`

Recommended pattern:

1. catch framework errors at application boundary
2. map to user-safe messages
3. log full error and `cause` for diagnostics

## Testing Recommendations

- Unit test each runnable in isolation.
- Add contract tests for chain behavior and parser guarantees.
- Keep one golden-path example that always compiles and runs.
