import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: "RATE_LIMIT", message: "Too many requests" } },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: { code: "RATE_LIMIT", message: "Too many auth attempts" } },
});

export const webhookLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
});
