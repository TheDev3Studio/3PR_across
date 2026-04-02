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
].filter(Boolean); // empty hata dega

const emails = [
  import.meta.env.VITE_EMAIL_1,
  import.meta.env.VITE_EMAIL_2,
  import.meta.env.VITE_EMAIL_3,
].filter(Boolean);

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">

          <Link to="/" className="brand" aria-label="3pr across home">
            <div className="brand-wrapper">
              <img
                src="/logo.svg"
                alt="logo"
                className="logo"
              />
              <h3 className="brand-name">3PR ACROSS</h3>
            </div>
          </Link>

          {/* ✅ Hamburger Button */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* ✅ Nav */}
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)} // close after click
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

      <main>{children}</main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h4>3pr across</h4>
            <p>India's Trusted Industrial Supply Partner</p>
          </div>
<div>
  <h5>Quick Contact</h5>

  {/* 📞 Numbers in one line */}
  <p>
    <strong>Phone: </strong>
    {numbers.map((num, i) => (
      <span key={i}>
        <a href={`tel:+91${num}`}>+91 {num}</a>
        {i !== numbers.length - 1 && ", "}
      </span>
    ))}
  </p>

  {/* 📧 Emails clean list */}
  <p>
    <strong>Email: </strong>
    {emails.map((email, i) => (
      <span key={i}>
        <a href={`mailto:${email}`}>{email}</a>
        {i !== emails.length - 1 && ", "}
      </span>
    ))}
  </p>
</div>
        <div>
  <h5>Addresses</h5>

  <p>
    <strong>Corporate:</strong><br />
    20, Block H-1/A, Sector 63,<br />
    Noida, Uttar Pradesh - 201301
  </p>

  <p>
    <strong>Registered:</strong><br />
    101 Gidha Industrial Area,<br />
    Ara, Bhojpur, Near Flyover - 802314
  </p>
</div>
        </div>
      </footer>
    </div>
  );
}