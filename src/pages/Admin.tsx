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
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, FileText, Eye, MapPin, Clock, DollarSign, Calendar, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  total_experience: string;
  expected_salary: number;
  created_at: string;
  user_id: string;
}

interface DashboardStats {
  totalJobs: number;
  totalUsers: number;
  totalApplications: number;
  totalActiveJobs: number;
}

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
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
        fetchCandidates()
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
          total_experience,
          expected_salary,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCandidates(data || []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchJobApplications = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          id,
          job_id,
          cover_letter,
          application_status,
          applied_at,
          candidate_profiles!inner (
            id,
            first_name,
            last_name,
            phone,
            profile_summary,
            total_experience,
            current_city,
            expected_salary,
            user_id
          )
        `)
        .eq('job_id', jobId)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ application_status: status })
        .eq('id', applicationId);

      if (error) throw error;

      if (selectedJob) {
        fetchJobApplications(selectedJob);
      }

      toast({
        title: "Status Updated",
        description: `Application status updated to ${status}.`
      });
    } catch (error) {
      console.error('Error updating application status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive"
      });
    }
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'shortlisted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="jobs">All Jobs</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="candidates">All Candidates</TabsTrigger>
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
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <h2 className="text-2xl font-bold">Job Applications</h2>
                <Select value={selectedJob} onValueChange={(value) => {
                  setSelectedJob(value);
                  if (value) {
                    fetchJobApplications(value);
                  } else {
                    setApplications([]);
                  }
                }}>
                  <SelectTrigger className="w-full md:w-80">
                    <SelectValue placeholder="Select a job to view applications" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Jobs</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} - {job.company_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedJob && applications.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Applications for Selected Job</CardTitle>
                    <CardDescription>
                      {applications.length} applications received
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <Card key={application.id} className="border-l-4 border-l-primary">
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {application.candidate_profiles.first_name} {application.candidate_profiles.last_name}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {application.candidate_profiles.phone}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {application.candidate_profiles.current_city}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {application.candidate_profiles.total_experience}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    {formatSalary(application.candidate_profiles.expected_salary)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(application.application_status)}>
                                  {application.application_status}
                                </Badge>
                                <Select
                                  value={application.application_status}
                                  onValueChange={(status) => updateApplicationStatus(application.id, status)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="applied">Applied</SelectItem>
                                    <SelectItem value="reviewed">Reviewed</SelectItem>
                                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            {application.candidate_profiles.profile_summary && (
                              <div className="mb-4">
                                <h4 className="font-semibold mb-2">Profile Summary:</h4>
                                <p className="text-sm text-muted-foreground">
                                  {application.candidate_profiles.profile_summary}
                                </p>
                              </div>
                            )}
                            
                            {application.cover_letter && (
                              <div className="mb-4">
                                <h4 className="font-semibold mb-2">Cover Letter:</h4>
                                <p className="text-sm text-muted-foreground">
                                  {application.cover_letter}
                                </p>
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>Applied on: {formatDate(application.applied_at)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : selectedJob ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                      No applications received for this job yet.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                      Select a job to view its applications.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Candidates Tab */}
            <TabsContent value="candidates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Registered Candidates</CardTitle>
                  <CardDescription>
                    {candidates.length} candidates registered on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {candidates.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No candidates registered yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Experience</TableHead>
                            <TableHead>Expected Salary</TableHead>
                            <TableHead>Registered Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {candidates.map((candidate) => (
                            <TableRow key={candidate.id}>
                              <TableCell className="font-medium">
                                {candidate.first_name} {candidate.last_name}
                              </TableCell>
                              <TableCell>{candidate.phone || 'Not provided'}</TableCell>
                              <TableCell>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {candidate.current_city || 'Not specified'}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {candidate.total_experience || 'Not specified'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {formatSalary(candidate.expected_salary)}
                              </TableCell>
                              <TableCell>{formatDate(candidate.created_at)}</TableCell>
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