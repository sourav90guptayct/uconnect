import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, Clock, Users, Award, Heart, Zap, DollarSign, Calendar, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Job {
  id: string;
  title: string;
  company_name: string;
  job_type: string;
  employment_type: string;
  experience_required: string;
  salary_min: number;
  salary_max: number;
  location_city: string;
  location_state: string;
  location_district: string;
  job_description: string;
  key_responsibilities: string[];
  required_skills: string[];
  job_highlights: string[];
  industry_type: string;
  department: string;
  role_category: string;
  application_deadline: string;
  created_at: string;
}

const CareersPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [applyingJob, setApplyingJob] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    fetchJobs();
    if (user) {
      fetchCandidateProfile();
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load job openings.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatSalary = (min: number, max: number) => {
    return `₹${(min / 100000).toFixed(1)}-${(max / 100000).toFixed(1)} LPA`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fetchCandidateProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('candidate_profiles')
        .select('id, user_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching candidate profile:', error);
        setCandidateProfile(null);
        return;
      }

      setCandidateProfile(data);
      if (data) {
        fetchAppliedJobs(data.id);
      }
    } catch (error) {
      console.error('Error in fetchCandidateProfile:', error);
      setCandidateProfile(null);
    }
  };

  const fetchAppliedJobs = async (candidateId: string) => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('job_id')
        .eq('candidate_id', candidateId);

      if (error) throw error;
      
      const appliedJobIds = new Set(data?.map(app => app.job_id) || []);
      setAppliedJobs(appliedJobIds);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const handleApplyJob = async (jobId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to apply for jobs.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (!candidateProfile) {
      toast({
        title: "Complete Your Profile",
        description: "Please complete your profile setup to apply for jobs.",
        variant: "destructive"
      });
      navigate('/profile');
      return;
    }

    performJobApplication(jobId, candidateProfile);
  };

  const performJobApplication = async (jobId: string, profile: any) => {
    try {
      const applicationData = {
        job_id: jobId,
        candidate_id: profile.id,
        cover_letter: coverLetter || '',
        application_status: 'applied'
      };
      
      const { data, error } = await supabase
        .from('job_applications')
        .insert(applicationData)
        .select();

      if (error) {
        console.error('Supabase error during job application:', error);
        throw error;
      }

      setAppliedJobs(prev => new Set([...prev, jobId]));
      setCoverLetter("");
      setApplyingJob(null);
      
      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "Your application has been submitted. Check 'My Applications' to track status.",
        duration: 5000
      });
    } catch (error: any) {
      console.error('Error applying for job:', error);
      if (error.code === '23505') {
        toast({
          title: "Already Applied",
          description: "You have already applied for this job.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Application Failed",
          description: `Failed to submit application: ${error.message}. Please try again.`,
          variant: "destructive"
        });
      }
    }
  }

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, and wellness programs"
    },
    {
      icon: Zap,
      title: "Professional Growth",
      description: "Continuous learning opportunities and career advancement paths"
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative work environment with supportive team members"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Performance-based bonuses and recognition programs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Be part of uConnect Technologies and help shape the future of technology solutions. 
            We're looking for passionate individuals who want to make a difference.
          </p>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=6000&q=80"
              alt="Team collaboration"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Why Choose uConnect Technologies?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer more than just a job - we provide a platform for growth, innovation, and meaningful impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Current Openings
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore exciting career opportunities across our different service areas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {isLoading ? (
              <div className="col-span-2 text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading job openings...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground text-lg">No job openings available at the moment.</p>
                <p className="text-muted-foreground">Please check back later or contact HR for upcoming opportunities.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <Badge variant="secondary" className="mb-2">{job.department}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location_city}, {job.location_state}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.employment_type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {formatSalary(job.salary_min, job.salary_max)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Exp: {job.experience_required}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{job.job_description}</p>
                    {job.job_highlights && job.job_highlights.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Highlights:</h4>
                        <ul className="space-y-1">
                          {job.job_highlights.slice(0, 3).map((highlight, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 bg-primary rounded-full flex-shrink-0 mt-2" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {job.required_skills && job.required_skills.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.required_skills.slice(0, 6).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-3">
                        Application Deadline: {formatDate(job.application_deadline)}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                          View Details
                        </Button>
                        {appliedJobs.has(job.id) ? (
                          <Button disabled className="flex-1">
                            Applied
                          </Button>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                className="flex-1" 
                                onClick={() => setApplyingJob(job.id)}
                              >
                                Quick Apply
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Quick Apply for {job.title}</DialogTitle>
                                <DialogDescription>
                                  at {job.company_name} - {job.location_city}, {job.location_state}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                                  <Textarea
                                    id="coverLetter"
                                    placeholder="Tell us why you're interested in this position..."
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    rows={4}
                                  />
                                </div>
                                
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setApplyingJob(null);
                                      setCoverLetter("");
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => handleApplyJob(job.id)}
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    Submit Application
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 text-card-foreground">
                Don't See the Perfect Role?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                We're always looking for talented individuals to join our team. 
                Send us your resume and let us know how you'd like to contribute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/?section=contact">
                  <Button size="lg">
                    Send Your Resume
                  </Button>
                </Link>
                <Link to="/?section=contact">
                  <Button variant="outline" size="lg">
                    Contact HR
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CareersPage;