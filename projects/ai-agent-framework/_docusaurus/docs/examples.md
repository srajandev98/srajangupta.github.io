# Examples

## 1) Basic Runnable Chain

```ts
const chain = prompt
  .pipe(model)
  .pipe(parser);
```

Use when you need linear prompt -> model -> parse flow.

## 2) Input Enrichment with `RunnableMap`

```ts
const inputMap = new RunnableMap({
  topic: new RunnableLambda(({ topic }) => topic.trim()),
  tone: new RunnableLambda(() => "concise")
});
```

Use when prompt needs multiple derived fields.

## 3) Parallel Branches

```ts
const parallel = new RunnableParallel({
  length: new RunnableLambda((text: string) => text.length),
  upper: new RunnableLambda((text: string) => text.toUpperCase())
});
```

Use for independent transformations that can run concurrently.

## 4) Tool-Based Agent

Use `Agent` + `tool(...)` when model must call external capabilities.

Prefer chain-only architecture until tool reasoning is needed.
