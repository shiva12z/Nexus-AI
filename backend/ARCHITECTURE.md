# NexusAI Backend — System Architecture

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  Next.js Dashboard │ Web Chat Widget │ WhatsApp │ IG │ FB       │
└─────────┬───────────────────┬──────────────────────────────────┘
          │ REST + JWT          │ Webhooks
          ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                     EXPRESS API (port 4000)                      │
│  ┌──────────┐ ┌──────────────┐ ┌───────────┐ ┌───────────────┐  │
│  │   Auth   │ │ Conversations│ │   Leads   │ │  Analytics    │  │
│  └──────────┘ └──────────────┘ └───────────┘ └───────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              MESSAGE ENGINE (orchestrator)                │   │
│  │  receive → store → AI → reply → lead → workflow → emit   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────┬───────────────────┬───────────────────┬───────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐  ┌──────────────┐  ┌─────────────────────┐
│ Supabase PG     │  │ OpenAI API   │  │ External Integrations│
│ + pgvector RAG  │  │ chat+embed   │  │ Twilio, Meta, Resend │
└─────────────────┘  └──────────────┘  │ Google Sheets        │
          ▲                             └─────────────────────┘
          │ Socket.io (realtime)
          └──────── Dashboard clients
```

## Module Responsibilities

### `services/messageEngine.js`
Central orchestrator. All channels funnel through `handleInboundMessage()`.

### `ai/`
- **replyGenerator** — GPT completion with RAG context
- **embeddingService** — chunk + embed + store
- **vectorSearch** — pgvector similarity via `match_embeddings` RPC
- **promptManager** — system prompts, lead extraction prompts

### `workflows/engine.js`
JSON-defined automations. Triggers: `message_received`, `new_lead`, `booking_created`.

### `webhooks/`
Channel-specific parsers. No JWT — signature validation only.

## Security Model

| Layer | Mechanism |
|-------|-----------|
| API routes | Bearer JWT, team-scoped queries |
| Webhooks | Twilio signature / Meta HMAC |
| Roles | admin, sales, support |
| Rate limits | 300/15min API, 20/15min auth |

## Multi-Tenancy

Every table includes `team_id`. JWT payload carries `teamId`. Webhooks use `DEFAULT_TEAM_ID` env (MVP) — production maps Twilio numbers → teams in `integrations` table.

## Scalability Notes (post-MVP)

- Queue inbound processing (BullMQ / SQS)
- Separate webhook workers
- Redis for Socket.io adapter
- Encrypt `integrations.credentials_encrypted` with KMS
