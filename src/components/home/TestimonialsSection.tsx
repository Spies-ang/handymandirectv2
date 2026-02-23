import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  { name: "Sarah M.", text: "Absolutely fantastic service! The plumber arrived on time and fixed our geyser in under an hour. Will definitely use again.", rating: 5 },
  { name: "Johan V.", text: "Got three quotes within a day. Very impressed with how easy the process was. Hired a great painter.", rating: 5 },
  { name: "Thandi K.", text: "The electrician was professional, neat, and very reasonably priced. Highly recommend!", rating: 5 },
  { name: "Mike R.", text: "Used Handyman Direct for our office renovation. The builder they connected us with was outstanding.", rating: 5 },
  { name: "Lerato P.", text: "Quick response, fair pricing, and quality work. The handyman fixed multiple things in one visit.", rating: 5 },
  { name: "David S.", text: "Best service I've used for home repairs. The tiler did an incredible job on our bathroom.", rating: 5 },
  { name: "Anele N.", text: "Very happy with the carpenter who built our custom shelving. Professional from start to finish.", rating: 5 },
  { name: "Pieter J.", text: "The roofer was excellent — fixed a tricky leak that two other companies couldn't sort out.", rating: 4 },
  { name: "Nomsa T.", text: "Friendly, reliable, and trustworthy. The plasterer transformed our living room walls.", rating: 5 },
  { name: "Chris B.", text: "Outstanding welder. Our security gate looks amazing and was done ahead of schedule.", rating: 5 },
  { name: "Fatima A.", text: "I was nervous about finding a good contractor. Handyman Direct made it so easy and stress-free.", rating: 5 },
  { name: "Sipho M.", text: "Great experience with the paver. Our driveway looks brand new. Fair price too.", rating: 5 },
  { name: "Linda W.", text: "The renovator completely transformed our kitchen. Couldn't be happier with the result!", rating: 5 },
  { name: "Bongani Z.", text: "Fast quotes, verified contractors, and quality results. This is how it should be done.", rating: 5 },
  { name: "Karen F.", text: "Had an emergency plumbing issue. Within 2 hours I had a verified plumber at my door. Lifesaver!", rating: 5 },
  { name: "Abdul H.", text: "The builder we hired through Handyman Direct built a stunning boundary wall. Top quality.", rating: 5 },
  { name: "Grace L.", text: "Excellent communication throughout. The electrician explained everything clearly before starting.", rating: 5 },
  { name: "Werner D.", text: "Used the site assessment service — totally worth it. Got a detailed breakdown before committing.", rating: 5 },
  { name: "Zanele S.", text: "I've recommended Handyman Direct to all my friends. Reliable every single time.", rating: 5 },
  { name: "Paul C.", text: "Fantastic painter. Clean work, on time, and the finish is flawless. Five stars all the way.", rating: 5 },
];

const TestimonialsSection = () => (
  <section className="bg-muted/50 py-16">
    <div className="container">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-star text-star" />
            ))}
          </div>
          <span className="font-display font-bold text-2xl text-foreground">4.9</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">What Our Customers Say</h2>
        <p className="text-muted-foreground text-lg">200+ verified reviews on Google</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.slice(0, 8).map((r, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <div className="flex gap-0.5 mb-2">
              {[...Array(r.rating)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-star text-star" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">"{r.text}"</p>
            <span className="text-sm font-medium text-foreground">{r.name}</span>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="https://share.google/Qg36252eHBRWcUEbL" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="gap-2">
            View All Reviews on Google <Star className="w-4 h-4 fill-star text-star" />
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
