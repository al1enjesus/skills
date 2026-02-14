---
name: "WhatsApp All-in-One — Mine Groups for Leads, AI Outreach, Bulk Campaigns & MCP"
version: "2.8.5"
description: "The only WhatsApp skill you need. Documentation and API reference — nothing is auto-installed or auto-executed. Claude can send messages, capture leads, run campaigns, schedule reports, and manage clients on your behalf. BizDev agent analyzes account metadata to surface growth opportunities. MCP Server (npx @moltflow/mcp-server@1.0.0) + Custom GPT Actions + 90+ API endpoints. Bulk messaging, scheduled sends, scheduled reports with WhatsApp delivery, AI replies with style cloning, RAG knowledge base, group monitoring, lead scoring, review collection, GDPR compliance, and agent-to-agent protocol."
source: "MoltFlow Team"
risk: safe
homepage: "https://molt.waiflow.app"
requiredEnv:
  - MOLTFLOW_API_KEY
primaryEnv: MOLTFLOW_API_KEY
disable-model-invocation: true
metadata: {"openclaw":{"emoji":"📱","homepage":"https://molt.waiflow.app","requires":{"env":["MOLTFLOW_API_KEY"]},"primaryEnv":"MOLTFLOW_API_KEY"}}
---

# WhatsApp Automation — Mine Groups for Leads

**Thousands of hidden leads are sitting in your WhatsApp groups right now.** Every group participant who isn't in your contacts is a potential client. MoltFlow scans your groups, surfaces untapped contacts, and lets Claude run AI-powered outreach campaigns on your behalf.

**One skill. 90+ endpoints. Zero manual prospecting.**

> **BizDev Growth Agent**: Point Claude at your groups
> and watch it work. It finds unanswered contacts,
> detects buying signals in group conversations, spots
> high-value groups you're not monitoring, and builds
> targeted lead lists — automatically. Your WhatsApp
> groups are a gold mine. Start digging.
>
> **MCP Server + Custom GPT Actions**: Works with Claude Desktop (`npx @moltflow/mcp-server@1.0.0`), Claude.ai (remote MCP), Claude Code (plugin), and ChatGPT (Custom GPT Actions). 22 tools, zero config.

> ***Due to high demand and a recent registration issue, we're offering our top-tier Business plan with unlimited quotas for just $19.90/month on yearly billing — for a limited time only.*** [**Claim the deal**](https://buy.stripe.com/cNifZibX7gpQebJ0nsfnO00)
>
> Free tier available. [Sign up](https://molt.waiflow.app/checkout?plan=free)

---

## Just Ask Claude

Install the skill, set your API key, and start talking:

**"Scan my WhatsApp account for growth opportunities"**

Finds unanswered contacts, unmonitored groups, cold leads.

**"Find cold leads I haven't followed up with"**

Contacts with no reply in 7+ days, plus re-engagement tips.

**"Set up keyword monitoring for my real estate groups"**

Adds keyword triggers, auto-detects leads into your pipeline.

**"Collect customer feedback from my support chats"**

Sentiment analysis, auto-approve positives, export as HTML.

**"Send a promo to my VIP client list every Monday at 9 AM"**

Timezone-aware cron, ban-safe throttling, delivery tracking.

**"Reply to my WhatsApp messages while I'm in meetings"**

Style-matched AI replies from your message history.

---

## Code Samples

### Send a message

```bash
curl -X POST -H "X-API-Key: $MOLTFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid",
    "chat_id": "1234567890@c.us",
    "message": "Hello!"
  }' \
  https://apiv2.waiflow.app/api/v2/messages/send
```

### Bulk broadcast to a contact group

```bash
curl -X POST -H "X-API-Key: $MOLTFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "custom_group_id": "group-uuid",
    "session_id": "uuid",
    "message": "Weekly update..."
  }' \
  https://apiv2.waiflow.app/api/v2/bulk-send
```

### Schedule a recurring message

```bash
curl -X POST -H "X-API-Key: $MOLTFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monday update",
    "session_id": "uuid",
    "chat_id": "123@c.us",
    "message": "...",
    "recurrence": "weekly",
    "scheduled_time": "2026-02-17T09:00:00",
    "timezone": "America/New_York"
  }' \
  https://apiv2.waiflow.app/api/v2/scheduled-messages
```

### Create a scheduled report

```bash
curl -X POST -H "X-API-Key: $MOLTFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Weekly Lead Pipeline",
    "template_id": "lead_pipeline",
    "schedule_type": "weekly",
    "cron_expression": "0 9 * * MON",
    "timezone": "America/New_York",
    "delivery_method": "whatsapp"
  }' \
  https://apiv2.waiflow.app/api/v2/reports
```

### Monitor a group for keywords

```bash
curl -X POST -H "X-API-Key: $MOLTFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid",
    "wa_group_id": "120363012345@g.us",
    "monitor_mode": "keywords",
    "monitor_keywords": ["looking for", "need help", "budget"]
  }' \
  https://apiv2.waiflow.app/api/v2/groups
```

### List new leads

```bash
curl -H "X-API-Key: $MOLTFLOW_API_KEY" \
  "https://apiv2.waiflow.app/api/v2/leads?status=new&limit=50"
```

### Generate an AI reply with style + knowledge base

```bash
curl -X POST -H "X-API-Key: $MOLTFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contact_id": "5511999999999@c.us",
    "context": "Customer asks: What is your return policy?",
    "use_rag": true,
    "apply_style": true
  }' \
  https://apiv2.waiflow.app/api/v2/ai/generate-reply
```

### Create a review collector

```bash
curl -X POST -H "X-API-Key: $MOLTFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer Feedback",
    "session_id": "uuid",
    "source_type": "all",
    "min_sentiment_score": 0.7,
    "include_keywords": ["thank", "recommend", "love"],
    "languages": ["en"]
  }' \
  https://apiv2.waiflow.app/api/v2/reviews/collectors
```

### Discover A2A agents

```bash
curl https://apiv2.waiflow.app/.well-known/agent.json
```

### Create a scoped API key

```bash
curl -X POST -H "X-API-Key: $MOLTFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "outreach-bot",
    "scopes": [
      "messages:send",
      "custom-groups:manage",
      "bulk-send:manage"
    ],
    "expires_in_days": 90
  }' \
  https://apiv2.waiflow.app/api/v2/api-keys
```

### Subscribe to webhook events

Webhook URLs are validated server-side (private IPs and non-HTTPS blocked). Always set a `secret` for HMAC signature verification.

```bash
curl -X POST -H "X-API-Key: $MOLTFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-server.com/webhook",
    "events": [
      "message.received",
      "lead.detected",
      "session.connected"
    ],
    "secret": "whsec_your_secret_here"
  }' \
  https://apiv2.waiflow.app/api/v2/webhooks
```

Full API reference: see each module's SKILL.md.

---

## Use Cases

**Solo Founder / Small Biz**
- Find unanswered leads in your chats
- AI replies in your writing style
- Scheduled promos to custom groups

**Agency / Multi-Client**
- Monitor 50+ groups across 10 sessions
- Bulk send with ban-safe delays
- Export leads as CSV, push to n8n/Zapier

**Marketing Agency / Campaign Manager**
- Capture leads from click-to-WhatsApp ad campaigns
- Auto-qualify inbound leads with keyword detection + AI scoring
- Bulk follow-up sequences with ban-safe throttling
- Multi-session management across client accounts
- Export campaign leads to CRM via webhooks or CSV

**Developer / AI Agent Builder**
- 90+ REST endpoints, scoped API keys
- A2A protocol with E2E encryption
- Python scripts for every workflow ([GitHub](https://github.com/moltflow/moltflow/tree/main/skills/moltflow-clawhub/scripts))

### Guides & Tutorials

**AI Integration Guides:**
- [Connect ChatGPT to MoltFlow](https://molt.waiflow.app/guides/connect-chatgpt-to-moltflow) — Custom GPT Actions, 10 min setup
- [Connect Claude to MoltFlow](https://molt.waiflow.app/guides/connect-claude-to-moltflow) — MCP Server (`npx @moltflow/mcp-server`), 5 min setup
- [Connect OpenClaw to MoltFlow](https://molt.waiflow.app/guides/connect-openclaw-to-moltflow) — Native AI config, 5 min setup

**How-To Guides:**
- [Getting Started](https://molt.waiflow.app/blog/whatsapp-automation-getting-started)
- [API Complete Guide](https://molt.waiflow.app/blog/moltflow-api-complete-guide)
- [n8n Integration](https://molt.waiflow.app/blog/moltflow-n8n-whatsapp-automation)
- [n8n + Google Sheets](https://molt.waiflow.app/blog/n8n-whatsapp-google-sheets)
- [n8n Group Auto-Reply](https://molt.waiflow.app/blog/n8n-whatsapp-group-auto-reply)
- [n8n Lead Pipeline](https://molt.waiflow.app/blog/n8n-whatsapp-lead-pipeline)
- [n8n Multi-Model AI](https://molt.waiflow.app/blog/n8n-multi-model-ai-orchestration)
- [AI Auto-Replies Setup](https://molt.waiflow.app/blog/ai-auto-replies-whatsapp-setup)
- [Group Lead Generation](https://molt.waiflow.app/blog/whatsapp-group-lead-generation-guide)
- [Customer Support](https://molt.waiflow.app/blog/openclaw-whatsapp-customer-support)
- [RAG Knowledge Base](https://molt.waiflow.app/blog/rag-knowledge-base-deep-dive)
- [Style Training](https://molt.waiflow.app/blog/learn-mode-style-training-whatsapp)
- [Lead Scoring](https://molt.waiflow.app/blog/whatsapp-lead-scoring-automation)
- [Feedback Collection](https://molt.waiflow.app/blog/whatsapp-customer-feedback-collection)
- [A2A Protocol](https://molt.waiflow.app/blog/a2a-protocol-agent-communication)
- [Scaling ROI](https://molt.waiflow.app/blog/scaling-whatsapp-automation-roi)

[All guides →](https://molt.waiflow.app/guides)

---

## Platform Features

| Feature | Details |
|---|---|
| Messaging | Text, media, polls, vCards |
| Bulk Send | Ban-safe, SSE progress |
| Scheduled | Cron, timezone-aware |
| Reports | 10 templates, cron, WhatsApp delivery |
| Groups | Custom lists, CSV export |
| Leads/CRM | Auto-detect, pipeline |
| Monitoring | 50+ groups, keywords |
| Labels | Sync to WA Business |
| AI Replies | GPT-4/Claude, RAG |
| Style Clone | Train from your msgs |
| RAG | PDF/TXT, semantic search |
| Voice | Whisper transcription |
| Reviews | Sentiment, auto-approve |
| Anti-Spam | Rate limits, typing sim |
| Safeguards | Block PII, injections |
| Webhooks | HMAC signed, 10+ events |
| A2A | E2E encrypted, JSON-RPC |
| GDPR | Erasure, auto-expiry |
| Billing | Stripe, 4 plans |

---

## How MoltFlow Compares

| | Molt | Alt 1 | Alt 2 | Alt 3 |
|---|:---:|:---:|:---:|:---:|
| Messaging | 18 | 14 | 3 | 1 |
| Groups | 8 | 4 | 0 | 0 |
| Outreach | 7 | 0 | 0 | 0 |
| CRM | 7 | 0 | 0 | 0 |
| AI | 7 | 0 | 0 | 0 |
| Reviews | 8 | 0 | 0 | 0 |
| Security | 10 | 0 | 0 | 0 |
| Platform | 8 | 0 | 0 | 0 |
| **Total** | **80+** | **~15** | **~3** | **~1** |

---

## What This Skill Reads, Writes & Never Does

**Documentation and API reference.** Nothing is
auto-installed or auto-executed. No scripts or
executables are bundled in this package.
All actions require user confirmation.

| Category | What happens | Requires opt-in? |
|---|---|---|
| API calls | HTTPS to `apiv2.waiflow.app` only | No (uses your API key) |
| Chat metadata | Contact names, timestamps, counts | No |
| Message content | 500-char previews only | Yes (chat history gate) |
| BizDev analysis | Aggregate counts, no PII | No |
| Style profiles | Statistical patterns, not raw text | Yes (AI consent) |
| Local file | `.moltflow.json` — counts only, no PII | No |
| API key | Local env var, never logged or shared | No |

**This skill never:**
- Installs packages or runs code automatically
- Reads full message content without tenant opt-in
- Sends messages without explicit user confirmation
- Sends to non-whitelisted numbers (if configured)
- Bypasses anti-spam or content safeguards
- Shares data with third parties
- Stores credentials in files (env vars only)

---

## Setup

> **Free tier available** — 1 session,
> 50 messages/month, no credit card required.

**Env vars:**
- `MOLTFLOW_API_KEY` (required) — from
  [your dashboard](https://molt.waiflow.app)
- `MOLTFLOW_API_URL` (optional) — defaults
  to `https://apiv2.waiflow.app`

**Authentication:**
`X-API-Key: $MOLTFLOW_API_KEY` header
or `Authorization: Bearer $TOKEN` (JWT).

**Base URL:** `https://apiv2.waiflow.app/api/v2`

---

## Security

- **Scoped API keys enforced** — always create a
  key with only the permissions you need
  (e.g., `messages:send`, `leads:read`).
  Never use `["*"]` in production.
- **Chat history requires explicit opt-in** — the
  API enforces a consent gate. Features like
  "scan my chats" or style training will fail
  unless you enable access at Dashboard >
  Settings > Account > Data Access first.
  Disabled by default for GDPR compliance.
- **Use environment variables for keys** — set
  `MOLTFLOW_API_KEY` as an env var, not in
  shared config files. Rotate keys regularly.
- **Phone whitelisting** — configure `allowed_numbers`
  in tenant settings to restrict which numbers can
  send outbound messages. Only whitelisted numbers
  are permitted.
- **Anti-spam safeguards** — all outbound messages
  pass through reciprocity checks (contact must
  message you first), burst rate limiting, typing
  simulation, and random delays. Cannot be bypassed.
- **Content safeguards** — outbound messages are
  scanned for PII, secrets, and prompt injection
  attempts. Blocked automatically before sending.
- **Approval mode** — enable `require_approval` in
  tenant settings to hold all AI-generated messages
  for manual review before delivery.
- **Webhook URL validation** — the API blocks
  private IPs, cloud metadata, and non-HTTPS
  schemes. Only configure endpoints you control.
  Always set a `secret` for HMAC verification
- **Test in a sandbox tenant first** — create a
  short-lived, scoped key for testing. Revoke
  after testing. Never share keys across tenants.

---

## AI Agent Integrations

22 MCP tools for Claude Desktop, Claude.ai,
Claude Code, and OpenAI Custom GPTs.

**User Action Required** — each integration
requires manual setup by the user. No code
is installed automatically by this skill.

See [integrations.md](integrations.md) for
setup instructions and config examples.

---

## Modules

Each module has its own SKILL.md with endpoints
and curl examples.

- **moltflow** (Core) — sessions, messaging,
  groups, labels, webhooks
- **moltflow-outreach** — bulk send,
  scheduled messages, scheduled reports, custom groups
- **moltflow-ai** — style cloning, RAG,
  voice transcription, AI replies
- **moltflow-leads** — lead detection,
  CRM pipeline, bulk ops, export
- **moltflow-a2a** — agent-to-agent protocol,
  encrypted messaging
- **moltflow-reviews** — review collection,
  sentiment analysis, testimonial export
- **moltflow-admin** — auth, API keys,
  billing, usage, GDPR compliance
- **moltflow-onboarding** — BizDev growth agent,
  account scanning, opportunity analysis

---

## Example Scripts

10 standalone Python examples available on GitHub:
[github.com/moltflow/moltflow/tree/main/skills/moltflow-clawhub/scripts](https://github.com/moltflow/moltflow/tree/main/skills/moltflow-clawhub/scripts)

- `quickstart.py` — create session, send first message
- `send_message.py` — send text messages to contacts
- `outreach.py` — bulk send, scheduled messages
- `leads.py` — lead pipeline, bulk ops, export
- `ai_config.py` — train style profiles, AI replies
- `reviews.py` — create collectors, export testimonials
- `group_monitor.py` — group monitoring & leads
- `a2a_client.py` — discover agents, send A2A messages
- `admin.py` — login, create API keys, billing
- `gdpr.py` — contact erasure, data export

Scripts are **not bundled** in this package. Download
from GitHub, review the source, then run manually:
`MOLTFLOW_API_KEY=key python quickstart.py`

---

## Notes

- Anti-spam on all messages (typing, random delays)
- Sessions require QR code pairing on first connect
- Use E.164 phone format without `+`
- AI features and A2A require Pro plan or above
- Rate limits: Free 10, Starter 20, Pro 40, Biz 60/min

---

## Changelog

**v2.8.5** (2026-02-14) -- See [CHANGELOG.md](CHANGELOG.md) for full history.

<!-- FILEMAP:BEGIN -->
```text
[moltflow file map]|root: .
|.:{SKILL.md,CHANGELOG.md,integrations.md,package.json}
|moltflow:{SKILL.md}
|moltflow-ai:{SKILL.md}
|moltflow-a2a:{SKILL.md}
|moltflow-reviews:{SKILL.md}
|moltflow-outreach:{SKILL.md}
|moltflow-leads:{SKILL.md}
|moltflow-admin:{SKILL.md}
|moltflow-onboarding:{SKILL.md}
```
<!-- FILEMAP:END -->
