/**
 * Extract lead fields from conversation text using regex heuristics.
 * AI service can refine with structured output for production.
 */
export function extractLeadFromText(text) {
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/i);
  const phoneMatch = text.match(/(\+?\d[\d\s\-().]{8,}\d)/);
  const intentKeywords = {
    booking: /book|appointment|schedule|meeting|demo/i,
    pricing: /price|pricing|cost|quote|plan/i,
    support: /help|issue|problem|refund|support/i,
    purchase: /buy|order|purchase|checkout/i,
  };

  let intent = "info";
  for (const [key, regex] of Object.entries(intentKeywords)) {
    if (regex.test(text)) {
      intent = key;
      break;
    }
  }

  return {
    email: emailMatch?.[0] || null,
    phone: phoneMatch?.[0]?.replace(/\s/g, "") || null,
    intent,
    score: intent === "booking" || intent === "purchase" ? 75 : intent === "pricing" ? 60 : 40,
  };
}
