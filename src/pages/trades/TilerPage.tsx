import TradePage from "@/components/TradePage";

const TilerPage = () => (
  <TradePage
    tradeName="Tiler"
    tradeSlug="tiler"
    heroDescription="Book professional tilers for bathroom and kitchen tiling, outdoor porcelain, large-format tiles, and retiling projects throughout South Africa."
    services={[
      "Bathroom floor and wall tiling",
      "Kitchen backsplash and floor tiling",
      "Outdoor and pool patio tiling",
      "Large-format and porcelain tile installation",
      "Mosaic and feature wall tiling",
      "Tile removal and surface preparation",
      "Waterproofing before tiling in wet areas",
      "Grout replacement and regrouting",
      "Screed and level floor preparation",
      "Tile repair and replacement",
    ]}
    blogIntro="Tiling is one of the most technically demanding finishing trades. A beautiful tile can look terrible if it's not laid plumb, level, and with consistent joints. In South Africa's climate, the correct adhesive and grout choice also makes the difference between a long-lasting installation and one that cracks or loosens within a few years. Wet areas — bathrooms, showers, and around swimming pools — require waterproofing before tiling, without which moisture penetrates grout lines causing tiles to lift, mould to grow, and structural damage to occur."
    blogContent="Large-format tiles (600x600mm and above) have become the dominant choice in modern South African homes, creating a seamless look with minimal grout lines — but they require a perfectly level substrate. Any deviation greater than 3mm over 2 metres must be corrected with screed or self-levelling compound before tiling. For outdoor tiles, ensure your tiler specifies tiles with an R9 or higher anti-slip rating for areas that get wet — smooth porcelain tiles that look beautiful indoors become dangerously slippery outside."
    faqs={[
      {
        question: "Do I need waterproofing before tiling a bathroom?",
        answer: "Yes, absolutely. SANS 10400-T requires waterproofing in wet areas before tiling. Without it, water penetrates grout lines causing structural damage, tile lift, and black mould. A reputable tiler will always include this step.",
      },
      {
        question: "How much does tiling cost per square metre in South Africa?",
        answer: "Labour-only tiling costs R120–R250 per m² for standard tiles. Large-format tiles (600x600mm+) cost R180–R350 per m² due to the additional skill and preparation required. These rates exclude tiles and adhesive.",
      },
      {
        question: "Can tiles be laid over existing tiles?",
        answer: "Yes, if the existing tiles are sound, firmly adhered, and the floor can handle the additional height and weight. Your tiler will tap-test tiles for hollow spots — any loose tiles must be removed first.",
      },
      {
        question: "How long should I wait before using a newly tiled shower?",
        answer: "Wait at least 24 hours after grouting before light use, and 48–72 hours before regular use. Avoid using harsh cleaners on new grout for at least 28 days while it fully cures.",
      },
      {
        question: "What causes grout to crack or discolour?",
        answer: "Cracking grout usually indicates movement in the substrate or tiles, or inadequate adhesive coverage. Discolouration is typically caused by mould from moisture and lack of regular sealing. Epoxy grout in wide joints is more durable than standard cement grout.",
      },
    ]}
  />
);

export default TilerPage;
