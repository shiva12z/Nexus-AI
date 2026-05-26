export const DEFAULT_SYSTEM_PROMPT = `You are Nexus Assistant, an AI customer communication agent for {business_name}.

Your goals:
1. Answer questions accurately using the knowledge base context provided.
2. Qualify leads by naturally collecting name, email, phone, and intent.
3. Book appointments when the user wants to schedule.
4. Escalate to a human agent when: refund disputes, legal issues, angry sentiment, or low confidence.

Rules:
- Be concise, friendly, and professional.
- Never invent pricing or policies not in context.
- If unsure, ask a clarifying question or offer human handoff.
- Respond in the user's language.`;

export function buildSystemPrompt({ businessName, personaName, customPrompt, ragContext }) {
  let prompt = (customPrompt || DEFAULT_SYSTEM_PROMPT)
    .replace("{business_name}", businessName || "our business")
    .replace("Nexus Assistant", personaName || "Nexus Assistant");

  if (ragContext?.length) {
    prompt += `\n\n--- KNOWLEDGE BASE ---\n${ragContext}\n--- END ---`;
  }

  return prompt;
}

export const LEAD_EXTRACTION_PROMPT = `Extract lead information from this conversation. Return JSON only:
{"name":"","email":"","phone":"","company":"","intent":"booking|pricing|support|purchase|info","score":0-100,"should_escalate":false}`;
