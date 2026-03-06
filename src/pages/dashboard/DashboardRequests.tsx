import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const statusColor: Record<string, string> = {
  open: "bg-blue-100 text-blue-800",
  engaged: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  archived: "bg-muted text-muted-foreground",
};

const DashboardRequests = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("jobs").select("*").eq("customer_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setJobs(data || []));
  }, [user]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">My Requests</h1>
        <Link to="/dashboard/post-job">
          <Button>Post a Job</Button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No requests found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{job.trade_category}</p>
                  <p className="text-sm text-muted-foreground">{job.description?.substring(0, 80)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(job.created_at).toLocaleDateString()}</p>
                </div>
                <Badge className={statusColor[job.status] || ""}>{job.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardRequests;
