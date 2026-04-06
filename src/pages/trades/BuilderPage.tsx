import TradePage from "@/components/TradePage";

const BuilderPage = () => (
  <TradePage
    tradeName="Builder"
    tradeSlug="builder"
    heroDescription="Find NHBRC-registered builders for new builds, additions, alterations, and structural work across South Africa. Get competitive quotes from verified professionals."
    services={[
      "New home construction",
      "Room additions and extensions",
      "Garage and carport construction",
      "Boundary and retaining walls",
      "Structural alterations and knock-throughs",
      "Approved building plans submission",
      "Foundation and slab work",
      "Braai and entertainment area builds",
      "Wendy houses and outbuildings",
      "NHBRC registration and compliance",
    ]}
    blogIntro="Building or extending your home is one of the biggest investments you'll make. In South Africa, any structural work above a certain value requires approved plans from your local municipality and, for new homes, registration with the NHBRC (National Home Builders Registration Council). Always verify that your builder is NHBRC-registered — this protects you under the Housing Consumers Protection Measures Act, meaning defects discovered within 5 years must be rectified at no cost to you."
    blogContent="Before breaking ground, ensure you have approved building plans. An unapproved structure can result in a demolition order from your municipality, even years after construction. Your builder should assist you in obtaining plans through a draughtsperson or architect. Get at least three quotes and ask each builder for a detailed Bill of Quantities (BOQ) that breaks down materials, labour, and timeframes so you can compare apples with apples. Be wary of any quote significantly lower than the others — it often signals corners will be cut on materials or labour."
    faqs={[
      {
        question: "Does my builder need to be NHBRC registered?",
        answer: "Yes, for new residential homes, NHBRC registration is a legal requirement under the Housing Consumers Protection Measures Act. Always ask for their NHBRC number and verify it on the NHBRC website before signing any contract.",
      },
      {
        question: "Do I need approved plans for an extension or addition?",
        answer: "Yes. Any structural addition to an existing home requires approved building plans from your local municipality. Your builder can recommend a draughtsperson to draw up plans for submission.",
      },
      {
        question: "How long does a typical room addition take?",
        answer: "A single room addition typically takes 4–8 weeks depending on size, finishes, and weather. Plan approval from the municipality can add 4–12 weeks before work begins.",
      },
      {
        question: "What should a building contract include?",
        answer: "A solid contract should specify the full scope of work, materials to be used, payment schedule, start and completion dates, a retention clause, and what happens in the event of defects or delays.",
      },
      {
        question: "Can I stay in my home during construction?",
        answer: "For most extensions and additions, yes. Your builder should clearly define the work zone and ensure safe access. For major structural work like knock-throughs or foundation work, temporary relocation may be recommended.",
      },
    ]}
  />
);

export default BuilderPage;
