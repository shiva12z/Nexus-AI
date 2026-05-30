# Backend - AI Multi Channel Auto Reply, Calls & Business Automation Platform

This directory contains the backend for the AI-powered omnichannel conversational automation platform.

## Architecture
The backend is built using Express (Node.js) and interfaces with Supabase (PostgreSQL), Groq (for ultra-fast AI inference), OpenAI (for RAG), Twilio (for calls and WhatsApp), and Meta Webhooks (Instagram/Facebook). 

```
backend/src/
├── config/          # Env + Supabase clients
├── database/        # PostgreSQL schema (Supabase) + ai_schema.sql
├── middleware/      # Auth, rate limit, webhooks, errors
├── routes/          # REST API routers
├── controllers/     # Request handlers
├── services/        # Business logic
├── ai/              # GroqClient, OpenAI, RAG, embeddings
│   └── features/    # AI Features: Lead Scoring, Sentiment, CRM, Auto-Responder, Appointments

├── workflows/       # JSON workflow engine
├── webhooks/        # WhatsApp, Meta, Web Chat
├── sockets/         # Realtime (Socket.io)
├── integrations/    # Twilio, Meta, Google Sheets
├── notifications/   # Email + in-app
└── app.js           # Express entry
```

## Database Setup

1. Create a Supabase project.
2. Run `src/database/schema.sql` in the SQL Editor.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`.

## Backend Setup Instructions

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   # Fill in Supabase, OpenAI, and Twilio credentials
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the backend development server:**
   ```bash
   npm run dev
   ```

   The API will run at `http://localhost:4000/api`  
   WebSocket server will run at `http://localhost:4000`

## API Usage Information

The REST API provides comprehensive endpoints for managing the platform. All protected endpoints require a JWT Bearer token obtained from login.

### Authentication
- `POST /api/auth/signup`: Register a new team and admin user. Returns JWT and user info.
- `POST /api/auth/login`: Authenticate with email/password. Returns JWT for subsequent requests.

### Unified Inbox & Conversations
- `GET /api/conversations`: Fetch all active conversations across channels. Supports query parameters for filtering by channel, status, or assignee.
- `GET /api/conversations/:id/messages`: Retrieve message history for a specific conversation.
- `POST /api/conversations/:id/messages`: Send a manual reply as an agent. The payload should include the message content and type.
- `PATCH /api/conversations/:id/assign`: Assign a conversation to a specific team member.
- `PATCH /api/conversations/:id/status`: Update conversation status (e.g., open, closed, snoozed).

### CRM & Data Collection
- `GET /api/leads`: Fetch the list of leads captured from conversations.
- `POST /api/leads`: Manually add or update a lead profile.
- `GET /api/bookings`: Retrieve calendar bookings and scheduled appointments.
- `POST /api/bookings`: Create a new manual booking.

### Knowledge Base & AI
- `GET /api/knowledge-base`: List all documents and sources used for RAG training.
- `POST /api/knowledge-base/upload`: Upload a new document or text snippet to train the AI Response Engine.

### Workflows & Automation
- `GET /api/workflows`: List automated workflows (e.g., out-of-office replies, auto-assign rules).
- `POST /api/workflows`: Create a new automation JSON workflow.

### Analytics & Notifications
- `GET /api/analytics/dashboard`: Retrieve KPI statistics, message volume, and AI resolution rates.
- `GET /api/notifications`: Get in-app notifications (e.g., new unassigned conversations, system alerts).
- `PATCH /api/notifications/:id/read`: Mark a notification as read.

## Webhooks

Ensure `DEFAULT_TEAM_ID` is set to your team's UUID in the `.env` to route webhooks correctly during local testing.

| Channel | Webhook URL Endpoint | Description |
|---------|----------------------|-------------|
| WhatsApp (Twilio) | `POST /api/webhooks/whatsapp` | Receives incoming messages & status updates |
| Instagram/Facebook | `GET/POST /api/webhooks/meta` | Handles Meta verify tokens and incoming DMs/comments |
| Website Chat | `POST /api/webhooks/webchat/message` | Custom integration for the React web widget |

## Deployment

For production deployments (e.g., Railway, Render):
```bash
npm start
```
Make sure all required environment variables are set in your provider's dashboard.
