import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GooglePlacesAutocomplete from "@/components/GooglePlacesAutocomplete";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Upload, X, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// ── Static data ──────────────────────────────────────────────────────────────

type Tier = "beginner" | "intermediate" | "master";

const TIER_CONFIG: Record<Tier, { label: string; color: string; bgColor: string }> = {
  beginner:     { label: "Beginner",     color: "#27AE60", bgColor: "#27AE6020" },
  intermediate: { label: "Intermediate", color: "#F39C12", bgColor: "#F39C1220" },
  master:       { label: "Master",       color: "#2B7BCC", bgColor: "#2B7BCC20" },
};

const TRADES = [
  "Builder", "Carpenter", "Electrician", "Handyman", "Painter",
  "Paver", "Plasterer", "Plumber", "Renovator", "Roofer", "Tiler", "Welder",
];

const BUDGET_OPTIONS = [
  "R0 – R500", "R500 – R1,500", "R1,500 – R5,000",
  "R5,000 – R15,000", "R15,000+", "I don't know",
];

const TIMEFRAME_OPTIONS = [
  "ASAP", "This week", "Next week", "This month", "Flexible",
];

// Map tier → Supabase service_type enum
const TIER_SERVICE_TYPE: Record<Tier, "multiple_quotes" | "site_assessment" | "instant_booking"> = {
  beginner:     "multiple_quotes",
  intermediate: "site_assessment",
  master:       "instant_booking",
};

// Submit button label based on service param
const SUBMIT_LABELS: Record<string, string> = {
  "multiple-contractor-quotes": "Get Free Quotes",
  "guesstimate-quotation":      "Get Guesstimate",
  "site-assessment":            "Request Assessment",
  "home-inspection":            "Request Inspection",
  "annual-maintenance":         "Request Plan",
  "instant-booking":            "Book Contractor Now",
};

// ── Component ────────────────────────────────────────────────────────────────

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const tradeParam   = searchParams.get("trade") || "";
  const tierParam    = (searchParams.get("tier") || "beginner") as Tier;
  const serviceParam = searchParams.get("service") || "";

  const tier = (["beginner", "intermediate", "master"].includes(tierParam) ? tierParam : "beginner") as Tier;
  const tierCfg = TIER_CONFIG[tier];

  // ── Form state ────────────────────────────────────────────────────────────
  const [trade, setTrade]                       = useState(
    TRADES.find((t) => t.toLowerCase() === tradeParam.toLowerCase()) || ""
  );
  const [description, setDescription]           = useState("");
  const [specificRequirements, setSpecificReq]  = useState("");
  const [exactIssue, setExactIssue]             = useState("");
  const [location, setLocation]                 = useState("");
  const [budget, setBudget]                     = useState("");
  const [timeframe, setTimeframe]               = useState("");
  const [preferredDatetime, setPreferredDatetime] = useState("");
  const [photoFiles, setPhotoFiles]             = useState<File[]>([]);
  const [submitting, setSubmitting]             = useState(false);
  const [done, setDone]                         = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (user === null) {
      toast({ title: "Sign in required", description: "Please sign in to post a job." });
      navigate(`/login?redirect=/book?trade=${tradeParam}&tier=${tier}`);
    }
  }, [user]);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const valid: File[] = [];
    for (const file of incoming) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({
          title: "Unsupported file type",
          description: `${file.name} must be a JPG, PNG, WEBP, or GIF image.`,
          variant: "destructive",
        });
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10 MB limit.`,
          variant: "destructive",
        });
        continue;
      }
      valid.push(file);
    }
    setPhotoFiles((prev) => [...prev, ...valid].slice(0, 5));
    // Reset input so picking the same file again still triggers onChange
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    if (!photoFiles.length || !user) return [];
    const urls: string[] = [];
    for (const file of photoFiles) {
      // Re-validate server-side-bound checks before upload
      if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE) continue;
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("job-photos")
        .upload(path, file, { upsert: false, contentType: file.type });
      if (!error) {
        const { data: signed } = await supabase.storage
          .from("job-photos")
          .createSignedUrl(path, 60 * 60 * 24 * 365);
        if (signed?.signedUrl) urls.push(signed.signedUrl);
      }
    }
    return urls;
  };


  const buildDescription = (): string => {
    const parts: string[] = [];
    if (tier === "beginner") {
      parts.push(description);
    } else if (tier === "intermediate") {
      parts.push(description);
      if (specificRequirements) parts.push(`Specific requirements: ${specificRequirements}`);
    } else {
      parts.push(exactIssue);
    }
    parts.push(`[tier:${tier}]`);
    return parts.filter(Boolean).join("\n\n");
  };

  const canSubmit = () => {
    if (!trade || !location) return false;
    if (tier === "beginner")     return !!description;
    if (tier === "intermediate") return !!description && !!specificRequirements;
    if (tier === "master")       return !!exactIssue;
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !canSubmit()) return;
    setSubmitting(true);

    const photoUrls = await uploadPhotos();

    const { error } = await supabase.from("jobs").insert({
      customer_id:   user.id,
      trade_category: trade.toLowerCase(),
      service_type:  TIER_SERVICE_TYPE[tier],
      description:   buildDescription(),
      location,
      budget:        budget || null,
      timing:        timeframe || preferredDatetime || null,
      photo_urls:    photoUrls.length ? photoUrls : null,
    });

    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      setSubmitting(false);
      return;
    }

    setDone(true);
    toast({ title: "Job posted!", description: "Contractors will be in touch soon." });
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const submitLabel = SUBMIT_LABELS[serviceParam] || (
    tier === "beginner" ? "Get Free Quotes" :
    tier === "intermediate" ? "Request Service" :
    "Book Contractor Now"
  );

  if (done) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-muted/30 flex items-center justify-center">
          <div className="text-center py-16 px-4">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">Job Posted!</h2>
            <p className="text-muted-foreground">Redirecting to your dashboard…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-10 max-w-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Post a Job
            </h1>
            <p className="text-muted-foreground mb-4">
              Tell us what you need — it only takes a minute
            </p>
            {/* Tier badge */}
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: tierCfg.bgColor, color: tierCfg.color }}
            >
              {tierCfg.label} flow
            </span>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-xl border p-6 md:p-8 space-y-6">

            {/* Trade selector */}
            <div className="space-y-2">
              <Label>Trade *</Label>
              <Select value={trade} onValueChange={setTrade} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a trade..." />
                </SelectTrigger>
                <SelectContent>
                  {TRADES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ── BEGINNER fields ──────────────────────────────────────────── */}
            {tier === "beginner" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="description">Describe the problem *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the problem in your own words - don't worry about technical terms"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Photos <span className="text-muted-foreground text-xs">(optional, up to 5)</span></Label>
                  <label className="flex flex-col items-center gap-2 border-2 border-dashed rounded-lg p-5 cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="w-7 h-7 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload photos</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoChange} />
                  </label>
                  {photoFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {photoFiles.map((f, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs bg-muted rounded px-2 py-1">
                          <span className="max-w-[120px] truncate">{f.name}</span>
                          <button type="button" onClick={() => removePhoto(i)}>
                            <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Budget range</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger><SelectValue placeholder="Select a budget..." /></SelectTrigger>
                    <SelectContent>
                      {BUDGET_OPTIONS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* ── INTERMEDIATE fields ───────────────────────────────────────── */}
            {tier === "intermediate" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="description">Describe the work needed *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the work needed"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specific">Specific requirements *</Label>
                  <Textarea
                    id="specific"
                    value={specificRequirements}
                    onChange={(e) => setSpecificReq(e.target.value)}
                    placeholder="Any specific requirements or preferences?"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preferred timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger><SelectValue placeholder="When do you need this?" /></SelectTrigger>
                    <SelectContent>
                      {TIMEFRAME_OPTIONS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Budget range</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger><SelectValue placeholder="Select a budget..." /></SelectTrigger>
                    <SelectContent>
                      {BUDGET_OPTIONS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* ── MASTER fields ────────────────────────────────────────────── */}
            {tier === "master" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="exactIssue">What exactly needs doing? *</Label>
                  <Textarea
                    id="exactIssue"
                    value={exactIssue}
                    onChange={(e) => setExactIssue(e.target.value)}
                    placeholder="What exactly needs doing?"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="datetime">Preferred date &amp; time</Label>
                  <Input
                    id="datetime"
                    type="datetime-local"
                    value={preferredDatetime}
                    onChange={(e) => setPreferredDatetime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Budget range</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger><SelectValue placeholder="Select a budget..." /></SelectTrigger>
                    <SelectContent>
                      {BUDGET_OPTIONS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Location — all tiers */}
            <div className="space-y-2">
              <Label>Address / Location *</Label>
              <GooglePlacesAutocomplete
                value={location}
                onPlaceSelect={setLocation}
                placeholder="Start typing your address..."
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={submitting || !canSubmit()}
            >
              {submitting ? "Submitting…" : submitLabel}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BookingPage;
