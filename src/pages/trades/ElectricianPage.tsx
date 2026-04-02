import TradePage from "@/components/TradePage";

const ElectricianPage = () => (
  <TradePage
    tradeName="Electrician"
    tradeSlug="electrician"
    heroDescription="Book a certified electrician for COC certificates, DB board upgrades, load shedding solutions, and electrical installations. All work compliant with SANS 10142."
    services={[
      "Certificate of Compliance (COC) issuing",
      "DB board upgrades and fault finding",
      "Solar and inverter system installation",
      "Generator and UPS integration",
      "Plug, light, and switch installations",
      "Geyser electrical connections",
      "Borehole pump wiring",
      "Three-phase and single-phase wiring",
      "Electric fence energiser installation",
      "Pre-sale electrical inspections",
    ]}
    blogIntro={`Electrical work in South Africa is regulated under SANS 10142-1 and must be carried out by a registered electrician. Only a registered person can legally issue a Certificate of Compliance (COC) — a document required by law when selling a property or after any new electrical installation.

A COC certifies that your electrical installation meets the national standard at the time of issue. Without one, your home insurance may not pay out in the event of an electrical fire. When buying a home, always request a current COC from the seller.

South Africa's energy landscape has changed significantly. Loadshedding has driven demand for solar PV systems, inverters, and battery backup solutions. If you're considering solar, ensure your electrician is registered with the ECSA (Engineering Council of South Africa) or is a certified installer recognised by your municipality, as grid-tied systems require council approval.

DB board (distribution board) upgrades are increasingly common as homes add more high-draw appliances. An overloaded or outdated DB board is a fire risk — if your circuit breakers trip frequently or your DB board is older than 15 years, a professional assessment is recommended.`}
    faqs={[
      {
        question: "What is a COC and when do I need one?",
        answer: "A Certificate of Compliance (COC) proves your electrical installation complies with SANS 10142. You need one when selling your home, after any new electrical installation, and it's recommended every 10 years even without changes.",
      },
      {
        question: "Can any electrician issue a COC?",
        answer: "No. Only an electrician registered with the Department of Labour as an Installation Electrician or Master Installation Electrician can legally issue a COC in South Africa.",
      },
      {
        question: "How much does a COC cost?",
        answer: "A COC for a standard home typically costs R800–R2,500 depending on the size of the property and whether any remedial work is needed to bring the installation up to standard.",
      },
      {
        question: "Do I need council approval for solar panels?",
        answer: "Yes, for grid-tied systems (those connected to Eskom or municipal supply). Your electrician must submit a COC for the solar installation, and your municipality must approve the grid connection. Off-grid systems are less regulated.",
      },
      {
        question: "My DB board trips constantly — what should I do?",
        answer: "Frequent tripping indicates either an overloaded circuit, a faulty appliance, or an undersized DB board. Have a registered electrician inspect the board. Don't tape or bypass breakers — this is a serious fire and safety hazard.",
      },
    ]}
  />
);

export default ElectricianPage;
