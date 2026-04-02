import TradePage from "@/components/TradePage";

const PlastererPage = () => (
  <TradePage
    tradeName="Plasterer"
    tradeSlug="plasterer"
    heroDescription="Find skilled plasterers for skim coat finishing, crack repairs, damp proofing, and new plaster work on walls and ceilings across South Africa."
    services={[
      "Skim coat and smooth plaster finishing",
      "Rough cast and textured plaster",
      "Crack repair and patching",
      "Damp-proof plaster and tanking",
      "New wall and ceiling plastering",
      "Cornice and moulding installation",
      "Plaster repair after plumbing or electrical work",
      "Renovation and reskim of existing plaster",
      "Hardwall and base coat application",
      "Waterproof plaster for wet areas",
    ]}
    blogIntro={`Good plastering is the foundation of any quality paint job. Poorly skimmed walls will show every imperfection under paint — especially in raking light. In South Africa, most new builds use a cement and sand render base coat, finished with a skim coat of fine plaster or filler-based compound.

Crack repairs are one of the most common plastering jobs in South African homes. Hairline cracks are normal as buildings settle and expand with temperature changes, but wider cracks (over 3mm) may indicate structural movement and should be assessed before plastering over them.

Damp is another major plastering challenge. Rising damp from the ground and penetrating damp from external walls require specific plaster treatments — ordinary plaster over a damp wall will bubble and fail within months. Tanking plaster (a dense, waterproof render) is used in below-ground areas or highly exposed external walls.

For renovation projects, existing old plaster often needs to be assessed for soundness before repainting or reskimming. Hollow-sounding or soft plaster should be hacked off and replaced rather than plastered over.`}
    faqs={[
      {
        question: "How long does new plaster take to dry before painting?",
        answer: "New cement-based plaster should cure for at least 28 days before painting with alkali-resistant primer. Skim coat finishes can typically be primed after 5–7 days. Rushing this process causes paint adhesion failure.",
      },
      {
        question: "Can cracks in walls be permanently fixed?",
        answer: "Hairline cracks in stable walls can be permanently repaired by raking out, applying crack filler, and reskimming. Recurring or widening cracks may indicate structural movement — consult a structural engineer before plastering.",
      },
      {
        question: "What's the difference between skim coat and full plaster?",
        answer: "A skim coat is a thin finishing layer (2–5mm) applied over an existing plaster or block surface to create a smooth, paint-ready finish. Full plastering involves applying a 10–20mm render to bare brick or block from scratch.",
      },
      {
        question: "How do I know if I have rising damp?",
        answer: "Signs include a tide-mark stain on lower walls, bubbling or peeling paint near floor level, a musty smell, and white salt deposits (efflorescence) on walls. A plasterer can apply a damp-proof render, but severe rising damp may require a damp-proof course injection.",
      },
      {
        question: "How much does plastering cost per square metre?",
        answer: "Skim coat finishing costs R80–R150 per m². Full plaster on bare brick costs R120–R220 per m². Damp-proof plaster systems are typically R180–R350 per m² depending on the product used.",
      },
    ]}
  />
);

export default PlastererPage;
