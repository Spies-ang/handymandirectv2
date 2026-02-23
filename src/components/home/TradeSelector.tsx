import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, Zap, Paintbrush, Droplets, Hammer, HardHat, Layers, Home, LayoutGrid, CircleDot, Flame, Scissors } from "lucide-react";

const trades = [
  { name: "Builder", slug: "builder", icon: HardHat },
  { name: "Carpenter", slug: "carpenter", icon: Hammer },
  { name: "Electrician", slug: "electrician", icon: Zap },
  { name: "Handyman", slug: "handyman", icon: Wrench },
  { name: "Painter", slug: "painter", icon: Paintbrush },
  { name: "Paver", slug: "paver", icon: LayoutGrid },
  { name: "Plasterer", slug: "plasterer", icon: Layers },
  { name: "Plumber", slug: "plumber", icon: Droplets },
  { name: "Renovator", slug: "renovator", icon: Home },
  { name: "Roofer", slug: "roofer", icon: CircleDot },
  { name: "Tiler", slug: "tiler", icon: LayoutGrid },
  { name: "Welder", slug: "welder", icon: Flame },
];

const TradeSelector = () => (
  <section className="container py-16">
    <div className="text-center mb-10">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
        What do you need done?
      </h2>
      <p className="text-muted-foreground text-lg">Select a trade to get started</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {trades.map((trade) => {
        const Icon = trade.icon;
        return (
          <Link
            key={trade.slug}
            to={`/book?trade=${trade.slug}`}
            className="group flex flex-col items-center gap-2 p-5 rounded-xl border bg-card hover:border-primary hover:shadow-md transition-all text-center"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">{trade.name}</span>
          </Link>
        );
      })}
    </div>
  </section>
);

export default TradeSelector;
