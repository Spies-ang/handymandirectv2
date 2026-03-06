import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, FileText, Clock, Users, Wrench, Search, AlertTriangle, Info } from "lucide-react";
import GooglePlacesAutocomplete from "@/components/GooglePlacesAutocomplete";
import logo from "@/assets/logo.png";

const TRADES = [
  "Builder", "Carpenter", "Electrician", "Handyman", "Painter",
  "Paver", "Plasterer", "Plumber", "Renovator", "Roofer", "Tiler", "Welder",
];

const SERVICE_TYPES = [
  { value: "multiple_quotes", label: "Multiple Quotes", desc: "Get up to 3 contractors quoting — Free", icon: Users },
  { value: "estimate", label: "One Estimate", desc: "No site visit, description + photos only — Free", icon: FileText },
  { value: "instant_booking", label: "Instant Booking", desc: "Prepaid hourly — Paid", icon: Clock },
  { value: "site_assessment", label: "Site Assessment", desc: "R550/hr site visit — Paid", icon: Search },
  { value: "inspection", label: "Home/Building Inspection", desc: "From R995 — Paid", icon: Wrench },
];

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const TRADE_DISCLAIMERS: Record<string, string> = {
  Electrician: "Electrical work in South Africa requires a Certificate of Compliance (COC). Only a registered electrician can legally issue a COC. Your contractor will advise on this during the quote.",
  Plumber: "Certain plumbing work requires municipal approval and inspection. Your contractor will advise on any permits required.",
  Builder: "Structural alterations may require approved building plans from your local municipality. Work without approved plans may be illegal and could affect your home insurance.",
  Renovator: "Structural alterations may require approved building plans from your local municipality. Work without approved plans may be illegal and could affect your home insurance.",
  Roofer: "Roof work on sectional title or body corporate properties requires written trustee approval. Please confirm this before proceeding.",
};

const OWNERSHIP_OPTIONS = ["Owner", "Tenant", "Body Corporate / Strata", "Other"];
const PERMISSION_OPTIONS = ["Yes, I have written permission", "No, not yet", "I need to get it"];
const BUDGET_OPTIONS = ["Under R500", "R500–R2,000", "R2,000–R5,000", "R5,000–R20,000", "R20,000+"];
const READINESS_OPTIONS = ["Yes, ready within 14 days", "Just exploring options"];

const PostJobPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 0 state
  const [ownership, setOwnership] = useState("");
  const [landlordPermission, setLandlordPermission] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [readiness, setReadiness] = useState("");
  const [step0Phase, setStep0Phase] = useState<"a" | "b">("a");

  // Main flow state
  const [step, setStep] = useState(0);
  const [serviceType, setServiceType] = useState("");
  const [tradeCategory, setTradeCategory] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [timing, setTiming] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const totalSteps = 5;
  const progress = (step / (totalSteps - 1)) * 100;

  const needsPermissionWarning = ownership === "Tenant" && (landlordPermission === "No, not yet" || landlordPermission === "I need to get it");
  const isExploring = readiness === "Just exploring options";

  const canProceedStep0A = () => {
    if (!ownership) return false;
    if (ownership === "Tenant" && !landlordPermission) return false;
    return true;
  };

  const canProceedStep0B = () => {
    return !!budgetRange && !!readiness;
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (files.length > MAX_PHOTOS) {
      toast({ title: `Maximum ${MAX_PHOTOS} photos allowed`, variant: "destructive" });
      return;
    }
    const valid: File[] = [];
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({ title: `"${file.name}" is not a supported image type`, variant: "destructive" });
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({ title: `"${file.name}" exceeds 10 MB limit`, variant: "destructive" });
        continue;
      }
      valid.push(file);
    }
    setPhotos(valid);
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    let photoUrls: string[] = [];
    for (const photo of photos) {
      if (!ALLOWED_TYPES.includes(photo.type) || photo.size > MAX_FILE_SIZE) continue;
      const safeName = photo.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${user.id}/${Date.now()}-${safeName}`;
      const { error } = await supabase.storage.from("job-photos").upload(path, photo, {
        contentType: photo.type,
        upsert: false,
      });
      if (!error) {
        const { data: signedData } = await supabase.storage
          .from("job-photos")
          .createSignedUrl(path, 60 * 60 * 24 * 365);
        if (signedData?.signedUrl) {
          photoUrls.push(signedData.signedUrl);
        }
      }
    }

    const { error } = await supabase.from("jobs").insert({
      customer_id: user.id,
      trade_category: tradeCategory,
      description,
      budget,
      location,
      timing,
      photo_urls: photoUrls,
      service_type: serviceType as any,
      status: "open" as any,
    });

    if (error) {
      if (import.meta.env.DEV) console.error("[PostJob] insert error:", error.message);
      toast({ title: "Error posting job", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Job posted successfully!" });
      navigate("/dashboard/requests");
    }
    setLoading(false);
  };

  const stepLabel = step === 0 ? `Before You Post — ${step0Phase === "a" ? "A" : "B"}` : `Step ${step} of 4`;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-auto">
      <div className="container max-w-2xl py-8">
        <div className="flex items-center justify-between mb-6">
          <img src={logo} alt="Handyman Direct" className="h-10" />
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><X className="w-5 h-5" /></Button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">{stepLabel}</p>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 0A — Property Ownership */}
        {step === 0 && step0Phase === "a" && (
          <Card>
            <CardHeader><CardTitle className="font-display">Before You Post</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Are you the property owner or a tenant?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {OWNERSHIP_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setOwnership(opt); if (opt !== "Tenant") setLandlordPermission(""); }}
                      className={`text-left p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                        ownership === opt ? "border-primary bg-accent" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {ownership === "Tenant" && (
                <div className="space-y-2">
                  <Label>Do you have written permission from your landlord for this work?</Label>
                  <div className="space-y-2">
                    {PERMISSION_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setLandlordPermission(opt)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-colors text-sm ${
                          landlordPermission === opt ? "border-primary bg-accent" : "border-border hover:border-primary/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {needsPermissionWarning && (
                <div className="flex gap-3 p-4 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 dark:bg-orange-950/30 dark:border-orange-800 dark:text-orange-200">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Most contractors cannot proceed without written landlord approval for electrical, plumbing, gas or structural work. Please obtain written permission before posting this job to avoid a wasted callout. You can still continue, but your job will be flagged as <strong>Pending Approval</strong>.
                  </p>
                </div>
              )}

              <Button
                className="w-full"
                onClick={() => setStep0Phase("b")}
                disabled={!canProceedStep0A()}
              >
                Next →
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 0B — Budget and Readiness */}
        {step === 0 && step0Phase === "b" && (
          <Card>
            <CardHeader><CardTitle className="font-display">Before You Post</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>What is your approximate budget for this job?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setBudgetRange(opt)}
                      className={`text-left p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                        budgetRange === opt ? "border-primary bg-accent" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Are you ready to proceed if you receive a suitable quote?</Label>
                <div className="space-y-2">
                  {READINESS_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setReadiness(opt)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-colors text-sm ${
                        readiness === opt ? "border-primary bg-accent" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {isExploring && (
                <div className="flex gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-200">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    No problem — you can still post your job. Contractors may prioritise customers who are ready to proceed. Your job will be marked as <strong>Exploratory</strong>.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep0Phase("a")}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(1)} disabled={!canProceedStep0B()}>
                  Next →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1 — Service Type */}
        {step === 1 && (
          <Card>
            <CardHeader><CardTitle className="font-display">Choose Service Type</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {SERVICE_TYPES.map(({ value, label, desc, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => { setServiceType(value); setStep(2); }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors flex items-start gap-3 ${
                    serviceType === value ? "border-primary bg-accent" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </button>
              ))}
              <Button variant="outline" className="w-full" onClick={() => { setStep(0); setStep0Phase("b"); }}>Back</Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2 — Job Details */}
        {step === 2 && (
          <Card>
            <CardHeader><CardTitle className="font-display">Job Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Trade Category</Label>
                <Select value={tradeCategory} onValueChange={setTradeCategory}>
                  <SelectTrigger><SelectValue placeholder="Select a trade" /></SelectTrigger>
                  <SelectContent>{TRADES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
                {tradeCategory && TRADE_DISCLAIMERS[tradeCategory] && (
                  <div className="flex gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-200">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="text-xs">{TRADE_DISCLAIMERS[tradeCategory]}</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the work needed..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Budget (R)</Label>
                <Input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. 5000" />
              </div>
              <div className="space-y-2">
                <Label>Preferred Timing</Label>
                <Input type="datetime-local" value={timing} onChange={(e) => setTiming(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Upload Photos</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload photos</p>
                    {photos.length > 0 && <p className="text-xs text-primary mt-1">{photos.length} file(s) selected</p>}
                  </label>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)} disabled={!tradeCategory || !description}>Next →</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 — Location */}
        {step === 3 && (
          <Card>
            <CardHeader><CardTitle className="font-display">Location</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Job Address</Label>
                <GooglePlacesAutocomplete
                  value={location}
                  onPlaceSelect={setLocation}
                  placeholder="Start typing an address..."
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(4)} disabled={!location}>Next →</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4 — Review & Confirm */}
        {step === 4 && (
          <Card>
            <CardHeader><CardTitle className="font-display">Review & Confirm</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Property</span><span className="font-medium">{ownership}</span></div>
                {needsPermissionWarning && <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Landlord Permission</span><span className="font-medium text-orange-600">{landlordPermission}</span></div>}
                <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Budget Range</span><span className="font-medium">{budgetRange}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Readiness</span><span className="font-medium">{readiness}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Service Type</span><span className="font-medium">{SERVICE_TYPES.find(s => s.value === serviceType)?.label}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Trade</span><span className="font-medium">{tradeCategory}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Budget</span><span className="font-medium">R{budget || "—"}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Location</span><span className="font-medium">{location}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Timing</span><span className="font-medium">{timing || "Flexible"}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Photos</span><span className="font-medium">{photos.length} uploaded</span></div>
                <div className="py-2"><span className="text-muted-foreground">Description</span><p className="mt-1">{description}</p></div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>Back</Button>
                <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting..." : "Submit Job"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PostJobPage;
