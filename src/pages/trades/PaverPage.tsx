import TradePage from "@/components/TradePage";

const PaverPage = () => (
  <TradePage
    tradeName="Paver"
    tradeSlug="paver"
    heroDescription="Get quotes from experienced pavers for driveways, patios, pathways, and pool surrounds. Cobble, clay brick, and concrete paving installed to last."
    services={[
      "Brick and cobble driveway paving",
      "Patio and entertainment area paving",
      "Pathway and garden paving",
      "Pool surround paving",
      "Concrete paving and stencilling",
      "Paving repairs and re-levelling",
      "Kerbing and edging installation",
      "Sub-base and drainage preparation",
      "Exposed aggregate driveways",
      "Retaining walls and step construction",
    ]}
    blogIntro={`A well-paved driveway or patio adds immediate kerb appeal and usable outdoor living space. In South Africa, clay brick pavers and concrete cobbles are the most popular choices — durable, low-maintenance, and suited to the local climate.

The key to long-lasting paving is what's underneath. A proper sub-base of compacted G5 or crusher run material, at least 100mm deep, prevents paving from sinking, shifting, or cracking. Cutting corners on the sub-base is the number one cause of paving failure — especially on driveways that bear vehicle weight.

Drainage is equally critical. Paving must be laid with a slight gradient (typically 1:50) to direct water away from structures. Inadequate falls lead to pooling water, which causes efflorescence (white salt staining) and eventual sub-base erosion.

For driveways, discuss the expected loads with your paver. Domestic vehicles require a different spec than trucks or heavy machinery. A thicker sand bed and denser sub-base are needed for heavier use.`}
    faqs={[
      {
        question: "How much does driveway paving cost per square metre in South Africa?",
        answer: "Standard clay brick or concrete paving costs R250–R450 per m² installed, including sub-base preparation. Exposed aggregate and decorative concrete finishes range from R350–R600 per m².",
      },
      {
        question: "How long does paving last?",
        answer: "Properly installed brick paving should last 20–30 years with minimal maintenance. The lifespan depends heavily on sub-base quality and drainage. Re-sanding of joints every few years extends the life significantly.",
      },
      {
        question: "Can paving be laid over existing concrete?",
        answer: "Yes, in many cases — provided the existing slab is sound, level, and properly drained. Your paver will assess the existing surface and advise whether overlay is suitable or removal is recommended.",
      },
      {
        question: "How do I fix sunken or uneven paving?",
        answer: "Sunken paving is usually caused by sub-base failure or erosion. A paver can lift the affected blocks, add compacted fill material, re-lay the blocks, and re-sand the joints. It's a relatively straightforward repair.",
      },
      {
        question: "What's the best paving for a pool surround?",
        answer: "Non-slip finishes are essential around pools. Rough-textured clay pavers, natural stone, or brushed concrete are popular choices. Avoid polished or smooth surfaces which become extremely slippery when wet.",
      },
    ]}
  />
);

export default PaverPage;
