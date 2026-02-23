import { Zap, ClipboardCheck, ShieldCheck, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Prepaid hourly service — a vetted contractor dispatched to you fast.",
    cta: "Book Now",
  },
  {
    icon: ClipboardCheck,
    title: "Site Assessment",
    desc: "Professional on-site evaluation with a detailed scope and quote.",
    cta: "Request Assessment",
  },
  {
    icon: ShieldCheck,
    title: "Home Inspection",
    desc: "Full property inspection for buyers, sellers, or maintenance.",
    cta: "Schedule Inspection",
  },
  {
    icon: CalendarClock,
    title: "Annual Maintenance",
    desc: "Year-round home maintenance plan covering all trades.",
    cta: "Learn More",
  },
];

const PremiumServices = () => (
  <section className="container py-16">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Premium Services</h2>
      <p className="text-muted-foreground text-lg">Go beyond quotes with our premium options</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={i} className="rounded-xl border bg-card p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground flex-1 mb-4">{s.desc}</p>
            <Link to="/book">
              <Button variant="outline" size="sm" className="w-full">{s.cta}</Button>
            </Link>
          </div>
        );
      })}
    </div>
  </section>
);

export default PremiumServices;
