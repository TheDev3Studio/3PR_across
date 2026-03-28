import { SEO } from "../components/SEO";

export function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about 3pr across, our product sourcing standards, support model, and commitment to industrial buyers across India."
        path="/about"
      />

      <section className="section section-soft">
        <div className="container about-hero">
          <article className="about-card reveal">
            <p className="eyebrow">About 3pr across</p>
            <h1>Your Reliable Source for Industrial Supplies</h1>
            <p>
             We are a GST-registered industrial supply company dealing in welding accessories, 
             electrical items, power tools, safety equipment, hydraulic components, and more.
             Operating from Noida and Bhojpur, we supply a wide range of industrial products to meet the procurement needs of factories, contractors, and maintenance teams.
            </p>
            <p>
              Whether you need safety items, electrical components, power tools, bearings, or hydraulic valves,
              we help you source the right items without delaying your project schedule.
            </p>

            <div className="about-metrics" aria-label="Company highlights">
              <div className="about-metric">
                <strong>13+</strong>
                <span>Core product categories</span>
              </div>
              <div className="about-metric">
                <strong>300+</strong>
                <span>Catalog-ready products</span>
              </div>
              <div className="about-metric">
                <strong>Same Day</strong>
                <span>Inquiry response support</span>
              </div>
            </div>
          </article>

          <aside className="about-card reveal">
            <h2>How We Work</h2>
            <ul className="about-list">
              <li>Requirement-first consultation before suggesting products.</li>
              <li>Focus on quality, compatibility, and fit-for-use recommendations.</li>
              <li>Clear pricing guidance for both small and bulk quantity needs.</li>
              <li>Quick support via call and WhatsApp for urgent project requests.</li>
            </ul>
             <br />
            <h2>Why Buyers Choose Us</h2>
            <ul className="about-list">
              <li>Wide industrial range under one supplier relationship.</li>
              <li>Simple inquiry process with direct human support.</li>
              <li>Reliable fulfillment coordination for site timelines.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>What You Can Expect</h2>
          </div>

          <div className="about-grid">
            <article className="about-block reveal">
              <h3>Product Confidence</h3>
              <p>
                We prioritize practical, site-relevant products and help avoid mismatched items that slow down
                execution.
              </p>
            </article>

            <article className="about-block reveal">
              <h3>Responsive Communication</h3>
              <p>
                Our team keeps communication direct and fast so you can move from inquiry to purchase without
                waiting in long loops.
              </p>
            </article>

            <article className="about-block reveal">
              <h3>Long-Term Support</h3>
              <p>
                We aim to be a recurring procurement partner, not a one-time seller, by staying consistent in
                service and support.
              </p>
            </article>
          </div>
{/* 
          <div className="hero-actions" style={{ marginTop: "22px" }}>
            <Link to="/catalog" className="btn btn-primary">
              Explore Product Catalog
            </Link>
            <Link to="/inquiry" className="btn btn-soft">
              Send Inquiry
            </Link>
          </div> */}
        </div>
      </section>
    </>
  );
}
