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
  "Welding Accessories & Spare Parts": "/public/welding Accessories & Spare Part.png",
  "Power Tools & Spare Parts": "/public/All Kinds of Power Tools Accessories and Spare Parts.png",
  "Electrical Items": "/public/Electrical Items.png",
  "Tools & TCT Core Cutter & Dill bits" :"/public/tools & TCT core cutter & drills bits.png",
  "Safety Items": "/public/safety items.png",
  "Hydraulic Items & Valves": "/public/hydraulic items and valve.png",
  "Measuring & Testing Instruments": "/public/meauring and testing instruments.png",
  "Nut Bolts & Washers": "/public/nut bolts & washer.png",
  "Belts & Coupling": "/public/Belt and coupling.png",
  "Bearing": "/public/bearing.png",
  "General Items": "/public/general items.png",
  "Oil seal" : "/public/oil seal.png",
  "tools":"/public/tools"
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
