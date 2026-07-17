import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { cities } from "@/data/seoData";

const ServiceAreas = () => (
  <section className="container py-16">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Service Areas</h2>
      <p className="text-muted-foreground text-lg">Trusted tradesmen across South Africa</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
      {cities.map((area) => (
        <div key={area.slug} className="rounded-xl border bg-card p-6 h-full">
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <Link
                to={`/area/${area.slug}`}
                className="font-display font-bold text-xl text-foreground hover:text-primary transition-colors block leading-tight"
              >
                {area.name}
              </Link>
              <span className="text-xs text-muted-foreground">{area.province}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {area.suburbs.map((suburb) => (
              <span key={suburb} className="text-xs bg-secondary text-secondary-foreground rounded-full px-3 py-1">
                {suburb}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ServiceAreas;