import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ContractorLayout from "@/components/ContractorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Briefcase, CreditCard } from "lucide-react";

const ContractorDashboard = () => {
  const { user, profile } = useAuth();
  const [contractorProfile, setContractorProfile] = useState<any>(null);
  const [engagementCount, setEngagementCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const firstName = profile?.full_name || "there";

  useEffect(() => {
    if (!user) return;
    supabase.from("contractor_profiles").select("*").eq("user_id", user.id).single()
      .then(({ data }) => setContractorProfile(data));
    supabase.from("engagements").select("id", { count: "exact" }).eq("contractor_id", user.id)
      .then(({ count }) => setEngagementCount(count || 0));
    supabase.from("jobs").select("id", { count: "exact" }).eq("status", "open" as any)
      .then(({ count }) => setJobCount(count || 0));
  }, [user]);

  const credits = contractorProfile?.credits_balance || 0;

  return (
    <ContractorLayout>
      <h1 className="font-display text-2xl font-bold mb-6">
        Welcome to your account, <span className="text-primary">{firstName}</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Job Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Job Stats
              <span className="block h-0.5 w-12 bg-primary rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-50">
                <p className="text-2xl font-bold text-blue-600">{jobCount}</p>
                <p className="text-xs text-muted-foreground">Available jobs</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50">
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-xs text-muted-foreground">Zero engaged</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-50">
                <p className="text-2xl font-bold text-orange-600">{engagementCount}</p>
                <p className="text-xs text-muted-foreground">Engaged</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-red-50">
                <p className="text-2xl font-bold text-red-600">0</p>
                <p className="text-xs text-muted-foreground">Bad lead pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credits Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Credits Stats
              <span className="block h-0.5 w-12 bg-primary rounded-full" />
            </CardTitle>
            <Link to="/contractor/cart"><Button size="sm">Buy Now</Button></Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-accent">
                <p className="text-2xl font-bold text-primary">{credits}</p>
                <p className="text-xs text-muted-foreground">Credits available</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent">
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-xs text-muted-foreground">Successful jobs</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent">
                <p className="text-2xl font-bold text-primary">{engagementCount}</p>
                <p className="text-xs text-muted-foreground">Engaged with</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent">
                <p className="text-2xl font-bold text-primary">R0.00</p>
                <p className="text-xs text-muted-foreground">Job budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" /> My Reviews
            <span className="block h-0.5 w-12 bg-primary rounded-full" />
          </CardTitle>
          <Button variant="outline" size="sm">View more</Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center py-6">
            You haven't reviewed our tradesmen yet.
          </p>
        </CardContent>
      </Card>
    </ContractorLayout>
  );
};

export default ContractorDashboard;
