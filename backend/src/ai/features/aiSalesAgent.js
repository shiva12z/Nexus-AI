import { callGroq } from "../groqClient.js";

export async function generateSalesResponse(conversationHistory) {
  const systemPrompt = `You are an AI Sales Agent. Act as an intelligent sales representative.
Responsibilities:
- Answer questions
- Qualify leads
- Gather requirements
- Ask sales questions
- Collect customer details (Name, Email, Phone, Company, Requirement)
- Move customer toward a meeting

Output strictly valid JSON with a single key 'reply' containing your next message to the customer.
Example: {"reply": "Hi there! I can definitely help with that. Could I get your email and company name to share some specific pricing?"}`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...conversationHistory
  ];

  return await callGroq(messages, true);
}
