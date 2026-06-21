import { Zap, ClipboardCheck, ShieldCheck, CalendarClock, Users, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Tier = "beginner" | "intermediate" | "master";

const tierConfig: Record<Tier, { color: string; label: string; sublabel: string }> = {
  beginner:     { color: "#27AE60", label: "Beginner",     sublabel: "No Hurry" },
  intermediate: { color: "#F39C12", label: "Intermediate", sublabel: "Next Day" },
  master:       { color: "#2B7BCC", label: "Master",       sublabel: "Same Day" },
};

const services: {
  icon: React.ElementType;
  title: string;
  desc: string;
  cta: string;
  tier: Tier;
  serviceSlug: string;
}[] = [
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Prepaid hourly service — a vetted contractor dispatched to you fast.",
    cta: "Book Now",
    tier: "master",
    serviceSlug: "instant",
  },
  {
    icon: ClipboardCheck,
    title: "Site Assessment",
    desc: "Professional on-site evaluation with a detailed scope and quote.",
    cta: "Request Assessment",
    tier: "intermediate",
    serviceSlug: "assessment",
  },
  {
    icon: ShieldCheck,
    title: "Home Inspection",
    desc: "Full property inspection for buyers, sellers, or maintenance.",
    cta: "Schedule Inspection",
    tier: "intermediate",
    serviceSlug: "inspection",
  },
  {
    icon: CalendarClock,
    title: "Annual Maintenance",
    desc: "Year-round home maintenance plan covering all trades.",
    cta: "Learn More",
    tier: "master",
    serviceSlug: "maintenance",
  },
  {
    icon: Users,
    title: "Multiple Contractor Quotes",
    desc: "Receive and compare quotes from up to 3 verified contractors for your job.",
    cta: "Get Quotes",
    tier: "beginner",
    serviceSlug: "multiple-quotes",
  },
  {
    icon: Calculator,
    title: "Guesstimate Quotation",
    desc: "Not sure what it'll cost? Get a rough estimate before committing to a full quote.",
    cta: "Get Estimate",
    tier: "beginner",
    serviceSlug: "guesstimate",
  },
];

const TIER_ORDER: Tier[] = ["beginner", "intermediate", "master"];

interface PremiumServicesProps {
  tradeSlug?: string;
  orderOverride?: string[];
}

const ServiceCard = ({
  s,
  tradeSlug,
  showSublabel,
}: {
  s: (typeof services)[number];
  tradeSlug?: string;
  showSublabel: boolean;
}) => {
  const Icon = s.icon;
  const { color, label, sublabel } = tierConfig[s.tier];
  const href = tradeSlug
    ? `/book?tier=${s.tier}&service=${s.serviceSlug}&trade=${tradeSlug}`
    : `/book?tier=${s.tier}&service=${s.serviceSlug}`;
  const badgeText = showSublabel ? `${label} / ${sublabel}` : label;
  return (
    <div
      className="rounded-xl border bg-card p-6 flex flex-col hover:shadow-md transition-shadow"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <span
        className="self-start text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {badgeText}
      </span>
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-display font-bold text-foreground mb-2">{s.title}</h3>
      <p className="text-sm text-muted-foreground flex-1 mb-4">{s.desc}</p>
      <Link to={href}>
        <Button variant="outline" size="sm" className="w-full">{s.cta}</Button>
      </Link>
    </div>
  );
};

const PremiumServices = ({ tradeSlug, orderOverride }: PremiumServicesProps = {}) => {
  const isHomepage = tradeSlug === undefined;

  // Trade pages: flat responsive grid with orderOverride, badge shows sublabel
  if (!isHomepage) {
    const orderedServices = orderOverride
      ? [...services].sort(
          (a, b) =>
            (orderOverride.indexOf(a.serviceSlug) + 1 || orderOverride.length + 1) -
            (orderOverride.indexOf(b.serviceSlug) + 1 || orderOverride.length + 1)
        )
      : services;
    return (
      <section className="container py-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Premium Services</h2>
          <p className="text-muted-foreground text-lg mb-6">Go beyond quotes with our premium options</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {orderedServices.map((s, i) => (
            <ServiceCard key={i} s={s} tradeSlug={tradeSlug} showSublabel />
          ))}
        </div>
      </section>
    );
  }

  // Homepage: 3-column tier layout — column headers replace the legend
  const columns = TIER_ORDER.map((tier) => ({
    tier,
    items: services.filter((s) => s.tier === tier),
    ...tierConfig[tier],
  }));

  return (
    <section className="container py-16">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Premium Services</h2>
        <p className="text-muted-foreground text-lg">Go beyond quotes with our premium options</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(({ tier, color, label, sublabel, items }) => (
          <div key={tier}>
            {/* Tier column header */}
            <div
              className="rounded-xl px-5 py-3 mb-4 flex items-center justify-between"
              style={{ backgroundColor: `${color}15`, border: `1.5px solid ${color}40` }}
            >
              <span className="font-display font-bold text-sm" style={{ color }}>
                {label}
              </span>
              <span className="text-xs font-medium" style={{ color: `${color}BB` }}>
                {sublabel}
              </span>
            </div>
            {/* Cards stack within column */}
            <div className="flex flex-col gap-4">
              {items.map((s, i) => (
                <ServiceCard key={i} s={s} showSublabel={false} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumServices;
