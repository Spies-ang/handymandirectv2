import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ContractorLayout from "@/components/ContractorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { User, Shield, Bell, CreditCard, FileText, Briefcase } from "lucide-react";

const panels = [
  { id: "account", label: "My Account", icon: User },
  { id: "security", label: "Sign-in & Security", icon: Shield },
  { id: "notifications", label: "Notification Settings", icon: Bell },
  { id: "subscriptions", label: "My Subscriptions", icon: CreditCard },
  { id: "documents", label: "My Documents", icon: FileText },
  { id: "profile", label: "My Profile", icon: Briefcase },
] as const;

const ContractorProfile = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [activePanel, setActivePanel] = useState<string>("account");
  const [contractorProfile, setContractorProfile] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("contractor_profiles").select("*").eq("user_id", user.id).single()
      .then(({ data }) => setContractorProfile(data));
  }, [user]);

  const credits = contractorProfile?.credits_balance || 0;

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) { toast({ title: "Passwords don't match", variant: "destructive" }); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Password updated!" }); setNewPassword(""); setConfirmPassword(""); }
    setLoading(false);
  };

  return (
    <ContractorLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">My Account</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Total credits: {credits}</span>
          <Link to="/contractor/cart"><Button size="sm">Buy Now</Button></Link>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="space-y-1">
          {panels.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActivePanel(id)}
              className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activePanel === id ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted"}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        <div className="md:col-span-3">
          {activePanel === "account" && (
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Account Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center"><User className="w-8 h-8 text-primary" /></div>
                  <Button variant="outline" size="sm">Update Photo</Button>
                </div>
                <div><Label className="text-muted-foreground text-xs">Profile Description</Label><p className="text-sm">{contractorProfile?.profile_description || "No description set"}</p><Button variant="outline" size="sm" className="mt-1">Update</Button></div>
                <div><Label className="text-muted-foreground text-xs">Company Name</Label><p className="font-medium">{contractorProfile?.company_name || "—"}</p></div>
                <div className="flex items-center justify-between"><div><Label className="text-muted-foreground text-xs">Mobile</Label><p className="font-medium">{profile?.mobile || "—"}</p></div><Button variant="outline" size="sm">Update</Button></div>
                <div className="flex items-center justify-between"><div><Label className="text-muted-foreground text-xs">Email</Label><p className="font-medium">{profile?.email || "—"}</p></div><Button variant="outline" size="sm">Update</Button></div>
                <div><Label className="text-muted-foreground text-xs">Address</Label><p className="font-medium">{contractorProfile?.company_address || "—"}</p></div>
              </CardContent>
            </Card>
          )}

          {activePanel === "security" && (
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Change Password</CardTitle></CardHeader>
              <CardContent className="space-y-4 max-w-md">
                <div className="space-y-2"><Label>New Password</Label><Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
                <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
                <Button onClick={handlePasswordChange} disabled={loading || !newPassword}>{loading ? "Updating..." : "Update Password"}</Button>
              </CardContent>
            </Card>
          )}

          {activePanel === "profile" && (
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="font-display text-lg">Trade Categories</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(contractorProfile?.trade_categories || []).map((t: string) => (
                      <Badge key={t} className="bg-primary/10 text-primary border-primary/20">{t}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="font-display text-lg">Coverage Area</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm mb-1"><strong>Address:</strong> {contractorProfile?.company_address || "—"}</p>
                  <p className="text-sm mb-3"><strong>Radius:</strong> {contractorProfile?.coverage_radius_km || 25} km</p>
                  <Button variant="outline" size="sm">Update</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activePanel === "notifications" && (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Notification settings coming soon.</CardContent></Card>
          )}
          {activePanel === "subscriptions" && (
            <Card><CardContent className="py-12 text-center text-muted-foreground">
              <p>Status: <Badge variant="secondary">{contractorProfile?.subscription_status || "expired"}</Badge></p>
            </CardContent></Card>
          )}
          {activePanel === "documents" && (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Document management coming soon.</CardContent></Card>
          )}
        </div>
      </div>
    </ContractorLayout>
  );
};

export default ContractorProfile;
