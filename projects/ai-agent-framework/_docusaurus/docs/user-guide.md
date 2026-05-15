# User Guide

## Choose A Workflow Style

| Need | Use |
| --- | --- |
| fixed input-to-output pipeline | chain |
| model may need external actions | agent |
| multiple named values from one input | `RunnableMap` |
| independent branches | `RunnableParallel` |
| provider model inside a chain | `ModelRunnable` |

## Chains

Use chains for predictable workflows such as extraction, classification, rewriting, and structured generation.

Typical shape:

```text
input -> prompt -> model -> parser
```

## Agents

Use agents when a response may require one or more tool calls before completion.

Typical shape:

```text
user input -> model -> tool call or final response -> repeat until final
```

## Error Handling

Framework errors include:

- `ModelError`
- `ToolNotFoundError`
- `ToolValidationError`
- `MaxStepsExceededError`
- `PromptTemplateError`
- `OutputParserError`

Handle them at the application boundary and convert them into user-safe responses as needed.

## Testing

- test runnables independently
- test parser output shape
- test tool validation failures
- keep end-to-end examples for core flows
