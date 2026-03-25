const categories = [
  "Cement",
  "Hand Tools",
  "Power Tools",
  "Plumbing",
  "Safety Gear",
];

const products = [
  {
    id: "cement-opc-53",
    name: "BuildStrong OPC 53 Grade Cement",
    category: "Cement",
    shortDescription: "High-strength OPC cement for RCC and structural work.",
    description:
      "Premium OPC 53 grade cement suitable for high-rise structures, beams, columns, and slabs. Delivers consistent early and long-term strength.",
    specs: ["Grade: OPC 53", "Bag Size: 50kg", "Shelf Life: 3 months"],
    priceMin: 380,
    priceMax: 420,
    unit: "per bag",
    image:
      "https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "cement-ppc-premium",
    name: "EcoMix PPC Cement",
    category: "Cement",
    shortDescription: "Durable and eco-friendly PPC cement for masonry and plaster.",
    description:
      "Pozzolana blended cement designed for smooth finish and improved workability, ideal for plastering and masonry jobs.",
    specs: ["Type: PPC", "Bag Size: 50kg", "Low heat hydration"],
    priceMin: 340,
    priceMax: 390,
    unit: "per bag",
    image:
      "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "hand-hammer-fiberglass",
    name: "FiberGrip Claw Hammer 16oz",
    category: "Hand Tools",
    shortDescription: "Shock-absorbing hammer for daily carpentry use.",
    description:
      "Durable forged steel claw hammer with anti-slip fiberglass handle for framing, nailing, and dismantling tasks.",
    specs: ["Weight: 16oz", "Handle: Fiberglass", "Grip: Anti-slip"],
    priceMin: 360,
    priceMax: 480,
    unit: "per piece",
    image:
      "https://images.unsplash.com/photo-1581147036324-cbe1f5e2d3f1?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "hand-spirit-level-24",
    name: "Precision Spirit Level 24 inch",
    category: "Hand Tools",
    shortDescription: "Accurate leveling tool for tile and masonry alignment.",
    description:
      "Aluminum body spirit level with high-visibility vials for horizontal and vertical precision alignment.",
    specs: ["Length: 24 inch", "Material: Aluminum", "Vials: 3"],
    priceMin: 520,
    priceMax: 690,
    unit: "per piece",
    image:
      "https://images.unsplash.com/photo-1609205807107-e8ec2120f7c2?auto=format&fit=crop&w=900&q=80",
    featured: false,
  },
  {
    id: "power-drill-13mm",
    name: "TorqueMax Impact Drill 13mm",
    category: "Power Tools",
    shortDescription: "High-performance impact drill for concrete and steel.",
    description:
      "650W variable speed drill with reverse mode and hammer function designed for demanding site operations.",
    specs: ["Power: 650W", "Chuck: 13mm", "Speed: 0-2800 RPM"],
    priceMin: 2990,
    priceMax: 3490,
    unit: "per piece",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "power-grinder-4inch",
    name: "CutPro Angle Grinder 4 inch",
    category: "Power Tools",
    shortDescription: "Compact grinder for cutting, grinding and polishing.",
    description:
      "Heavy duty 850W grinder with side handle support and safety guard for fabrication and finishing tasks.",
    specs: ["Disc Size: 100mm", "Power: 850W", "No Load Speed: 11000 RPM"],
    priceMin: 2450,
    priceMax: 2990,
    unit: "per piece",
    image:
      "https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=900&q=80",
    featured: false,
  },
  {
    id: "plumb-pvc-pipe-1in",
    name: "HydroFlow PVC Pipe 1 inch",
    category: "Plumbing",
    shortDescription: "Pressure-rated PVC pipe for home and site plumbing.",
    description:
      "Leak-resistant uPVC pipe suitable for water lines, drainage systems, and utility runs.",
    specs: ["Diameter: 1 inch", "Length: 3m", "Pressure: 6 kg/cm2"],
    priceMin: 210,
    priceMax: 290,
    unit: "per length",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "plumb-angle-valve-brass",
    name: "Brass Angle Valve Premium",
    category: "Plumbing",
    shortDescription: "Corrosion resistant angle valve for bathrooms and kitchens.",
    description:
      "Quarter-turn brass angle valve with chrome finish for smooth control and long life.",
    specs: ["Material: Brass", "Finish: Chrome", "Inlet: 1/2 inch"],
    priceMin: 260,
    priceMax: 410,
    unit: "per piece",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
    featured: false,
  },
  {
    id: "safety-helmet-abs",
    name: "SecureSite ABS Safety Helmet",
    category: "Safety Gear",
    shortDescription: "Lightweight industrial helmet with adjustable harness.",
    description:
      "ISI-style construction helmet engineered for impact protection and all-day comfort.",
    specs: ["Material: ABS", "Weight: 350g", "Harness: 6-point"],
    priceMin: 240,
    priceMax: 390,
    unit: "per piece",
    image:
      "https://images.unsplash.com/photo-1621955964441-c173e01c135b?auto=format&fit=crop&w=900&q=80",
    featured: true,
  },
  {
    id: "safety-gloves-cutresist",
    name: "CutShield Safety Gloves",
    category: "Safety Gear",
    shortDescription: "Cut-resistant gloves for fabrication and handling jobs.",
    description:
      "Breathable and high-grip gloves for improved protection while handling sharp edges and materials.",
    specs: ["Cut Level: 4", "Sizes: M/L/XL", "Material: HPPE blend"],
    priceMin: 190,
    priceMax: 320,
    unit: "per pair",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80",
    featured: false,
  },
];

for (let i = 1; i <= 150; i += 1) {
  const category = categories[i % categories.length];
  products.push({
    id: `mock-${category.toLowerCase().replace(/\s+/g, "-")}-${i}`,
    name: `${category} Pro Series ${i}`,
    category,
    shortDescription: `Reliable ${category.toLowerCase()} product designed for site performance.`,
    description: `Mock catalog item ${i} for ${category}. Replace with real SKUs and images during onboarding.`,
    specs: ["Warranty: 6 months", "Brand: BuildMart", "Stock: In stock"],
    priceMin: 150 + i * 20,
    priceMax: 220 + i * 25,
    unit: "per piece",
    image: `https://picsum.photos/seed/buildmart-${i}/900/700`,
    featured: i % 7 === 0,
  });
}

module.exports = { products, categories };
