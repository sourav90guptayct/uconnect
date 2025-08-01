import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Calendar, Briefcase, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
interface JobApplication {
  id: string;
  job_id: string;
  cover_letter: string;
  application_status: string;
  applied_at: string;
  jobs: {
    id: string;
    title: string;
    company_name: string;
    location_city: string;
    location_state: string;
    salary_min: number;
    salary_max: number;
    employment_type: string;
    experience_required: string;
  };
}
const MyApplicationsPage = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    const initializeData = async () => {
      await fetchApplications();
      
      // Set up real-time subscription after initial data fetch
      const channel = supabase
        .channel('my-applications-updates')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'job_applications'
          },
          (payload) => {
            console.log('🔄 Application status update received:', payload);
            
            // Update the specific application in the state
            if (payload.new && payload.old) {
              console.log('Status changed from', payload.old.application_status, 'to', payload.new.application_status);
              
              setApplications(prev => {
                const updated = prev.map(app => 
                  app.id === payload.new.id 
                    ? { ...app, application_status: payload.new.application_status }
                    : app
                );
                console.log('Updated applications state:', updated);
                return updated;
              });
              
              // Show toast notification for status change
              const statusDisplayText = getStatusDisplayText(payload.new.application_status);
              toast({
                title: "Application Status Updated",
                description: `Your application status has been updated to: ${statusDisplayText}`,
              });
            }
          }
        )
        .subscribe((status) => {
          console.log('📡 Real-time subscription status:', status);
        });

      return () => {
        console.log('🔌 Cleaning up real-time subscription');
        supabase.removeChannel(channel);
      };
    };

    const cleanup = initializeData();
    
    return () => {
      cleanup.then(cleanupFn => cleanupFn && cleanupFn());
    };
  }, [user, navigate]);
  const fetchApplications = async () => {
    if (!user) return;
    try {
      // First get candidate profile
      const {
        data: candidateProfile,
        error: profileError
      } = await supabase.from('candidate_profiles').select('id').eq('user_id', user.id).single();
      if (profileError) {
        console.error('Error fetching candidate profile:', profileError);
        toast({
          title: "Profile Required",
          description: "Please complete your profile to view applications.",
          variant: "destructive"
        });
        navigate('/register');
        return;
      }

      // Get applications with job details
      const {
        data,
        error
      } = await supabase.from('job_applications').select(`
          id,
          job_id,
          cover_letter,
          application_status,
          applied_at,
          jobs (
            id,
            title,
            company_name,
            location_city,
            location_state,
            salary_min,
            salary_max,
            employment_type,
            experience_required
          )
        `).eq('candidate_id', candidateProfile.id).order('applied_at', {
        ascending: false
      });
      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load your applications.",
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
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'screening':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'interview':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'offer':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'hired':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusDisplayText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'Applied';
      case 'screening':
        return 'Under Review';
      case 'interview':
        return 'Interview Scheduled';
      case 'offer':
        return 'Offer Extended';
      case 'hired':
        return 'Hired';
      case 'rejected':
        return 'Rejected';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  if (!user) {
    return null;
  }
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            My Applications
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Track the status of your job applications and manage your career journey.
          </p>
        </div>
      </div>

      {/* Applications List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {isLoading ? "Loading..." : `${applications.length} Applications`}
            </h2>
            <Button onClick={() => navigate('/jobs')}>
              Browse Jobs
            </Button>
          </div>

          {isLoading ? <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading applications...</p>
            </div> : applications.length === 0 ? <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
              <p className="text-muted-foreground mb-6">You haven't applied to any jobs yet. Start exploring opportunities!</p>
              <Button onClick={() => navigate('/jobs')}>
                Browse Jobs
              </Button>
            </div> : <div className="space-y-6">
              {applications.map(application => <Card key={application.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{application.jobs.title}</CardTitle>
                        <Badge variant="secondary" className="mb-2">{application.jobs.company_name}</Badge>
                      </div>
                       <div className="text-right">
                         <Badge className={getStatusColor(application.application_status)}>
                           {getStatusDisplayText(application.application_status)}
                         </Badge>
                         <p className="text-sm text-muted-foreground mt-2">
                           Applied on {formatDate(application.applied_at)}
                         </p>
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {application.jobs.location_city}, {application.jobs.location_state}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {application.jobs.employment_type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {formatSalary(application.jobs.salary_min, application.jobs.salary_max)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {application.jobs.experience_required}
                      </span>
                    </div>
                   </CardHeader>
                   
                   <CardContent>
                     <div className="space-y-4">
                       {/* Status Progress Indicator */}
                       <div className="bg-muted/30 rounded-lg p-4">
                         <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                           <Clock className="h-4 w-4" />
                           Application Status
                         </h4>
                         <div className="flex items-center justify-between text-sm">
                           <div className="flex items-center gap-2">
                             <div className={`w-3 h-3 rounded-full ${
                               ['applied', 'screening', 'interview', 'offer', 'hired'].includes(application.application_status) 
                                 ? 'bg-green-500' : 'bg-gray-300'
                             }`}></div>
                             <span className="text-muted-foreground">Applied</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className={`w-3 h-3 rounded-full ${
                               ['screening', 'interview', 'offer', 'hired'].includes(application.application_status) 
                                 ? 'bg-green-500' : 'bg-gray-300'
                             }`}></div>
                             <span className="text-muted-foreground">Under Review</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className={`w-3 h-3 rounded-full ${
                               ['interview', 'offer', 'hired'].includes(application.application_status) 
                                 ? 'bg-green-500' : 'bg-gray-300'
                             }`}></div>
                             <span className="text-muted-foreground">Interview</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className={`w-3 h-3 rounded-full ${
                               ['offer', 'hired'].includes(application.application_status) 
                                 ? 'bg-green-500' : 'bg-gray-300'
                             }`}></div>
                             <span className="text-muted-foreground">Offer</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className={`w-3 h-3 rounded-full ${
                               application.application_status === 'hired' 
                                 ? 'bg-green-500' : 'bg-gray-300'
                             }`}></div>
                             <span className="text-muted-foreground">Hired</span>
                           </div>
                         </div>
                         
                         {/* Status-specific messages */}
                         <div className="mt-3 p-3 rounded-md bg-background border">
                           {application.application_status === 'screening' && (
                             <p className="text-sm text-muted-foreground">
                               🔍 Your application is being reviewed by the hiring team. We'll update you soon!
                             </p>
                           )}
                           {application.application_status === 'interview' && (
                             <p className="text-sm text-green-700 dark:text-green-300">
                               🎉 Congratulations! You've been selected for an interview. Check your email for details.
                             </p>
                           )}
                           {application.application_status === 'offer' && (
                             <p className="text-sm text-green-700 dark:text-green-300">
                               🌟 Excellent news! You've received a job offer. Please check your email for next steps.
                             </p>
                           )}
                           {application.application_status === 'hired' && (
                             <p className="text-sm text-green-700 dark:text-green-300">
                               🎊 Welcome to the team! Your application has been successful. Congratulations!
                             </p>
                           )}
                           {application.application_status === 'rejected' && (
                             <p className="text-sm text-red-700 dark:text-red-300">
                               Thank you for your interest. While we won't be moving forward with your application this time, we encourage you to apply for future opportunities.
                             </p>
                           )}
                           {application.application_status === 'applied' && (
                             <p className="text-sm text-blue-700 dark:text-blue-300">
                               📝 Your application has been submitted successfully. We'll review it and get back to you soon.
                             </p>
                           )}
                         </div>
                       </div>

                       {/* Cover Letter */}
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

                       {/* Action buttons based on status */}
                       <div className="flex gap-2">
                         <Button 
                           variant="outline" 
                           size="sm"
                           onClick={() => navigate(`/job/${application.job_id}`)}
                         >
                           View Job Details
                         </Button>
                         {(application.application_status === 'interview' || application.application_status === 'offer') && (
                           <Button 
                             size="sm"
                             onClick={() => window.open('mailto:', '_blank')}
                           >
                             Contact HR
                           </Button>
                         )}
                       </div>
                     </div>
                   </CardContent>
                </Card>)}
            </div>}
        </div>
      </section>

      <Footer />
    </div>;
};
export default MyApplicationsPage;