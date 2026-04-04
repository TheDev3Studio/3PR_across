import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/client";
import { useAdminAuth } from "../context/AdminAuthContext";
import { SEO } from "../components/SEO";

export function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("3pracross");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const token = await adminLogin(username, password);
      login(token);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Admin login for 3PR across Private Limited dashboard" path="/admin" />
      <section className="section">
        <div className="container narrow">
          <article className="admin-card reveal">
            <h1>Admin Dashboard Login</h1>
            <form className="inquiry-form" onSubmit={handleSubmit}>
              <label>
                Username
                <input value={username} onChange={(event) => setUsername(event.target.value)} />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
              {error ? <p className="status-text">{error}</p> : null}
            </form>
          </article>
        </div>
      </section>
    </>
  );
}
