import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "./AdminDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminContractors = () => {
  const { toast } = useToast();
  const [contractors, setContractors] = useState<any[]>([]);

  const fetchContractors = () => {
    supabase.from("contractor_profiles").select("*, profiles!contractor_profiles_user_id_fkey(full_name, email)")
      .order("created_at", { ascending: false })
      .then(({ data }) => setContractors(data || []));
  };

  useEffect(() => { fetchContractors(); }, []);

  const promoteAndVerify = async (cp: any) => {
    const { error } = await supabase.rpc("promote_to_contractor", { p_user_id: cp.user_id });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Contractor verified and promoted!" });
    }
    fetchContractors();
  };

  const unverify = async (cp: any) => {
    await supabase.from("contractor_profiles").update({ is_verified: false }).eq("id", cp.id);
    toast({ title: "Contractor unverified" });
    fetchContractors();
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Contractors</h1>
      <div className="space-y-3">
        {contractors.map((c) => (
          <Card key={c.id}><CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{c.profiles?.full_name || "Unknown"}</p>
              <p className="text-sm text-muted-foreground">{c.company_name} • {c.profiles?.email}</p>
              <div className="flex gap-1 mt-1">{(c.trade_categories || []).map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={c.is_verified ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>{c.is_verified ? "Verified" : "Pending"}</Badge>
              <Button size="sm" variant="outline" onClick={() => c.is_verified ? unverify(c) : promoteAndVerify(c)}>{c.is_verified ? "Unverify" : "Approve"}</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminContractors;
