export interface TradeData {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  services: string[];
  faqs: { q: string; a: string }[];
  priceRange: string;
}

export const trades: TradeData[] = [
  {
    name: "Builder",
    slug: "builder",
    description: "Professional builders for construction, extensions, boundary walls, and structural work.",
    longDescription: "Whether you're building from scratch, adding an extension, or repairing structural damage, our verified builders deliver quality workmanship you can trust. From boundary walls to full house builds, find the right builder for your project.",
    services: ["House building", "Extensions & additions", "Boundary walls", "Structural repairs", "Retaining walls", "Garage construction"],
    faqs: [
      { q: "How much does a builder cost in South Africa?", a: "Builder rates typically range from R550/hr to R2,000+ per day depending on the scope. Get up to 3 quotes through Handyman Direct to compare." },
      { q: "Do your builders handle permits?", a: "Many of our builders can assist with municipal plan submissions and building permits. Discuss this when you receive your quotes." },
      { q: "How long does a typical extension take?", a: "A standard room extension takes 4-8 weeks depending on size and complexity. Your builder will provide a timeline with their quote." },
    ],
    priceRange: "R550–R2,500/day",
  },
  {
    name: "Carpenter",
    slug: "carpenter",
    description: "Skilled carpenters for custom furniture, kitchen fittings, door hanging, and woodwork.",
    longDescription: "From custom cabinetry to door installations, our carpenters bring precision and craftsmanship to every project. Whether it's built-in cupboards, decking, or furniture repairs, find a verified carpenter near you.",
    services: ["Custom cabinetry", "Kitchen fittings", "Door & window installation", "Built-in cupboards", "Wooden decking", "Furniture repairs"],
    faqs: [
      { q: "How much do carpenters charge?", a: "Carpenter rates range from R450–R1,500/day depending on the complexity. Custom work typically costs more than standard installations." },
      { q: "Can I supply my own materials?", a: "Yes, most carpenters are happy for you to supply materials. Discuss this upfront to get an accurate labour-only quote." },
      { q: "How long does a kitchen fitting take?", a: "A standard kitchen fitting takes 3-7 days. Custom kitchens may take longer depending on design complexity." },
    ],
    priceRange: "R450–R1,500/day",
  },
  {
    name: "Electrician",
    slug: "electrician",
    description: "Certified electricians for wiring, DB boards, solar installations, and electrical repairs.",
    longDescription: "Electrical work requires certified professionals. Our verified electricians handle everything from fault-finding and rewiring to solar panel installations and compliance certificates. Safe, reliable, and fully qualified.",
    services: ["Electrical fault-finding", "DB board upgrades", "Rewiring", "Solar installations", "Compliance certificates (CoC)", "Lighting installations"],
    faqs: [
      { q: "Are your electricians certified?", a: "Yes, all electricians on our platform hold valid wireman's licences and can issue Certificates of Compliance (CoC)." },
      { q: "How much does an electrician cost?", a: "Electrician call-out fees start at R350, with hourly rates from R450–R750/hr depending on the job complexity." },
      { q: "Can you install solar panels?", a: "Yes, several of our electricians specialise in solar installations including panels, inverters, and battery systems." },
    ],
    priceRange: "R350–R750/hr",
  },
  {
    name: "Handyman",
    slug: "handyman",
    description: "General handymen for odd jobs, repairs, installations, and maintenance around your home.",
    longDescription: "Need a jack of all trades? Our handymen tackle everything from shelving and picture hanging to minor plumbing and electrical fixes. Perfect for those odd jobs that don't need a specialist.",
    services: ["General repairs", "Shelving & mounting", "Furniture assembly", "Minor plumbing", "Gutter cleaning", "Lock replacements"],
    faqs: [
      { q: "What can a handyman do?", a: "Handymen handle general repairs, installations, and maintenance tasks. For specialised work like electrical or major plumbing, we recommend a certified tradesman." },
      { q: "How much does a handyman charge?", a: "Handyman rates start from R99 for small jobs, R350 for call-outs, and R550/hr for standard work." },
      { q: "Can I book a handyman for a few hours?", a: "Yes! Use our Instant Booking option for prepaid hourly service — a vetted handyman dispatched to you fast." },
    ],
    priceRange: "R99–R550/hr",
  },
  {
    name: "Painter",
    slug: "painter",
    description: "Professional painters for interior, exterior, waterproofing, and specialty finishes.",
    longDescription: "Transform your space with our professional painters. From full interior repaints to exterior waterproofing and specialty finishes, our painters deliver clean, lasting results every time.",
    services: ["Interior painting", "Exterior painting", "Waterproofing", "Specialty finishes", "Wallpaper installation", "Roof painting"],
    faqs: [
      { q: "How much does painting cost per room?", a: "Interior painting typically costs R1,500–R4,000 per room depending on size, prep work needed, and paint quality." },
      { q: "Do painters supply paint?", a: "Most painters can supply paint at trade prices, or you can supply your own. Discuss your preference when requesting quotes." },
      { q: "How long does exterior painting take?", a: "A standard house exterior takes 3-7 days depending on size, condition, and weather." },
    ],
    priceRange: "R1,500–R4,000/room",
  },
  {
    name: "Paver",
    slug: "paver",
    description: "Expert pavers for driveways, patios, pathways, and decorative paving solutions.",
    longDescription: "Enhance your property's kerb appeal with professional paving. Our pavers handle driveways, patios, garden paths, and pool surrounds with precision and durability.",
    services: ["Driveway paving", "Patio installation", "Garden pathways", "Pool surrounds", "Paving repairs", "Decorative borders"],
    faqs: [
      { q: "How much does paving cost per square metre?", a: "Paving typically costs R250–R600/m² including materials and labour, depending on the paver type and pattern." },
      { q: "How long does a driveway take?", a: "A standard driveway takes 3-5 days depending on size, prep work, and drainage requirements." },
      { q: "What type of pavers do you recommend?", a: "Your paver will recommend the best option based on your needs — clay, concrete, or natural stone each have advantages." },
    ],
    priceRange: "R250–R600/m²",
  },
  {
    name: "Plasterer",
    slug: "plasterer",
    description: "Skilled plasterers for wall plastering, skimming, cornices, and ceiling repairs.",
    longDescription: "Get smooth, professional wall finishes with our verified plasterers. From new builds needing full plastering to skim coats, cornice installation, and ceiling repairs.",
    services: ["Wall plastering", "Skim coating", "Cornice installation", "Ceiling repairs", "Cove installation", "Textured finishes"],
    faqs: [
      { q: "How much does plastering cost?", a: "Plastering costs R80–R180/m² depending on the type of finish and condition of the walls." },
      { q: "What's the difference between plastering and skimming?", a: "Plastering applies a thick coat to bare brick/block. Skimming is a thin finish coat over existing plaster to smooth imperfections." },
      { q: "How long does plaster take to dry?", a: "Plaster typically takes 5-7 days to dry fully before painting, depending on thickness and conditions." },
    ],
    priceRange: "R80–R180/m²",
  },
  {
    name: "Plumber",
    slug: "plumber",
    description: "Qualified plumbers for geysers, leaks, drains, bathroom fittings, and water systems.",
    longDescription: "From burst pipes and geyser replacements to full bathroom installations, our plumbers are fast, reliable, and qualified. Emergency call-outs available for urgent plumbing problems.",
    services: ["Geyser installation & repair", "Leak detection & repair", "Drain unblocking", "Bathroom installations", "Water pressure systems", "Solar geyser installation"],
    faqs: [
      { q: "How much does a plumber cost?", a: "Plumber call-outs start at R350, with hourly rates from R450–R700. Geyser replacements typically cost R6,000–R12,000 installed." },
      { q: "Do you offer emergency plumbing?", a: "Yes, many of our plumbers offer emergency call-outs for burst pipes, flooding, and other urgent issues." },
      { q: "Can you install a solar geyser?", a: "Yes, several of our plumbers specialise in solar geyser installations and can advise on the best system for your home." },
    ],
    priceRange: "R350–R700/hr",
  },
  {
    name: "Renovator",
    slug: "renovator",
    description: "Full-service renovators for kitchen, bathroom, and whole-house renovations.",
    longDescription: "Planning a renovation? Our renovators manage the full process — from design and demolition to finishing touches. Kitchens, bathrooms, and whole-house makeovers handled professionally.",
    services: ["Kitchen renovations", "Bathroom renovations", "Full house renovations", "Open-plan conversions", "Garage conversions", "Property upgrades"],
    faqs: [
      { q: "How much does a kitchen renovation cost?", a: "Kitchen renovations typically range from R30,000–R150,000+ depending on size, finishes, and appliances." },
      { q: "How long does a renovation take?", a: "A bathroom renovation takes 2-4 weeks, a kitchen 3-6 weeks, and a full house renovation 2-4 months." },
      { q: "Do renovators handle all trades?", a: "Yes, our renovators coordinate all trades (plumbing, electrical, tiling, etc.) so you have a single point of contact." },
    ],
    priceRange: "R30,000–R150,000+",
  },
  {
    name: "Roofer",
    slug: "roofer",
    description: "Professional roofers for repairs, waterproofing, re-roofing, and new installations.",
    longDescription: "Protect your home with expert roofing services. Our roofers handle leak repairs, waterproofing, full re-roofs, and new installations across all roof types — tiles, sheeting, thatch, and flat roofs.",
    services: ["Roof leak repairs", "Waterproofing", "Re-roofing", "New roof installations", "Gutter installation", "Roof inspections"],
    faqs: [
      { q: "How much does a roof repair cost?", a: "Minor roof repairs start from R500. Full waterproofing costs R80–R200/m². Re-roofing depends on size and material." },
      { q: "How do I know if my roof needs replacing?", a: "Signs include persistent leaks, sagging, cracked tiles, or a roof over 30 years old. Book an inspection to assess." },
      { q: "Do you work with all roof types?", a: "Yes — our roofers handle tiles, IBR sheeting, corrugated iron, flat roofs, and thatch." },
    ],
    priceRange: "R500–R200/m²",
  },
  {
    name: "Tiler",
    slug: "tiler",
    description: "Expert tilers for bathrooms, kitchens, floors, and decorative tiling projects.",
    longDescription: "Get flawless tiling with our verified professionals. From bathroom and kitchen backsplashes to full floor tiling and outdoor areas, our tilers deliver precision finishes every time.",
    services: ["Bathroom tiling", "Kitchen backsplashes", "Floor tiling", "Outdoor tiling", "Mosaic & feature walls", "Tile repairs"],
    faqs: [
      { q: "How much does tiling cost per square metre?", a: "Tiling labour costs R180–R400/m² depending on tile size, pattern, and complexity. Materials are additional." },
      { q: "Should I buy my own tiles?", a: "You can supply your own tiles or ask your tiler to source them. Buy 10% extra to account for cuts and breakage." },
      { q: "How long does bathroom tiling take?", a: "A standard bathroom takes 3-5 days including waterproofing, preparation, tiling, and grouting." },
    ],
    priceRange: "R180–R400/m²",
  },
  {
    name: "Welder",
    slug: "welder",
    description: "Skilled welders for security gates, burglar bars, balustrades, and custom metalwork.",
    longDescription: "From security gates and burglar bars to custom balustrades and decorative metalwork, our welders combine strength with style. On-site welding and fabrication services available.",
    services: ["Security gates", "Burglar bars", "Balustrades & handrails", "Carports & shade ports", "Custom fabrication", "Welding repairs"],
    faqs: [
      { q: "How much does a security gate cost?", a: "Security gates range from R2,500–R8,000+ depending on size, design, and material (mild steel or aluminium)." },
      { q: "Can welders work on-site?", a: "Yes, most welders offer on-site welding for installations and repairs. Some custom work may require off-site fabrication." },
      { q: "Do you install automated gates?", a: "Yes, several of our welders install and maintain automated gate motors and systems." },
    ],
    priceRange: "R2,500–R8,000+",
  },
];

export interface CityData {
  name: string;
  slug: string;
  description: string;
  suburbs: string[];
}

export const cities: CityData[] = [
  {
    name: "Centurion",
    slug: "centurion",
    description: "Find trusted tradesmen in Centurion and surrounding suburbs. Handyman Direct connects you with verified contractors for any home improvement or repair project.",
    suburbs: ["Eldoraigne", "Wierdapark", "Zwartkop", "Lyttelton", "Hennopspark", "Rooihuiskraal", "The Reeds", "Centurion Central", "Irene", "Pierre van Ryneveld", "Clubview", "Wierda Park"],
  },
  {
    name: "Pretoria",
    slug: "pretoria",
    description: "Find trusted tradesmen in Pretoria and surrounding suburbs. From Hatfield to Waterkloof, Handyman Direct has verified contractors ready to help.",
    suburbs: ["Hatfield", "Brooklyn", "Menlyn", "Waterkloof", "Arcadia", "Silverton", "Garsfontein", "Montana", "Faerie Glen", "Lynnwood", "Moot", "Sunnyside"],
  },
  {
    name: "Johannesburg",
    slug: "johannesburg",
    description: "Find trusted tradesmen in Johannesburg and surrounding suburbs. From Sandton to Roodepoort, get quotes from verified contractors.",
    suburbs: ["Sandton", "Randburg", "Roodepoort", "Midrand", "Fourways", "Bryanston", "Bedfordview", "Edenvale", "Northcliff", "Melville", "Parkhurst", "Greenside"],
  },
];
