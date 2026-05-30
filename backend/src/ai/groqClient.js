import { config } from "../config/index.js";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/**
 * Helper to call Groq's chat completions API using the official SDK
 * @param {Array} messages - Chat messages array
 * @param {boolean} jsonMode - If true, enforces JSON output
 * @returns {Promise<any>}
 */
export async function callGroq(messages, jsonMode = true) {
  if (!process.env.GROQ_API_KEY) {
    console.warn("[AI] GROQ_API_KEY missing, returning mock data.");
    return jsonMode ? {} : "I am an AI Sales Agent (Mock).";
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama3-8b-8192",
      temperature: 0.1, // Low temp for structured JSON outputs
      ...(jsonMode && { response_format: { type: "json_object" } })
    });

    const content = chatCompletion.choices[0]?.message?.content || "";

    if (jsonMode) {
      try {
        return JSON.parse(content);
      } catch (err) {
        console.error("[Groq API Parse Error] Failed to parse JSON:", content);
        return {};
      }
    }

    return content;
  } catch (err) {
    console.error("[Groq API Error]", err);
    throw new Error(`Groq API error: ${err.message}`);
  }
}
