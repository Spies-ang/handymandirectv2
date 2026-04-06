export interface FAQ {
  question: string;
  answer: string;
}

export interface TradeFAQGroup {
  trade: string;
  slug: string;
  faqs: FAQ[];
}

export const tradeFaqGroups: TradeFAQGroup[] = [
  {
    trade: "Builder",
    slug: "builder",
    faqs: [
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
    ],
  },
  {
    trade: "Carpenter",
    slug: "carpenter",
    faqs: [
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
    ],
  },
  {
    trade: "Electrician",
    slug: "electrician",
    faqs: [
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
    ],
  },
  {
    trade: "Handyman",
    slug: "handyman",
    faqs: [
      {
        question: "What's the difference between a handyman and a specialist contractor?",
        answer: "A handyman handles a broad range of light maintenance and repair tasks. Specialist contractors (electricians, plumbers, builders) are licensed for regulated, technical, or structural work. For anything requiring certification or council approval, you need a specialist.",
      },
      {
        question: "How much does a handyman cost per hour in South Africa?",
        answer: "Handyman rates typically range from R250 to R550 per hour depending on the region and complexity of work. Most also charge a call-out fee of R150–R300 on top of hourly rates.",
      },
      {
        question: "How do I prepare for a handyman visit?",
        answer: "Make a written list of all the jobs you need done, gather any materials you already have, and ensure clear access to all areas needing work. The more organised you are, the more gets done in less time.",
      },
      {
        question: "Can a handyman fix a leaking tap?",
        answer: "Yes — replacing tap washers, cartridges, and o-rings is standard handyman work. For burst pipes, new plumbing installations, or geyser work, you'll want a registered plumber.",
      },
      {
        question: "Is a handyman suitable for rental property maintenance?",
        answer: "Absolutely. Many landlords use a regular handyman to handle routine maintenance, tenant requests, and make-good work between tenancies. It's more cost-effective than calling specialists for every small repair.",
      },
    ],
  },
  {
    trade: "Painter",
    slug: "painter",
    faqs: [
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
    ],
  },
  {
    trade: "Paver",
    slug: "paver",
    faqs: [
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
    ],
  },
  {
    trade: "Plasterer",
    slug: "plasterer",
    faqs: [
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
    ],
  },
  {
    trade: "Plumber",
    slug: "plumber",
    faqs: [
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
    ],
  },
  {
    trade: "Renovator",
    slug: "renovator",
    faqs: [
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
        answer: "Get a detailed, itemised quote before starting. Lock in material costs upfront where possible. Maintain a 10–15% contingency budget. Avoid scope changes once work has started — every change costs more mid-renovation than at planning stage.",
      },
    ],
  },
  {
    trade: "Roofer",
    slug: "roofer",
    faqs: [
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
    ],
  },
  {
    trade: "Tiler",
    slug: "tiler",
    faqs: [
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
    ],
  },
  {
    trade: "Welder",
    slug: "welder",
    faqs: [
      {
        question: "How much do burglar bars cost in South Africa?",
        answer: "Standard fixed burglar bars cost R350–R650 per window opening installed. Removable or hinged bars (recommended for fire escape) cost R600–R1,200 per window. Custom decorative designs are priced per project.",
      },
      {
        question: "What's the difference between palisade and panel fencing?",
        answer: "Palisade fencing uses vertical steel spikes on a horizontal rail — visible through the fence, providing security without blocking sightlines. Panel fencing uses solid steel sheets, offering privacy but reducing visibility. Palisade is more common in South African residential security applications.",
      },
      {
        question: "Can I automate an existing manual gate?",
        answer: "Yes, in most cases. However, the gate structure must be assessed first. An unbalanced, warped, or lightweight gate may need to be replaced or reinforced before automation. Your welder and the automation installer should coordinate on this.",
      },
      {
        question: "What causes welded security gates to rust?",
        answer: "Rust is caused by moisture penetrating raw or damaged steel. All welded steel should be properly cleaned, primed, and painted before installation. In coastal areas, use hot-dip galvanised steel or stainless steel where possible, and re-paint every 3–5 years.",
      },
      {
        question: "Do welded structures need engineering sign-off?",
        answer: "For structural steel work (beams, columns, load-bearing elements), yes — a Professional Engineer should review and sign off the design. For non-structural work like gates, fencing, and burglar bars, no formal certification is required, but workmanship quality still matters greatly.",
      },
    ],
  },
];
