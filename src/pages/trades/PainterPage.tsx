import TradePage from "@/components/TradePage";

const PainterPage = () => (
  <TradePage
    tradeName="Painter"
    tradeSlug="painter"
    heroDescription="Hire experienced painters for interior and exterior painting, waterproofing, and roof painting. Quality finishes using top South African paint brands."
    services={[
      "Interior wall and ceiling painting",
      "Exterior painting and preparation",
      "Waterproofing of walls and flat roofs",
      "Roof painting and sealing",
      "Damp treatment and sealant application",
      "Plascon, Dulux, and Prominent Paints supply",
      "Feature and accent wall painting",
      "Garage floor and epoxy coating",
      "Timber and door varnishing",
      "Pre-sale painting and touch-ups",
    ]}
    blogIntro={`A fresh coat of paint is the most cost-effective way to transform your home — inside and out. In South Africa's varied climate, from the UV intensity of the Highveld to the moisture-heavy Cape winters, choosing the right paint system is as important as the application quality.

For exterior painting, surface preparation is everything. Old, flaking paint must be fully scraped and sanded before any new coat is applied. Skipping this step is the most common reason exterior paint fails within 2–3 years. A good painter will spend more time preparing than painting.

Waterproofing should be addressed before painting if you have damp walls, parapet walls, or a flat roof. Painting over damp without treatment will cause paint failure within months. Reputable painters use systems like Dulux Weatherguard, Plascon Micatex, or dedicated waterproofing coatings like Sika or Chryso.

For interior painting, always use a good primer on new plaster or repainted surfaces. PVA is suitable for most interior walls, while kitchens and bathrooms benefit from a washable or semi-gloss finish that resists moisture and marks.`}
    faqs={[
      {
        question: "How much does it cost to paint a house exterior in South Africa?",
        answer: "Exterior painting costs depend on surface area, condition, and number of storeys. Expect R18–R35 per square metre for walls, including preparation and two coats. A typical 3-bedroom home exterior costs R15,000–R40,000.",
      },
      {
        question: "How long does exterior paint last?",
        answer: "Quality exterior paint, properly applied on a prepared surface, should last 5–8 years in South Africa. Cheaper paint or poor preparation can fail in 2–3 years, especially on sun-facing walls.",
      },
      {
        question: "What's the best paint for South African exteriors?",
        answer: "Plascon Micatex, Dulux Weatherguard, and Prominent Paints Revela are all well-regarded for South African conditions. For waterproofing, Plascon Waterproof or Dulux Weathershield are popular choices.",
      },
      {
        question: "Can painters fix damp before painting?",
        answer: "Yes, most experienced painters can apply damp sealers and waterproofing treatments before painting. For severe rising damp or structural water ingress, a specialist damp-proofing contractor may be required first.",
      },
      {
        question: "Do I need to move furniture before interior painting?",
        answer: "Ideally, yes — move furniture to the centre of the room or to another room entirely. Good painters will lay drop cloths, but clearing the area speeds up the job and reduces the risk of damage.",
      },
    ]}
  />
);

export default PainterPage;
