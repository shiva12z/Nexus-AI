import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "./config/index.js";
import { httpLogger } from "./middleware/logger.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";
import { initSockets } from "./sockets/index.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: config.frontendUrl,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initSockets(io);

// Security & parsing
app.use(helmet());
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);
app.use(apiLimiter);

// API routes
app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

const start = () => {
  httpServer.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `\n[error] Port ${config.port} is already in use.\n` +
          `  Stop the other process, or set PORT to a different value in backend/.env\n` +
          `  Windows: netstat -ano | findstr :${config.port}  then  taskkill /PID <pid> /F\n`
      );
      process.exit(1);
    }
    console.error("[error] Server failed:", err);
    process.exit(1);
  });

  httpServer.listen(config.port, () => {
    const host = config.supabase.url?.replace("https://", "").split(".")[0] || "?";
    console.log(`
╔══════════════════════════════════════════╗
║  NexusAI API                             ║
║  http://localhost:${config.port}              ║
║  env: ${config.env.padEnd(28)}║
║  supabase: ${host.padEnd(28)}║
╚══════════════════════════════════════════╝
    `);
  });
};

start();

export { app, httpServer, io };
