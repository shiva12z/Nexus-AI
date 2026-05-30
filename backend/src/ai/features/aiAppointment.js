import { callGroq } from "../groqClient.js";

export async function detectAppointmentIntent(customerMessages) {
  const systemPrompt = `You are an AI Appointment Setter. Analyze the following conversation.
Detect if the customer shows buying intent for a meeting/call. Look for keywords like: pricing, demo, consultation, call, meeting, interested.
If detected, extract any provided date, time, or email for the meeting.

Generate a JSON output with:
- hasIntent: boolean
- date: string (if provided, else null)
- time: string (if provided, else null)
- email: string (if provided, else null)

Output strictly valid JSON. Do not include markdown formatting.
Example: {"hasIntent": true, "date": "tomorrow", "time": "2pm", "email": "customer@example.com"}`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Conversation:\n${customerMessages.join("\n")}` }
  ];

  return await callGroq(messages, true);
}
