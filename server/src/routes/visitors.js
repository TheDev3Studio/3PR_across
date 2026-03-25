const express = require("express");
const { upsertVisitor, getLiveVisitorCount } = require("../db/store");

const router = express.Router();
const clients = new Set();

function broadcastLiveCount() {
  const count = getLiveVisitorCount();
  for (const client of clients) {
    client.write(`data: ${JSON.stringify({ count })}\n\n`);
  }
}

router.post("/ping", (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "sessionId is required" });
  }
  upsertVisitor(sessionId);
  broadcastLiveCount();
  return res.json({ ok: true });
});

router.get("/live", (_req, res) => {
  const count = getLiveVisitorCount();
  return res.json({ count });
});

router.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  clients.add(res);
  res.write(`data: ${JSON.stringify({ count: getLiveVisitorCount() })}\n\n`);

  const keepAlive = setInterval(() => {
    res.write(": keep-alive\n\n");
  }, 25000);

  req.on("close", () => {
    clearInterval(keepAlive);
    clients.delete(res);
  });
});

module.exports = router;
