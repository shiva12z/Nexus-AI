import OpenAI from "openai";
import { config } from "../config/index.js";

let client = null;

export function getOpenAI() {
  if (!config.openai.apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }
  if (!client) {
    client = new OpenAI({ apiKey: config.openai.apiKey });
  }
  return client;
}
