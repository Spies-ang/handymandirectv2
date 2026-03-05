import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { isValidSAPhone, isValidEmail, SA_PHONE_ERROR, EMAIL_ERROR } from "@/lib/validation";
import logo from "@/assets/logo.png";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!isValidSAPhone(mobile)) {
      setPhoneError(SA_PHONE_ERROR);
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (!isValidEmail(email)) {
      setEmailError(EMAIL_ERROR);
      hasError = true;
    } else {
      setEmailError("");
    }

    if (hasError) return;

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${surname}`,
          mobile,
          role: "customer",
        },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({ title: "Account created!", description: "Please check your email to verify your account." });
    navigate("/login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="inline-block mx-auto mb-4">
            <img src={logo} alt="Handyman Direct" className="h-12" />
          </Link>
          <CardTitle className="font-display text-2xl">Create Account</CardTitle>
          <CardDescription>Sign up as a customer to post jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname</Label>
                <Input id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                value={mobile}
                onChange={(e) => { setMobile(e.target.value); setPhoneError(""); }}
                placeholder="081 234 5678"
                required
              />
              {phoneError && <p className="text-xs text-destructive">{phoneError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                placeholder="you@example.com"
                required
              />
              {emailError && <p className="text-xs text-destructive">{emailError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm space-y-2">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
            <p className="text-muted-foreground">
              Are you a contractor?{" "}
              <Link to="/contractor/signup" className="text-primary font-medium hover:underline">Join as Contractor</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
