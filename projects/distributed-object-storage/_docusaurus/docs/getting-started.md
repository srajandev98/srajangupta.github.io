# Getting Started

## Prerequisites

- Go 1.24+
- PostgreSQL

## Setup

Create `.env` in the project root:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=object_storage
DB_HOST=localhost
DB_PORT=5432
DB_SSLMODE=disable
APP_SECRET=replace_with_strong_secret
```

## Run

```bash
go run ./cmd/server
```

## First Request Flow

1. Upload: `POST /upload/{bucket}/{key}`
2. Presign: `GET /presign/{bucket}/{key}`
3. Download: `GET /download/{bucket}/{key}?expires=...&signature=...`

