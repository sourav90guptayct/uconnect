import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, DollarSign, Calendar, Briefcase, FileText, User, Phone, Mail, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

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

interface CandidateDetails {
  profile: any;
  education: any[];
  experience: any[];
  skills: any[];
}

const EmployerDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [candidateDetails, setCandidateDetails] = useState<CandidateDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCandidate, setIsLoadingCandidate] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchEmployerJobs();
  }, [user, navigate]);

  useEffect(() => {
    if (selectedJob) {
      fetchJobApplications(selectedJob);
    }
  }, [selectedJob]);

  const fetchEmployerJobs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('posted_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
      
      if (data && data.length > 0) {
        setSelectedJob(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching employer jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load your posted jobs.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
          candidate_profiles (
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
      toast({
        title: "Error",
        description: "Failed to load applications for this job.",
        variant: "destructive"
      });
    }
  };

  const fetchCandidateDetails = async (candidateId: string) => {
    setIsLoadingCandidate(true);
    try {
      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('candidate_profiles')
        .select('*')
        .eq('id', candidateId)
        .single();

      if (profileError) throw profileError;

      // Fetch education
      const { data: education, error: educationError } = await supabase
        .from('candidate_education')
        .select('*')
        .eq('candidate_id', candidateId)
        .order('year_of_passing', { ascending: false });

      // Fetch experience
      const { data: experience, error: experienceError } = await supabase
        .from('candidate_experience')
        .select('*')
        .eq('candidate_id', candidateId)
        .order('start_date', { ascending: false });

      // Fetch skills
      const { data: skills, error: skillsError } = await supabase
        .from('candidate_skills')
        .select('*')
        .eq('candidate_id', candidateId)
        .order('years_of_experience', { ascending: false });

      setCandidateDetails({
        profile,
        education: education || [],
        experience: experience || [],
        skills: skills || []
      });
    } catch (error) {
      console.error('Error fetching candidate details:', error);
      toast({
        title: "Error",
        description: "Failed to load candidate details.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCandidate(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ application_status: status })
        .eq('id', applicationId);

      if (error) throw error;

      // Refresh applications
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (amount: number) => {
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Employer Dashboard
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Manage your job postings and review applications from talented candidates.
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs posted yet</h3>
              <p className="text-muted-foreground mb-6">Start by posting your first job to attract talented candidates.</p>
              <Button onClick={() => navigate('/post-job')}>
                Post Your First Job
              </Button>
            </div>
          ) : (
            <Tabs value="applications" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="jobs">My Jobs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="applications" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <h2 className="text-2xl font-bold">Job Applications</h2>
                  <Select value={selectedJob} onValueChange={setSelectedJob}>
                    <SelectTrigger className="w-full md:w-80">
                      <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map(job => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title} ({job.application_count || 0} applications)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
                    <p className="text-muted-foreground">No candidates have applied for this job yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <Card key={application.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                {application.candidate_profiles.first_name} {application.candidate_profiles.last_name}
                              </CardTitle>
                              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {application.candidate_profiles.current_city}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {application.candidate_profiles.total_experience}
                                </span>
                                {application.candidate_profiles.expected_salary && (
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {formatSalary(application.candidate_profiles.expected_salary)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(application.application_status)}>
                                {application.application_status.charAt(0).toUpperCase() + application.application_status.slice(1)}
                              </Badge>
                              <p className="text-sm text-muted-foreground mt-2">
                                Applied {formatDate(application.applied_at)}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          {application.candidate_profiles.profile_summary && (
                            <div>
                              <h4 className="font-semibold mb-2">Profile Summary</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {application.candidate_profiles.profile_summary}
                              </p>
                            </div>
                          )}

                          {application.cover_letter && (
                            <div className="bg-muted/50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <h4 className="font-semibold text-sm">Cover Letter</h4>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-3">
                                {application.cover_letter}
                              </p>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => fetchCandidateDetails(application.candidate_profiles.id)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Full Profile
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>
                                    {application.candidate_profiles.first_name} {application.candidate_profiles.last_name} - Full Profile
                                  </DialogTitle>
                                  <DialogDescription>
                                    Complete candidate profile and background
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {isLoadingCandidate ? (
                                  <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                                    <p className="text-muted-foreground">Loading candidate details...</p>
                                  </div>
                                ) : candidateDetails ? (
                                  <div className="space-y-6">
                                    {/* Contact Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Contact via platform</span>
                                      </div>
                                      {candidateDetails.profile.phone && (
                                        <div className="flex items-center gap-2">
                                          <Phone className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-sm">{candidateDetails.profile.phone}</span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Experience */}
                                    {candidateDetails.experience.length > 0 && (
                                      <div>
                                        <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
                                        <div className="space-y-4">
                                          {candidateDetails.experience.map((exp: any) => (
                                            <div key={exp.id} className="border-l-2 border-primary pl-4">
                                              <h4 className="font-medium">{exp.designation}</h4>
                                              <p className="text-sm text-muted-foreground">{exp.company_name}</p>
                                              <p className="text-sm text-muted-foreground">
                                                {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                                              </p>
                                              {exp.job_description && (
                                                <p className="text-sm mt-2">{exp.job_description}</p>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Education */}
                                    {candidateDetails.education.length > 0 && (
                                      <div>
                                        <h3 className="text-lg font-semibold mb-4">Education</h3>
                                        <div className="space-y-4">
                                          {candidateDetails.education.map((edu: any) => (
                                            <div key={edu.id} className="border-l-2 border-secondary pl-4">
                                              <h4 className="font-medium">{edu.course_name}</h4>
                                              <p className="text-sm text-muted-foreground">{edu.institute_name}</p>
                                              <p className="text-sm text-muted-foreground">
                                                {edu.year_of_passing} • {edu.percentage && `${edu.percentage}%`}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Skills */}
                                    {candidateDetails.skills.length > 0 && (
                                      <div>
                                        <h3 className="text-lg font-semibold mb-4">Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                          {candidateDetails.skills.map((skill: any) => (
                                            <Badge key={skill.id} variant="outline">
                                              {skill.skill_name}
                                              {skill.years_of_experience && ` (${skill.years_of_experience}y)`}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : null}
                              </DialogContent>
                            </Dialog>

                            <Select 
                              value={application.application_status} 
                              onValueChange={(value) => updateApplicationStatus(application.id, value)}
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="jobs" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Posted Jobs</h2>
                  <Button onClick={() => navigate('/post-job')}>
                    Post New Job
                  </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <Badge variant="secondary">{job.company_name}</Badge>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location_city}, {job.location_state}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {job.application_count || 0} applications
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">
                            Posted {formatDate(job.created_at)}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedJob(job.id)}
                          >
                            View Applications
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmployerDashboardPage;