# NexusAI Context Graph & Implementation Plan

A startup-grade SaaS platform that combines WhatsApp, Instagram, Facebook Messenger automation, live chat, AI replies, unified inbox, lead capture, bookings, analytics, and CRM.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| **Frontend** | Next.js 16 (App Router), TailwindCSS v4, Framer Motion, Recharts |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | Supabase PostgreSQL + pgvector |
| **Auth** | JWT + Supabase Auth (ready) |
| **AI** | OpenAI API (GPT-4o-mini + embeddings) |
| **Messaging** | Twilio WhatsApp, Meta Graph API |
| **Email** | Resend |
| **CRM Export** | Google Sheets API |
| **Deploy** | Vercel (frontend) + Railway/Render (backend) |

---

## Project Structure

```
nexusai/
├── app/                          # Next.js frontend [COMPLETE — UI]
├── components/
│   ├── landing/                  # Marketing site [COMPLETE]
│   └── dashboard/                # Dashboard shell + Toast [COMPLETE]
├── lib/
│   ├── mock-data.ts              # Mock data (replace with API calls)
│   └── utils.ts
├── backend/                      # Express API [COMPLETE — scaffold]
│   ├── src/
│   │   ├── app.js                # Server + Socket.io entry
│   │   ├── config/               # Env, Supabase client
│   │   ├── database/schema.sql   # Full PostgreSQL schema + pgvector
│   │   ├── middleware/           # Auth, rate limit, webhooks, errors
│   │   ├── routes/               # REST routers
│   │   ├── controllers/          # HTTP handlers
│   │   ├── services/             # Business logic
│   │   ├── ai/                   # OpenAI, RAG, embeddings, prompts
│   │   ├── workflows/            # JSON workflow engine
│   │   ├── webhooks/             # WhatsApp, Meta, Web Chat
│   │   ├── sockets/              # Realtime inbox/events
│   │   ├── integrations/       # Twilio, Meta, Google Sheets
│   │   ├── notifications/        # Email + in-app
│   │   └── utils/
│   ├── package.json
│   ├── .env.example
│   └── README.md
└── context_graph.md                # This file
```

---

## Backend Architecture (COMPLETE)

### Core Modules

| Module | Path | Status |
|--------|------|--------|
| Auth (JWT, roles) | `services/authService.js`, `routes/auth.routes.js` | ✅ |
| Unified Message Engine | `services/messageEngine.js` | ✅ |
| WhatsApp Webhooks | `webhooks/whatsapp.webhook.js`, `integrations/twilioWhatsApp.js` | ✅ |
| Meta Webhooks (IG/FB) | `webhooks/meta.webhook.js`, `integrations/metaMessenger.js` | ✅ |
| Web Chat | `webhooks/webchat.webhook.js` | ✅ |
| AI Response Engine | `ai/replyGenerator.js`, `ai/promptManager.js`, `ai/contextBuilder.js` | ✅ |
| Knowledge Base + RAG | `ai/embeddingService.js`, `ai/vectorSearch.js`, `services/knowledgeService.js` | ✅ |
| Lead Capture | `services/leadService.js`, `utils/leadExtractor.js` | ✅ |
| Booking System | `services/bookingService.js` | ✅ |
| Workflow Engine | `workflows/engine.js` | ✅ |
| Notifications | `notifications/service.js`, `notifications/email.js` | ✅ |
| Analytics | `services/analyticsService.js` | ✅ |
| Google Sheets Export | `integrations/googleSheets.js` | ✅ |
| Realtime (Socket.io) | `sockets/index.js` | ✅ |

### Database Tables

`teams`, `users`, `conversations`, `messages`, `leads`, `bookings`, `knowledge_base`, `embeddings`, `notifications`, `workflows`, `analytics_events`, `integrations`, `ai_settings`

Schema: `backend/src/database/schema.sql`

### API Endpoints

| Prefix | Routes |
|--------|--------|
| `/api/auth` | signup, login, me, team |
| `/api/conversations` | list, get, send message, assign, status |
| `/api/leads` | list, update |
| `/api/bookings` | list, create, slots |
| `/api/analytics` | dashboard, message-volume |
| `/api/knowledge-base` | CRUD + train |
| `/api/workflows` | list, create, update |
| `/api/notifications` | list, mark-all-read |
| `/api/integrations` | list, connect |
| `/api/webhooks/whatsapp` | Twilio inbound |
| `/api/webhooks/meta` | Meta verify + inbound |
| `/api/webhooks/webchat` | Live chat widget |

### Inbound Message Flow

```
Channel Webhook → messageEngine.handleInboundMessage()
  → store user message
  → AI reply (RAG + OpenAI)
  → send channel reply (Twilio/Meta)
  → lead capture
  → workflow triggers
  → Socket.io emit to dashboard
```

---

## Frontend Status

### Completed ✅
- Landing page (all sections)
- Dashboard (16 pages, mock data)
- Responsive mobile sidebar + grids
- Toast notifications, modals, page transitions

### Pending
- [ ] Connect frontend to `backend` APIs (replace `lib/mock-data.ts`)
- [ ] Socket.io client in inbox for live updates
- [ ] `npm run build` — fix remaining TS errors (FeaturesGrid ease type)
- [ ] Supabase: run `schema.sql`, set env vars, seed default team

---

## MVP Hackathon Priority

| Priority | Feature | Backend | Frontend |
|----------|---------|---------|----------|
| P0 | WhatsApp webhook + AI reply | ✅ | UI ready |
| P0 | Unified inbox APIs | ✅ | Mock data |
| P0 | Lead capture | ✅ | Mock data |
| P0 | Notifications | ✅ | Mock data |
| P0 | Dashboard analytics APIs | ✅ | Mock data |
| P1 | Web chat widget | ✅ | Needs widget |
| P2 | Instagram/Facebook | ✅ (mock-friendly) | Mock UI |
| P2 | Voice AI | — | Mock UI |
| P2 | Workflow builder UI | API only | Mock UI |

---

## Environment Setup

### Backend (`backend/.env`)
```bash
PORT=4000
JWT_SECRET=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENAI_API_KEY=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
DEFAULT_TEAM_ID=<uuid-after-seed>
```

### Run
```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — Backend
cd backend && npm install && npm run dev
```

---

## Verification Plan

### Backend
- `GET /api/health` — server up
- `POST /api/auth/signup` — create team
- `POST /api/webhooks/webchat/message` — AI reply without Twilio
- Configure Twilio webhook → `POST /api/webhooks/whatsapp`

### Frontend
- `npm run build`
- Mobile viewport: sidebar collapse, table scroll
- All 16 dashboard routes load

---

## Changelog

| Date | Step | Update |
|------|------|--------|
| — | Frontend scaffold | Landing + 16 dashboard pages |
| — | Responsive polish | Mobile sidebar, grids, toasts, modals |
| — | **Backend architecture** | Full Express modular API, schema, AI/RAG, webhooks, sockets |
