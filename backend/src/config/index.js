import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../.env");

// override: true — backend/.env wins over stale shell/IDE env vars
const result = dotenv.config({ path: envPath, override: true });

function assertSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || "").trim();
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  if (!result.parsed && !url) {
    console.error(`[config] Could not load ${envPath}`);
    process.exit(1);
  }

  if (!url || url === "https://your-project.supabase.co") {
    console.error(
      "\n[config] SUPABASE_URL missing or still the .env.example placeholder.\n" +
        "  Set it in backend/.env from Supabase → Settings → API\n"
    );
    process.exit(1);
  }

  if (!url.startsWith("https://") || !url.includes(".supabase.co")) {
    console.error("[config] SUPABASE_URL must look like https://xxxxx.supabase.co");
    process.exit(1);
  }

  // Do not use .includes("your-") — JWT keys can contain that substring by chance
  if (!serviceKey || serviceKey === "your-service-role-key") {
    console.error("[config] Set SUPABASE_SERVICE_ROLE_KEY in backend/.env");
    process.exit(1);
  }
}

assertSupabaseConfig();

const required = ["JWT_SECRET", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[config] Missing env: ${key}`);
  }
}

export const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "4000", 10),
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:4000",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",

  jwt: {
    secret: process.env.JWT_SECRET || "dev-secret-change-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    chatModel: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
    embeddingModel: process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
    maxContextMessages: 20,
    confidenceThreshold: 0.65,
  },

  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM,
    webhookAuth: process.env.TWILIO_WEBHOOK_AUTH !== "false",
  },

  meta: {
    appId: process.env.META_APP_ID,
    appSecret: process.env.META_APP_SECRET,
    verifyToken: process.env.META_VERIFY_TOKEN || "nexusai-webhook-verify",
    pageAccessToken: process.env.META_PAGE_ACCESS_TOKEN,
    webhookSecret: process.env.META_WEBHOOK_SECRET,
  },

  email: {
    resendApiKey: process.env.RESEND_API_KEY,
    from: process.env.EMAIL_FROM || "notifications@nexusai.io",
  },

  googleSheets: {
    clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  },

  rag: {
    chunkSize: 800,
    chunkOverlap: 120,
    topK: 5,
  },
};

export default config;
