import TradePage from "@/components/TradePage";

const HandymanPage = () => (
  <TradePage
    tradeName="Handyman"
    tradeSlug="handyman"
    heroDescription="Book a reliable handyman for all those odd jobs around the house — repairs, installations, and maintenance tasks done quickly and professionally."
    services={[
      "Flat-pack furniture assembly",
      "TV and picture mounting",
      "Door and window repairs",
      "Tap washer and toilet cistern repairs",
      "Curtain rail and blind installation",
      "Minor plaster crack repairs",
      "Gutter cleaning and minor repairs",
      "Lock changes and deadbolt fitting",
      "Fence and gate repairs",
      "Odd jobs and general maintenance",
    ]}
    blogIntro="A good handyman is one of the most valuable contacts a South African homeowner can have. For the dozens of small jobs that don't warrant a specialist trade — a stiff door, a dripping tap, a wall mount for a new TV — a handyman gets it done quickly and at a fraction of the cost. Most handymen charge either an hourly rate (typically R250–R550/hr) or a flat rate per job, and grouping small tasks into a single visit saves both time and call-out fees."
    blogContent="While handymen handle a wide range of tasks, it's worth knowing the boundaries: structural electrical work, COC-required work, and new plumbing installations should be handled by licensed tradespeople. A reputable handyman will tell you upfront if a job falls outside their scope. For rental property owners, a regular handyman on retainer is a cost-effective way to maintain properties between tenants and respond to maintenance calls without involving specialist contractors for every small issue."
    faqs={[
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
    ]}
  />
);

export default HandymanPage;
