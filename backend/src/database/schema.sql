-- NexusAI — Supabase PostgreSQL Schema
-- Run in Supabase SQL Editor. Enable pgvector: CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- TEAMS & USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  plan TEXT DEFAULT 'growth',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'support' CHECK (role IN ('admin', 'sales', 'support')),
  avatar_url TEXT,
  status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'away', 'offline')),
  supabase_auth_id UUID,
  last_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_team ON users(team_id);
CREATE INDEX idx_users_email ON users(email);

-- ============================================================
-- CONVERSATIONS & MESSAGES (Unified Inbox)
-- ============================================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'instagram', 'facebook', 'webchat')),
  external_id TEXT,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'human', 'archived')),
  ai_handled BOOLEAN DEFAULT true,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, channel, external_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'ai', 'agent', 'system')),
  sender_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  body TEXT NOT NULL,
  channel TEXT NOT NULL,
  ai_generated BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
  external_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversations_team ON conversations(team_id);
CREATE INDEX idx_conversations_status ON conversations(team_id, status);
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  source_channel TEXT,
  intent TEXT,
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'escalated', 'converted', 'lost')),
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_team ON leads(team_id);
CREATE INDEX idx_leads_status ON leads(team_id, status);

-- ============================================================
-- BOOKINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  meeting_type TEXT DEFAULT 'consultation',
  channel TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_team ON bookings(team_id, scheduled_at);

-- ============================================================
-- KNOWLEDGE BASE + RAG (pgvector)
-- ============================================================
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('faq', 'pdf', 'web', 'text')),
  source_url TEXT,
  file_path TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'training', 'trained', 'failed')),
  chunk_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  knowledge_id UUID NOT NULL REFERENCES knowledge_base(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  embedding vector(1536),
  chunk_index INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_embeddings_team ON embeddings(team_id);
CREATE INDEX idx_embeddings_knowledge ON embeddings(knowledge_id);
-- Vector similarity search index (IVFFlat — build after data exists)
-- CREATE INDEX idx_embeddings_vector ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ============================================================
-- WORKFLOWS
-- ============================================================
CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('message_received', 'new_lead', 'booking_created', 'human_escalation')),
  trigger_config JSONB DEFAULT '{}',
  actions JSONB NOT NULL DEFAULT '[]',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'draft')),
  run_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('lead', 'booking', 'human', 'ai', 'system')),
  title TEXT NOT NULL,
  description TEXT,
  read BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, read, created_at DESC);

-- ============================================================
-- ANALYTICS EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  channel TEXT,
  value NUMERIC,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_team ON analytics_events(team_id, event_type, created_at DESC);

-- ============================================================
-- INTEGRATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  status TEXT DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'error')),
  credentials_encrypted TEXT,
  config JSONB DEFAULT '{}',
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, provider)
);

-- ============================================================
-- AI SETTINGS (per team)
-- ============================================================
CREATE TABLE IF NOT EXISTS ai_settings (
  team_id UUID PRIMARY KEY REFERENCES teams(id) ON DELETE CASCADE,
  persona_name TEXT DEFAULT 'Nexus Assistant',
  system_prompt TEXT,
  model TEXT DEFAULT 'gpt-4o-mini',
  temperature NUMERIC DEFAULT 0.7,
  escalation_sensitivity TEXT DEFAULT 'medium',
  auto_reply_enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RPC: Vector similarity search
-- ============================================================
CREATE OR REPLACE FUNCTION match_embeddings(
  query_embedding vector(1536),
  match_team_id UUID,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  knowledge_id UUID,
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.id,
    e.knowledge_id,
    e.content,
    1 - (e.embedding <=> query_embedding) AS similarity
  FROM embeddings e
  WHERE e.team_id = match_team_id
    AND e.embedding IS NOT NULL
  ORDER BY e.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
