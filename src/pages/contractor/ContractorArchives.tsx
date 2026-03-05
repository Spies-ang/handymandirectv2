import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ContractorLayout from "@/components/ContractorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Archive } from "lucide-react";

const ContractorArchives = () => {
  const { user } = useAuth();
  const [engagements, setEngagements] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("engagements").select("*, jobs(*)").eq("contractor_id", user.id).eq("status", "completed" as any)
      .order("created_at", { ascending: false })
      .then(({ data }) => setEngagements(data || []));
  }, [user]);

  return (
    <ContractorLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Archives</h1>
      {engagements.length === 0 ? (
        <Card><CardContent className="text-center py-12">
          <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No archived jobs.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {engagements.map((e) => (
            <Card key={e.id}><CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <Badge variant="secondary">{e.jobs?.trade_category}</Badge>
                  <p className="text-sm mt-1">{e.jobs?.description?.substring(0, 100)}</p>
                </div>
                <Badge className="bg-muted text-muted-foreground">Completed</Badge>
              </div>
            </CardContent></Card>
          ))}
        </div>
      )}
    </ContractorLayout>
  );
};

export default ContractorArchives;
