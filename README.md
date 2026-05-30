# AI Multi Channel Auto Reply, Calls & Business Automation Platform

## Problem Statement
Businesses receive customer enquiries across WhatsApp, Instagram, Facebook, LinkedIn, phone calls, websites, and other platforms. Managing conversations manually causes delayed responses, missed leads, inconsistent communication, and poor customer experience. Companies need a unified conversational AI system capable of handling messages, voice calls, collecting data, booking appointments, and answering queries automatically.

## Solution
Build a unified conversational AI platform with: 
- WhatsApp Automation
- Instagram Auto Reply
- Facebook Inbox Automation
- LinkedIn Messaging Automation
- AI Voice Call Automation
- Unified Inbox
- AI Response Engine
- Knowledge Base Training
- Lead Capture
- Booking Management
- Customer Data Collection
- Sheet Export
- CRM Integration
- Analytics Dashboard
- Notifications
- Team Assignment
- Workflow Automation

## 🚀 Latest Features (v2)
- **Ultra-Fast Groq API Integration**: Powered by Llama-3-8b-8192 on LPUs for instant AI inference.
- **Unified AI Intelligence Sidebar**: Seamless, responsive UI with nested flexbox fixes for perfect layout rendering.
- **Real-Time AI Lead Scoring**: Automatically extracts customer purchase intent and assigns scores (0-100).
- **Sentiment Analysis Engine**: Categorizes customer mood (positive, urgent, frustrated) to prioritize responses.
- **Next Action CRM Recommendations**: Tells human agents exactly what to do next based on conversation context.
- **Automated AI Sales Agent**: Drafts and sends sales-optimized replies autonomously via webhooks.
- **Smart Appointment Setter**: Extracts dates/times from chat and automatically books calendar appointments.
- **Follow-Up Automation**: Automatically revives stale, high-intent leads.
- **Custom AI Database Schema**: Dedicated PostgreSQL tables (`lead_scores`, `sentiments`, `crm_recommendations`) for persistent intelligence.

## Approach Integrated
This platform utilizes a robust tech stack, featuring Next.js (React) for the frontend to provide a highly interactive unified inbox and analytics dashboard. The backend is built with Express.js (Node.js) to handle complex integrations with WhatsApp, Meta, Twilio, and OpenAI for the conversational AI engine. We use Supabase (PostgreSQL) for secure, scalable data storage and real-time synchronization, allowing team members to view and assign conversations instantly. RAG (Retrieval-Augmented Generation) is integrated for the AI Knowledge Base to answer customer queries based on uploaded business data.

## Frontend Setup Instructions

This is a Next.js project bootstrapped with `create-next-app`.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Copy the example environment file and fill in your details (e.g., Supabase URLs and Anon Keys).
   ```bash
   cp .env.local.example .env.local
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or yarn dev / pnpm dev
   ```

4. **Access the application:**
   Open [https://nexus-ai-gilt-two.vercel.app/](https://nexus-ai-gilt-two.vercel.app/) with your browser to see the result.

For backend setup, please refer to `backend/README.md`.
