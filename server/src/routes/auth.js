const express = require("express");
const jwt = require("jsonwebtoken");
const { verifyAdmin } = require("../db/store");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const valid = verifyAdmin(username, password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username, role: "admin" }, process.env.JWT_SECRET || "3pracross-secret", {
    expiresIn: "12h",
  });

  return res.json({ token });
});

module.exports = router;
