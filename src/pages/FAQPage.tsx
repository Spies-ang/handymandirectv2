import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FAQSection from "@/components/home/FAQSection";

const FAQPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 bg-muted/30">
      <FAQSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default FAQPage;
