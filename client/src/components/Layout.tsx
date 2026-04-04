import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalogue" },
  { to: "/about", label: "About Us" },
  { to: "/inquiry", label: "Inquiry" },
];

const numbers = [
  import.meta.env.VITE_CONTACT_NUMBER1,
  import.meta.env.VITE_CONTACT_NUMBER2,
  import.meta.env.VITE_CONTACT_NUMBER3,
  import.meta.env.VITE_CONTACT_NUMBER4,
].filter(Boolean);

const emails = [
  import.meta.env.VITE_EMAIL_1,
  import.meta.env.VITE_EMAIL_2,
  import.meta.env.VITE_EMAIL_3,
].filter(Boolean);

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">

      {/* ===== HEADER ===== */}
      <header className="topbar">
        <div className="container topbar-inner">

          <Link to="/" className="brand" aria-label="3pr across home">
            <div className="brand-wrapper">
              <img src="/logo.svg" alt="logo" className="logo" />
              <h3 className="brand-name">3PR ACROSS</h3>
            </div>
          </Link>

          {/* 🔥 TOGGLE BUTTON */}
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* 🔥 NAV */}
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main>{children}</main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer-grid">

          <div className="footer-brand">
            <h4>3pr across</h4>
            <p>India's Trusted Industrial Supply Partner</p>

            <ul className="footer-highlights">
              <li>✔ Industrial Grade Products</li>
              <li>✔ Fast Delivery Across India</li>
              <li>✔ Trusted by 500+ Clients</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h5>Quick Contact</h5>

            <div className="contact-grid">
              <div className="contact-block">
                <span className="contact-title">Phone</span>
                {numbers.map((num, i) => (
                  <a key={i} href={`tel:+91${num}`} className="contact-link">
                    +91 {num}
                  </a>
                ))}
              </div>

              <div className="contact-block">
                <span className="contact-title">Email</span>
                {emails.map((email, i) => (
                  <a key={i} href={`mailto:${email}`} className="contact-link">
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-address">
            <h5>Addresses</h5>

            <div className="address-card">
              <strong>Corporate</strong>
              <p>
                20, Block H-1/A, Sector 63<br />
                Noida, Uttar Pradesh - 201301
              </p>
            </div>

            <div className="address-card">
              <strong>Registered</strong>
              <p>
                101 Gidha Industrial Area<br />
                Ara, Bhojpur, Near Flyover - 802314
              </p>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} 3pr across • All rights reserved
        </div>
      </footer>

    </div>
  );
}