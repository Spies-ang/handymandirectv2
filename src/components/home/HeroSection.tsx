import { Button } from "@/components/ui/button";
import { Star, ArrowRight, HardHat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handlePostJob = () => {
    if (user && role === "customer") {
      navigate("/dashboard/post-job");
    } else {
      navigate("/signup");
    }
  };

  return (
    <section className="relative overflow-hidden bg-secondary/50">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-background rounded-full px-4 py-1.5 mb-6 shadow-sm border">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-star text-star" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">4.9★ from 200+ Google Reviews</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
            Find Trusted Tradesmen{" "}
            <span className="text-primary">Near You</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Compare quotes from verified builders, plumbers, electricians and more across South Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="gap-2 text-base px-8 w-full sm:w-auto" onClick={handlePostJob}>
              Post a Job <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base px-8 w-full sm:w-auto" onClick={() => navigate("/contractor/signup")}>
              <HardHat className="w-4 h-4" /> Join as a Contractor
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No fees to post a job · Get up to 3 quotes · Verified contractors
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
