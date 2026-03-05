import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Plus, MapPin, CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const TRADES = [
  "Builder", "Carpenter", "Electrician", "Handyman", "Painter",
  "Paver", "Plasterer", "Plumber", "Renovator", "Roofer", "Tiler", "Welder",
];

const COVERAGE_OPTIONS = [5, 10, 15, 20, 25, 30, 50];

const ContractorSignupPage = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [trades, setTrades] = useState<string[]>([""]);
  const [companyAddress, setCompanyAddress] = useState("");
  const [coverageRadius, setCoverageRadius] = useState("25");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const progress = (step / 3) * 100;

  const addTrade = () => setTrades([...trades, ""]);
  const updateTrade = (index: number, value: string) => {
    const updated = [...trades];
    updated[index] = value;
    setTrades(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const validTrades = trades.filter(Boolean);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${surname}`,
          mobile,
          role: "contractor",
          company_name: companyName,
          trade_categories: JSON.stringify(validTrades),
          company_address: companyAddress,
          coverage_radius_km: coverageRadius,
        },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    setStep(4);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <Link to="/" className="inline-block mx-auto mb-4">
            <img src={logo} alt="Handyman Direct" className="h-12" />
          </Link>
          {step < 4 && (
            <>
              <CardTitle className="font-display text-2xl">Join as a Contractor</CardTitle>
              <CardDescription>Step {step} of 3</CardDescription>
              <Progress value={progress} className="mt-3 h-2" />
            </>
          )}
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label>Surname</Label>
                  <Input value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="081 234 5678" required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
              </div>
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your Company" required />
              </div>
              <Button className="w-full" onClick={() => setStep(2)} disabled={!firstName || !surname || !email || !password}>
                Next →
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg">Select Your Trades</h3>
              {trades.map((trade, i) => (
                <Select key={i} value={trade} onValueChange={(v) => updateTrade(i, v)}>
                  <SelectTrigger><SelectValue placeholder="Select a trade" /></SelectTrigger>
                  <SelectContent>
                    {TRADES.filter((t) => !trades.includes(t) || t === trade).map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              <Button variant="outline" size="sm" onClick={addTrade} className="gap-1">
                <Plus className="w-4 h-4" /> Add another trade
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)} disabled={!trades.some(Boolean)}>Next →</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg">Your Coverage Area</h3>
              <div className="space-y-2">
                <Label>Company Address</Label>
                <div className="relative">
                  <Input value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} placeholder="Type your company address" />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Coverage Radius (km)</Label>
                <Select value={coverageRadius} onValueChange={setCoverageRadius}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {COVERAGE_OPTIONS.map((km) => (
                      <SelectItem key={km} value={km.toString()}>{km} km</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" onClick={handleSubmit} disabled={loading || !companyAddress}>
                  {loading ? "Submitting..." : "Complete Signup"}
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 py-4">
              <CheckCircle className="w-16 h-16 text-primary mx-auto" />
              <h2 className="font-display text-2xl font-bold">Thank you for signing up!</h2>
              <p className="text-muted-foreground">
                We are currently reviewing your details/documents. We will notify you via email and SMS on the progress of your account verification.
              </p>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => navigate("/contractor/dashboard")}>View my dashboard</Button>
                <Button variant="outline" className="flex-1" onClick={() => navigate("/contractor/available")}>Available jobs</Button>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractorSignupPage;
