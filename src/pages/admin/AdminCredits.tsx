import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "./AdminDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const typeColor: Record<string, string> = { purchase: "bg-green-100 text-green-800", spend: "bg-blue-100 text-blue-800", refund: "bg-orange-100 text-orange-800" };

const AdminCredits = () => {
  const [txns, setTxns] = useState<any[]>([]);
  useEffect(() => { supabase.from("credits_transactions").select("*").order("created_at", { ascending: false }).then(({ data }) => setTxns(data || [])); }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Credits Transactions</h1>
      {txns.length === 0 ? <p className="text-muted-foreground">No transactions yet.</p> : (
        <div className="space-y-3">{txns.map(t => (
          <Card key={t.id}><CardContent className="p-4 flex justify-between items-center">
            <div><p className="font-medium">{t.amount > 0 ? "+" : ""}{t.amount} credits</p><p className="text-sm text-muted-foreground">{t.reference}</p></div>
            <Badge className={typeColor[t.type] || ""}>{t.type}</Badge>
          </CardContent></Card>
        ))}</div>
      )}
    </AdminLayout>
  );
};

export default AdminCredits;
