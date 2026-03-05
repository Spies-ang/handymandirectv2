import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "./AdminDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminReviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = () => { supabase.from("reviews").select("*").order("created_at", { ascending: false }).then(({ data }) => setReviews(data || [])); };
  useEffect(() => { fetchReviews(); }, []);

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    toast({ title: "Review deleted" });
    fetchReviews();
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Reviews</h1>
      {reviews.length === 0 ? <p className="text-muted-foreground">No reviews yet.</p> : (
        <div className="space-y-3">{reviews.map(r => (
          <Card key={r.id}><CardContent className="p-4 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1 mb-1">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-star text-star" />)}</div>
              <p className="text-sm">{r.comment}</p>
            </div>
            <Button size="sm" variant="destructive" onClick={() => deleteReview(r.id)}>Delete</Button>
          </CardContent></Card>
        ))}</div>
      )}
    </AdminLayout>
  );
};

export default AdminReviews;
