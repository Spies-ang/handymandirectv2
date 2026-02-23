const pricing = [
  { label: "Small Quick Job", price: "R99", note: "Minor repairs & fixes" },
  { label: "Call-Out Fee", price: "R350", note: "Contractor visit" },
  { label: "Hourly Rate", price: "R550/hr", note: "Standard labour rate" },
  { label: "Full Day Rate", price: "R2,000+", note: "8-hour engagement" },
];

const PricingSection = () => (
  <section className="bg-muted/50 py-16">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Transparent Pricing</h2>
        <p className="text-muted-foreground text-lg">Guideline rates to help you budget</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl border bg-card overflow-hidden">
          {pricing.map((p, i) => (
            <div key={i} className={`flex items-center justify-between p-5 ${i < pricing.length - 1 ? "border-b" : ""}`}>
              <div>
                <span className="font-medium text-foreground">{p.label}</span>
                <span className="block text-sm text-muted-foreground">{p.note}</span>
              </div>
              <span className="font-display font-bold text-lg text-primary">{p.price}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          *Prices are guidelines only. Each contractor sets their own rates. Final pricing depends on job scope and complexity.
        </p>
      </div>
    </div>
  </section>
);

export default PricingSection;
