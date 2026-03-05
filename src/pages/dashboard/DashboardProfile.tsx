import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Shield } from "lucide-react";

const DashboardProfile = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [activePanel, setActivePanel] = useState<"account" | "security">("account");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Password updated!" });
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <h1 className="font-display text-2xl font-bold mb-6">My Account</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-1">
          <button
            onClick={() => setActivePanel("account")}
            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${activePanel === "account" ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted"}`}
          >
            <User className="w-4 h-4 inline mr-2" /> My Account
          </button>
          <button
            onClick={() => setActivePanel("security")}
            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${activePanel === "security" ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted"}`}
          >
            <Shield className="w-4 h-4 inline mr-2" /> Sign-in & Security
          </button>
        </div>

        {/* Main panel */}
        <div className="md:col-span-3">
          {activePanel === "account" && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <Button variant="outline" size="sm">Update Photo</Button>
                </div>
                <div className="grid gap-4">
                  <div><Label className="text-muted-foreground text-xs">Full Name</Label><p className="font-medium">{profile?.full_name || "—"}</p></div>
                  <div className="flex items-center justify-between">
                    <div><Label className="text-muted-foreground text-xs">Mobile Number</Label><p className="font-medium">{profile?.mobile || "—"}</p></div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div><Label className="text-muted-foreground text-xs">Email Address</Label><p className="font-medium">{profile?.email || "—"}</p></div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                  <div><Label className="text-muted-foreground text-xs">Home Address</Label><p className="text-sm text-muted-foreground">Post a job first</p></div>
                  <div><Label className="text-muted-foreground text-xs">Job Address</Label><p className="text-sm text-muted-foreground">Post a job first</p></div>
                </div>
              </CardContent>
            </Card>
          )}

          {activePanel === "security" && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <Button onClick={handlePasswordChange} disabled={loading || !newPassword}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfile;
