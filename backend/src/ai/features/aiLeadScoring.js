import { callGroq } from "../groqClient.js";

export async function scoreLead(customerMessages) {
  const systemPrompt = `You are an AI Lead Scorer. Analyze the following customer conversation.
Generate a JSON output with:
- score: Lead Score (0-100) based on interest and qualification
- intent: Intent Level ("high", "medium", "low")
- reason: A short reason explaining the score and intent

Output strictly valid JSON. Do not include markdown formatting.
Example: {"score": 92, "intent": "high", "reason": "Customer asked for pricing and a demo."}`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Conversation:\n${customerMessages.join("\n")}` }
  ];

  return await callGroq(messages, true);
}
