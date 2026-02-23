import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { trades } from "@/data/seoData";
import { cities } from "@/data/seoData";
import { ArrowRight, MapPin, Star, CheckCircle } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const TradePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const trade = trades.find((t) => t.slug === slug);

  if (!trade) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Trade Not Found</h1>
            <Link to="/"><Button>Go Home</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/50 py-16">
          <div className="container max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 bg-background rounded-full px-4 py-1.5 mb-4 shadow-sm border">
              <Star className="w-4 h-4 fill-star text-star" />
              <span className="text-sm font-medium">4.9★ rated · Verified {trade.name}s</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
              Find a Trusted <span className="text-primary">{trade.name}</span> Near You
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{trade.longDescription}</p>
            <p className="text-sm font-medium text-primary mb-6">Typical rates: {trade.priceRange}</p>
            <Link to={`/book?trade=${trade.slug}`}>
              <Button size="lg" className="gap-2 text-base px-8">
                Post a {trade.name} Job <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="container py-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            {trade.name} Services We Cover
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {trade.services.map((s) => (
              <div key={s} className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground font-medium">{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Areas */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
              {trade.name}s Available In
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/area/${city.slug}/${trade.slug}`}
                  className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-display font-bold text-lg text-foreground">
                      {trade.name} in {city.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {city.suburbs.slice(0, 6).map((s) => (
                      <span key={s} className="text-xs bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5">{s}</span>
                    ))}
                    {city.suburbs.length > 6 && (
                      <span className="text-xs text-muted-foreground">+{city.suburbs.length - 6} more</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container py-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            {trade.name} FAQ
          </h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {trade.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5">
                  <AccordionTrigger className="font-medium text-foreground text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-12">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to hire a {trade.name.toLowerCase()}?
            </h2>
            <Link to={`/book?trade=${trade.slug}`}>
              <Button size="lg" variant="secondary" className="gap-2 text-base px-8">
                Post a Job Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TradePage;
