import { Search, FileText, MessageSquare, ThumbsUp } from "lucide-react";

const steps = [
  { icon: Search, title: "Select Your Trade", desc: "Choose from 12 verified trade categories" },
  { icon: FileText, title: "Describe Your Job", desc: "Tell us what needs to be done" },
  { icon: MessageSquare, title: "Receive Quotes", desc: "Get up to 3 quotes from verified pros" },
  { icon: ThumbsUp, title: "Compare & Hire", desc: "Pick the best contractor and leave a review" },
];

const HowItWorks = () => (
  <section className="bg-muted/50 py-16">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
        <p className="text-muted-foreground text-lg">Four simple steps to your perfect contractor</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="relative text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="font-display font-bold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorks;
