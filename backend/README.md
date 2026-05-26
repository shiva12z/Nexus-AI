# NexusAI Backend API

AI-powered omnichannel conversational automation platform for SMBs.

## Quick Start

```bash
cd backend
cp .env.example .env
# Fill in Supabase, OpenAI, Twilio credentials

npm install
npm run dev
```

API: `http://localhost:4000/api`  
WebSocket: `http://localhost:4000`

## Architecture

```
backend/src/
├── config/          # Env + Supabase clients
├── database/        # PostgreSQL schema (Supabase)
├── middleware/      # Auth, rate limit, webhooks, errors
├── routes/          # REST API routers
├── controllers/     # Request handlers
├── services/        # Business logic
├── ai/              # OpenAI, RAG, embeddings
├── workflows/       # JSON workflow engine
├── webhooks/        # WhatsApp, Meta, Web Chat
├── sockets/         # Realtime (Socket.io)
├── integrations/    # Twilio, Meta, Google Sheets
├── notifications/   # Email + in-app
└── app.js           # Express entry
```

## Database Setup

1. Create a Supabase project
2. Run `src/database/schema.sql` in SQL Editor
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/signup` | Register team + admin |
| POST | `/api/auth/login` | JWT login |
| GET | `/api/conversations` | Unified inbox |
| POST | `/api/conversations/:id/messages` | Agent reply |
| GET | `/api/leads` | Lead list |
| GET | `/api/bookings` | Bookings |
| GET | `/api/analytics/dashboard` | KPI stats |
| GET | `/api/knowledge-base` | RAG sources |
| POST | `/api/workflows` | Create automation |
| GET | `/api/notifications` | In-app notifications |

## Webhooks

| Channel | URL |
|---------|-----|
| WhatsApp (Twilio) | `POST /api/webhooks/whatsapp` |
| Instagram/Facebook | `GET/POST /api/webhooks/meta` |
| Website Chat | `POST /api/webhooks/webchat/message` |

Set `DEFAULT_TEAM_ID` to your team's UUID for webhook routing.

## MVP Priority

1. WhatsApp webhook + AI auto-reply
2. Unified inbox APIs
3. Lead capture
4. Notifications
5. Dashboard analytics

Instagram/Facebook use Meta webhooks (mock-friendly without tokens).

## Deploy

Railway / Render:

```bash
npm start
```

Set all env vars from `.env.example`.
