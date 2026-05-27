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
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For backend setup, please refer to `backend/README.md`.
