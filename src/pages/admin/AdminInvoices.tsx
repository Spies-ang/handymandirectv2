import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "./AdminDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  useEffect(() => { supabase.from("invoices").select("*").order("created_at", { ascending: false }).then(({ data }) => setInvoices(data || [])); }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Invoices</h1>
      {invoices.length === 0 ? <p className="text-muted-foreground">No invoices yet.</p> : (
        <div className="space-y-3">{invoices.map(inv => (
          <Card key={inv.id}><CardContent className="p-4 flex justify-between">
            <div><p className="font-medium">R{inv.amount}</p><p className="text-sm text-muted-foreground">{inv.description} • {inv.reference_number}</p></div>
            <Badge className={inv.status === "paid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>{inv.status}</Badge>
          </CardContent></Card>
        ))}</div>
      )}
    </AdminLayout>
  );
};

export default AdminInvoices;
