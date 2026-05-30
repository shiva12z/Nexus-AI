import { callGroq } from "../groqClient.js";

export async function analyzeSentiment(customerMessages) {
  const systemPrompt = `You are an AI Sentiment Analyzer. Analyze the following customer conversation.
Generate a JSON output with:
- sentiment: "positive", "neutral", "negative", "frustrated", or "urgent"
- confidence: integer from 0 to 100 representing confidence in classification

Output strictly valid JSON. Do not include markdown formatting.
Example: {"sentiment": "urgent", "confidence": 94}`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Conversation:\n${customerMessages.join("\n")}` }
  ];

  return await callGroq(messages, true);
}
