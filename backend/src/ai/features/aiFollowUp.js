import { callGroq } from "../groqClient.js";

export async function generateFollowUpMessage(conversationHistory, inactiveDuration) {
  let context = "";
  if (inactiveDuration === "24 hours") context = "Friendly reminder";
  else if (inactiveDuration === "72 hours") context = "Value proposition";
  else if (inactiveDuration === "7 days") context = "Last follow-up";

  const systemPrompt = `You are an AI Follow-Up Automator. Generate a personalized follow-up message for a lead that has been inactive for ${inactiveDuration}.
Context for this message: ${context}.

Based on the conversation history, generate a highly converting follow-up message.

Output strictly valid JSON with a single key 'message'.
Example: {"message": "Hi there, just checking in to see if you had any more questions about our pricing?"}`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Conversation History:\n${conversationHistory.join("\n")}` }
  ];

  return await callGroq(messages, true);
}
