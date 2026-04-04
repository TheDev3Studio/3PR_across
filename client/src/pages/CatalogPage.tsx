import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/client";
import { ProductCard } from "../components/ProductCard";
import { categories } from "../constants";
import type { Product } from "../types";
import { SEO } from "../components/SEO";
import { FiSearch, FiX } from "react-icons/fi";

function ShimmerCard() {
  return (
    <div className="shimmer-card">
      <div className="shimmer shimmer-image" />
      <div className="shimmer-body">
        <div className="shimmer shimmer-title" />
        <div className="shimmer shimmer-subtitle" />
        <div className="shimmer shimmer-price" />
      </div>
    </div>
  );
}

const SHIMMER_COUNT = 8;

export function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const [allItems, setAllItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedCategory = params.get("category") || "";
  const [searchInput, setSearchInput] = useState(() => params.get("q") || "");
  const isFirstRender = useRef(true);

  const stableSetParams = useCallback(
    (next: Record<string, string>) => setParams(next, { replace: true }),
    [setParams]
  );

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError("");
    getProducts({})
      .then(setAllItems)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filteredItems = useMemo(() => {
    return allItems.filter((product) => {
      const matchCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchSearch = searchInput
        ? product.name.toLowerCase().includes(searchInput.toLowerCase())
        : true;
      return matchCategory && matchSearch;
    });
  }, [allItems, selectedCategory, searchInput]);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const timer = setTimeout(() => {
      stableSetParams({
        ...(selectedCategory ? { category: selectedCategory } : {}),
        ...(searchInput ? { q: searchInput } : {}),
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [searchInput, selectedCategory, stableSetParams]);

  function handleCategory(category: string) {
    setParams(
      { ...(searchInput ? { q: searchInput } : {}), ...(category ? { category } : {}) },
      { replace: true }
    );
    setDrawerOpen(false);
  }

  function clearSearch() { setSearchInput(""); }
  function clearAll() { setSearchInput(""); setParams({}, { replace: true }); }

  const hasActiveFilters = searchInput || selectedCategory;

  return (
    <>
      <style>{`
        @keyframes shimmer-sweep {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .shimmer {
          border-radius: 6px;
          background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%);
          background-size: 800px 100%;
          animation: shimmer-sweep 1.4s infinite linear;
        }
        @media (prefers-color-scheme: dark) {
          .shimmer {
            background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
            background-size: 800px 100%;
          }
        }
        .shimmer-card {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #eee;
        }
        @media (prefers-color-scheme: dark) {
          .shimmer-card { border-color: #2a2a2a; }
        }
        .shimmer-image  { width: 100%; height: 200px; border-radius: 0; }
        .shimmer-body   { padding: 14px; display: flex; flex-direction: column; gap: 10px; }
        .shimmer-title  { height: 16px; width: 80%; }
        .shimmer-subtitle { height: 13px; width: 55%; }
        .shimmer-price  { height: 20px; width: 35%; margin-top: 4px; }
      `}</style>

      <SEO title="Product Catalogue" description="Browse catalogue with filters." path="/catalog" />

      <section className="section">
        <div className="container catalog-layout">

          {drawerOpen && (
            <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
          )}

          <aside className={`catalog-sidebar reveal ${drawerOpen ? "drawer-open" : ""}`}>
            <div className="drawer-header">
              <h2>Filters</h2>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
            </div>
            <button
              className={`filter-link ${!selectedCategory ? "active" : ""}`}
              onClick={() => handleCategory("")}
            >All Categories</button>
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-link ${selectedCategory === category ? "active" : ""}`}
                onClick={() => handleCategory(category)}
              >{category}</button>
            ))}
          </aside>

          <div>
            <div className="catalog-toolbar">
              <div>
                <h1>Product Catalogue</h1>
                <p>{loading ? "Loading products…" : `${filteredItems.length} products found`}</p>
              </div>

              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  className="search-input"
                  placeholder="Search products"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                  <button
                    onClick={clearSearch}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", padding: "0 8px",
                      color: "inherit", opacity: 0.5
                    }}
                    aria-label="Clear search"
                  >
                    <FiX size={15} />
                  </button>
                )}
              </div>

              <button className="drawer-toggle" onClick={() => setDrawerOpen(true)}>
                ☰ Filters
              </button>
            </div>

            {hasActiveFilters && !loading && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {selectedCategory && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "4px 10px", borderRadius: 999, fontSize: 13,
                    background: "var(--color-background-info)",
                    color: "var(--color-text-info)", fontWeight: 500
                  }}>
                    {selectedCategory}
                    <FiX size={12} style={{ cursor: "pointer" }} onClick={() => handleCategory("")} />
                  </span>
                )}
                {searchInput && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "4px 10px", borderRadius: 999, fontSize: 13,
                    background: "var(--color-background-info)",
                    color: "var(--color-text-info)", fontWeight: 500
                  }}>
                    "{searchInput}"
                    <FiX size={12} style={{ cursor: "pointer" }} onClick={clearSearch} />
                  </span>
                )}
                <button onClick={clearAll} style={{
                  background: "none", border: "none",
                  fontSize: 13, cursor: "pointer",
                  color: "var(--color-text-secondary)", textDecoration: "underline", padding: "4px 0"
                }}>
                  Clear all
                </button>
              </div>
            )}

            {!loading && error && (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <p style={{ marginBottom: 12, color: "var(--color-text-danger)" }}>{error}</p>
                <button className="filter-link" onClick={fetchProducts}>Try again</button>
              </div>
            )}

            {loading && (
              <div className="product-grid">
                {Array.from({ length: SHIMMER_COUNT }).map((_, i) => (
                  <ShimmerCard key={i} />
                ))}
              </div>
            )}

            {!loading && !error && filteredItems.length === 0 && (
              <div style={{ textAlign: "center", padding: "64px 0" }}>
                <p style={{ fontSize: 15, marginBottom: 12 }}>No products match your search.</p>
                <button className="filter-link active" onClick={clearAll}>Clear filters</button>
              </div>
            )}

            {!loading && !error && filteredItems.length > 0 && (
              <div className="product-grid">
                {filteredItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}