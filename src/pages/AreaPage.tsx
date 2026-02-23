import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { cities, trades } from "@/data/seoData";
import { ArrowRight, MapPin, Star } from "lucide-react";

const AreaPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Area Not Found</h1>
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
              <span className="text-sm font-medium">{city.name}, Gauteng</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
              Handyman & Contractors in{" "}
              <span className="text-primary">{city.name}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{city.description}</p>
            <Link to="/book">
              <Button size="lg" className="gap-2 text-base px-8">
                Post a Job in {city.name} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Trades available */}
        <section className="container py-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            Trades Available in {city.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {trades.map((trade) => (
              <Link
                key={trade.slug}
                to={`/area/${city.slug}/${trade.slug}`}
                className="p-4 rounded-xl border bg-card hover:border-primary hover:shadow-md transition-all text-center"
              >
                <span className="font-medium text-foreground text-sm">{trade.name}</span>
                <span className="block text-xs text-muted-foreground mt-1">{trade.priceRange}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Suburbs */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
              Suburbs We Cover in {city.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {city.suburbs.map((suburb) => (
                <span key={suburb} className="bg-background border rounded-full px-4 py-2 text-sm font-medium text-foreground">
                  {suburb}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-12">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
              Need a contractor in {city.name}?
            </h2>
            <p className="text-primary-foreground/80 mb-4">Post your job free and get up to 3 quotes</p>
            <Link to="/book">
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

export default AreaPage;
