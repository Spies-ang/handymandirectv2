import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { tradeFaqGroups } from "@/data/tradeFaqs";

const GENERAL_FAQS = [
  {
    question: "How does HandymanDirect work?",
    answer:
      "Post your job with details of what you need done, your location, and your timeline. Verified contractors in your area are notified and can submit quotes. You review the quotes, check contractor profiles and ratings, then accept the best fit. Payment is handled securely through the platform.",
  },
  {
    question: "How much does it cost to post a job?",
    answer:
      "Posting a job on HandymanDirect is completely free for homeowners. You pay nothing until you accept a quote and are happy to proceed. Contractors pay a small credit fee to submit quotes, which keeps the platform free for you.",
  },
  {
    question: "Are contractors verified?",
    answer:
      "Yes. All contractors on HandymanDirect go through a verification process that includes ID verification, trade certification checks, and review of past work history. We also collect and display customer reviews after every job so you can see a contractor's track record before hiring.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We currently cover all major South African cities and surrounding areas including Cape Town, Johannesburg, Pretoria, Durban, Port Elizabeth, and East London. We are actively expanding our contractor network to more towns and regions.",
  },
  {
    question: "How do I pay a contractor?",
    answer:
      "Payment is arranged directly with the contractor once you accept a quote. Most contractors accept EFT, and many accept card payments. We recommend never paying more than a 30–50% deposit upfront, with the balance on satisfactory completion of the work.",
  },
];

const ANONYMOUS_USER_ID = "00000000-0000-0000-0000-000000000000";

const FAQPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const message = JSON.stringify({
      type: "faq_question",
      name: name.trim(),
      email: email.trim(),
      question: question.trim(),
    });

    const { error: dbError } = await supabase
      .from("notifications")
      .insert({ message, user_id: ANONYMOUS_USER_ID });

    if (dbError) {
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      setName("");
      setEmail("");
      setQuestion("");
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary/5 border-b">
          <div className="container py-14">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Everything you need to know about using HandymanDirect and hiring
              tradespeople in South Africa.
            </p>
          </div>
        </section>

        {/* General FAQs */}
        <section className="container py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            General questions
          </h2>
          <Accordion type="single" collapsible className="max-w-3xl">
            {GENERAL_FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`general-${i}`}>
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

        {/* Trade FAQs */}
        <section className="bg-muted/40 border-y">
          <div className="container py-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Questions by trade
            </h2>
            <p className="text-muted-foreground mb-10">
              Browse trade-specific questions or visit a trade page for full
              guides and content.
            </p>

            <div className="space-y-8 max-w-3xl">
              {tradeFaqGroups.map((group) => (
                <div key={group.slug}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {group.trade}
                    </h3>
                    <Link
                      to={`/trades/${group.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View {group.trade} page →
                    </Link>
                  </div>
                  <Accordion type="single" collapsible>
                    {group.faqs.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`${group.slug}-${i}`}
                      >
                        <AccordionTrigger className="text-left font-medium text-sm">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ask a Question form */}
        <section className="container py-14">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Ask a question
            </h2>
            <p className="text-muted-foreground mb-8">
              Can't find what you're looking for? Send us your question and
              we'll get back to you.
            </p>

            {submitted ? (
              <div className="rounded-xl border bg-primary/5 p-6 text-center">
                <p className="font-medium text-foreground mb-1">
                  Question received!
                </p>
                <p className="text-sm text-muted-foreground">
                  We'll follow up at the email address you provided.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="faq-name">Name</Label>
                  <Input
                    id="faq-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="faq-email">Email</Label>
                  <Input
                    id="faq-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="faq-question">Question</Label>
                  <Textarea
                    id="faq-question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What would you like to know?"
                    rows={4}
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <Button type="submit" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Question"}
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FAQPage;
