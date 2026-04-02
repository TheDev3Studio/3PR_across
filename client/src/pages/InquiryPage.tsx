import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { submitInquiry } from "../api/client";
import { SEO } from "../components/SEO";

export function InquiryPage() {
  const [params] = useSearchParams();
  const presetProduct = params.get("product") || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    productInterest: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (presetProduct) {
      setForm((prev) => ({ ...prev, productInterest: presetProduct }));
    }
  }, [presetProduct]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("Sending inquiry...");
    try {
      await submitInquiry(form);
      setStatus(
        "Inquiry sent successfully. Our team will contact you shortly.",
      );
      setForm({
        name: "",
        phone: "",
        email: "",
        productInterest: presetProduct,
        message: "",
      });
    } catch {
      setStatus(
        "Could not submit inquiry right now. Please call or WhatsApp us.",
      );
    }
  };

  return (
    <>
      <SEO
        title="Inquiry & Contact"
        description="Send inquiry to 3pr across for product pricing and availability."
        path="/inquiry"
      />
      <section className="section">
        <div className="container inquiry-grid">
          <article className="inquiry-card reveal">
            <h1>Send Us an Inquiry</h1>
            <p>Share your requirement and get a callback with quote details.</p>
            <form className="inquiry-form" onSubmit={onSubmit}>
              <label>
                Name *
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
              </label>
              <label>
                Phone *
                <input
                  required
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                />
              </label>
              <label>
                Email *
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                />
              </label>
              <label>
                Product Interest *
                <input
                  required
                  value={form.productInterest}
                  onChange={(event) =>
                    setForm({ ...form, productInterest: event.target.value })
                  }
                />
              </label>
              <label>
                Message *
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) =>
                    setForm({ ...form, message: event.target.value })
                  }
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Submit Inquiry
              </button>
              {status ? <p className="status-text">{status}</p> : null}
            </form>
          </article>

          <aside className="contact-card reveal">
            <h2>Need Immediate Help?</h2>
            <div className="contact-actions">
              <a
                className="btn btn-soft"
                href="https://wa.me/919000012345?text=Hi%203pr%20across%2C%20need%20quote"
              >
                WhatsApp Quick Link
              </a>
              <a className="btn btn-soft" href="tel:+919000012345">
                Call Now
              </a>
            </div>
            <h3>Shop Location</h3>
            <div
              className="map-placeholder"
              role="img"
              aria-label="Google map placeholder"
            >
              <iframe
                src="https://www.google.com/maps?q=20+Block+H-1A+Sector+63+Noida+Uttar+Pradesh+201301&output=embed"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "10px" }}
                loading="lazy"
              ></iframe>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
