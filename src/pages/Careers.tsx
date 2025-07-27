import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Award, Heart, Zap, DollarSign, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

  useEffect(() => {
    fetchJobs();
  }, []);

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
                      <Link to="/auth">
                        <Button className="w-full">
                          Apply Now
                        </Button>
                      </Link>
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