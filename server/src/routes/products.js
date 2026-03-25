const express = require("express");
const {
  getProducts,
  getProductById,
  getFeaturedProducts,
  addProduct,
} = require("../db/store");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  const { category, q } = req.query;
  const items = getProducts({ category, query: q });
  res.json({ items });
});

router.get("/featured", (req, res) => {
  const items = getFeaturedProducts();
  res.json({ items });
});

router.get("/:id", (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const related = getProducts({ category: product.category, query: "" })
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return res.json({ product, related });
});

router.post("/admin", requireAdmin, (req, res) => {
  const {
    name,
    category,
    shortDescription,
    description,
    specs,
    priceMin,
    priceMax,
    unit,
    image,
    featured,
  } = req.body;

  if (!name || !category || !shortDescription || !description || !unit || !image) {
    return res.status(400).json({ message: "Missing required product fields" });
  }

  const created = addProduct({
    name,
    category,
    shortDescription,
    description,
    specs: Array.isArray(specs) ? specs : [],
    priceMin: Number(priceMin) || 0,
    priceMax: Number(priceMax) || Number(priceMin) || 0,
    unit,
    image,
    featured: Boolean(featured),
  });

  return res.status(201).json({ product: created });
});

module.exports = router;
