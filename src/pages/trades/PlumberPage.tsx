import TradePage from "@/components/TradePage";

const PlumberPage = () => (
  <TradePage
    tradeName="Plumber"
    tradeSlug="plumber"
    heroDescription="Connect with registered plumbers for geyser installations, burst pipe repairs, leak detection, and bathroom plumbing across South Africa. Fast response for emergencies."
    services={[
      "Geyser installation and replacement",
      "Burst pipe repair and emergency callouts",
      "Leak detection and repair",
      "Bathroom and kitchen plumbing installation",
      "Toilet, basin, and shower fitting",
      "Heat pump and solar geyser installation",
      "Drain unblocking and jetting",
      "Water meter installation and relocation",
      "Borehole pump installation",
      "Pre-sale plumbing compliance certificates",
    ]}
    blogIntro="Plumbing is one of those trades where the cost of getting it wrong far exceeds the cost of getting it right. A geyser that's incorrectly installed or maintained can result in floods, structural damage, and voided insurance claims. Geysers are the single most common plumbing issue in South African homes — the average geyser lasts 8–12 years, after which the risk of failure increases significantly. Replacement typically includes the geyser, pressure control valve, drip tray, and vacuum breaker, all required under SANS 10254."
    blogContent="When a geyser bursts, the immediate priority is to isolate the water supply — know where your main stop valve is located, typically in the garage, under the kitchen sink, or at the boundary of the property. Leak detection is increasingly high-tech in South Africa: non-invasive acoustic detection can locate underground or in-slab pipe leaks without unnecessary digging. If your water bill spikes unexpectedly, it's worth calling a plumber to test for invisible leaks before the damage compounds."
    faqs={[
      {
        question: "What should I do if my geyser bursts?",
        answer: "Turn off the main water supply immediately (usually a stop tap in the garage or at the boundary). Then turn off the electricity to the geyser at the DB board. Call a plumber — most can respond within a few hours for geyser emergencies.",
      },
      {
        question: "How long does a geyser replacement take?",
        answer: "A straightforward like-for-like geyser replacement typically takes 3–5 hours. If the geyser is in an awkward location or new piping is required, it may take a full day.",
      },
      {
        question: "Does my plumber need to be registered?",
        answer: "Yes. Plumbers in South Africa should be registered with the PIRB (Plumbing Industry Registration Board). Registered plumbers can issue compliance certificates required for insurance and property sales.",
      },
      {
        question: "My water bill has spiked — could I have a leak?",
        answer: "Yes. Check your meter at night when no water is being used — if it's still moving, you have a leak. Common culprits are toilet cisterns (silent leaks), irrigation pipes, and underground supply pipes. A plumber can perform a pressure test to identify the source.",
      },
      {
        question: "Is a heat pump worth it compared to a standard geyser?",
        answer: "In most South African climates, yes. A heat pump uses 60–75% less electricity than a traditional element-based geyser, saving R400–R800 per month on electricity. The higher upfront cost is typically recovered within 2–4 years.",
      },
    ]}
  />
);

export default PlumberPage;
