import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PremiumServices from "@/components/home/PremiumServices";

interface FAQ {
  question: string;
  answer: string;
}

interface TradePageProps {
  tradeName: string;
  tradeSlug: string;
  heroDescription: string;
  services: string[];
  faqs: FAQ[];
  blogIntro: string;
  blogContent: string;
}

const TradePage = ({
  tradeName,
  tradeSlug,
  heroDescription,
  services,
  faqs,
  blogIntro,
  blogContent,
}: TradePageProps) => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />

    {/* Hero */}
    <section className="bg-primary/5 border-b">
      <div className="container py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          {tradeName} Services
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
          {heroDescription}
        </p>
        <Link to={`/book?trade=${tradeSlug}`}>
          <Button size="lg">Post a {tradeName} Job</Button>
        </Link>
      </div>
    </section>

    {/* Services cards */}
    <section className="container py-14">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
        What our {tradeName.toLowerCase()}s do
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border bg-card p-4 hover:shadow-sm transition-shadow"
          >
            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-foreground text-sm font-medium">{service}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Blog-style content */}
    <section className="bg-muted/40 border-y">
      <div className="container py-14">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
          Hiring a {tradeName} in South Africa
        </h2>
        <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
          <p>{blogIntro}</p>
          <p>{blogContent}</p>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="container py-14">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>

    {/* CTA */}
    <section className="bg-primary/5 border-t">
      <div className="container py-14 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
          Ready to get started?
        </h2>
        <p className="text-muted-foreground mb-8">
          Post your job and get quotes from verified {tradeName.toLowerCase()}s near you.
        </p>
        <Link to={`/book?trade=${tradeSlug}`}>
          <Button size="lg">Post a {tradeName} Job</Button>
        </Link>
      </div>
    </section>

    {/* Premium services — pre-filled with this trade */}
    <div className="border-t">
      <PremiumServices tradeSlug={tradeSlug} />
    </div>

    <Footer />
    <WhatsAppButton />
  </div>
);

export default TradePage;
