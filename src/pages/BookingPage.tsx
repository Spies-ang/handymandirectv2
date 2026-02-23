import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
import { ArrowLeft, ArrowRight, CheckCircle2, Upload } from "lucide-react";

const trades = [
  "Builder", "Carpenter", "Electrician", "Handyman", "Painter",
  "Paver", "Plasterer", "Plumber", "Renovator", "Roofer", "Tiler", "Welder",
];

const serviceTypes = [
  { value: "multiple-quotes", label: "Multiple Quotes (Free)", desc: "Get up to 3 quotes from verified contractors" },
  { value: "one-estimate", label: "One Estimate (Free)", desc: "Get a single estimate from a top-rated contractor" },
  { value: "instant-booking", label: "Instant Booking (Paid)", desc: "Prepaid hourly service — contractor dispatched fast" },
  { value: "site-assessment", label: "Site Assessment (Paid)", desc: "Professional on-site evaluation with detailed scope" },
  { value: "inspection", label: "Inspection Services", desc: "Full property inspection for buyers, sellers, or maintenance" },
];

const budgetRanges = [
  "Under R500", "R500 – R1,000", "R1,000 – R5,000", "R5,000 – R10,000", "R10,000 – R50,000", "R50,000+",
];

const timingOptions = [
  "As soon as possible", "Within a week", "Within a month", "Flexible / No rush",
];

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    trade: searchParams.get("trade") || "",
    firstName: "",
    surname: "",
    mobile: "",
    email: "",
    serviceType: "",
    description: "",
    budget: "",
    location: "",
    timing: "",
  });

  useEffect(() => {
    const t = searchParams.get("trade");
    if (t) {
      const match = trades.find((tr) => tr.toLowerCase() === t.toLowerCase());
      if (match) {
        setForm((f) => ({ ...f, trade: match }));
        setStep(2);
      }
    }
  }, [searchParams]);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const canNext = () => {
    if (step === 1) return !!form.trade;
    if (step === 2) return form.firstName && form.surname && form.mobile && form.email;
    if (step === 3) return !!form.serviceType;
    if (step === 4) return form.description && form.location;
    return false;
  };

  const handleSubmit = () => {
    const msg = `New Job Request via Handyman Direct:%0A%0ATrade: ${form.trade}%0AService: ${form.serviceType}%0AName: ${form.firstName} ${form.surname}%0AMobile: ${form.mobile}%0AEmail: ${form.email}%0A%0ADescription: ${form.description}%0ABudget: ${form.budget}%0ALocation: ${form.location}%0ATiming: ${form.timing}`;
    window.open(`https://wa.me/27817533284?text=${msg}`, "_blank");
    setStep(5);
  };

  const stepLabels = ["Trade", "Details", "Service", "Job Info"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-10 max-w-2xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
            Post a Job
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Tell us what you need — it only takes a minute
          </p>

          {/* Progress bar */}
          {step <= 4 && (
            <div className="flex items-center gap-1 mb-8">
              {stepLabels.map((label, i) => (
                <div key={i} className="flex-1">
                  <div className={`h-1.5 rounded-full transition-colors ${i + 1 <= step ? "bg-primary" : "bg-border"}`} />
                  <span className={`block text-xs mt-1 text-center ${i + 1 <= step ? "text-primary font-medium" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="bg-card rounded-xl border p-6 md:p-8">
            {/* Step 1: Trade */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl text-foreground">Select your trade</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {trades.map((t) => (
                    <button
                      key={t}
                      onClick={() => update("trade", t)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        form.trade === t
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Sign up */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl text-foreground">Your details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Surname *</Label>
                    <Input id="surname" value={form.surname} onChange={(e) => update("surname", e.target.value)} placeholder="Smith" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input id="mobile" type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="081 234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" />
                </div>
              </div>
            )}

            {/* Step 3: Service type */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl text-foreground">Choose service type</h2>
                <div className="space-y-3">
                  {serviceTypes.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => update("serviceType", s.label)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        form.serviceType === s.label
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <span className="font-medium text-foreground block">{s.label}</span>
                      <span className="text-sm text-muted-foreground">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Job details */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl text-foreground">Job details</h2>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description *</Label>
                  <Textarea id="desc" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe what needs to be done..." rows={4} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timing</Label>
                    <Select value={form.timing} onValueChange={(v) => update("timing", v)}>
                      <SelectTrigger><SelectValue placeholder="When do you need it?" /></SelectTrigger>
                      <SelectContent>
                        {timingOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location / Suburb *</Label>
                  <Input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Eldoraigne, Centurion" />
                </div>
                <div className="space-y-2">
                  <Label>Photos (optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Drag photos here or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Photos will be attached via WhatsApp</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">Job Submitted!</h2>
                <p className="text-muted-foreground mb-6">
                  Your request has been sent via WhatsApp. We'll connect you with verified contractors shortly.
                </p>
                <Button onClick={() => { setStep(1); setForm({ trade: "", firstName: "", surname: "", mobile: "", email: "", serviceType: "", description: "", budget: "", location: "", timing: "" }); }}>
                  Post Another Job
                </Button>
              </div>
            )}

            {/* Navigation */}
            {step <= 4 && (
              <div className="flex justify-between mt-8 pt-4 border-t">
                <Button variant="ghost" disabled={step === 1} onClick={() => setStep(step - 1)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                {step < 4 ? (
                  <Button disabled={!canNext()} onClick={() => setStep(step + 1)} className="gap-2">
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button disabled={!canNext()} onClick={handleSubmit} className="gap-2">
                    Submit via WhatsApp <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BookingPage;
