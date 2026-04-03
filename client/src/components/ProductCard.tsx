import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import type { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
  const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER1;
  const message = `Hello, I am interested in "${product.name}". Kindly share details regarding price, availability, and specifications.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <article className="product-card reveal">
      <img src={product.image} alt={product.name} loading="lazy" />

      <div className="product-content">
        <span className="chip">{product.category}</span>
        <h3>{product.name}</h3>

        <details className="desc-dropdown">
          <summary>More description</summary>
          <p>{product.description}</p>
        </details>

        <div className="product-actions">
          <Link className="btn btn-soft view-btn" to={`/products/${product.id}`}>
            View Details
          </Link>

          <div className="inquiry-row">
            <Link
              className="btn btn-primary inquire-btn"
              to={`/inquiry?product=${encodeURIComponent(product.name)}`}
            >
              Inquire Now
            </Link>

            <a
              className="whatsapp-float-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}