import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Briefcase, Users, Globe, Headphones, Star, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { isValidSAPhone, isValidEmail, SA_PHONE_ERROR, EMAIL_ERROR } from "@/lib/validation";

const benefits = [
  { icon: Briefcase, title: "Steady Job Leads", desc: "Receive a constant stream of real, verified job requests from customers ready to hire." },
  { icon: Users, title: "Warm Customers", desc: "No cold calling — every lead comes from a customer who has actively posted a job." },
  { icon: Globe, title: "No Website Needed", desc: "We handle your online presence and marketing so you can focus on your craft." },
  { icon: Headphones, title: "Admin Support", desc: "Our team handles customer communication and job coordination for you." },
  { icon: Star, title: "Build Your Reputation", desc: "Collect real reviews that help you stand out and win more work." },
  { icon: TrendingUp, title: "National Exposure", desc: "Get visibility across South Africa's fastest-growing contractor marketplace." },
];

const contractorReviews = [
  { name: "James K., Plumber", text: "Handyman Direct changed my business. I used to spend hours marketing — now jobs come to me." },
  { name: "Sipho N., Electrician", text: "The leads are genuine and the customers are ready to go. Best decision I've made for my business." },
  { name: "Andre V., Builder", text: "I've tripled my monthly revenue since joining. The admin support alone is worth it." },
];

const trades = [
  "Builder", "Carpenter", "Electrician", "Handyman", "Painter",
  "Paver", "Plasterer", "Plumber", "Renovator", "Roofer", "Tiler", "Welder",
];

const ContractorsPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", trade: "", location: "", experience: "", mobile: "", email: "", about: "" });
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!isValidSAPhone(form.mobile)) {
      setPhoneError(SA_PHONE_ERROR);
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (form.email && !isValidEmail(form.email)) {
      setEmailError(EMAIL_ERROR);
      hasError = true;
    } else {
      setEmailError("");
    }

    if (hasError) return;

    const msg = `Contractor Application:%0A%0AName: ${form.name}%0ATrade: ${form.trade}%0ALocation: ${form.location}%0AExperience: ${form.experience} years%0AMobile: ${form.mobile}%0AEmail: ${form.email}%0AAbout: ${form.about}`;
    window.open(`https://wa.me/27817533284?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/50 py-16 md:py-24">
          <div className="container max-w-3xl text-center">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
              Get More Jobs <span className="text-primary">Without Doing the Marketing</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join South Africa's fastest-growing contractor network. We bring the customers — you bring the skills.
            </p>
            <a href="#apply">
              <Button size="lg" className="gap-2 text-base px-8">
                Apply to Join <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </section>

        {/* Benefits */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Why Contractors Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contractor testimonials */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">Hear From Our Contractors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contractorReviews.map((r, i) => (
                <div key={i} className="rounded-xl border bg-card p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-star text-star" />)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">"{r.text}"</p>
                  <span className="text-sm font-medium text-foreground">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section className="container py-16" id="apply">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-2">Apply to Join</h2>
            <p className="text-center text-muted-foreground mb-8">Fill in your details and we'll get back to you within 24 hours</p>

            {submitted ? (
              <div className="text-center py-8 bg-card rounded-xl border p-8">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">Application Sent!</h3>
                <p className="text-muted-foreground">We'll review your details and contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-xl border p-6 md:p-8 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Trade *</Label>
                    <Select required value={form.trade} onValueChange={(v) => update("trade", v)}>
                      <SelectTrigger><SelectValue placeholder="Select trade" /></SelectTrigger>
                      <SelectContent>
                        {trades.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exp">Years of Experience *</Label>
                    <Input id="exp" required value={form.experience} onChange={(e) => update("experience", e.target.value)} placeholder="e.g. 5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loc">Location / Area *</Label>
                  <Input id="loc" required value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Centurion, Pretoria" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cmobile">Mobile *</Label>
                    <Input
                      id="cmobile"
                      type="tel"
                      required
                      value={form.mobile}
                      onChange={(e) => { update("mobile", e.target.value); setPhoneError(""); }}
                      placeholder="081 234 5678"
                    />
                    {phoneError && <p className="text-xs text-destructive">{phoneError}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cemail">Email</Label>
                    <Input
                      id="cemail"
                      type="email"
                      value={form.email}
                      onChange={(e) => { update("email", e.target.value); setEmailError(""); }}
                      placeholder="you@example.com"
                    />
                    {emailError && <p className="text-xs text-destructive">{emailError}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about">Tell us about yourself</Label>
                  <Textarea id="about" value={form.about} onChange={(e) => update("about", e.target.value)} placeholder="What makes you a great contractor?" rows={3} />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  Submit Application <ArrowRight className="w-4 h-4" />
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

export default ContractorsPage;
