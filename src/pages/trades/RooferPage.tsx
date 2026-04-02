import TradePage from "@/components/TradePage";

const RooferPage = () => (
  <TradePage
    tradeName="Roofer"
    tradeSlug="roofer"
    heroDescription="Get quotes from experienced roofers for leak repairs, IBR and Chromadek replacements, flat roof waterproofing, and full roof installations across South Africa."
    services={[
      "Roof leak detection and repair",
      "IBR and Chromadek sheet replacement",
      "Concrete and clay roof tile repairs",
      "Flat roof waterproofing and re-coating",
      "Fascia board and barge board replacement",
      "Gutter installation and repairs",
      "Roof structure and rafter repairs",
      "Skylights and roof window installation",
      "Ridge cap and flashing repairs",
      "Full roof replacements and reroofing",
    ]}
    blogIntro={`Your roof is your home's first line of defence against the elements — and in South Africa, it takes a beating. From the violent hailstorms of Gauteng to the Cape's driving winter rains and the coastal humidity of KwaZulu-Natal, roofs face extreme and varied conditions.

The most common roofing material in South Africa is IBR (Inverted Box Rib) sheeting — a corrugated steel profile available in Chromadek (pre-painted) or galvanised finishes. Chromadek roofs typically last 15–25 years before they require replacement, depending on exposure. Coastal properties face accelerated corrosion from salt air and may require more frequent inspection.

Tile roofs — both concrete and clay — are popular on older and higher-end homes. Individual tiles can crack or slip, allowing water ingress. A roofer can often repair tile damage without a full replacement, provided the underlying sarking (roofing membrane) and timber battens are in good condition.

Never ignore a roof leak. Water ingress may seem minor but travels along rafters and ceiling joists before dripping through, meaning the source is often metres from where the leak appears inside. Prompt repair prevents structural timber damage, ceiling board failure, and mould growth.`}
    faqs={[
      {
        question: "How do I find where a roof leak is coming from?",
        answer: "Roof leaks are notoriously difficult to trace — water travels along rafters before appearing inside. A roofer will inspect flashings, ridge caps, penetration points (pipes, skylights), and sheet or tile overlaps. A hose test from outside can help isolate the area.",
      },
      {
        question: "How long does a Chromadek roof last?",
        answer: "A quality Chromadek roof properly installed should last 15–25 years. Coastal properties may have a shorter lifespan due to salt corrosion. Annual inspection and prompt repair of minor issues significantly extends roof life.",
      },
      {
        question: "Do I need a permit to replace my roof?",
        answer: "A like-for-like roof replacement (same material, same pitch) generally doesn't require council approval. Changes to roof pitch, structure, or adding extra storeys do require approved plans. Check with your local municipality.",
      },
      {
        question: "What causes flat roof leaks?",
        answer: "Flat roofs leak due to failed waterproofing membranes, cracked screed, blocked drainage causing ponding, and failed flashings at parapet walls. Torch-on bitumen or liquid-applied waterproofing are the most common South African repair solutions.",
      },
      {
        question: "Can hail damage be claimed from home insurance?",
        answer: "Yes — hail damage is covered under most South African home insurance policies. Document the damage with photos, contact your insurer, and get a written quote from a roofer for their assessment. Insurers often require a professional inspection report.",
      },
    ]}
  />
);

export default RooferPage;
