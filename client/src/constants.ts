export const categories = [
  "Welding Accessories & Spare Parts",
  "Power Tools & Spare Parts",
  "Electrical Items",
  "Tools & TCT Core Cutter & Drill Bits",
  "Safety Items",
  "Hydraulic Items & Valves",
  "Measuring & Testing Instruments",
  "Nut Bolts & Washers",
  "Belts & Coupling",
  "Bearing",
  "General Items",
  "Oil Seal",
  // "Tools"


] as const;

export const categoryPreviewImages: Record<(typeof categories)[number], string> = {
  "Welding Accessories & Spare Parts": "category/welding Accessories & Spare Part.png",
  "Power Tools & Spare Parts": "category/All Kinds of Power Tools Accessories and Spare Parts.png",
  "Electrical Items": "category/Electrical Items.png",
  "Tools & TCT Core Cutter & Drill Bits": "category/tools & TCT core cutter & drills bits.png",
  "Safety Items": "category/safety items.png",
  "Hydraulic Items & Valves": "category/hydraulic items and valve.png",
  "Measuring & Testing Instruments": "category/meauring and testing instruments.png",
  "Nut Bolts & Washers": "category/nut bolts & washer.png",
  "Belts & Coupling": "category/Belt and coupling.png",
  "Bearing": "category/bearing.png",
  "General Items": "category/general items.png",
  "Oil Seal": "category/oil seal.png",
  // "Tools": "category/tools.png",
};

export const testimonials = [
  {
    name: "Mohan Builders",
    quote: "Reliable supply and fair pricing. Their quality is consistent every time.",
  },
  {
    name: "Ritika Interiors",
    quote: "Tools and safety gear delivery is quick, even for urgent project requirements.",
  },
  {
    name: "Nexa Contractors",
    quote: "Our go-to vendor for site essentials. Inquiry and response cycle is very smooth.",
  },
];
