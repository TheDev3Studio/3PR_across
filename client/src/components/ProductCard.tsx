import { Link } from "react-router-dom";
import type { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card reveal">
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-content">
        <span className="chip">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-summary">{product.shortDescription}</p>
        <details className="desc-dropdown">
          <summary>More description</summary>
          <p>{product.description}</p>
        </details>
        <strong>
          Rs. {product.priceMin} - {product.priceMax} {product.unit}
        </strong>
        <div className="product-actions">
          <Link className="btn btn-soft" to={`/products/${product.id}`}>
            View Details
          </Link>
          <Link className="btn btn-primary" to={`/inquiry?product=${encodeURIComponent(product.name)}`}>
            Inquire Now
          </Link>
        </div>
      </div>
    </article>
  );
}
