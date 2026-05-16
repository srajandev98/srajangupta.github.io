# TypeScript SDK

This SDK lets Node.js apps interact with the RTES broker without manually formatting TCP protocol lines.

## Package Location

In the monorepo:

```text
packages/sdk/typescript
```

## Install

From another local project:

```bash
pnpm add ../../packages/sdk/typescript
```

Or publish and install by package name:

```bash
pnpm add @rtes/typescript-sdk
```

## Build

```bash
cd packages/sdk/typescript
pnpm install
pnpm run build
```

## Basic Usage

```ts
import { RTESClient } from '@rtes/typescript-sdk';

async function run() {
  const client = new RTESClient({ host: '127.0.0.1', port: 9092 });

  await client.connect();

  const produced = await client.produce('orders', 'user1', 'created');
  const messages = await client.consume('orders', produced.partition, 0);

  const join = await client.join('analytics', 'orders', 'consumer-a');
  await client.commit('analytics', 'orders', produced.partition, produced.offset + 1);
  const committed = await client.offset('analytics', 'orders', produced.partition);

  console.log({ produced, messages, assigned: join.assigned, committed });

  await client.close();
}

run().catch(console.error);
```

## API

- `connect(): Promise<void>`
- `close(): Promise<void>`
- `sendCommand(command: string, args?: string): Promise<RTESResponse>`
- `produce(topic: string, key: string, value: string): Promise<ProduceResult>`
- `consume(topic: string, partition: number, offset: number): Promise<ConsumedMessage[]>`
- `join(group: string, topic: string, consumerId: string): Promise<JoinResult>`
- `commit(group: string, topic: string, partition: number, offset: number): Promise<boolean>`
- `offset(group: string, topic: string, partition: number): Promise<number>`

## Error Handling

Protocol errors throw `RTESProtocolError` and include:

- `code` (for example `BAD_REQUEST`, `UNKNOWN_COMMAND`)
- `message`
- `response` (full parsed response)

## Runnable Example

A runnable script is available in the SDK package:

```text
packages/sdk/typescript/examples/basic-usage.js
```

Run steps:

1. Start broker from `core/`:

```bash
cd core
go run ./cmd/broker
```

2. Run SDK example:

```bash
cd packages/sdk/typescript
pnpm install
pnpm run build
node examples/basic-usage.js
```
