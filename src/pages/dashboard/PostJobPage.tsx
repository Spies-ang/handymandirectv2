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
import { X, Upload, CheckCircle, FileText, Clock, Users, Wrench, Search } from "lucide-react";
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

const PostJobPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState("");
  const [tradeCategory, setTradeCategory] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [timing, setTiming] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const progress = (step / 4) * 100;

  const MAX_PHOTOS = 5;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

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
      // Re-validate server-bound files
      if (!ALLOWED_TYPES.includes(photo.type) || photo.size > MAX_FILE_SIZE) continue;

      const safeName = photo.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${user.id}/${Date.now()}-${safeName}`;
      const { error } = await supabase.storage.from("job-photos").upload(path, photo, {
        contentType: photo.type,
        upsert: false,
      });
      if (!error) {
        const { data: urlData } = supabase.storage.from("job-photos").getPublicUrl(path);
        photoUrls.push(urlData.publicUrl);
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
      toast({ title: "Error posting job", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Job posted successfully!" });
      navigate("/dashboard/requests");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-auto">
      <div className="container max-w-2xl py-8">
        <div className="flex items-center justify-between mb-6">
          <img src={logo} alt="Handyman Direct" className="h-10" />
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><X className="w-5 h-5" /></Button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Step {step} of 4</p>
          <Progress value={progress} className="h-2" />
        </div>

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
            </CardContent>
          </Card>
        )}

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

        {step === 3 && (
          <Card>
            <CardHeader><CardTitle className="font-display">Location</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Job Address</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter the job address" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(4)} disabled={!location}>Next →</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader><CardTitle className="font-display">Review & Confirm</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
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
