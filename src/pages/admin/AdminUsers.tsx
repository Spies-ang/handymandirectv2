import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "./AdminDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("profiles").select("*, user_roles(role)").order("created_at", { ascending: false })
      .then(({ data }) => setProfiles(data || []));
  }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Users</h1>
      <div className="space-y-3">
        {profiles.map((p) => (
          <Card key={p.id}><CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{p.full_name || "Unknown"}</p>
              <p className="text-sm text-muted-foreground">{p.email}</p>
            </div>
            <Badge variant="secondary">{p.user_roles?.[0]?.role || "—"}</Badge>
          </CardContent></Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
