# FAQ

## Is this framework agent-only?

No. In many applications, runnable chains are the better starting point because they are simpler and more predictable.

## When should I choose an agent instead of a chain?

Choose an agent when the model must decide whether to call tools or repeat steps before it can answer. If the path is known up front, use a chain.

## Why not call model providers directly in app code?

Framework primitives make composition, testing, parsing, and provider replacement easier as the application grows.

## Do I need tools for every use case?

No. Summarization, classification, extraction, and many generation tasks fit chains well without any tools.

## What Node version is supported?

Node `24+`.

## Is this production-ready?

The project is in MVP hardening mode. Core primitives are implemented, but broader ecosystem features are still in progress.
