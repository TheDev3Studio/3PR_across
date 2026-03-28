const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const productsRouter = require("./routes/products");
const inquiriesRouter = require("./routes/inquiries");
const visitorsRouter = require("./routes/visitors");
const authRouter = require("./routes/auth");
const statsRouter = require("./routes/stats");
const { ensureDb } = require("./db/store");

const app = express();

ensureDb();

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS origin not allowed"));
    },
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "buildmart-api" });
});

app.use("/api/products", productsRouter);
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/visitors", visitorsRouter);
app.use("/api/auth", authRouter);
app.use("/api/stats", statsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
