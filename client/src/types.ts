export type Category =
  | "Cement"
  | "Hand Tools"
  | "Power Tools"
  | "Plumbing"
  | "Safety Gear";

export interface Product {
  id: string;
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  specs: string[];
  priceMin: number;
  priceMax: number;
  unit: string;
  image: string;
  featured: boolean;
}

export interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  productInterest: string;
  message: string;
}

export interface Stats {
  totalProducts: number;
  totalInquiries: number;
  totalVisitorsToday: number;
  liveVisitors: number;
}
