import crypto from "crypto";
import twilio from "twilio";
import { config } from "../config/index.js";
import { UnauthorizedError } from "../utils/errors.js";

/** Validate Twilio webhook signature */
export function validateTwilioWebhook(req, _res, next) {
  if (!config.twilio.webhookAuth || config.env === "development") {
    return next();
  }

  const signature = req.headers["x-twilio-signature"];
  const url = `${config.apiBaseUrl}${req.originalUrl}`;

  const valid = twilio.validateRequest(
    config.twilio.authToken,
    signature,
    url,
    req.body
  );

  if (!valid) return next(new UnauthorizedError("Invalid Twilio signature"));
  next();
}

/** Validate Meta webhook signature (X-Hub-Signature-256) */
export function validateMetaWebhook(req, _res, next) {
  const secret = config.meta.webhookSecret;
  if (!secret || config.env === "development") return next();

  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return next(new UnauthorizedError("Missing Meta signature"));

  const expected = "sha256=" + crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== expected) {
    return next(new UnauthorizedError("Invalid Meta signature"));
  }
  next();
}
