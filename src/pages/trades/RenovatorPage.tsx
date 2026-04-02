import TradePage from "@/components/TradePage";

const RenovatorPage = () => (
  <TradePage
    tradeName="Renovator"
    tradeSlug="renovator"
    heroDescription="Find experienced renovation contractors for kitchen and bathroom remodels, full home renovations, and property upgrades that add real value."
    services={[
      "Full kitchen renovations and remodels",
      "Bathroom renovation and retiling",
      "Open-plan conversions and knock-throughs",
      "Laundry and utility room upgrades",
      "Home office and study conversions",
      "Entertainment area and braai builds",
      "Complete interior gut and redo",
      "Pre-sale renovation and value-add upgrades",
      "Granny flat and flatlet conversions",
      "Multi-trade project coordination",
    ]}
    blogIntro={`Renovation projects are the most complex home improvement undertaking — they involve multiple trades, sequencing decisions, and significant financial investment. The difference between a smooth renovation and a nightmare often comes down to planning and contractor selection.

Kitchen and bathroom renovations offer the highest return on investment in the South African property market. A well-executed kitchen remodel can add 5–15% to a home's value. The key is to balance quality finishes with the value ceiling of your suburb — over-capitalising on a renovation in a lower-value area seldom returns the full investment.

When planning a renovation, sequence is everything. Typically: demolition first, then structural work, rough plumbing and electrical, waterproofing, tiling, cabinetry and joinery, final electrical and plumbing fit-off, plastering, painting, and finally floor coverings and fixtures. Disrupting this sequence causes costly rework.

Budget for a 10–15% contingency on any renovation. Hidden surprises — old wiring, rising damp behind tiles, substandard previous work — are common in South African homes, particularly in properties built before 1990.`}
    faqs={[
      {
        question: "How long does a kitchen renovation take?",
        answer: "A mid-range kitchen renovation typically takes 3–6 weeks from demolition to completion, assuming no major structural changes. Custom cabinetry lead times of 3–6 weeks often sit on the critical path, so order early.",
      },
      {
        question: "Do I need approved plans for a kitchen or bathroom renovation?",
        answer: "Generally no, for like-for-like renovations within the existing footprint. If you're moving walls, adding windows, or changing the home's structure, approved plans from your municipality are required.",
      },
      {
        question: "Should I use one contractor or manage multiple trades myself?",
        answer: "A main contractor or renovation company to coordinate trades is almost always worth the margin they charge. Coordinating a plumber, electrician, tiler, carpenter, and plasterer yourself is a full-time job and sequencing mistakes are expensive.",
      },
      {
        question: "What's the ROI on a bathroom renovation in South Africa?",
        answer: "A modernised bathroom typically adds R1.20–R1.80 in property value for every R1.00 spent on renovation, depending on the suburb and quality of finish. Outdated bathrooms are one of the top buyer objections in the South African market.",
      },
      {
        question: "How do I avoid renovation cost overruns?",
        answer: "Get a detailed, itemised quote before starting. Lock in material costs upfront where possible. Maintain a 10–15% contingency budget. Avoid scope changes once work has started — every change costs more mid-renovation than it would have at planning stage.",
      },
    ]}
  />
);

export default RenovatorPage;
