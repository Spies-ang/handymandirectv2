import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ContractorLayout from "@/components/ContractorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Phone, Mail } from "lucide-react";

const ContractorEngagements = () => {
  const { user } = useAuth();
  const [engagements, setEngagements] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("engagements").select("*, jobs(*)")
      .eq("contractor_id", user.id)
      .order("created_at", { ascending: false })
      .then(async ({ data }) => {
        if (!data) return;
        const enriched = await Promise.all(
          data.map(async (e) => {
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name, mobile, email")
              .eq("user_id", e.jobs?.customer_id)
              .single();
            return { ...e, customer: profile };
          })
        );
        setEngagements(enriched);
      });
  }, [user]);

  return (
    <ContractorLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Engagements</h1>
      {engagements.length === 0 ? (
        <Card><CardContent className="text-center py-12">
          <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No engagements yet.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {engagements.map((e) => (
            <Card key={e.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge variant="secondary">{e.jobs?.trade_category}</Badge>
                    <p className="text-sm mt-1">{e.jobs?.description?.substring(0, 100)}</p>
                  </div>
                  <Badge className={e.status === "active" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}>
                    {e.status}
                  </Badge>
                </div>
                {e.customer && (
                  <div className="mt-3 p-3 rounded-lg bg-accent text-sm space-y-1">
                    <p className="font-medium">{e.customer.full_name}</p>
                    <p className="flex items-center gap-1 text-muted-foreground"><Phone className="w-3 h-3" />{e.customer.mobile}</p>
                    <p className="flex items-center gap-1 text-muted-foreground"><Mail className="w-3 h-3" />{e.customer.email}</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">{new Date(e.created_at).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ContractorLayout>
  );
};

export default ContractorEngagements;
