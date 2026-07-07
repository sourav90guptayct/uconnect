import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import Analytics from "./components/Analytics";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminSidebar from "./components/dashboard/AdminSidebar";
import CandidateSidebar from "./components/dashboard/CandidateSidebar";
import EmployeeSidebar from "./components/dashboard/EmployeeSidebar";
import RoleGuard from "./components/dashboard/RoleGuard";

// Public routes
const ServicesPage = lazy(() => import("./pages/Services"));
const CareersPage = lazy(() => import("./pages/Careers"));
const AboutPage = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Register = lazy(() => import("./pages/Register"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const Support = lazy(() => import("./pages/Support"));
const Clients = lazy(() => import("./pages/Clients"));
const Products = lazy(() => import("./pages/Products"));
const Networks = lazy(() => import("./pages/Networks"));
const ManagedServices = lazy(() => import("./pages/ManagedServices"));
const InfraInstallation = lazy(() => import("./pages/InfraInstallation"));
const ResourceManagement = lazy(() => import("./pages/ResourceManagement"));
const ScreeningL2NetworkEngineer = lazy(() => import("./pages/ScreeningL2NetworkEngineer"));

// Legacy admin (kept for job posting dialogs and system users)
const LegacyAdmin = lazy(() => import("./pages/Admin"));

// Admin dashboard
const AdminOverview = lazy(() => import("./pages/admin/Overview"));
const AdminJobs = lazy(() => import("./pages/admin/Jobs"));
const AdminCandidates = lazy(() => import("./pages/admin/Candidates"));
const AdminScreenings = lazy(() => import("./pages/admin/Screenings"));
const AdminEmployees = lazy(() => import("./pages/admin/Employees"));
const AdminContacts = lazy(() => import("./pages/admin/Contacts"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

// Candidate dashboard
const CandidateOverview = lazy(() => import("./pages/candidate/Overview"));
const CandidateProfile = lazy(() => import("./pages/candidate/Profile"));
const CandidateEducation = lazy(() => import("./pages/candidate/Education"));
const CandidateExperience = lazy(() => import("./pages/candidate/Experience"));
const CandidateSkills = lazy(() => import("./pages/candidate/Skills"));
const CandidateApplications = lazy(() => import("./pages/candidate/Applications"));
const CandidateScreenings = lazy(() => import("./pages/candidate/Screenings"));

// Employee dashboard
const EmployeeMyDay = lazy(() => import("./pages/employee/MyDay"));
const EmployeeTasks = lazy(() => import("./pages/employee/Tasks"));
const EmployeeAttendance = lazy(() => import("./pages/employee/Attendance"));
const EmployeeProfile = lazy(() => import("./pages/employee/Profile"));

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
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/support" element={<Support />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/careers/screening/l2-network-engineer" element={<ScreeningL2NetworkEngineer />} />

              {/* Redirects for legacy paths */}
              <Route path="/profile" element={<Navigate to="/candidate/profile" replace />} />
              <Route path="/my-applications" element={<Navigate to="/candidate/applications" replace />} />
              <Route path="/employer-dashboard" element={<Navigate to="/employee" replace />} />

              {/* Candidate dashboard */}
              <Route
                path="/candidate"
                element={
                  <RoleGuard require="auth">
                    <DashboardLayout sidebar={<CandidateSidebar />} title="My Career" />
                  </RoleGuard>
                }
              >
                <Route index element={<CandidateOverview />} />
                <Route path="profile" element={<CandidateProfile />} />
                <Route path="education" element={<CandidateEducation />} />
                <Route path="experience" element={<CandidateExperience />} />
                <Route path="skills" element={<CandidateSkills />} />
                <Route path="applications" element={<CandidateApplications />} />
                <Route path="screenings" element={<CandidateScreenings />} />
              </Route>

              {/* Employee dashboard */}
              <Route
                path="/employee"
                element={
                  <RoleGuard require="auth">
                    <DashboardLayout sidebar={<EmployeeSidebar />} title="Workspace" />
                  </RoleGuard>
                }
              >
                <Route index element={<EmployeeMyDay />} />
                <Route path="tasks" element={<EmployeeTasks />} />
                <Route path="attendance" element={<EmployeeAttendance />} />
                <Route path="profile" element={<EmployeeProfile />} />
              </Route>

              {/* Admin dashboard */}
              <Route
                path="/admin"
                element={
                  <RoleGuard require="admin">
                    <DashboardLayout sidebar={<AdminSidebar />} title="Admin Console" />
                  </RoleGuard>
                }
              >
                <Route index element={<AdminOverview />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="candidates" element={<AdminCandidates />} />
                <Route path="screenings" element={<AdminScreenings />} />
                <Route path="employees" element={<AdminEmployees />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Legacy full admin (job posting, system users) — still reachable */}
              <Route path="/admin/legacy" element={<LegacyAdmin />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
