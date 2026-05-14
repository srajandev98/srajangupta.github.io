# Docusaurus Setup

This folder is a Docusaurus docs project for the Distributed Object Storage documentation.

## Install

```bash
cd projects/distributed-object-storage
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

For this repository layout, publish by copying the contents of `build/` to the same path served at:

`/projects/distributed-object-storage/`

You can automate this via a GitHub Actions workflow later.
