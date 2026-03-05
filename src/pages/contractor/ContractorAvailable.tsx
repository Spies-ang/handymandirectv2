import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ContractorLayout from "@/components/ContractorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Info, MapPin, Clock } from "lucide-react";

const ContractorAvailable = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  const [credits, setCredits] = useState(0);
  const [engageJob, setEngageJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("jobs").select("*").eq("status", "open" as any).order("created_at", { ascending: false })
      .then(({ data }) => setJobs(data || []));
    supabase.from("contractor_profiles").select("credits_balance").eq("user_id", user.id).single()
      .then(({ data }) => setCredits(data?.credits_balance || 0));
  }, [user]);

  const handleEngage = async () => {
    if (!user || !engageJob) return;
    if (credits < 1) {
      toast({ title: "No credits", description: "Contact us to top up your credits.", variant: "destructive" });
      setEngageJob(null);
      return;
    }
    setLoading(true);

    await supabase.from("engagements").insert({ job_id: engageJob.id, contractor_id: user.id, credits_used: 1, status: "active" as any });
    await supabase.from("contractor_profiles").update({ credits_balance: credits - 1 }).eq("user_id", user.id);
    await supabase.from("credits_transactions").insert({ contractor_id: user.id, amount: -1, type: "spend" as any, reference: `Engaged job ${engageJob.id}` });

    setCredits(credits - 1);
    toast({ title: "Engaged!", description: "You can now view customer details." });
    setEngageJob(null);
    setLoading(false);
  };

  return (
    <ContractorLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Available Jobs</h1>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-display font-bold text-lg">Available Jobs</h2>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          {jobs.length === 0 ? (
            <Card><CardContent className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No available jobs at the moment.</p>
            </CardContent></Card>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary">{job.trade_category}</Badge>
                        </div>
                        <p className="text-sm mb-2">{job.description?.substring(0, 120)}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location || "Not specified"}</span>
                          <span>R{job.budget || "TBD"}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(job.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => setEngageJob(job)}>Engage</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!engageJob} onOpenChange={() => setEngageJob(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Engagement</DialogTitle>
            <DialogDescription>
              Engaging with this job costs 1 credit. You have {credits} credit{credits !== 1 ? "s" : ""} remaining.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEngageJob(null)}>Cancel</Button>
            <Button onClick={handleEngage} disabled={loading}>{loading ? "Engaging..." : "Confirm"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContractorLayout>
  );
};

export default ContractorAvailable;
