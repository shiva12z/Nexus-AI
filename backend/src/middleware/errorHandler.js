import { AppError } from "../utils/errors.js";

export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";

  if (process.env.NODE_ENV !== "production") {
    console.error("[error]", err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: err.isOperational ? err.message : "Internal server error",
      ...(process.env.NODE_ENV !== "production" && !err.isOperational && { stack: err.stack }),
    },
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: `Route ${req.method} ${req.path} not found` },
  });
}
