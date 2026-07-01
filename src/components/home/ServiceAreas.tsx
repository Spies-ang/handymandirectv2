import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const provinces = [
  {
    province: "Gauteng",
    areas: [
      {
        city: "Pretoria",
        slug: "pretoria",
        suburbs: ["Hatfield", "Brooklyn", "Menlyn", "Waterkloof", "Arcadia", "Silverton", "Garsfontein", "Montana"],
      },
      // PLACEHOLDER: add more Gauteng cities/areas here once Vincent provides the full list
    ],
  },
  {
    province: "KwaZulu-Natal",
    areas: [
      {
        city: "Durban",
        slug: "durban",
        suburbs: ["Umhlanga", "Durban North", "Durban South", "Pinetown", "Hillcrest", "Ballito", "Kloof", "Westville"],
      },
      // PLACEHOLDER: add more KwaZulu-Natal cities/areas here once Vincent provides the full list
    ],
  },
  {
    province: "Western Cape",
    areas: [
      {
        city: "Cape Town",
        slug: "cape-town",
        suburbs: ["Stellenbosch", "Somerset West", "Paarl", "Franschhoek", "Durbanville", "Bellville", "Brackenfell", "Kuils River"],
      },
      // PLACEHOLDER: add more Western Cape cities/areas here once Vincent provides the full list
    ],
  },
];

const ServiceAreas = () => (
  <section className="container py-16">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Service Areas</h2>
      <p className="text-muted-foreground text-lg">Trusted tradesmen across South Africa</p>
    </div>

    <div className="space-y-10">
      {provinces.map(({ province, areas }) => (
        <div key={province}>
          <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-primary inline-block" />
            {province}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {areas.map((area) => (
              <div key={area.slug} className="rounded-xl border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <Link
                    to={`/area/${area.slug}`}
                    className="font-display font-bold text-xl text-foreground hover:text-primary transition-colors"
                  >
                    {area.city}
                  </Link>
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
        </div>
      ))}
    </div>
  </section>
);

export default ServiceAreas;
