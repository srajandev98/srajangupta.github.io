# Getting Started

## Requirements

- Node.js `24+`
- pnpm `11+`
- OpenAI API key for provider examples

## Install

```bash
git clone https://github.com/srajandev98/ai-agent-framework.git
cd ai-agent-framework
pnpm install
```

## Configure Provider Access

```env
OPENAI_API_KEY=your_api_key_here
```

## Build A Runnable Chain

```ts
import {
  RunnableMap,
  RunnableLambda,
  PromptTemplate,
  ModelRunnable,
  JsonOutputParser
} from "@ai-agent-framework/core";
import { openai } from "@ai-agent-framework/openai";

const inputMap = new RunnableMap<{ topic: string }, { topic: string; tone: string }>({
  topic: new RunnableLambda(({ topic }) => topic.trim()),
  tone: new RunnableLambda(() => "concise")
});

const prompt = new PromptTemplate<{ topic: string; tone: string }>({
  template:
    "In a {tone} tone, return valid JSON only with keys {\"summary\": string, \"score\": number} about {topic}."
});

const chain = inputMap
  .pipe(prompt)
  .pipe(new ModelRunnable(openai({ model: "gpt-4o-mini" })))
  .pipe(new JsonOutputParser<{ summary: string; score: number }>());

const result = await chain.invoke({ topic: "TypeScript" });
```

## Build A Tool-Using Agent

```ts
import { z } from "zod";
import { Agent, tool } from "@ai-agent-framework/core";
import { openai } from "@ai-agent-framework/openai";

const weatherTool = tool({
  name: "weather",
  description: "Get weather for a city",
  schema: z.object({ city: z.string() }),
  async execute({ city }) {
    return { city, temperature: 32 };
  }
});

const agent = new Agent({
  model: openai({ model: "gpt-4o-mini" }),
  tools: [weatherTool],
  maxSteps: 10
});

const output = await agent.run("What is the weather in Delhi?");
```

## Build A Resumable Workflow

```ts
import { Workflow } from "@ai-agent-framework/core";

const workflow = new Workflow({
  steps: [
    { id: "normalize", run: (input: string) => input.trim() },
    { id: "classify", run: (text: string) => ({ text, priority: "high" }) }
  ]
});

const result = await workflow.run("  investigate latency spike  ");
// result.output
// result.snapshots
// result.resumeState
```

## Validate The Repository

```bash
pnpm lint
pnpm typecheck
pnpm test --run
pnpm --filter @ai-agent-framework/core build
pnpm --filter @ai-agent-framework/openai build
```
