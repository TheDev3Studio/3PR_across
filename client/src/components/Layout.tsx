import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/inquiry", label: "Inquiry" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand" aria-label="3pr across home">
            <span className="brand-mark">BM</span>
            <div>
              <strong>3pr across</strong>
              <p>Product Catalog</p>
            </div>
          </Link>
          <nav className="nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
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
            <p>Email: hello@buildmart.in</p>
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
