import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateTwilioWebhook } from "../middleware/webhookValidator.js";
import { webhookLimiter } from "../middleware/rateLimiter.js";
import { parseTwilioWebhook, sendWhatsAppMessage } from "../integrations/twilioWhatsApp.js";
import { handleInboundMessage } from "../services/messageEngine.js";
import { config } from "../config/index.js";

const router = Router();

// MVP: default team — replace with multi-tenant lookup via Twilio number mapping
const DEFAULT_TEAM_ID = process.env.DEFAULT_TEAM_ID;

router.post(
  "/",
  webhookLimiter,
  validateTwilioWebhook,
  asyncHandler(async (req, res) => {
    const parsed = parseTwilioWebhook(req.body);
    const teamId = DEFAULT_TEAM_ID;

    if (!teamId) {
      console.warn("[whatsapp] DEFAULT_TEAM_ID not set");
      return res.status(200).send("<Response></Response>");
    }

    res.status(200).send("<Response></Response>");

    // Process async after Twilio ACK
    setImmediate(async () => {
      try {
        await handleInboundMessage({
          teamId,
          channel: "whatsapp",
          externalId: parsed.from,
          contactName: parsed.profileName,
          contactPhone: parsed.from,
          messageBody: parsed.body,
          messageExternalId: parsed.messageSid,
          sendReplyFn: async (reply) => {
            await sendWhatsAppMessage(parsed.from, reply);
          },
        });
      } catch (err) {
        console.error("[whatsapp webhook]", err);
      }
    });
  })
);

router.get("/health", (_req, res) => {
  res.json({ channel: "whatsapp", status: "ok", configured: !!config.twilio.accountSid });
});

export default router;
