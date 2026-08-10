const nodemailer = require("nodemailer");

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

async function sendInquiryEmail(inquiry) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER/EMAIL_PASS not set — skipping inquiry email notification.");
    return;
  }

  const to = process.env.INQUIRY_NOTIFY_EMAIL || "enquiry.3pracross@gmail.com";

  await getTransporter().sendMail({
    from: `"3Pracross Website" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: inquiry.email || undefined,
    subject: `New Inquiry: ${inquiry.productInterest}`,
    text: [
      `Name: ${inquiry.name}`,
      `Phone: ${inquiry.phone}`,
      `Email: ${inquiry.email || "-"}`,
      `Product Interest: ${inquiry.productInterest}`,
      `Message: ${inquiry.message}`,
    ].join("\n"),
    html: `
      <h2>New Inquiry Received</h2>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Phone:</strong> ${inquiry.phone}</p>
      <p><strong>Email:</strong> ${inquiry.email || "-"}</p>
      <p><strong>Product Interest:</strong> ${inquiry.productInterest}</p>
      <p><strong>Message:</strong> ${inquiry.message}</p>
    `,
  });
}

module.exports = { sendInquiryEmail };
