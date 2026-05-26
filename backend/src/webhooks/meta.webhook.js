import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateMetaWebhook } from "../middleware/webhookValidator.js";
import { webhookLimiter } from "../middleware/rateLimiter.js";
import { config } from "../config/index.js";
import { parseMetaWebhook, sendMetaMessage } from "../integrations/metaMessenger.js";
import { handleInboundMessage } from "../services/messageEngine.js";

const router = Router();
const DEFAULT_TEAM_ID = process.env.DEFAULT_TEAM_ID;

/** Meta webhook verification */
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === config.meta.verifyToken) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

router.post(
  "/",
  webhookLimiter,
  validateMetaWebhook,
  asyncHandler(async (req, res) => {
    res.sendStatus(200);

    if (!DEFAULT_TEAM_ID) return;

    const entry = req.body?.entry || [];
    const events = parseMetaWebhook(entry);

    for (const event of events) {
      setImmediate(async () => {
        try {
          const channel = event.platform === "instagram" ? "instagram" : "facebook";
          await handleInboundMessage({
            teamId: DEFAULT_TEAM_ID,
            channel,
            externalId: event.senderId,
            messageBody: event.text,
            sendReplyFn: async (reply) => {
              await sendMetaMessage(event.senderId, reply, channel);
            },
          });
        } catch (err) {
          console.error(`[meta/${event.platform}]`, err);
        }
      });
    }
  })
);

export default router;
