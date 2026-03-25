const express = require("express");
const { getStats } = require("../db/store");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/admin", requireAdmin, (_req, res) => {
  const stats = getStats();
  res.json({ stats });
});

module.exports = router;
