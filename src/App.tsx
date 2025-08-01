import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeAuth from "./pages/EmployeeAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import ServicesPage from "./pages/Services";
import CareersPage from "./pages/Careers";
import AboutPage from "./pages/About";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Support from "./pages/Support";
import MyApplications from "./pages/MyApplications";
import EmployerDashboard from "./pages/EmployerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-auth" element={<EmployeeAuth />} />
            <Route path="/support" element={<Support />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
