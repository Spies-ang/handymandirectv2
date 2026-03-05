import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ContractorLayout from "@/components/ContractorLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());

const ContractorInvoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (!user) return;
    supabase.from("invoices").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setInvoices(data || []));
    supabase.from("contractor_profiles").select("credits_balance").eq("user_id", user.id).single()
      .then(({ data }) => setCredits(data?.credits_balance || 0));
  }, [user]);

  return (
    <ContractorLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Invoices</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Total credits: {credits}</span>
          <Link to="/contractor/cart"><Button size="sm">Buy Now</Button></Link>
        </div>
      </div>

      <Tabs defaultValue="invoices">
        <TabsList><TabsTrigger value="invoices">Invoices</TabsTrigger><TabsTrigger value="receipts">Receipts</TabsTrigger></TabsList>
        <div className="flex flex-wrap gap-3 my-4">
          <Select><SelectTrigger className="w-32"><SelectValue placeholder="Start month" /></SelectTrigger>
            <SelectContent>{months.map((m, i) => <SelectItem key={m} value={(i+1).toString()}>{m}</SelectItem>)}</SelectContent></Select>
          <Select><SelectTrigger className="w-28"><SelectValue placeholder="Start year" /></SelectTrigger>
            <SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select>
          <Input placeholder="Reference #" className="w-40" />
          <Button size="sm">Search</Button>
        </div>
        <TabsContent value="invoices">
          {invoices.filter(i => i.status === "unpaid").length === 0 ? (
            <Card><CardContent className="text-center py-12"><FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No invoices found.</p></CardContent></Card>
          ) : (
            <div className="space-y-3">{invoices.filter(i => i.status === "unpaid").map(inv => (
              <Card key={inv.id}><CardContent className="p-4"><div className="flex justify-between"><p className="font-medium">R{inv.amount}</p><p className="text-sm text-muted-foreground">{inv.reference_number}</p></div></CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
        <TabsContent value="receipts">
          {invoices.filter(i => i.status === "paid").length === 0 ? (
            <Card><CardContent className="text-center py-12"><FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No receipts found.</p></CardContent></Card>
          ) : (
            <div className="space-y-3">{invoices.filter(i => i.status === "paid").map(inv => (
              <Card key={inv.id}><CardContent className="p-4"><div className="flex justify-between"><p className="font-medium">R{inv.amount}</p><p className="text-sm text-muted-foreground">{inv.reference_number}</p></div></CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
      </Tabs>
    </ContractorLayout>
  );
};

export default ContractorInvoices;
