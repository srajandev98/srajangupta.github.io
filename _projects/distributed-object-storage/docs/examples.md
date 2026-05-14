# Examples

## Upload

```bash
curl -X POST \
  --data-binary @./sample.txt \
  http://localhost:8080/upload/my-bucket/docs/sample.txt
```

## Presign

```bash
curl http://localhost:8080/presign/my-bucket/docs/sample.txt
```

## Download

Use the URL returned by presign:

```bash
curl "http://localhost:8080/download/my-bucket/docs/sample.txt?expires=...&signature=..."
```

