import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviewPlatforms as slides } from "@/config/siteConfig";

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrent((index + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    touchStartX.current = null;
  };

  const slide = slides[current];

  return (
    <section className="bg-muted/50 py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">Verified reviews across multiple platforms</p>
        </div>

        <div className="relative max-w-4xl mx-auto px-8 md:px-12">
          {/* Slider track */}
          <div className="overflow-hidden rounded-2xl w-full">
            <div
              className="flex w-full"
              style={{
                transform: `translateX(-${current * 100}%)`,
                transition: "transform 0.4s ease",
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {slides.map((s, i) => (
                <div
                  key={i}
                  style={{ flex: "0 0 100%" }}
                  className="w-full min-w-0 bg-card border rounded-2xl p-6 md:p-8 break-words"
                >
                  {/* Platform header */}
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{ backgroundColor: s.badgeColor }}
                    >
                      {s.logo}
                    </span>
                    <div>
                      <p className="font-display font-bold text-foreground">{s.platform}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold" style={{ color: s.badgeColor }}>{s.rating}</span>
                        <span>·</span>
                        <span>{s.count}</span>
                      </div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-star text-star" />
                      ))}
                    </div>
                  </div>

                  {/* Excerpts */}
                  <ul className="space-y-3">
                    {s.excerpts.map((excerpt, j) => (
                      <li key={j} className="text-sm text-muted-foreground border-l-2 pl-3 break-words leading-relaxed" style={{ borderColor: s.badgeColor }}>
                        "{excerpt}"
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-5 text-sm font-medium hover:underline"
                    style={{ color: s.badgeColor }}
                  >
                    View all {s.platform} reviews →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={() => goTo(current - 1)}
            className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border shadow-sm flex items-center justify-center hover:bg-muted transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border shadow-sm flex items-center justify-center hover:bg-muted transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-primary scale-125" : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
