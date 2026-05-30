import { callGroq } from "../groqClient.js";

export async function generateCrmRecommendation(customerMessages) {
  const systemPrompt = `You are a Smart CRM Assistant. After analyzing a conversation, generate a recommended action for the sales team.

Recommendations can be: Schedule Demo, Call Lead, Send Proposal, Send Case Study, Wait 2 Days.
Priority Level: High, Medium, Low

Generate a JSON output with:
- recommendation: The recommended action
- priority: Priority Level
- reason: A short reason explaining the recommendation (Sales Notes)

Output strictly valid JSON. Do not include markdown formatting.
Example: {"recommendation": "Schedule Demo", "priority": "High", "reason": "Customer requested pricing and implementation timeline."}`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Conversation:\n${customerMessages.join("\n")}` }
  ];

  return await callGroq(messages, true);
}
