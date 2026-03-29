import { Link } from "react-router-dom";
import { categories } from "../constants";
import { SEO } from "../components/SEO";

export function AboutPage() {
  const highlights = [
    { label: "Product Categories", value: "13+" },
    { label: "Catalog-ready SKUs", value: "300+" },
    { label: "Support Availability", value: "Same Day" },
    { label: "Locations", value: "Noida & Bhojpur" },
  ];

  const values = [
    {
      title: "Quality-First Sourcing",
      text: "We prioritize dependable brands and fit-for-use products so teams can avoid costly rework.",
    },
    {
      title: "Practical Recommendations",
      text: "Our team understands industrial buying needs and suggests parts that match your actual use case.",
    },
    {
      title: "Fast Human Support",
      text: "Urgent requirement? We keep communication direct on call and WhatsApp to reduce delays.",
    },
    {
      title: "Long-Term Partnership",
      text: "We aim to become your repeat procurement partner with consistent pricing and reliable service.",
    },
  ];

  const processSteps = [
    "Share your requirement, quantity, and delivery timeline.",
    "Get shortlisted options with pricing clarity and availability.",
    "Confirm final items and receive streamlined fulfillment support.",
  ];

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about 3pr across, our sourcing standards, industrial product expertise, and support commitment for buyers across India."
        path="/about"
      />

      <section className="section section-soft">
        <div className="container about-hero">
          <article className="about-card reveal">
            <p className="eyebrow">About 3pr across</p>
            <h1>Your Reliable Partner for Industrial Procurement</h1>
            <p>
              3pr across is a GST-registered industrial supply company serving factories, contractors,
              and maintenance teams with practical, site-ready products. From Noida and Bhojpur, we
              support procurement requirements across welding, tools, electrical, safety, hydraulic,
              and general industrial categories.
            </p>
            <p>
              Whether you need a one-time urgent item or recurring bulk supply, our focus stays the same:
              help you source the right materials quickly without compromising quality or timelines.
            </p>
          </article>

          <aside className="about-card reveal">
            <h2>At a Glance</h2>
            <div className="about-metrics" aria-label="Company highlights">
              {highlights.map((item) => (
                <div key={item.label} className="about-metric">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <Link to="/catalog" className="btn btn-primary">
                Explore Catalog
              </Link>
              <Link to="/inquiry" className="btn btn-soft">
                Send Inquiry
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>What We Supply</h2>
          </div>
          <p>
            We maintain a broad industrial range so buyers can source multiple requirements under one
            supplier relationship.
          </p>
          <div className="about-pill-list" aria-label="Industrial supply categories">
            {categories.map((category) => (
              <span key={category} className="about-pill">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            <h2>Our Values</h2>
          </div>

          <div className="about-value-grid">
            {values.map((value) => (
              <article key={value.title} className="about-value reveal">
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-cta">
          <article className="about-card reveal">
            <h2>How We Work With You</h2>
            <ol className="about-process">
              {processSteps.map((step) => (
                <li key={step} className="about-process-item">
                  {step}
                </li>
              ))}
            </ol>
          </article>

          <article className="about-card reveal">
            <h2>Ready to Source Smarter?</h2>
            <p>
              Tell us what your project needs and we will help you shortlist the right products with
              quick turnaround.
            </p>
            <div className="hero-actions">
              <Link to="/inquiry" className="btn btn-primary">
                Start an Inquiry
              </Link>
              <Link to="/catalog" className="btn btn-soft">
                Browse Products
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
