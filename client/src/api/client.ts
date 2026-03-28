import axios from "axios";
import type { Inquiry, Product, Stats } from "../types";

const configuredBaseURL = import.meta.env.VITE_API_BASE_URL?.trim();
const normalizedConfiguredBaseURL = configuredBaseURL ? configuredBaseURL.replace(/\/+$/, "") : "";
const fallbackBaseURL = import.meta.env.DEV ? "http://localhost:4000/api" : `${window.location.origin}/api`;
const baseURL = normalizedConfiguredBaseURL || fallbackBaseURL;

export const api = axios.create({ baseURL });

export async function getFeaturedProducts() {
  const { data } = await api.get<{ items: Product[] }>("/products/featured");
  return data.items;
}

export async function getProducts(params?: { category?: string; q?: string }) {
  const { data } = await api.get<{ items: Product[] }>("/products", { params });
  return data.items;
}

export async function getProductById(id: string) {
  const { data } = await api.get<{ product: Product; related: Product[] }>(`/products/${id}`);
  return data;
}

export async function submitInquiry(payload: {
  name: string;
  phone: string;
  email: string;
  productInterest: string;
  message: string;
}) {
  const { data } = await api.post<{ inquiry: Inquiry }>("/inquiries", payload);
  return data.inquiry;
}

export interface MonthlyTraffic {
  monthKey: string;
  uniqueCount: number;
  totalVisits: number;
}

export async function registerVisit(sessionId: string) {
  const { data } = await api.post<{ traffic: MonthlyTraffic }>("/visitors/visit", { sessionId });
  return data.traffic;
}

export async function getMonthlyTraffic() {
  const { data } = await api.get<{ traffic: MonthlyTraffic }>("/visitors/monthly");
  return data.traffic;
}

export async function adminLogin(username: string, password: string) {
  const { data } = await api.post<{ token: string }>("/auth/login", { username, password });
  return data.token;
}

export async function getAdminStats(token: string) {
  const { data } = await api.get<{ stats: Stats }>("/stats/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.stats;
}

export async function getAdminInquiries(token: string) {
  const { data } = await api.get<{ inquiries: Inquiry[] }>("/inquiries/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.inquiries;
}

export async function addAdminProduct(
  token: string,
  payload: {
    name: string;
    category: string;
    shortDescription: string;
    description: string;
    specs: string[];
    priceMin: number;
    priceMax: number;
    unit: string;
    image: string;
  }
) {
  const { data } = await api.post("/products/admin", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
