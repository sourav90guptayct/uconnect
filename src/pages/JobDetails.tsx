import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, DollarSign, Calendar, ArrowLeft, Send, Building, User, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  education_requirements?: string;
}

interface CandidateProfile {
  id: string;
  user_id: string;
}

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [job, setJob] = useState<Job | null>(null);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJob();
    }
    if (user) {
      fetchCandidateProfile();
    }
  }, [id, user]);

  useEffect(() => {
    if (candidateProfile && job) {
      checkIfApplied();
    }
  }, [candidateProfile, job]);

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching job:', error);
        if (error.code === 'PGRST116') {
          toast({
            title: "Job Not Found",
            description: "The job you're looking for doesn't exist or is no longer active.",
            variant: "destructive"
          });
          navigate('/jobs');
        }
        return;
      }

      setJob(data);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load job details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCandidateProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('candidate_profiles')
        .select('id, user_id')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching candidate profile:', error);
        return;
      }

      setCandidateProfile(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkIfApplied = async () => {
    if (!candidateProfile || !job) return;

    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('id')
        .eq('candidate_id', candidateProfile.id)
        .eq('job_id', job.id)
        .single();

      if (data) {
        setHasApplied(true);
      }
    } catch (error) {
      // Not applied yet, which is fine
    }
  };

  const handleApplyJob = async () => {
    if (!candidateProfile || !job) {
      toast({
        title: "Profile Required",
        description: "Please complete your profile to apply for jobs.",
        variant: "destructive"
      });
      navigate('/register');
      return;
    }

    setIsApplying(true);

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: job.id,
          candidate_id: candidateProfile.id,
          cover_letter: coverLetter,
          application_status: 'applied'
        });

      if (error) throw error;

      setHasApplied(true);
      setCoverLetter("");
      setShowApplyDialog(false);
      
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!"
      });
    } catch (error: any) {
      console.error('Error applying for job:', error);
      if (error.code === '23505') {
        toast({
          title: "Already Applied",
          description: "You have already applied for this job.",
          variant: "destructive"
        });
        setHasApplied(true);
      } else {
        toast({
          title: "Application Failed",
          description: "Failed to submit application. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsApplying(false);
    }
  };

  const formatSalary = (min: number, max: number) => {
    return `₹${(min / 100000).toFixed(1)}-${(max / 100000).toFixed(1)} LPA`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading job details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or is no longer active.</p>
            <Button onClick={() => navigate('/jobs')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/jobs')}
            className="mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>

      {/* Job Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-4">{job.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-4">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <Badge variant="secondary" className="text-lg px-3 py-1">{job.company_name}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location_city}, {job.location_state}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.employment_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{job.experience_required}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    {hasApplied ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Applied</span>
                      </div>
                    ) : user ? (
                      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
                        <DialogTrigger asChild>
                          <Button size="lg" className="px-8">
                            Apply Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Apply for {job.title}</DialogTitle>
                            <DialogDescription>
                              at {job.company_name} - {job.location_city}, {job.location_state}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                              <Textarea
                                id="coverLetter"
                                placeholder="Tell us why you're interested in this position and how your skills align with the requirements..."
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                rows={6}
                              />
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setShowApplyDialog(false);
                                  setCoverLetter("");
                                }}
                                disabled={isApplying}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleApplyJob}
                                disabled={!candidateProfile || isApplying}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                {isApplying ? "Submitting..." : "Confirm Application"}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button 
                        size="lg" 
                        className="px-8"
                        onClick={() => navigate('/auth')}
                      >
                        Login to Apply
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Application Deadline: {formatDate(job.application_deadline)}
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Job Description */}
                <section>
                  <h3 className="text-xl font-semibold mb-4">Job Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{job.job_description}</p>
                </section>

                {/* Key Responsibilities */}
                {job.key_responsibilities && job.key_responsibilities.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Key Responsibilities</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {job.key_responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Required Skills */}
                {job.required_skills && job.required_skills.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.required_skills.map((skill, index) => (
                        <Badge key={index} variant="default">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}

                {/* Preferred Skills */}
                {job.preferred_skills && job.preferred_skills.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Preferred Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.preferred_skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education Requirements */}
                {job.education_requirements && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Education Requirements</h3>
                    <p className="text-muted-foreground">{job.education_requirements}</p>
                  </section>
                )}

                {/* Job Highlights */}
                {job.job_highlights && job.job_highlights.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Job Highlights</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {job.job_highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Additional Information */}
                <section className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {job.industry_type && (
                      <div>
                        <span className="font-medium">Industry:</span> {job.industry_type}
                      </div>
                    )}
                    {job.department && (
                      <div>
                        <span className="font-medium">Department:</span> {job.department}
                      </div>
                    )}
                    {job.role_category && (
                      <div>
                        <span className="font-medium">Role Category:</span> {job.role_category}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Job Type:</span> {job.job_type}
                    </div>
                  </div>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetailsPage;