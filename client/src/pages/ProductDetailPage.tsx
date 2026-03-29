import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/client";
import type { Product } from "../types";
import { ProductCard } from "../components/ProductCard";
import { SEO } from "../components/SEO";

export function ProductDetailPage() {
  const { id = "" } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;
    void getProductById(id)
      .then((data) => {
        setProduct(data.product);
        setRelated(data.related);
      })
      .catch(() => {
        setProduct(null);
        setRelated([]);
      });
  }, [id]);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <h1>Product not found</h1>
          <Link className="btn btn-primary" to="/catalog">
            Back to catalog
          </Link>
        </div>
      </section>
    );
  }

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description,
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: product.priceMin,
      highPrice: product.priceMax,
    },
  };

  return (
    <>
      <SEO
        title={product.name}
        description={product.shortDescription}
        path={`/products/${product.id}`}
        type="product"
        image={product.image}
        structuredData={productLd}
      />
      <section className="section">
        <div className="container product-detail">
          <img src={product.image} alt={product.name} className="detail-image reveal" />
          <article className="detail-content">
            <span className="chip">{product.category}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <ul className="spec-list">
              {product.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
            {/* <strong>
              Rs. {product.priceMin} - {product.priceMax} {product.unit}
            </strong> */}
            <div className="detail-actions">
              <Link to={`/inquiry?product=${encodeURIComponent(product.name)}`} className="btn btn-primary">
                Send Inquiry
              </Link>
              <Link to="/catalog" className="btn btn-soft">
                Continue Browsing
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            <h2>Related Products</h2>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
