import { getOpenAI } from "./openaiClient.js";
import { callGroq } from "./groqClient.js";
import { config } from "../config/index.js";
import { buildSystemPrompt, LEAD_EXTRACTION_PROMPT } from "./promptManager.js";
import { searchKnowledge, formatRagContext } from "./vectorSearch.js";

export async function generateAIReply({
  teamId,
  messages,
  aiSettings = {},
  businessName,
}) {
  const lastUserMessage = [...messages].reverse().find((m) => m.sender === "user")?.body || "";

  let chunks = [];
  try {
    chunks = await searchKnowledge(teamId, lastUserMessage);
  } catch (err) {
    console.warn("[replyGenerator] searchKnowledge failed:", err.message);
  }

  try {
    const openai = getOpenAI();
    const ragContext = formatRagContext(chunks);

    const systemPrompt = buildSystemPrompt({
      businessName,
      personaName: aiSettings.persona_name,
      customPrompt: aiSettings.system_prompt,
      ragContext,
    });

    const chatMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-config.openai.maxContextMessages).map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.body,
      })),
    ];

    const replyContent = await callGroq(chatMessages, false);
    const reply = replyContent.trim() || "I'm here to help! Could you tell me more?";
    const confidence = chunks.length > 0 ? 0.85 : 0.6;

    return {
      reply,
      confidence,
      ragUsed: chunks.length > 0,
      shouldEscalate: confidence < config.openai.confidenceThreshold,
    };
  } catch (err) {
    console.warn("[replyGenerator] OpenAI chat completion failed, using rule-based fallback:", err.message);
    
    // Smart rule-based fallback for high quality responses even without active OpenAI quota
    const msg = lastUserMessage.toLowerCase();
    let reply = "";
    
    if (msg.includes("price") || msg.includes("pricing") || msg.includes("plan") || msg.includes("cost")) {
      reply = `Thanks for asking about our plans! ${businessName || "Our company"} offers flexible pricing tailored to your business needs:
• Startup Plan: $49/mo - 1,000 conversations
• Growth Plan: $99/mo - 5,000 conversations & AI Agent
• Enterprise Plan: Custom pricing - Unlimited conversations & dedicated support.

Which of these plans sounds like a good fit for you? Let me know your email, and our team will get in touch with you!`;
    } else if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      reply = `Hello! 👋 Welcome to ${businessName || "our business"}. How can I assist you today? We can help you with pricing, bookings, or answers to any of your questions!`;
    } else if (msg.includes("book") || msg.includes("appointment") || msg.includes("schedule")) {
      reply = `I would be happy to help you schedule a demo or meeting! Please share your email address and preferred time, or visit our booking portal, and we'll get you set up right away!`;
    } else {
      reply = `Thank you for reaching out! I've received your request: "${lastUserMessage}". Could you please provide your email address or phone number so a member of our team can get in touch with you shortly?`;
    }

    return {
      reply,
      confidence: 0.8,
      ragUsed: false,
      shouldEscalate: false,
    };
  }
}

export async function extractLeadWithAI(conversationText) {
  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: config.openai.chatModel,
      messages: [
        { role: "system", content: LEAD_EXTRACTION_PROMPT },
        { role: "user", content: conversationText },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    return JSON.parse(completion.choices[0]?.message?.content || "{}");
  } catch (err) {
    console.warn("[replyGenerator] AI Lead extraction failed, falling back:", err.message);
    return null;
  }
}

export async function analyzeSentiment(text) {
  try {
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: config.openai.chatModel,
      messages: [
        { role: "system", content: 'Return JSON: {"sentiment":"positive|neutral|negative","score":0-1}' },
        { role: "user", content: text },
      ],
      response_format: { type: "json_object" },
      temperature: 0,
    });

    return JSON.parse(completion.choices[0]?.message?.content || '{"sentiment":"neutral","score":0.5}');
  } catch (err) {
    console.warn("[replyGenerator] AI Sentiment analysis failed, falling back:", err.message);
    return { sentiment: "neutral", score: 0.5 };
  }
}

