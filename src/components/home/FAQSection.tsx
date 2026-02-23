import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does pricing work?",
    a: "Each contractor sets their own rates. We provide guideline pricing to help you budget — from R99 for small jobs to R2,000+ for full-day engagements. You'll receive up to 3 quotes so you can compare before hiring.",
  },
  {
    q: "How do I know contractors are verified?",
    a: "Every contractor on our platform is vetted for quality, reliability, and professionalism. We check references, work history, and customer reviews before they can accept jobs.",
  },
  {
    q: "What if I'm not satisfied with the work?",
    a: "Customer satisfaction is our priority. If you're unhappy with the work, contact us immediately. We'll work with the contractor to resolve the issue or connect you with an alternative tradesman.",
  },
  {
    q: "Is my personal data safe?",
    a: "Absolutely. Your personal information is encrypted and never shared with contractors without your permission. Your address is only shared after you approve a specific contractor.",
  },
];

const FAQSection = () => (
  <section className="container py-16" id="faq">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
        Frequently Asked Questions
      </h2>
      <p className="text-muted-foreground text-lg">Everything you need to know</p>
    </div>

    <div className="max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5">
            <AccordionTrigger className="font-medium text-foreground text-left">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
