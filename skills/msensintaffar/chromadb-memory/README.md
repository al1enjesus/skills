# chromadb-memory

🧠 Long-term semantic memory plugin for [OpenClaw](https://github.com/openclaw/openclaw) — backed by ChromaDB and local Ollama embeddings. Zero cloud dependencies.

## Features

- **Auto-recall**: Before every agent turn, queries ChromaDB with the user's message and injects relevant context automatically
- **`chromadb_search` tool**: Manual semantic search over your ChromaDB collection
- **100% local**: Ollama (nomic-embed-text) for embeddings, ChromaDB for vector storage
- **No OpenAI** — your memories stay on your hardware

## Prerequisites

1. **ChromaDB** running (Docker recommended):
   ```bash
   docker run -d --name chromadb -p 8100:8000 chromadb/chroma:latest
   ```

2. **Ollama** with an embedding model:
   ```bash
   ollama pull nomic-embed-text
   ```

3. Indexed documents in ChromaDB (use any ChromaDB-compatible indexer to populate your collection)

## Install via ClawdHub

```bash
clawdhub install chromadb-memory
```

Or manually — see [SKILL.md](SKILL.md) for full install and config instructions.

## Quick Config

Add to your OpenClaw config (`~/.openclaw/openclaw.json`):

```json
{
  "plugins": {
    "entries": {
      "chromadb-memory": {
        "enabled": true,
        "config": {
          "chromaUrl": "http://localhost:8100",
          "collectionId": "YOUR_COLLECTION_ID",
          "ollamaUrl": "http://localhost:11434",
          "embeddingModel": "nomic-embed-text",
          "autoRecall": true,
          "autoRecallResults": 3,
          "minScore": 0.5
        }
      }
    }
  }
}
```

## How It Works

```
User Message → Ollama (embed) → ChromaDB (query) → Context Injection → Agent Response
```

Auto-recall adds ~275 tokens per turn worst case — negligible against a 200K+ context window.

## License

MIT

## Author

matts — [git.matts.haus](https://git.matts.haus/matts/chromadb-memory)

## v1.1.0 — Auto-resolve Collection by Name

- **New:** `collectionName` config option (default: `longterm_memory`) — auto-resolves to UUID
- Collections survive reindexing without config changes
- `collectionId` still works but is no longer required
- Resolved ID cached per session for performance
