# AI Agent Integrations

> **User Action Required.** Each integration below
> requires manual setup. This skill does not install
> packages or run code automatically.

MoltFlow works as a tool provider for AI assistants.
Connect your preferred AI platform to the MoltFlow API
and manage WhatsApp directly from conversation.

## Claude Desktop (MCP Server)

Install the MCP server globally or run via npx:

```bash
npm install -g @moltflow/mcp-server@1.0.0
```

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "moltflow": {
      "command": "npx",
      "args": ["-y", "@moltflow/mcp-server@1.0.0"],
      "env": {
        "MOLTFLOW_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Restart Claude Desktop. 22 MCP tools become available across
sessions, messaging, groups, leads, outreach, and usage.

**What you can do:**

- "Send a WhatsApp message to +1-555-0123 saying 'Hello!'"
- "List all my WhatsApp sessions"
- "Show me new leads from the last 7 days"
- "Create a bulk send campaign to my VIP contacts group"

**Required scopes:** Use the minimum scopes for your workflow:
`sessions:read`, `messages:send`, `leads:read`,
`custom-groups:read`, `usage:read`. Never use `["*"]` in production — create a scoped key at Dashboard > Settings > API Keys.

## Claude.ai Web (Remote MCP)

No installation required -- MoltFlow hosts a remote MCP gateway.

Configure in Claude.ai under Settings > Integrations > MCP Servers:

- **URL:** `https://apiv2.waiflow.app/mcp`
- **Auth header:** `X-API-Key`
- **Value:** Your MoltFlow API key

All 22 tools are available immediately after configuration.

## Claude Code / Cowork Plugin

Install via plugin directory for guided skills and MCP tools:

```bash
claude --plugin-dir ./moltflow-plugin
```

Available skills:

- `/moltflow:send-message` -- send a WhatsApp message
- `/moltflow:list-sessions` -- view session status
- `/moltflow:check-leads` -- review detected leads
- `/moltflow:bulk-send` -- create a bulk campaign
- `/moltflow:help` -- list all available commands

Set `MOLTFLOW_API_KEY` in your environment before launching.

## OpenAI Custom GPTs (ChatGPT)

Import the OpenAPI specification in GPT Builder:

1. Create a new GPT at [https://chat.openai.com/gpts/editor](https://chat.openai.com/gpts/editor)
2. Go to Configure > Actions > Create new action
3. Click "Import from URL"
4. URL: `https://cdn.jsdelivr.net/npm/@moltflow/openai-actions@1.0.0/openapi-simplified.yaml`
5. Set Authentication to "API Key", header name `X-API-Key`
6. Paste your MoltFlow API key

Your GPT can then send messages, check sessions, manage leads,
and run outreach campaigns through natural conversation.

---

## Security Notes

- **Scoped API keys only** — create a key with minimum
  required scopes at Dashboard > Settings > API Keys.
  Never use `["*"]` in production.
- **Environment variables** — store your API key as an
  env var, not in shared config files. Rotate regularly.
- **Chat history gate** — chat reading endpoints require
  explicit tenant opt-in at Settings > Account > Data
  Access. Disabled by default for GDPR compliance.
