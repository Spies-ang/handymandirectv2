import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, HardHat, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ROTATING_WORDS = ["Tradesmen", "Contractors", "Handymen"];

const LOCATIONS = [
  { label: "All Areas", suffix: "Near You" },
  { label: "Pretoria", suffix: "in Pretoria" },
  { label: "Cape Town / Stellenbosch", suffix: "in Cape Town" },
  { label: "Durban", suffix: "in Durban" },
];

const HeroSection = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [locationIndex, setLocationIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 1500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
            Find Trusted{" "}
            <span
              style={{
                color: "#27AE60",
                fontWeight: 800,
                display: "inline-block",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-8px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>{" "}
            <span className="text-primary">{LOCATIONS[locationIndex].suffix}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Compare quotes from verified builders, plumbers, electricians and more across South Africa.
          </p>

          {/* Location selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {LOCATIONS.map((loc, i) => (
              <button
                key={loc.label}
                onClick={() => setLocationIndex(i)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  locationIndex === i
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary"
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                {loc.label}
              </button>
            ))}
          </div>

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
