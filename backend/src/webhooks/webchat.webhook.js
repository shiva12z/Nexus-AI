import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { handleInboundMessage } from "../services/messageEngine.js";

const router = Router();

/** Website live chat — called from frontend widget */
router.post(
  "/message",
  asyncHandler(async (req, res) => {
    const { teamId, sessionId, message, contactName, contactEmail } = req.body;

    if (!teamId || !sessionId || !message) {
      return res.status(400).json({ success: false, error: "teamId, sessionId, message required" });
    }

    const result = await handleInboundMessage({
      teamId,
      channel: "webchat",
      externalId: sessionId,
      contactName,
      contactEmail,
      messageBody: message,
      sendReplyFn: null,
    });

    res.json({
      success: true,
      data: {
        conversationId: result.conversation.id,
        reply: result.aiMessage?.body || null,
      },
    });
  })
);

export default router;
