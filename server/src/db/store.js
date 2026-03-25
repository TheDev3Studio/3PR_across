const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { products } = require("../data/products.seed");

const DATA_DIR = path.join(__dirname, "../../data");
const DB_FILE = path.join(DATA_DIR, "db.json");

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const adminHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || "buildmart123", 10);
    const initial = {
      products,
      inquiries: [],
      visitors: {},
      admins: [
        {
          username: process.env.ADMIN_USERNAME || "admin",
          passwordHash: adminHash,
        },
      ],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return;
  }

  const current = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  const existingIds = new Set((current.products || []).map((item) => item.id));
  const missingSeedProducts = products.filter((item) => !existingIds.has(item.id));
  if (missingSeedProducts.length > 0) {
    current.products = [...(current.products || []), ...missingSeedProducts];
    fs.writeFileSync(DB_FILE, JSON.stringify(current, null, 2));
  }
}

function readDb() {
  ensureDb();
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function getProducts({ category, query }) {
  const db = readDb();
  return db.products.filter((product) => {
    const categoryMatch = category ? product.category === category : true;
    const q = query?.trim().toLowerCase();
    const queryMatch = q
      ? [product.name, product.shortDescription, product.description]
          .join(" ")
          .toLowerCase()
          .includes(q)
      : true;
    return categoryMatch && queryMatch;
  });
}

function getProductById(id) {
  const db = readDb();
  return db.products.find((item) => item.id === id);
}

function getFeaturedProducts(limit = 8) {
  const db = readDb();
  return db.products.filter((item) => item.featured).slice(0, limit);
}

function addInquiry(inquiry) {
  const db = readDb();
  const created = {
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...inquiry,
  };
  db.inquiries.unshift(created);
  writeDb(db);
  return created;
}

function getInquiries() {
  const db = readDb();
  return db.inquiries;
}

function verifyAdmin(username, password) {
  const db = readDb();
  const admin = db.admins.find((item) => item.username === username);
  if (!admin) {
    return false;
  }
  return bcrypt.compareSync(password, admin.passwordHash);
}

function upsertVisitor(sessionId) {
  const db = readDb();
  db.visitors[sessionId] = {
    lastSeen: Date.now(),
  };
  writeDb(db);
}

function getLiveVisitorCount(windowMs = 5 * 60 * 1000) {
  const db = readDb();
  const now = Date.now();
  return Object.values(db.visitors).filter((entry) => now - entry.lastSeen <= windowMs).length;
}

function getTodayVisitorCount() {
  const db = readDb();
  const todayStart = startOfToday();
  return Object.values(db.visitors).filter((entry) => entry.lastSeen >= todayStart).length;
}

function getStats() {
  const db = readDb();
  return {
    totalProducts: db.products.length,
    totalInquiries: db.inquiries.length,
    totalVisitorsToday: getTodayVisitorCount(),
    liveVisitors: getLiveVisitorCount(),
  };
}

function addProduct(product) {
  const db = readDb();
  const idBase = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const id = `${idBase}-${Date.now()}`;
  const created = {
    ...product,
    id,
    featured: Boolean(product.featured),
  };
  db.products.unshift(created);
  writeDb(db);
  return created;
}

module.exports = {
  ensureDb,
  getProducts,
  getProductById,
  getFeaturedProducts,
  addInquiry,
  getInquiries,
  verifyAdmin,
  upsertVisitor,
  getLiveVisitorCount,
  getStats,
  addProduct,
};
