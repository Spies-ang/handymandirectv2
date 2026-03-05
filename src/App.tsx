import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import BookingPage from "./pages/BookingPage";
import ContractorsPage from "./pages/ContractorsPage";
import FAQPage from "./pages/FAQPage";
import TradePage from "./pages/TradePage";
import AreaPage from "./pages/AreaPage";
import TradeCityPage from "./pages/TradeCityPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContractorSignupPage from "./pages/ContractorSignupPage";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardRequests from "./pages/dashboard/DashboardRequests";
import DashboardInvoices from "./pages/dashboard/DashboardInvoices";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import PostJobPage from "./pages/dashboard/PostJobPage";
import ContractorDashboard from "./pages/contractor/ContractorDashboard";
import ContractorAvailable from "./pages/contractor/ContractorAvailable";
import ContractorEngagements from "./pages/contractor/ContractorEngagements";
import ContractorRequests from "./pages/contractor/ContractorRequests";
import ContractorArchives from "./pages/contractor/ContractorArchives";
import ContractorInvoices from "./pages/contractor/ContractorInvoices";
import ContractorProfile from "./pages/contractor/ContractorProfile";
import ContractorCart from "./pages/contractor/ContractorCart";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminContractors from "./pages/admin/AdminContractors";
import AdminCredits from "./pages/admin/AdminCredits";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminReviews from "./pages/admin/AdminReviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/contractors" element={<ContractorsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/trade/:slug" element={<TradePage />} />
            <Route path="/area/:citySlug" element={<AreaPage />} />
            <Route path="/area/:citySlug/:tradeSlug" element={<TradeCityPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/contractor/signup" element={<ContractorSignupPage />} />

            {/* Customer dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["customer"]}><DashboardOverview /></ProtectedRoute>} />
            <Route path="/dashboard/requests" element={<ProtectedRoute allowedRoles={["customer"]}><DashboardRequests /></ProtectedRoute>} />
            <Route path="/dashboard/invoices" element={<ProtectedRoute allowedRoles={["customer"]}><DashboardInvoices /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute allowedRoles={["customer"]}><DashboardProfile /></ProtectedRoute>} />
            <Route path="/dashboard/post-job" element={<ProtectedRoute allowedRoles={["customer"]}><PostJobPage /></ProtectedRoute>} />

            {/* Contractor dashboard */}
            <Route path="/contractor/dashboard" element={<ProtectedRoute allowedRoles={["contractor"]}><ContractorDashboard /></ProtectedRoute>} />
            <Route path="/contractor/available" element={<ProtectedRoute allowedRoles={["contractor"]}><ContractorAvailable /></ProtectedRoute>} />
            <Route path="/contractor/engagements" element={<ProtectedRoute allowedRoles={["contractor"]}><ContractorEngagements /></ProtectedRoute>} />
            <Route path="/contractor/requests" element={<ProtectedRoute allowedRoles={["contractor"]}><ContractorRequests /></ProtectedRoute>} />
            <Route path="/contractor/archives" element={<ProtectedRoute allowedRoles={["contractor"]}><ContractorArchives /></ProtectedRoute>} />
            <Route path="/contractor/invoices" element={<ProtectedRoute allowedRoles={["contractor"]}><ContractorInvoices /></ProtectedRoute>} />
            <Route path="/contractor/profile" element={<ProtectedRoute allowedRoles={["contractor"]}><ContractorProfile /></ProtectedRoute>} />
            <Route path="/contractor/cart" element={<ProtectedRoute allowedRoles={["contractor"]}><ContractorCart /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/jobs" element={<ProtectedRoute allowedRoles={["admin"]}><AdminJobs /></ProtectedRoute>} />
            <Route path="/admin/contractors" element={<ProtectedRoute allowedRoles={["admin"]}><AdminContractors /></ProtectedRoute>} />
            <Route path="/admin/credits" element={<ProtectedRoute allowedRoles={["admin"]}><AdminCredits /></ProtectedRoute>} />
            <Route path="/admin/invoices" element={<ProtectedRoute allowedRoles={["admin"]}><AdminInvoices /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={["admin"]}><AdminReviews /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
