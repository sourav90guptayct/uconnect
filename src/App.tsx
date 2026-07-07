import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import Analytics from "./components/Analytics";


// Lazy load secondary routes for faster initial load
const ServicesPage = lazy(() => import("./pages/Services"));
const CareersPage = lazy(() => import("./pages/Careers"));
const AboutPage = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const Support = lazy(() => import("./pages/Support"));
const MyApplications = lazy(() => import("./pages/MyApplications"));
const EmployerDashboard = lazy(() => import("./pages/EmployerDashboard"));
const Clients = lazy(() => import("./pages/Clients"));
const Products = lazy(() => import("./pages/Products"));
const Networks = lazy(() => import("./pages/Networks"));
const ManagedServices = lazy(() => import("./pages/ManagedServices"));
const InfraInstallation = lazy(() => import("./pages/InfraInstallation"));
const ResourceManagement = lazy(() => import("./pages/ResourceManagement"));
const ScreeningL2NetworkEngineer = lazy(() => import("./pages/ScreeningL2NetworkEngineer"));
const AdminScreenings = lazy(() => import("./pages/AdminScreenings"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Analytics />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/networks" element={<Networks />} />
              <Route path="/managed-services" element={<ManagedServices />} />
              <Route path="/infra-installation" element={<InfraInstallation />} />
              <Route path="/resource-management" element={<ResourceManagement />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/support" element={<Support />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/careers/screening/l2-network-engineer" element={<ScreeningL2NetworkEngineer />} />
              <Route path="/admin/screenings" element={<AdminScreenings />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
