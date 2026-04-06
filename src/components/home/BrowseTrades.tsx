import { Link } from "react-router-dom";
import { Wrench, Zap, Paintbrush, Droplets, Hammer, HardHat, Layers, Home, LayoutGrid, CircleDot, Flame, Scissors } from "lucide-react";

const trades = [
  { name: "Builder",     slug: "builder",     icon: HardHat,    desc: "New builds, extensions, and structural work" },
  { name: "Carpenter",   slug: "carpenter",   icon: Hammer,     desc: "Built-ins, decking, and custom woodwork" },
  { name: "Electrician", slug: "electrician", icon: Zap,        desc: "COC certificates, DB boards, and solar" },
  { name: "Handyman",    slug: "handyman",    icon: Wrench,     desc: "Odd jobs, repairs, and general maintenance" },
  { name: "Painter",     slug: "painter",     icon: Paintbrush, desc: "Interior, exterior, and waterproofing" },
  { name: "Paver",       slug: "paver",       icon: LayoutGrid, desc: "Driveways, patios, and pool surrounds" },
  { name: "Plasterer",   slug: "plasterer",   icon: Layers,     desc: "Skim coat, crack repairs, and damp proofing" },
  { name: "Plumber",     slug: "plumber",     icon: Droplets,   desc: "Geysers, burst pipes, and leak detection" },
  { name: "Renovator",   slug: "renovator",   icon: Home,       desc: "Kitchen and bathroom remodels" },
  { name: "Roofer",      slug: "roofer",      icon: CircleDot,  desc: "Leak repairs, IBR, and waterproofing" },
  { name: "Tiler",       slug: "tiler",       icon: Scissors,   desc: "Bathrooms, kitchens, and outdoor tiling" },
  { name: "Welder",      slug: "welder",      icon: Flame,      desc: "Security gates, burglar bars, and steel work" },
];

const BrowseTrades = () => (
  <section className="container py-16">
    <div className="text-center mb-10">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
        Browse Our Trades
      </h2>
      <p className="text-muted-foreground text-lg">
        Learn more about each trade and see what's possible
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {trades.map((trade) => {
        const Icon = trade.icon;
        return (
          <Link
            key={trade.slug}
            to={`/trades/${trade.slug}`}
            className="group flex flex-col gap-3 p-5 rounded-xl border bg-card hover:border-primary hover:shadow-md transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground text-sm mb-1">
                {trade.name}
              </p>
              <p className="text-xs text-muted-foreground leading-snug">
                {trade.desc}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  </section>
);

export default BrowseTrades;
