import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookingPage from "./pages/BookingPage";
import ContractorsPage from "./pages/ContractorsPage";
import FAQPage from "./pages/FAQPage";
import TradePage from "./pages/TradePage";
import AreaPage from "./pages/AreaPage";
import TradeCityPage from "./pages/TradeCityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/contractors" element={<ContractorsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/trade/:slug" element={<TradePage />} />
          <Route path="/area/:citySlug" element={<AreaPage />} />
          <Route path="/area/:citySlug/:tradeSlug" element={<TradeCityPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
