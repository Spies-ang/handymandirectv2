import { ShieldCheck, Eye, Lock, Star } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Verified Contractors", desc: "Every tradesman is vetted for quality and reliability before joining our network." },
  { icon: Eye, title: "Privacy Protected", desc: "Your address is never shared upfront — only after you approve a contractor." },
  { icon: Lock, title: "Secure Data", desc: "Your personal information is encrypted and handled with care." },
  { icon: Star, title: "Honest Reviews", desc: "Real reviews from real customers help you choose with confidence." },
];

const TrustSection = () => (
  <section className="container py-16">
    <div className="text-center mb-12">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Built on Trust</h2>
      <p className="text-muted-foreground text-lg">Your safety and satisfaction come first</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className="text-center p-6">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        );
      })}
    </div>
  </section>
);

export default TrustSection;
