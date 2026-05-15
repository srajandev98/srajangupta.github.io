# Architecture

## Layered Design

1. **Primitives**
   - runnables
   - prompts
   - output parsers

2. **Model Adapters**
   - provider-specific wrappers implementing `Model`
   - `ModelRunnable` bridge for chain usage

3. **Agent Runtime**
   - instruction interpretation
   - tool execution
   - memory context propagation

4. **Applications**
   - playground and downstream products

## Execution Paths

### Chain Path

`input -> runnable composition -> parsed structured output`

### Agent Path

`user input -> model nodes -> tool calls/final response -> loop until final`

## Why This Structure

- Keeps primitives reusable outside agent runtime.
- Allows deterministic testing of chain stages.
- Keeps provider code isolated from orchestration logic.
