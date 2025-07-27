import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditProfileModal from "@/components/EditProfileModal";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Star,
  Edit,
  Download
} from "lucide-react";

interface CandidateProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  current_city: string;
  home_location: string;
  total_experience: string;
  current_salary: number;
  expected_salary: number;
  notice_period: number;
  profile_summary: string;
  resume_url: string;
}

interface Education {
  id: string;
  education_level: string;
  course_name: string;
  specialization: string;
  institute_name: string;
  year_of_passing: number;
  percentage: number;
}

interface Skill {
  id: string;
  skill_name: string;
  proficiency_level: number;
  years_of_experience: number;
}

interface Experience {
  id: string;
  company_name: string;
  designation: string;
  employment_type: string;
  start_date: string;
  end_date: string;
  is_current_job: boolean;
  salary: number;
  job_description: string;
  location: string;
}

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchUserProfile();
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      
      // Fetch candidate profile
      const { data: profileData, error: profileError } = await supabase
        .from("candidate_profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // No profile found, redirect to registration
          navigate("/register");
          return;
        }
        throw profileError;
      }

      setProfile(profileData);

      // Fetch education
      const { data: educationData, error: educationError } = await supabase
        .from("candidate_education")
        .select("*")
        .eq("candidate_id", profileData.id)
        .order("year_of_passing", { ascending: false });

      if (educationError) throw educationError;
      setEducation(educationData || []);

      // Fetch skills
      const { data: skillsData, error: skillsError } = await supabase
        .from("candidate_skills")
        .select("*")
        .eq("candidate_id", profileData.id)
        .order("proficiency_level", { ascending: false });

      if (skillsError) throw skillsError;
      setSkills(skillsData || []);

      // Fetch experience
      const { data: experienceData, error: experienceError } = await supabase
        .from("candidate_experience")
        .select("*")
        .eq("candidate_id", profileData.id)
        .order("start_date", { ascending: false });

      if (experienceError) throw experienceError;
      setExperience(experienceData || []);

    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="text-lg">Loading profile...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-muted-foreground mb-4">Please complete your registration first.</p>
            <Button onClick={() => navigate("/register")}>Complete Registration</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      {profile.first_name} {profile.last_name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {profile.current_city}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <EditProfileModal profile={profile} onProfileUpdate={fetchUserProfile}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </EditProfileModal>
                  {profile.resume_url && (
                    <Button variant="outline" size="sm" onClick={() => window.open(profile.resume_url, '_blank')}>
                      <Download className="h-4 w-4 mr-2" />
                      View Resume
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.total_experience} experience</span>
                </div>
                {profile.date_of_birth && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(profile.date_of_birth)}</span>
                  </div>
                )}
              </div>
              
              {profile.profile_summary && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="font-semibold mb-2">Professional Summary</h3>
                    <p className="text-muted-foreground">{profile.profile_summary}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Experience Section */}
          {experience.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id}>
                    {index > 0 && <Separator className="mb-4" />}
                    <div>
                      <h3 className="font-semibold">{exp.designation}</h3>
                      <p className="text-primary font-medium">{exp.company_name}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                        <span>{formatDate(exp.start_date)} - {exp.is_current_job ? "Present" : formatDate(exp.end_date)}</span>
                        {exp.location && <span>• {exp.location}</span>}
                        <span>• {exp.employment_type.replace('_', ' ')}</span>
                      </div>
                      {exp.job_description && (
                        <p className="mt-2 text-sm">{exp.job_description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id}>
                    {index > 0 && <Separator className="mb-4" />}
                    <div>
                      <h3 className="font-semibold">{edu.course_name}</h3>
                      {edu.specialization && (
                        <p className="text-muted-foreground">{edu.specialization}</p>
                      )}
                      <p className="text-primary font-medium">{edu.institute_name}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        {edu.year_of_passing && <span>{edu.year_of_passing}</span>}
                        {edu.percentage && <span>• {edu.percentage}%</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="px-3 py-1">
                      {skill.skill_name}
                      {skill.proficiency_level && (
                        <span className="ml-2 text-xs">
                          {"★".repeat(skill.proficiency_level)}{"☆".repeat(5 - skill.proficiency_level)}
                        </span>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Salary Expectations */}
          <Card>
            <CardHeader>
              <CardTitle>Salary & Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.current_salary && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Current Salary</h4>
                    <p className="text-lg font-semibold">{formatSalary(profile.current_salary)}</p>
                  </div>
                )}
                {profile.expected_salary && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Expected Salary</h4>
                    <p className="text-lg font-semibold">{formatSalary(profile.expected_salary)}</p>
                  </div>
                )}
                {profile.notice_period && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Notice Period</h4>
                    <p className="text-lg font-semibold">{profile.notice_period} days</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}