export const categories = [
  "Welding Accessories & Spare Parts",
  "Power Tools & Spare Parts",
  "Electrical Items",
  "Tools & TCT Core Cutter & Dill bits",
  "Safety Items",
  "Hydraulic Items & Valves",
  "Measuring & Testing Instruments",
  "Nut Bolts & Washers",
  "Belts & Coupling",
  "Bearing",
  "General Items",
  "Oil seal",
  "tools"


] as const;

export const categoryPreviewImages: Record<(typeof categories)[number], string> = {
  "Welding Accessories & Spare Parts": "/welding Accessories & Spare Part.png",
  "Power Tools & Spare Parts": "/All Kinds of Power Tools Accessories and Spare Parts.png",
  "Electrical Items": "/Electrical Items.png",
  "Tools & TCT Core Cutter & Dill bits": "/tools & TCT core cutter & drills bits.png",
  "Safety Items": "/safety items.png",
  "Hydraulic Items & Valves": "/hydraulic items and valve.png",
  "Measuring & Testing Instruments": "/meauring and testing instruments.png",
  "Nut Bolts & Washers": "/nut bolts & washer.png",
  "Belts & Coupling": "/Belt and coupling.png",
  Bearing: "/bearing.png",
  "General Items": "/general items.png",
  "Oil seal": "/oil seal.png",
  tools: "/tools.png",
};

export const testimonials = [
  {
    name: "Mohan Builders",
    quote: "Reliable supply and fair pricing. Their cement quality is consistent every time.",
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
