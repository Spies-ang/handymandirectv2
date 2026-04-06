import TradePage from "@/components/TradePage";

const CarpenterPage = () => (
  <TradePage
    tradeName="Carpenter"
    tradeSlug="carpenter"
    heroDescription="Connect with skilled carpenters for custom built-in cupboards, wooden flooring, door installations, and bespoke woodwork across South Africa."
    services={[
      "Built-in bedroom and kitchen cupboards",
      "Wooden and laminate flooring installation",
      "Door hanging and frame repairs",
      "Wooden decking and pergolas",
      "Custom shelving and storage solutions",
      "Skirting board and architrave fitting",
      "Window frame repairs and replacements",
      "Ceiling and cornicing installation",
      "Furniture assembly and repairs",
      "Wooden staircase construction",
    ]}
    blogIntro="Custom carpentry adds significant value to your home — both aesthetically and in terms of functionality. South African homeowners commonly invest in built-in cupboards, wooden decks, and laminate flooring as high-return upgrades before selling or simply to improve daily living. When commissioning built-in cupboards, clarify whether the quote includes carcass material (chipboard vs. melamine), door finish (PVC wrap, solid wood, or lacquered), and hardware (hinges, drawer runners, and handles)."
    blogContent="For wooden decking, hardwoods like Balau and Saligna are popular in South Africa for their durability and resistance to weathering. Softwood decks are cheaper upfront but require more maintenance and may not last as long in South African conditions. Always ask your carpenter for examples of previous work and check that cut edges are sealed to prevent swelling from moisture — a common issue in coastal and highveld storm regions."
    faqs={[
      {
        question: "How much do built-in cupboards cost in South Africa?",
        answer: "Costs vary widely based on materials and size. Expect to pay R3,000–R8,000 per linear metre for standard melamine built-ins, and R6,000–R15,000+ per linear metre for solid wood or high-gloss finishes.",
      },
      {
        question: "What wood is best for outdoor decking in South Africa?",
        answer: "Balau is the most popular choice — it's durable, dense, and weathers beautifully. Saligna and Garapa are also excellent alternatives. All should be treated with a UV-resistant decking oil annually.",
      },
      {
        question: "Can a carpenter install laminate flooring over tiles?",
        answer: "Yes, provided the tiles are level and firmly adhered. An underlay is laid first for sound dampening and moisture protection. Bear in mind this raises floor height, which may affect door clearances.",
      },
      {
        question: "How long do built-in cupboards take to install?",
        answer: "A standard bedroom of built-ins typically takes 1–2 days for installation, after a 2–4 week manufacturing lead time. Kitchens can take 2–5 days to install depending on complexity.",
      },
      {
        question: "Do I need to supply the materials, or does the carpenter?",
        answer: "Most carpenters supply and source all materials and include this in their quote. If you want to supply your own materials, discuss this upfront as it affects pricing and may affect their workmanship warranty.",
      },
    ]}
  />
);

export default CarpenterPage;
