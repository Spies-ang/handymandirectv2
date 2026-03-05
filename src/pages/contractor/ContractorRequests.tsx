import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ContractorLayout from "@/components/ContractorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const statusColor: Record<string, string> = {
  pending: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

const ContractorRequests = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("quotes").select("*, jobs(*)").eq("contractor_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setQuotes(data || []));
  }, [user]);

  return (
    <ContractorLayout>
      <h1 className="font-display text-2xl font-bold mb-6">My Requests</h1>
      {quotes.length === 0 ? (
        <Card><CardContent className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No quotes submitted yet.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <Card key={q.id}><CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{q.jobs?.trade_category}</p>
                <p className="text-sm text-muted-foreground">R{q.amount}</p>
              </div>
              <Badge className={statusColor[q.status] || ""}>{q.status}</Badge>
            </CardContent></Card>
          ))}
        </div>
      )}
    </ContractorLayout>
  );
};

export default ContractorRequests;
