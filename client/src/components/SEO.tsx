import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_NAME = "3pr Across Private Limited";
const BASE_URL = import.meta.env.VITE_SITE_URL || "https://3pracross.example";
const DEFAULT_IMAGE = `${BASE_URL}/og-cover.jpg`;

export function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  structuredData,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property='${name}']` : `meta[name='${name}']`;
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        if (property) el.setAttribute("property", name);
        else el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", url, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:image", image, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let ld = document.querySelector<HTMLScriptElement>("script[data-seo='structured-data']");
    if (structuredData) {
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.setAttribute("data-seo", "structured-data");
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(structuredData);
    } else if (ld) {
      ld.remove();
    }
  }, [description, image, path, structuredData, title, type]);

  return null;
}
