import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "./AdminDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusColor: Record<string, string> = { open: "bg-blue-100 text-blue-800", engaged: "bg-orange-100 text-orange-800", completed: "bg-green-100 text-green-800", archived: "bg-muted text-muted-foreground" };

const AdminJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  useEffect(() => { supabase.from("jobs").select("*").order("created_at", { ascending: false }).then(({ data }) => setJobs(data || [])); }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Jobs</h1>
      {jobs.length === 0 ? <p className="text-muted-foreground">No jobs yet.</p> : (
        <div className="space-y-3">{jobs.map(j => (
          <Card key={j.id}><CardContent className="p-4 flex justify-between items-center">
            <div><p className="font-medium">{j.trade_category}</p><p className="text-sm text-muted-foreground">{j.description?.substring(0, 80)}</p></div>
            <Badge className={statusColor[j.status] || ""}>{j.status}</Badge>
          </CardContent></Card>
        ))}</div>
      )}
    </AdminLayout>
  );
};

export default AdminJobs;
