import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalogue" },
  { to: "/about", label: "About Us" },
  { to: "/inquiry", label: "Inquiry" },
];

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
            <p>Phone: +91 90000 12345</p>
            <p>Email: 3pracross@gmail.com</p>
          </div>
          <div>
            <h5>Location</h5>
            <p>Industrial Area, Jaipur, Rajasthan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}