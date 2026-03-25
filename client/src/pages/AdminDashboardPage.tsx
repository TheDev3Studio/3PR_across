import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { addAdminProduct, getAdminInquiries, getAdminStats } from "../api/client";
import { useAdminAuth } from "../context/AdminAuthContext";
import type { Inquiry, Stats } from "../types";
import { SEO } from "../components/SEO";
import { categories } from "../constants";

const initialProduct = {
  name: "",
  category: "Cement",
  shortDescription: "",
  description: "",
  specs: "",
  priceMin: "",
  priceMax: "",
  unit: "per piece",
  image: "",
};

export function AdminDashboardPage() {
  const { token, logout } = useAdminAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [form, setForm] = useState(initialProduct);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!token) return;
    void getAdminStats(token).then(setStats);
    void getAdminInquiries(token).then(setInquiries);
  }, [token]);

  const handleAddProduct = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;
    setStatus("Adding product...");
    try {
      await addAdminProduct(token, {
        name: form.name,
        category: form.category,
        shortDescription: form.shortDescription,
        description: form.description,
        specs: form.specs
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        priceMin: Number(form.priceMin),
        priceMax: Number(form.priceMax),
        unit: form.unit,
        image: form.image,
      });
      setStatus("Product added successfully.");
      setForm(initialProduct);
      const nextStats = await getAdminStats(token);
      setStats(nextStats);
    } catch {
      setStatus("Could not add product. Check fields and retry.");
    }
  };

  return (
    <>
      <SEO title="Admin Dashboard" description="BuildMart admin dashboard" path="/admin/dashboard" />
      <section className="section">
        <div className="container">
          <div className="admin-topbar">
            <h1>Admin Dashboard</h1>
            <button className="btn btn-soft" onClick={logout}>
              Logout
            </button>
          </div>

          <div className="stats-grid">
            <article className="stat-card reveal">
              <h3>Live Visitors</h3>
              <strong>{stats?.liveVisitors ?? 0}</strong>
            </article>
            <article className="stat-card reveal">
              <h3>Total Visitors Today</h3>
              <strong>{stats?.totalVisitorsToday ?? 0}</strong>
            </article>
            <article className="stat-card reveal">
              <h3>Total Inquiries</h3>
              <strong>{stats?.totalInquiries ?? 0}</strong>
            </article>
            <article className="stat-card reveal">
              <h3>Total Products</h3>
              <strong>{stats?.totalProducts ?? 0}</strong>
            </article>
          </div>

          <div className="admin-panels">
            <article className="admin-card reveal">
              <h2>Add New Product</h2>
              <form className="inquiry-form" onSubmit={handleAddProduct}>
                <label>
                  Product Name
                  <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                </label>
                <label>
                  Category
                  <select
                    value={form.category}
                    onChange={(event) => setForm({ ...form, category: event.target.value })}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Short Description
                  <input
                    value={form.shortDescription}
                    onChange={(event) => setForm({ ...form, shortDescription: event.target.value })}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                  />
                </label>
                <label>
                  Specs (comma separated)
                  <input value={form.specs} onChange={(event) => setForm({ ...form, specs: event.target.value })} />
                </label>
                <label>
                  Price Min
                  <input
                    type="number"
                    value={form.priceMin}
                    onChange={(event) => setForm({ ...form, priceMin: event.target.value })}
                  />
                </label>
                <label>
                  Price Max
                  <input
                    type="number"
                    value={form.priceMax}
                    onChange={(event) => setForm({ ...form, priceMax: event.target.value })}
                  />
                </label>
                <label>
                  Unit
                  <input value={form.unit} onChange={(event) => setForm({ ...form, unit: event.target.value })} />
                </label>
                <label>
                  Image URL
                  <input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} />
                </label>
                <button className="btn btn-primary" type="submit">
                  Add Product
                </button>
                {status ? <p className="status-text">{status}</p> : null}
              </form>
            </article>

            <article className="admin-card reveal">
              <h2>Inquiry List</h2>
              <div className="inquiry-list">
                {inquiries.length === 0 ? <p>No inquiries yet.</p> : null}
                {inquiries.map((item) => (
                  <div key={item.id} className="inquiry-item">
                    <h4>{item.name}</h4>
                    <p>{item.productInterest}</p>
                    <p>{item.phone}</p>
                    <p>{item.email || "No email"}</p>
                    <p>{item.message}</p>
                    <small>{new Date(item.createdAt).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
