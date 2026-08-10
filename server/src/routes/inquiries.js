const express = require("express");
const { addInquiry, getInquiries } = require("../db/store");
const { requireAdmin } = require("../middleware/auth");
const { sendInquiryEmail } = require("../utils/mailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, phone, email, productInterest, message } = req.body;
  if (!name || !phone || !productInterest || !message) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  const created = addInquiry({
    name,
    phone,
    email: email || "",
    productInterest,
    message,
  });

  try {
    await sendInquiryEmail(created);
  } catch (err) {
    console.error("Failed to send inquiry notification email:", err.message);
  }

  return res.status(201).json({ inquiry: created });
});

router.get("/admin", requireAdmin, (_req, res) => {
  const inquiries = getInquiries();
  res.json({ inquiries });
});

module.exports = router;
