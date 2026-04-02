import TradePage from "@/components/TradePage";

const WelderPage = () => (
  <TradePage
    tradeName="Welder"
    tradeSlug="welder"
    heroDescription="Find skilled welders for security gates, burglar bars, steel fencing, carports, and custom metalwork across South Africa."
    services={[
      "Security gate fabrication and installation",
      "Burglar bar design and fitting",
      "Palisade and steel panel fencing",
      "Carport and shade structure fabrication",
      "Steel staircase and balustrade construction",
      "Driveway and pedestrian gate automation",
      "Metal door frames and steel doors",
      "Custom braai and fire pit fabrication",
      "Structural steel and I-beam work",
      "Welding repairs and modifications",
    ]}
    blogIntro={`Steel fabrication and welding is a critical trade in South African security and construction. With home security a top priority for most homeowners, welders are in constant demand for burglar bars, security gates, and perimeter fencing — and the quality of this work directly affects both security and property aesthetics.

Security design has evolved significantly. The standard tubular burglar bars of the 1980s have largely given way to more aesthetically considered designs — decorative steel, sliding security gates with automation, and palisade fencing that balances visibility with access control. A skilled fabricator can design and manufacture these to your specification.

For automated gates, the welding and installation of the gate structure is separate from the automation motor and control panel — typically done by the same contractor or in coordination with an access control specialist. Ensure your gate is structurally sound before automation is fitted, as an unbalanced or warped gate will destroy motors prematurely.

Structural steel work — I-beams, lintels, and load-bearing columns — requires a welder with structural welding certification. This is not the same skill as fabrication welding. Always confirm your welder's qualifications for structural applications, as substandard welds in structural elements pose serious safety risks.`}
    faqs={[
      {
        question: "How much do burglar bars cost in South Africa?",
        answer: "Standard fixed burglar bars cost R350–R650 per window opening installed. Removable or hinged bars (recommended for fire escape) cost R600–R1,200 per window. Custom decorative designs are priced per project.",
      },
      {
        question: "What's the difference between palisade and panel fencing?",
        answer: "Palisade fencing uses vertical steel spikes on a horizontal rail — visible through the fence, providing security without blocking sightlines. Panel fencing uses solid steel sheets, offering privacy but reducing visibility. Palisade is more common in South African residential security applications.",
      },
      {
        question: "Can I automate an existing manual gate?",
        answer: "Yes, in most cases. However, the gate structure must be assessed first. An unbalanced, warped, or lightweight gate may need to be replaced or reinforced before automation. Your welder and the automation installer should coordinate on this.",
      },
      {
        question: "What causes welded security gates to rust?",
        answer: "Rust is caused by moisture penetrating raw or damaged steel. All welded steel should be properly cleaned, primed, and painted before installation. In coastal areas, use hot-dip galvanised steel or stainless steel where possible, and re-paint every 3–5 years.",
      },
      {
        question: "Do welded structures need engineering sign-off?",
        answer: "For structural steel work (beams, columns, load-bearing elements), yes — a Professional Engineer should review and sign off the design. For non-structural work like gates, fencing, and burglar bars, no formal certification is required, but workmanship quality still matters greatly.",
      },
    ]}
  />
);

export default WelderPage;
