let io = null;

export function initSockets(socketServer) {
  io = socketServer;

  io.on("connection", (socket) => {
    const { teamId, userId } = socket.handshake.auth || {};

    if (teamId) {
      socket.join(`team:${teamId}`);
      console.log(`[socket] ${userId || "anon"} joined team:${teamId}`);
    }

    socket.on("conversation:join", (conversationId) => {
      socket.join(`conversation:${conversationId}`);
    });

    socket.on("typing:start", ({ conversationId }) => {
      socket.to(`conversation:${conversationId}`).emit("typing:start", { userId, conversationId });
    });

    socket.on("typing:stop", ({ conversationId }) => {
      socket.to(`conversation:${conversationId}`).emit("typing:stop", { userId, conversationId });
    });

    socket.on("disconnect", () => {
      console.log(`[socket] disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function emitToTeam(teamId, event, data) {
  if (!io) return;
  io.to(`team:${teamId}`).emit(event, data);
}

export function emitToConversation(conversationId, event, data) {
  if (!io) return;
  io.to(`conversation:${conversationId}`).emit(event, data);
}

export function getIO() {
  return io;
}
