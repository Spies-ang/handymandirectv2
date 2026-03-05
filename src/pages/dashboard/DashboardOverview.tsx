import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Star, Info } from "lucide-react";

const statusColor: Record<string, string> = {
  open: "bg-blue-100 text-blue-800",
  engaged: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  archived: "bg-muted text-muted-foreground",
};

const DashboardOverview = () => {
  const { user, profile } = useAuth();
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const firstName = profile?.full_name?.split(" ")[0] || "there";

  useEffect(() => {
    if (!user) return;
    supabase.from("jobs").select("*").eq("customer_id", user.id).order("created_at", { ascending: false }).limit(3)
      .then(({ data }) => setRecentJobs(data || []));
    supabase.from("reviews").select("*").eq("customer_id", user.id).order("created_at", { ascending: false }).limit(5)
      .then(({ data }) => setReviews(data || []));
  }, [user]);

  return (
    <DashboardLayout>
      <h1 className="font-display text-2xl font-bold mb-6">
        Welcome to your account, <span className="text-primary">{firstName}</span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Recent Job Posts
              <span className="block h-0.5 w-12 bg-primary rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentJobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No posts found</p>
                <Link to="/dashboard/post-job">
                  <Button>Post a job →</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{job.trade_category}</p>
                      <p className="text-xs text-muted-foreground">{job.description?.substring(0, 60)}...</p>
                    </div>
                    <Badge className={statusColor[job.status] || ""}>{job.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Overview
              <span className="block h-0.5 w-12 bg-primary rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{profile?.full_name || "—"}</p>
                <p className="text-xs text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground"><strong>Mobile:</strong> {profile?.mobile || "—"}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2 mt-4">
              <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-800">Your review rating will appear here. Contractors will review your interaction and their experience working with you.</p>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Your Reviews
              <span className="block h-0.5 w-12 bg-primary rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-6">
                You haven't reviewed our contractors yet. Please review our contractors after they complete the job!
              </p>
            ) : (
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="p-3 rounded-lg border">
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-star text-star" />
                      ))}
                    </div>
                    <p className="text-sm">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardOverview;
