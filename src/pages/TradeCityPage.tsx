import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { cities, trades } from "@/data/seoData";
import { ArrowRight, MapPin, Star, CheckCircle } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const TradeCityPage = () => {
  const { citySlug, tradeSlug } = useParams<{ citySlug: string; tradeSlug: string }>();
  const city = cities.find((c) => c.slug === citySlug);
  const trade = trades.find((t) => t.slug === tradeSlug);

  if (!city || !trade) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Page Not Found</h1>
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
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{city.name} · Verified {trade.name}s</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
              <span className="text-primary">{trade.name}</span> in {city.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Find verified {trade.name.toLowerCase()}s in {city.name} and surrounding suburbs.{" "}
              {trade.description}
            </p>
            <p className="text-sm font-medium text-primary mb-6">Typical rates: {trade.priceRange}</p>
            <Link to={`/book?trade=${trade.slug}`}>
              <Button size="lg" className="gap-2 text-base px-8">
                Find a {trade.name} in {city.name} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="container py-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            {trade.name} Services in {city.name}
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

        {/* Suburbs */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">
              {trade.name}s Available In These {city.name} Suburbs
            </h2>
            <p className="text-center text-muted-foreground mb-8">We cover all major suburbs and surrounding areas</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {city.suburbs.map((suburb) => (
                <span key={suburb} className="bg-background border rounded-full px-4 py-2 text-sm font-medium text-foreground">
                  {suburb}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container py-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            {trade.name} in {city.name} — FAQ
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
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
              Ready to hire a {trade.name.toLowerCase()} in {city.name}?
            </h2>
            <p className="text-primary-foreground/80 mb-4">Post your job free · Get up to 3 quotes · Verified contractors</p>
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

export default TradeCityPage;
