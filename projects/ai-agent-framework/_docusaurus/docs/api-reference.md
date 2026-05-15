# API Reference

## Runnables

### `Runnable<I, O>`

- `invoke(input: I): Promise<O>`
- `pipe(next: Runnable<O, NextOutput>): Runnable<I, NextOutput>`

### `RunnableLambda<I, O>`

Wraps a sync/async function as runnable.

### `RunnableSequence<I, O>`

Runs runnable steps in order.

### `RunnableParallel<I, TMap>`

Runs multiple runnable branches with same input and returns merged object.

### `RunnableMap<I, TMap>`

Builds named object output by mapping one input into multiple runnable fields.

### `RunnablePassthrough<T>`

Identity runnable that returns input as-is.

### `ModelRunnable`

Adapter from `Model` to runnable (`string -> string`).

## Prompts

### `PromptTemplate<TVars>`

- input: object of template variables
- output: formatted prompt string
- throws: `PromptTemplateError` on missing variable values

## Output Parsers

### `StringOutputParser`

Pass-through parser for raw text output.

### `JsonOutputParser<T>`

Parses JSON string to typed object.

Throws `OutputParserError` on invalid JSON.

## Agent Runtime

### `Agent`

- `new Agent({ model, tools, passes?, hooks?, maxSteps? })`
- `run(input: string): Promise<string>`

Runtime behavior:

- iterative model loop
- tool execution when requested
- memory context injection
- max-step enforcement

## Errors

- `ToolNotFoundError`
- `ToolValidationError`
- `ModelError`
- `MaxStepsExceededError`
- `PromptTemplateError`
- `OutputParserError`
