# Architecture

AI Agent Framework separates workflow composition from provider integration and agent execution.

## Components

| Component | Responsibility |
| --- | --- |
| Runnables | composable execution units |
| Prompt templates | prompt formatting |
| Output parsers | conversion from model text to typed output |
| Model adapters | provider integration |
| Agent runtime | iterative execution and tool handling |

## Chain Execution

```text
input -> runnable stages -> structured output
```

Chains run a known sequence of stages.

## Agent Execution

```text
input -> model -> tool calls or final response -> repeat
```

Agents can continue across multiple steps until they return a final response or reach `maxSteps`.

## Runtime Behavior

The runtime validates tool arguments, preserves tool-call message ordering, and raises explicit errors for provider failures, invalid tool usage, parser failures, and step-limit exhaustion.

Detailed loop behavior:

1. a system message is prepended with current memory context
2. model output is interpreted into instructions
3. optional instruction passes run
4. tool instructions execute and tool results are appended to:
   - message history (`role=tool`)
   - memory (`type=tool-result`)
5. return instruction ends the loop

Tracing:

- each step creates a span with `startedAt`, `endedAt`, and step metadata
- spans are stored on agent state for downstream observability/instrumentation

For exact runtime guarantees, see the upstream [Core Contract](https://github.com/srajandev98/ai-agent-framework/blob/main/CORE_CONTRACT.md).
