const express = require("express");
const { trackMonthlyVisit, getMonthlyTraffic } = require("../db/store");

const router = express.Router();

router.post("/visit", (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "sessionId is required" });
  }
  const traffic = trackMonthlyVisit(sessionId);
  return res.json({ ok: true, traffic });
});

router.get("/monthly", (_req, res) => {
  const traffic = getMonthlyTraffic();
  return res.json({ traffic });
});

module.exports = router;
