# Docusaurus Setup

This folder is a Docusaurus docs project for the AI Agent Framework documentation.

## Install

```bash
cd projects/ai-agent-framework/_docusaurus
npm install
```

## Run locally

```bash
npm run start
```

## Build

```bash
npm run build
```

The generated static site will be in `build/`.

## Publish into `srajangupta.github.io`

For this repository layout, publish by copying the contents of `build/` to:

`projects/ai-agent-framework/docs/`

`npm run build` already performs this copy via `build:clean`.
