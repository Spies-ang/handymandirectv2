import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/home/HeroSection";
import TradeSelector from "@/components/home/TradeSelector";
import HowItWorks from "@/components/home/HowItWorks";
import PremiumServices from "@/components/home/PremiumServices";
import PricingSection from "@/components/home/PricingSection";
import TrustSection from "@/components/home/TrustSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServiceAreas from "@/components/home/ServiceAreas";
import FAQSection from "@/components/home/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TradeSelector />
        <HowItWorks />
        <PremiumServices />
        <PricingSection />
        <TrustSection />
        <TestimonialsSection />
        <ServiceAreas />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
