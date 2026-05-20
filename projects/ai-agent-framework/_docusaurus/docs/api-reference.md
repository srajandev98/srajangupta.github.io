# API Reference

Use this page when you already understand the concepts and need the current public surface at a glance.

## Runnables

| API | Use |
| --- | --- |
| `Runnable<I, O>` | base contract with `invoke` and `pipe` |
| `RunnableLambda<I, O>` | wrap sync or async custom logic |
| `RunnableSequence<I, O>` | run steps in order |
| `RunnableParallel<I, TMap>` | run branches from the same input concurrently |
| `RunnableMap<I, TMap>` | build a named object from one input |
| `RunnablePassthrough<T>` | return input unchanged |
| `ModelRunnable` | adapt `Model` into a `string -> string` runnable |

## Prompts

### `PromptTemplate<TVars>`

- input: object of template variables
- output: formatted prompt string
- throws: `PromptTemplateError` when required variables are missing

## Output Parsers

| API | Behavior |
| --- | --- |
| `StringOutputParser` | returns raw text unchanged |
| `JsonOutputParser<T>` | parses JSON text into typed output |

`JsonOutputParser<T>` throws `OutputParserError` on invalid JSON.

## Agent Runtime

### `Agent`

```ts
new Agent({ model, tools, passes?, hooks?, maxSteps? })
agent.run(input: string): Promise<string>
```

Runtime behavior:

- iterative model loop
- tool execution when requested
- memory context injection
- max-step enforcement

Config details:

- `tools` are registered by unique tool name
- `passes` can transform interpreted instructions before execution
- `hooks.onStart(state)` and `hooks.onEnd(state, result)` allow lifecycle instrumentation
- `maxSteps` defaults to `20`

## Tools

### `tool(...)`

```ts
tool({
  name,
  description,
  schema,      // zod schema
  execute      // async handler
})
```

Behavior:

- args are validated against `schema` before execution
- unknown tool names raise `ToolNotFoundError`
- schema mismatch raises `ToolValidationError`

## Workflows

### `Workflow`

```ts
new Workflow({ steps })
workflow.run(input, { resumeFrom? })
```

Types:

- `WorkflowStep`: `{ id, run, when? }`
- `WorkflowSnapshot`: captured per-step input/output metadata
- `WorkflowResumeState`: replayable state with `nextStepIndex`, `data`, `snapshots`
- `WorkflowRunResult`: `{ output, snapshots, resumeState }`

## Errors

- `ToolNotFoundError`
- `ToolValidationError`
- `ModelError`
- `MaxStepsExceededError`
- `PromptTemplateError`
- `OutputParserError`
