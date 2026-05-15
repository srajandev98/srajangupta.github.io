# Examples

These examples are meant to be adapted into real applications, not only read as API snippets.

## 1. Structured Extraction

Use this when your app needs predictable JSON rather than prose.

```ts
const chain = prompt.pipe(model).pipe(parser);
const result = await chain.invoke({ ticket: "Payment failed twice" });
```

Good fits:

- support ticket triage
- document metadata extraction
- moderation labels

## 2. Input Enrichment With `RunnableMap`

Use this when one raw input needs to become several prompt variables.

```ts
const inputMap = new RunnableMap({
  topic: new RunnableLambda(({ topic }) => topic.trim()),
  tone: new RunnableLambda(() => "concise")
});
```

Good fits:

- normalizing user input
- injecting defaults
- combining user data with app policy

## 3. Independent Branches With `RunnableParallel`

Use this when multiple calculations can happen from the same input without waiting on one another.

```ts
const parallel = new RunnableParallel({
  length: new RunnableLambda((text: string) => text.length),
  upper: new RunnableLambda((text: string) => text.toUpperCase())
});
```

Good fits:

- feature extraction
- side-by-side scoring
- parallel preprocessing

## 4. Tool-Based Agent

Use `Agent` + `tool(...)` when the model may need external information before it can answer.

Good fits:

- weather lookup
- CRM lookup
- calendar or ticket actions

Prefer a chain-only design until your task truly needs tool choice or a reasoning loop.

## 5. Choosing Between Chain And Agent

| Scenario | Better Fit |
| --- | --- |
| summarize text into JSON | chain |
| classify support tickets | chain |
| answer using a fixed retrieved context | chain |
| decide whether to call weather or search | agent |
| execute multi-step tool workflows | agent |
