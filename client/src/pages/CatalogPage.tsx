import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/client";
import { ProductCard } from "../components/ProductCard";
import { categories } from "../constants";
import type { Product } from "../types";
import { SEO } from "../components/SEO";
import { FiSearch } from "react-icons/fi";

export function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedCategory = params.get("category") || "";
  const query = params.get("q") || "";

  useEffect(() => {
    setLoading(true);
    setError("");
    void getProducts({ category: selectedCategory || undefined, q: query || undefined })
      .then(setItems)
      .catch((err: unknown) => {
        setItems([]);
        const message = err instanceof Error ? err.message : "Unable to load products right now.";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, query]);

  function handleCategory(category: string) {
    setParams({
      ...(query ? { q: query } : {}),
      ...(category ? { category } : {}),
    });
    setDrawerOpen(false);
  }

  const totalLabel = useMemo(() => `${items.length} products found`, [items.length]);

  return (
    <>
      <SEO
        title="Product Catalogue"
        description="Browse 3pr across catalogue with category filters for cement and construction tools."
        path="/catalog"
      />
      <section className="section">
        <div className="container catalog-layout">

          {drawerOpen && (
            <div
              className="drawer-overlay"
              onClick={() => setDrawerOpen(false)}
            />
          )}

          <aside
            className={`catalog-sidebar reveal ${drawerOpen ? "drawer-open" : ""}`}
            aria-label="Product category filters"
          >
            <div className="drawer-header">
              <h2>Filters</h2>
              <button
                className="drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>
            <button
              className={`filter-link ${selectedCategory ? "" : "active"}`}
              onClick={() => handleCategory("")}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-link ${selectedCategory === category ? "active" : ""}`}
                onClick={() => handleCategory(category)}
              >
                {category}
              </button>
            ))}
          </aside>

          <div>
            <div className="catalog-toolbar">
              <div>
                <h1>Product Catalogue</h1>
                <p>{totalLabel}</p>
              </div>
              <div className="search-box">
                <div className="search-icon">
                  <FiSearch />
                </div>

                <input
                  className="search-input"
                  placeholder="Search products"
                  value={query}
                  onChange={(event) => {
                    const value = event.target.value;
                    setParams({
                      ...(selectedCategory ? { category: selectedCategory } : {}),
                      ...(value ? { q: value } : {}),
                    });
                  }}
                />
              </div>
              <button
                className="drawer-toggle"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open filters"
              >
                ☰ Filters
              </button>
            </div>

            {loading ? <p>Loading products...</p> : null}
            {!loading && error ? <p>{error}</p> : null}
            {!loading && !error && items.length === 0 ? <p>No products match your search.</p> : null}

            <div className="product-grid">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}