import { callGroq } from "../ai/groqClient.js";
import { config } from "../config/index.js";

function cleanMarkdown(text) {
  if (!text) return text;
  // Strip double asterisks (bold markdown) entirely for raw text UI rendering
  return text.replace(/\*\*(.*?)\*\*/g, "$1");
}

export async function handleAssistantChat(req, res, next) {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: { message: "Message is required" } });
    }

    // Optionally format history from the client to match Groq's message format
    const messages = [
      {
        role: "system",
        content: `You are the NexusAI Assistant. You are a helpful, professional AI assistant for the NexusAI platform user. 
NexusAI is an omnichannel conversational automation platform for SMBs. You help users manage conversations, analyze performance, and understand the platform.
Be concise, friendly, and helpful.`,
      },
      ...history,
      {
        role: "user",
        content: message,
      }
    ];

    try {
      const responseText = await callGroq(messages, false);
      const reply = responseText || "I'm sorry, I couldn't process that.";
      res.json({ data: { text: cleanMarkdown(reply) } });
    } catch (err) {
      console.warn("[assistantController] OpenAI chat completion failed, using intelligent rule-based fallback:", err.message);
      
      const msg = message.toLowerCase();
      let reply = "";
      
      if (msg.includes("hour") || msg.includes("time") || msg.includes("when are you open")) {
        reply = "Our business hours are Monday through Friday, 9:00 AM to 6:00 PM EST. You can adjust these settings at any time in the Settings panel to control when the AI should auto-reply or escalate to your human team.";
      } else if (msg.includes("train") || msg.includes("knowledge") || msg.includes("rag")) {
        reply = "You can train your NexusAI agent by uploading documents (like PDFs, TXT, or docx) or inputting text FAQs in the Knowledge Base section. The AI automatically parses these documents, generates embeddings, and stores them in your Supabase database. When a customer asks a question, the agent performs a real-time semantic search to retrieve the most relevant information and answer with high confidence.";
      } else if (msg.includes("lead") || msg.includes("top lead")) {
        reply = "Your AI is automatically capturing leads from active customer conversations! In your Leads panel, you can see all captured leads categorized by their score, intent, and channel. To see the top leads, sort by Lead Score—leads with an 'appointment' or 'purchase' intent get the highest score (75+), indicating they are hot prospects ready for human follow-up.";
      } else if (msg.includes("response rate") || msg.includes("analytics") || msg.includes("performance")) {
        reply = "You can view detailed performance analytics on the Dashboard overview. This includes metrics such as:\n\n• Total Conversations: The sum of all active customer threads across channels.\n• AI Response Rate: The percentage of messages handled autonomously by your AI agent.\n• Lead Conversion: The number of chats successfully converted into scored leads.\n\nYou can also view message volume charts to trace peak customer engagement times!";
      } else if (msg.includes("template") || msg.includes("whatsapp template") || msg.includes("write")) {
        reply = "Here's an AI-optimized WhatsApp template you can use to follow up with hot leads captured by your assistant:\n\n\"Hi {{name}}! 👋 This is {{agent_name}} from {{business_name}}. I saw you were interested in our {{intent}} plan earlier today. I'd be happy to schedule a quick 10-minute demo to show you how we can help. Would tomorrow at 2:00 PM work for you?\"\n\nYou can customize this in the Templates section of your dashboard!";
      } else {
        reply = `Hello! I'm your NexusAI assistant. Currently, our premium OpenAI API service is experiencing a high volume of requests (or quota limits), but I can still assist you with platform help! 

Here are some things you can ask me about:
• "How does the AI training work?" (Learn to upload training documents)
• "What's our AI response rate today?" (Understand analytics)
• "Help me write a WhatsApp template" (Get optimized marketing templates)
• "Show me our top leads" (Understand lead scoring)`;
      }

      res.json({ data: { text: cleanMarkdown(reply) } });
    }
  } catch (error) {
    next(error);
  }
}

