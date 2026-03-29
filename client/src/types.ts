export type Category =
  "Welding Accessories & Spare Parts"
  "Power Tools & Spare Parts"
  "Electrical Items"
  "Tools & TCT Core Cutter & Dill bits"
  "Safety Items"
  "Hydraulic Items & Valves"
  "Measuring & Testing Instruments"
  "Nut Bolts & Washers"
  "Belts & Coupling"
  "Bearing"
  "General Items"
  "Oil seal"
  "Tools";

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
