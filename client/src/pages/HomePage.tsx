import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../api/client";
import { categories, testimonials } from "../constants";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "../types";
import { SEO } from "../components/SEO";

export function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "BuildMart",
      url: import.meta.env.VITE_SITE_URL || "https://buildmart.example",
      telephone: "+91-90000-12345",
      sameAs: ["https://wa.me/919000012345"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "BuildMart",
      url: import.meta.env.VITE_SITE_URL || "https://buildmart.example",
      potentialAction: {
        "@type": "SearchAction",
        target: `${import.meta.env.VITE_SITE_URL || "https://buildmart.example"}/catalog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  useEffect(() => {
    void getFeaturedProducts().then(setFeatured).catch(() => setFeatured([]));
  }, []);

  return (
    <>
      <SEO
        title="BuildMart Home"
        description="BuildMart is your trusted building materials partner for cement, hand tools, power tools, plumbing, and safety gear."
        path="/"
        structuredData={structuredData}
      />
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">BuildMart Product Catalog</p>
            <h1>Your Trusted Building Materials Partner</h1>
            <p className="hero-subtext">
              Source premium cement and construction tools with transparent pricing and quick inquiry support.
            </p>
            <div className="hero-actions">
              <Link to="/catalog" className="btn btn-primary">
                Explore Catalog
              </Link>
              <Link to="/inquiry" className="btn btn-soft">
                Quick Inquiry
              </Link>
            </div>
          </div>
          <div className="hero-panel reveal">
            <h3>Why Contractors Trust Us</h3>
            <ul>
              <li>Authentic products from verified brands</li>
              <li>Bulk order friendly pricing</li>
              <li>Dedicated support for site procurement</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Product Categories</h2>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link key={category} to={`/catalog?category=${encodeURIComponent(category)}`} className="category-card reveal">
                <h3>{category}</h3>
                <p>Curated products for {category.toLowerCase()} workflows.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            <h2>Featured Products</h2>
            <Link to="/catalog" className="text-link">
              View all products
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container testimonials-wrap">
          <h2>Trusted by Builders & Contractors</h2>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial reveal">
                <p>"{item.quote}"</p>
                <strong>{item.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
