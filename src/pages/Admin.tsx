import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, FileText, Eye, MapPin, Clock, DollarSign, Calendar, Phone, Mail, UserPlus, Shield, ShieldCheck, Power, PowerOff, Plus, Upload, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Textarea } from '@/components/ui/textarea';

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  created_at: string;
}

interface Job {
  id: string;
  title: string;
  company_name: string;
  location_city: string;
  location_state: string;
  salary_min: number;
  salary_max: number;
  employment_type: string;
  experience_required: string;
  application_count: number;
  created_at: string;
  is_active: boolean;
}

interface JobApplication {
  id: string;
  job_id: string;
  cover_letter: string;
  application_status: string;
  applied_at: string;
  candidate_profiles: {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    profile_summary: string;
    total_experience: string;
    current_city: string;
    expected_salary: number;
    user_id: string;
  };
}

interface CandidateProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  current_city: string;
  home_location: string;
  total_experience: string;
  expected_salary: number;
  created_at: string;
  user_id: string;
  email?: string;
}

interface DashboardStats {
  totalJobs: number;
  totalUsers: number;
  totalApplications: number;
  totalActiveJobs: number;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
}

interface AllUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string;
  profile?: CandidateProfile | null;
}

interface JobFormData {
  title: string;
  company_name: string;
  job_type: string;
  employment_type: string;
  experience_required: string;
  salary_min: number;
  salary_max: number;
  salary_type: string;
  location_city: string;
  location_state: string;
  location_district: string;
  job_description: string;
  key_responsibilities: string[];
  required_skills: string[];
  preferred_skills: string[];
  education_requirements: string;
  industry_type: string;
  role_category: string;
  job_highlights: string[];
  requirements: string[];
  department: string;
  application_deadline: string;
}

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [allUsers, setAllUsers] = useState<AllUser[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'moderator' | 'user'>('user');
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isJobPostDialogOpen, setIsJobPostDialogOpen] = useState(false);
  const [isBulkJobDialogOpen, setIsBulkJobDialogOpen] = useState(false);
  const [bulkJobsText, setBulkJobsText] = useState('');
  const [jobFormData, setJobFormData] = useState<JobFormData>({
    title: '',
    company_name: '',
    job_type: 'full_time',
    employment_type: 'permanent',
    experience_required: '',
    salary_min: 0,
    salary_max: 0,
    salary_type: 'annual',
    location_city: '',
    location_state: '',
    location_district: '',
    job_description: '',
    key_responsibilities: [],
    required_skills: [],
    preferred_skills: [],
    education_requirements: '',
    industry_type: '',
    role_category: '',
    job_highlights: [],
    requirements: [],
    department: '',
    application_deadline: ''
  });
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    totalUsers: 0,
    totalApplications: 0,
    totalActiveJobs: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (!adminLoading && !isAdmin) {
      navigate('/');
      return;
    }

    if (isAdmin) {
      fetchDashboardData();
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
        await Promise.all([
        fetchStats(),
        fetchSubmissions(),
        fetchJobs(),
        fetchCandidates(),
        fetchAllUsers(),
        fetchUserRoles()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [jobsResult, usersResult, applicationsResult, activeJobsResult] = await Promise.all([
        supabase.from('jobs').select('id', { count: 'exact', head: true }),
        supabase.from('candidate_profiles').select('id', { count: 'exact', head: true }),
        supabase.from('job_applications').select('id', { count: 'exact', head: true }),
        supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('is_active', true)
      ]);

      setStats({
        totalJobs: jobsResult.count || 0,
        totalUsers: usersResult.count || 0,
        totalApplications: applicationsResult.count || 0,
        totalActiveJobs: activeJobsResult.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          id,
          title,
          company_name,
          location_city,
          location_state,
          salary_min,
          salary_max,
          employment_type,
          experience_required,
          application_count,
          created_at,
          is_active
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('candidate_profiles')
        .select(`
          id,
          first_name,
          last_name,
          phone,
          current_city,
          home_location,
          total_experience,
          expected_salary,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Get email addresses for candidates using RPC function
      if (data && data.length > 0) {
        const candidatesWithEmail = await Promise.all(
          data.map(async (candidate) => {
            try {
              const { data: email, error: emailError } = await supabase
                .rpc('get_user_email', { user_uuid: candidate.user_id });
              
              return {
                ...candidate,
                email: emailError ? 'Not available' : email || 'Not available'
              };
            } catch {
              return {
                ...candidate,
                email: 'Not available'
              };
            }
          })
        );
        setCandidates(candidatesWithEmail);
      } else {
        setCandidates(data || []);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-all-users');
      
      if (error) throw error;
      
      setAllUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const toggleJobStatus = async (jobId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ is_active: !currentStatus })
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Job Status Updated",
        description: `Job ${!currentStatus ? 'activated' : 'deactivated'} successfully.`
      });

      fetchJobs();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update job status.",
        variant: "destructive"
      });
    }
  };

  const fetchUserRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Get email addresses for users with roles
      if (data && data.length > 0) {
        const usersWithEmail = await Promise.all(
          data.map(async (userRole) => {
            try {
              const { data: email, error: emailError } = await supabase
                .rpc('get_user_email', { user_uuid: userRole.user_id });
              
              return {
                ...userRole,
                email: emailError ? 'Not available' : email || 'Not available'
              };
            } catch {
              return {
                ...userRole,
                email: 'Not available'
              };
            }
          })
        );
        setUserRoles(usersWithEmail);
      } else {
        setUserRoles(data || []);
      }
    } catch (error) {
      console.error('Error fetching user roles:', error);
    }
  };

  const createNewUser = async () => {
    if (!newUserEmail || !newUserPassword) {
      toast({
        title: "Error",
        description: "Please provide both email and password.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });

      if (error) throw error;

      if (data.user) {
        // Assign role to the new user
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([
            { user_id: data.user.id, role: newUserRole }
          ]);

        if (roleError) throw roleError;

        toast({
          title: "User Created",
          description: `User ${newUserEmail} created successfully with ${newUserRole} role.`
        });

        // Reset form and refresh data
        setNewUserEmail('');
        setNewUserPassword('');
        setNewUserRole('user');
        setIsAddUserDialogOpen(false);
        fetchUserRoles();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create user.",
        variant: "destructive"
      });
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Role Updated",
        description: `User role updated to ${newRole}.`
      });

      fetchUserRoles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive"
      });
    }
  };

  const deleteUserRole = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', roleId);

      if (error) throw error;

      toast({
        title: "Role Removed",
        description: "User role removed successfully."
      });

      fetchUserRoles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove user role.",
        variant: "destructive"
      });
    }
  };

  const postSingleJob = async () => {
    try {
      // Validate required fields
      if (!jobFormData.title || !jobFormData.company_name || !jobFormData.location_city || !jobFormData.job_description) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('jobs')
        .insert([
          {
            ...jobFormData,
            posted_by: user?.id,
            application_deadline: jobFormData.application_deadline || null
          }
        ]);

      if (error) throw error;

      toast({
        title: "Job Posted",
        description: "Job has been posted successfully."
      });

      // Reset form and close dialog
      setJobFormData({
        title: '',
        company_name: '',
        job_type: 'full_time',
        employment_type: 'permanent',
        experience_required: '',
        salary_min: 0,
        salary_max: 0,
        salary_type: 'annual',
        location_city: '',
        location_state: '',
        location_district: '',
        job_description: '',
        key_responsibilities: [],
        required_skills: [],
        preferred_skills: [],
        education_requirements: '',
        industry_type: '',
        role_category: '',
        job_highlights: [],
        requirements: [],
        department: '',
        application_deadline: ''
      });
      setIsJobPostDialogOpen(false);
      fetchJobs();
      fetchStats();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post job.",
        variant: "destructive"
      });
    }
  };

  const postBulkJobs = async () => {
    try {
      if (!bulkJobsText.trim()) {
        toast({
          title: "Error",
          description: "Please enter job data.",
          variant: "destructive"
        });
        return;
      }

      // Parse JSON from textarea
      const jobsData = JSON.parse(bulkJobsText);
      
      if (!Array.isArray(jobsData)) {
        throw new Error("Data must be an array of job objects");
      }

      // Add posted_by to each job
      const jobsWithPostedBy = jobsData.map(job => ({
        ...job,
        posted_by: user?.id
      }));

      const { error } = await supabase
        .from('jobs')
        .insert(jobsWithPostedBy);

      if (error) throw error;

      toast({
        title: "Bulk Jobs Posted",
        description: `${jobsData.length} jobs have been posted successfully.`
      });

      setBulkJobsText('');
      setIsBulkJobDialogOpen(false);
      fetchJobs();
      fetchStats();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post bulk jobs. Check JSON format.",
        variant: "destructive"
      });
    }
  };

  const downloadJobTemplate = () => {
    const template = [{
      title: "Sample Job Title",
      company_name: "Company Name",
      job_type: "full_time",
      employment_type: "permanent",
      experience_required: "2-5 years",
      salary_min: 500000,
      salary_max: 800000,
      salary_type: "annual",
      location_city: "City Name",
      location_state: "State Name",
      location_district: "District Name",
      job_description: "Detailed job description here...",
      key_responsibilities: ["Responsibility 1", "Responsibility 2"],
      required_skills: ["Skill 1", "Skill 2"],
      preferred_skills: ["Preferred Skill 1"],
      education_requirements: "Bachelor's degree or equivalent",
      industry_type: "IT/Technology",
      role_category: "Software Development",
      job_highlights: ["Highlight 1", "Highlight 2"],
      requirements: ["Requirement 1", "Requirement 2"],
      department: "Engineering",
      application_deadline: "2025-12-31"
    }];

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job_template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateJobFormField = (field: keyof JobFormData, value: any) => {
    setJobFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateJobFormArray = (field: keyof JobFormData, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    setJobFormData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch contact submissions.",
          variant: "destructive"
        });
      } else {
        setSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete submission.",
          variant: "destructive"
        });
      } else {
        setSubmissions(submissions.filter(s => s.id !== id));
        toast({
          title: "Success",
          description: "Submission deleted successfully.",
        });
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (amount: number) => {
    if (!amount) return 'Not specified';
    return `₹${(amount / 100000).toFixed(1)} LPA`;
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'moderator':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'user':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return <ShieldCheck className="h-3 w-3" />;
      case 'moderator':
        return <Shield className="h-3 w-3" />;
      default:
        return <Users className="h-3 w-3" />;
    }
  };

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading admin dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Manage all jobs, applications, users, and platform statistics.
          </p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalJobs}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalActiveJobs} active
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Registered candidates
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalApplications}</div>
                <p className="text-xs text-muted-foreground">
                  Job applications
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{submissions.length}</div>
                <p className="text-xs text-muted-foreground">
                  Contact form submissions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="jobs" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="jobs">All Jobs</TabsTrigger>
              <TabsTrigger value="post-job">Post Jobs</TabsTrigger>
              <TabsTrigger value="users">All Registered Users</TabsTrigger>
              <TabsTrigger value="system-users">System Users</TabsTrigger>
              <TabsTrigger value="contact">Contact Submissions</TabsTrigger>
            </TabsList>
            
            {/* Jobs Tab */}
            <TabsContent value="jobs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Jobs Posted</CardTitle>
                  <CardDescription>
                    {jobs.length} total jobs posted on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {jobs.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No jobs posted yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                         <TableHeader>
                           <TableRow>
                             <TableHead>Job Title</TableHead>
                             <TableHead>Company</TableHead>
                             <TableHead>Location</TableHead>
                             <TableHead>Salary</TableHead>
                             <TableHead>Applications</TableHead>
                             <TableHead>Status</TableHead>
                             <TableHead>Posted Date</TableHead>
                             <TableHead>Actions</TableHead>
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {jobs.map((job) => (
                             <TableRow key={job.id}>
                               <TableCell className="font-medium">
                                 {job.title}
                               </TableCell>
                               <TableCell>{job.company_name}</TableCell>
                               <TableCell>
                                 <span className="flex items-center gap-1">
                                   <MapPin className="h-3 w-3" />
                                   {job.location_city}, {job.location_state}
                                 </span>
                               </TableCell>
                               <TableCell>
                                 {formatSalary(job.salary_min)} - {formatSalary(job.salary_max)}
                               </TableCell>
                               <TableCell>
                                 <Badge variant="outline">
                                   {job.application_count || 0}
                                 </Badge>
                               </TableCell>
                               <TableCell>
                                 <Badge variant={job.is_active ? "default" : "secondary"}>
                                   {job.is_active ? "Active" : "Inactive"}
                                 </Badge>
                               </TableCell>
                               <TableCell>{formatDate(job.created_at)}</TableCell>
                               <TableCell>
                                 <Button
                                   size="sm"
                                   variant={job.is_active ? "destructive" : "default"}
                                   onClick={() => toggleJobStatus(job.id, job.is_active)}
                                 >
                                   {job.is_active ? (
                                     <>
                                       <PowerOff className="h-3 w-3 mr-1" />
                                       Deactivate
                                     </>
                                   ) : (
                                     <>
                                       <Power className="h-3 w-3 mr-1" />
                                       Activate
                                     </>
                                   )}
                                 </Button>
                               </TableCell>
                             </TableRow>
                           ))}
                         </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Post Jobs Tab */}
            <TabsContent value="post-job" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Single Job Posting */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Post Single Job
                    </CardTitle>
                    <CardDescription>
                      Create and publish a single job posting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog open={isJobPostDialogOpen} onOpenChange={setIsJobPostDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Create New Job
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Post New Job</DialogTitle>
                          <DialogDescription>
                            Fill in the job details below to create a new job posting.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <Label htmlFor="job-title">Job Title *</Label>
                            <Input
                              id="job-title"
                              value={jobFormData.title}
                              onChange={(e) => updateJobFormField('title', e.target.value)}
                              placeholder="e.g. Senior Software Engineer"
                            />
                          </div>
                          <div>
                            <Label htmlFor="company-name">Company Name *</Label>
                            <Input
                              id="company-name"
                              value={jobFormData.company_name}
                              onChange={(e) => updateJobFormField('company_name', e.target.value)}
                              placeholder="e.g. TechCorp Solutions"
                            />
                          </div>
                          <div>
                            <Label htmlFor="job-type">Job Type</Label>
                            <Select value={jobFormData.job_type} onValueChange={(value) => updateJobFormField('job_type', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="full_time">Full Time</SelectItem>
                                <SelectItem value="part_time">Part Time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="employment-type">Employment Type</Label>
                            <Select value={jobFormData.employment_type} onValueChange={(value) => updateJobFormField('employment_type', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="permanent">Permanent</SelectItem>
                                <SelectItem value="temporary">Temporary</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="experience">Experience Required</Label>
                            <Input
                              id="experience"
                              value={jobFormData.experience_required}
                              onChange={(e) => updateJobFormField('experience_required', e.target.value)}
                              placeholder="e.g. 2-5 years"
                            />
                          </div>
                          <div>
                            <Label htmlFor="department">Department</Label>
                            <Input
                              id="department"
                              value={jobFormData.department}
                              onChange={(e) => updateJobFormField('department', e.target.value)}
                              placeholder="e.g. Engineering"
                            />
                          </div>
                          <div>
                            <Label htmlFor="salary-min">Minimum Salary (₹)</Label>
                            <Input
                              id="salary-min"
                              type="number"
                              value={jobFormData.salary_min}
                              onChange={(e) => updateJobFormField('salary_min', parseInt(e.target.value) || 0)}
                              placeholder="e.g. 500000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="salary-max">Maximum Salary (₹)</Label>
                            <Input
                              id="salary-max"
                              type="number"
                              value={jobFormData.salary_max}
                              onChange={(e) => updateJobFormField('salary_max', parseInt(e.target.value) || 0)}
                              placeholder="e.g. 800000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="location-city">City *</Label>
                            <Input
                              id="location-city"
                              value={jobFormData.location_city}
                              onChange={(e) => updateJobFormField('location_city', e.target.value)}
                              placeholder="e.g. Bengaluru"
                            />
                          </div>
                          <div>
                            <Label htmlFor="location-state">State *</Label>
                            <Input
                              id="location-state"
                              value={jobFormData.location_state}
                              onChange={(e) => updateJobFormField('location_state', e.target.value)}
                              placeholder="e.g. Karnataka"
                            />
                          </div>
                          <div>
                            <Label htmlFor="location-district">District</Label>
                            <Input
                              id="location-district"
                              value={jobFormData.location_district}
                              onChange={(e) => updateJobFormField('location_district', e.target.value)}
                              placeholder="e.g. Bengaluru Urban"
                            />
                          </div>
                          <div>
                            <Label htmlFor="application-deadline">Application Deadline</Label>
                            <Input
                              id="application-deadline"
                              type="date"
                              value={jobFormData.application_deadline}
                              onChange={(e) => updateJobFormField('application_deadline', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="job-description">Job Description *</Label>
                            <Textarea
                              id="job-description"
                              value={jobFormData.job_description}
                              onChange={(e) => updateJobFormField('job_description', e.target.value)}
                              placeholder="Detailed job description..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="required-skills">Required Skills (comma-separated)</Label>
                            <Textarea
                              id="required-skills"
                              value={jobFormData.required_skills.join(', ')}
                              onChange={(e) => updateJobFormArray('required_skills', e.target.value)}
                              placeholder="React, Node.js, TypeScript"
                              rows={2}
                            />
                          </div>
                          <div>
                            <Label htmlFor="key-responsibilities">Key Responsibilities (comma-separated)</Label>
                            <Textarea
                              id="key-responsibilities"
                              value={jobFormData.key_responsibilities.join(', ')}
                              onChange={(e) => updateJobFormArray('key_responsibilities', e.target.value)}
                              placeholder="Develop features, Code reviews, Team collaboration"
                              rows={2}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsJobPostDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={postSingleJob}>
                            Post Job
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Bulk Job Posting */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Bulk Job Upload
                    </CardTitle>
                    <CardDescription>
                      Upload multiple jobs at once using JSON format
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={downloadJobTemplate} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                    <Dialog open={isBulkJobDialogOpen} onOpenChange={setIsBulkJobDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Bulk Jobs
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Bulk Job Upload</DialogTitle>
                          <DialogDescription>
                            Paste your JSON data below. Download the template first to see the required format.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="bulk-jobs">Job Data (JSON Format)</Label>
                            <Textarea
                              id="bulk-jobs"
                              value={bulkJobsText}
                              onChange={(e) => setBulkJobsText(e.target.value)}
                              placeholder="Paste your JSON data here..."
                              rows={15}
                              className="font-mono text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsBulkJobDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={postBulkJobs}>
                            Upload Jobs
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <p className="text-muted-foreground">Manage user accounts and permissions</p>
                </div>
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New User</DialogTitle>
                      <DialogDescription>
                        Add a new user to the system and assign their access level.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="user-email">Email Address</Label>
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="user@example.com"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="user-password">Password</Label>
                        <Input
                          id="user-password"
                          type="password"
                          placeholder="Enter password"
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="user-role">Access Level</Label>
                        <Select value={newUserRole} onValueChange={(value: 'admin' | 'moderator' | 'user') => setNewUserRole(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Read Only Access</SelectItem>
                            <SelectItem value="moderator">Moderator (Limited Access)</SelectItem>
                            <SelectItem value="admin">Full Access (Admin)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={createNewUser}>
                          Create User
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Registered Users</CardTitle>
                  <CardDescription>
                    {allUsers.length} total users registered on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {allUsers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No users registered yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                       <Table>
                         <TableHeader>
                           <TableRow>
                             <TableHead>Email</TableHead>
                             <TableHead>Profile Status</TableHead>
                             <TableHead>Name</TableHead>
                             <TableHead>Phone</TableHead>
                             <TableHead>Current City</TableHead>
                             <TableHead>Experience</TableHead>
                             <TableHead>Expected Salary</TableHead>
                             <TableHead>Last Sign In</TableHead>
                             <TableHead>Registered Date</TableHead>
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {allUsers.map((user) => (
                             <TableRow key={user.id}>
                               <TableCell className="font-medium">
                                 <span className="flex items-center gap-1">
                                   <Mail className="h-3 w-3" />
                                   {user.email}
                                 </span>
                               </TableCell>
                               <TableCell>
                                 <Badge variant={user.profile ? "default" : "secondary"}>
                                   {user.profile ? "Complete" : "Incomplete"}
                                 </Badge>
                               </TableCell>
                               <TableCell>
                                 {user.profile ? `${user.profile.first_name} ${user.profile.last_name}` : 'Not provided'}
                               </TableCell>
                               <TableCell>
                                 <span className="flex items-center gap-1">
                                   <Phone className="h-3 w-3" />
                                   {user.profile?.phone || 'Not provided'}
                                 </span>
                               </TableCell>
                               <TableCell>
                                 <span className="flex items-center gap-1">
                                   <MapPin className="h-3 w-3" />
                                   {user.profile?.current_city || 'Not specified'}
                                 </span>
                               </TableCell>
                               <TableCell>
                                 <Badge variant="outline">
                                   {user.profile?.total_experience || 'Not specified'}
                                 </Badge>
                               </TableCell>
                               <TableCell>
                                 {user.profile?.expected_salary ? formatSalary(user.profile.expected_salary) : 'Not specified'}
                               </TableCell>
                               <TableCell>
                                 {user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never'}
                               </TableCell>
                               <TableCell>{formatDate(user.created_at)}</TableCell>
                             </TableRow>
                           ))}
                         </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Users Management */}
            <TabsContent value="system-users" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">System User Management</h2>
                  <p className="text-muted-foreground">Manage user accounts and permissions</p>
                </div>
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New User</DialogTitle>
                      <DialogDescription>
                        Add a new user to the system and assign their access level.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="user-email">Email Address</Label>
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="user@example.com"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="user-password">Password</Label>
                        <Input
                          id="user-password"
                          type="password"
                          placeholder="Enter password"
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="user-role">Access Level</Label>
                        <Select value={newUserRole} onValueChange={(value: 'admin' | 'moderator' | 'user') => setNewUserRole(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Read Only Access</SelectItem>
                            <SelectItem value="moderator">Moderator (Limited Access)</SelectItem>
                            <SelectItem value="admin">Full Access (Admin)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={createNewUser}>
                          Create User
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>System Users</CardTitle>
                  <CardDescription>
                    {userRoles.length} users with assigned roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userRoles.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No users with roles assigned yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Access Level</TableHead>
                            <TableHead>Created Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userRoles.map((userRole) => (
                            <TableRow key={userRole.id}>
                              <TableCell className="font-medium">
                                <span className="flex items-center gap-2">
                                  <Mail className="h-3 w-3" />
                                  {userRole.email}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge className={getRoleColor(userRole.role)}>
                                  <span className="flex items-center gap-1">
                                    {getRoleIcon(userRole.role)}
                                    {userRole.role}
                                  </span>
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {userRole.role === 'admin' ? 'Full Access' : 
                                 userRole.role === 'moderator' ? 'Limited Access' : 'Read Only'}
                              </TableCell>
                              <TableCell>{formatDate(userRole.created_at)}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Select
                                    value={userRole.role}
                                    onValueChange={(value: 'admin' | 'moderator' | 'user') => updateUserRole(userRole.user_id, value)}
                                  >
                                    <SelectTrigger className="w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">Read Only</SelectItem>
                                      <SelectItem value="moderator">Moderator</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteUserRole(userRole.id)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>


            {/* Contact Submissions Tab */}
            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form Submissions</CardTitle>
                  <CardDescription>
                    {submissions.length} total contact submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submissions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No contact submissions yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {submissions.map((submission) => (
                            <TableRow key={submission.id}>
                              <TableCell className="font-medium">
                                {submission.full_name}
                              </TableCell>
                              <TableCell>{submission.email}</TableCell>
                              <TableCell>
                                {submission.company || (
                                  <Badge variant="secondary">No company</Badge>
                                )}
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Contact Submission</DialogTitle>
                                      <DialogDescription>
                                        From {submission.full_name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <strong>Email:</strong> {submission.email}
                                      </div>
                                      {submission.phone && (
                                        <div>
                                          <strong>Phone:</strong> {submission.phone}
                                        </div>
                                      )}
                                      {submission.company && (
                                        <div>
                                          <strong>Company:</strong> {submission.company}
                                        </div>
                                      )}
                                      <div>
                                        <strong>Message:</strong>
                                        <p className="mt-2 text-muted-foreground">{submission.message}</p>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                              <TableCell>
                                {formatDate(submission.created_at)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteSubmission(submission.id)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}