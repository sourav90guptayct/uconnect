import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, DollarSign, Calendar, Search, Filter, Briefcase, Send } from "lucide-react";
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
  preferred_skills: string[];
  job_highlights: string[];
  industry_type: string;
  department: string;
  role_category: string;
  application_deadline: string;
  created_at: string;
}

interface CandidateProfile {
  id: string;
  user_id: string;
}

const JobsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [applyingJob, setApplyingJob] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchCandidateProfile();
    fetchJobs();
  }, [user, navigate]);

  useEffect(() => {
    if (candidateProfile) {
      fetchAppliedJobs();
    }
  }, [candidateProfile]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, selectedState, selectedExperience]);

  const fetchCandidateProfile = async () => {
    if (!user) {
      console.log('No user found');
      return;
    }
    
    try {
      console.log('Fetching candidate profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('candidate_profiles')
        .select('id, user_id, first_name, last_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching candidate profile:', error);
        setCandidateProfile(null);
        return;
      }

      if (!data) {
        console.log('No candidate profile found - user needs to complete profile to apply for jobs');
        setCandidateProfile(null);
        return;
      }

      console.log('Candidate profile found:', data);
      setCandidateProfile(data);
    } catch (error) {
      console.error('Error in fetchCandidateProfile:', error);
      setCandidateProfile(null);
    }
  };

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load jobs.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    if (!user || !candidateProfile) return;

    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('job_id')
        .eq('candidate_id', candidateProfile.id);

      if (error) throw error;
      
      const appliedJobIds = new Set(data?.map(app => app.job_id) || []);
      setAppliedJobs(appliedJobIds);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.required_skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedState) {
      filtered = filtered.filter(job => job.location_state === selectedState);
    }

    if (selectedExperience) {
      filtered = filtered.filter(job => job.experience_required === selectedExperience);
    }

    setFilteredJobs(filtered);
  };

  const handleApplyJob = async (jobId: string) => {
    console.log('=== JOB APPLICATION DEBUG ===');
    console.log('Apply job clicked for jobId:', jobId);
    console.log('Current user:', user?.id);
    console.log('CandidateProfile state:', candidateProfile);
    console.log('User object:', user);
    
    if (!user) {
      console.log('No user - redirecting to auth');
      navigate('/auth');
      return;
    }

    if (!candidateProfile) {
      console.log('No candidate profile - trying to fetch again...');
      await fetchCandidateProfile();
      
      // Wait a moment for state to update and check again
      setTimeout(async () => {
        const { data: profileCheck } = await supabase
          .from('candidate_profiles')
          .select('id, user_id, first_name, last_name')
          .eq('user_id', user.id)
          .maybeSingle();
        
        console.log('Profile check result:', profileCheck);
        
        if (!profileCheck) {
          console.log('Still no profile found - redirecting to profile page');
          toast({
            title: "Complete Your Profile",
            description: "Please complete your profile setup to apply for jobs.",
            variant: "destructive"
          });
          navigate('/profile');
          return;
        }
        
        // If profile exists, try to apply again
        console.log('Profile found, attempting application with profile:', profileCheck);
        performJobApplication(jobId, profileCheck);
      }, 500);
      return;
    }

    performJobApplication(jobId, candidateProfile);
  };

  const performJobApplication = async (jobId: string, profile: CandidateProfile) => {
    try {
      console.log('=== PERFORMING JOB APPLICATION ===');
      console.log('JobId:', jobId);
      console.log('Profile:', profile);
      console.log('Cover letter:', coverLetter);
      
      const applicationData = {
        job_id: jobId,
        candidate_id: profile.id,
        cover_letter: coverLetter || '',
        application_status: 'applied'
      };
      
      console.log('Inserting application data:', applicationData);
      
      const { data, error } = await supabase
        .from('job_applications')
        .insert(applicationData)
        .select();

      console.log('Insert result - data:', data, 'error:', error);

      if (error) {
        console.error('Supabase error during job application:', error);
        throw error;
      }

      console.log('Job application submitted successfully:', data);
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

  const getUniqueStates = () => {
    const states = [...new Set(jobs.map(job => job.location_state))];
    return states.sort();
  };

  const getUniqueExperience = () => {
    const experience = [...new Set(jobs.map(job => job.experience_required))];
    return experience.sort();
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
            Find Your Dream Job
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Discover exciting career opportunities that match your skills and aspirations.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-lg p-6 border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, skills, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
                  {getUniqueStates().map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  {getUniqueExperience().map(exp => (
                    <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedState("");
                  setSelectedExperience("");
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {isLoading ? "Loading..." : `${filteredJobs.length} Jobs Found`}
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <Badge variant="secondary" className="mb-2">{job.company_name}</Badge>
                      </div>
                      {appliedJobs.has(job.id) && (
                        <Badge variant="default">Applied</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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
                        {job.experience_required}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">{job.job_description}</p>
                    
                    {job.required_skills && job.required_skills.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.required_skills.slice(0, 8).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t">
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
                              <Button className="flex-1" onClick={() => setApplyingJob(job.id)}>
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
                                    disabled={!candidateProfile}
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
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobsPage;