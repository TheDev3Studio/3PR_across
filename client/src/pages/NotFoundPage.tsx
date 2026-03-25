import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";

export function NotFoundPage() {
  return (
    <section className="section">
      <SEO title="Page Not Found" description="Requested page does not exist" path="/404" />
      <div className="container narrow">
        <h1>Page Not Found</h1>
        <p>The page you are trying to access does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
