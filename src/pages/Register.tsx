import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignUpForm from "@/components/registration/SignUpForm";
import PersonalDetailsForm from "@/components/registration/PersonalDetailsForm";
import EducationForm from "@/components/registration/EducationForm";
import SkillsForm from "@/components/registration/SkillsForm";
import ExperienceForm from "@/components/registration/ExperienceForm";
import ProfileSummaryForm from "@/components/registration/ProfileSummaryForm";

export interface CandidateProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  currentCity: string;
  homeLocation: string;
  totalExperience: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  profileSummary: string;
}

export interface EducationData {
  educationLevel: string;
  courseName: string;
  specialization: string;
  instituteName: string;
  yearOfPassing: string;
  percentage: string;
}

export interface SkillData {
  skillName: string;
  proficiencyLevel: number;
  yearsOfExperience: string;
}

export interface ExperienceData {
  companyName: string;
  designation: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  salary: string;
  jobDescription: string;
  location: string;
}

const steps = [
  { id: 1, title: "Sign Up", description: "Create your account" },
  { id: 2, title: "Personal Details", description: "Basic information" },
  { id: 3, title: "Education", description: "Educational background" },
  { id: 4, title: "Skills", description: "Technical & soft skills" },
  { id: 5, title: "Experience", description: "Work experience" },
  { id: 6, title: "Profile Summary", description: "Complete your profile" },
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form data states
  const [profileData, setProfileData] = useState<CandidateProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    currentCity: "",
    homeLocation: "",
    totalExperience: "fresher",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    profileSummary: "",
  });

  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
  const [experienceData, setExperienceData] = useState<ExperienceData[]>([]);

  const progress = (currentStep / steps.length) * 100;

  const handleSignUpSuccess = (email: string) => {
    setProfileData(prev => ({ ...prev, email }));
    setCurrentStep(2);
    toast({
      title: "Account created successfully!",
      description: "Please complete your profile to get started.",
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to complete registration.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Create candidate profile
      const { data: profile, error: profileError } = await supabase
        .from("candidate_profiles")
        .insert({
          user_id: user.id,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          date_of_birth: profileData.dateOfBirth,
          gender: profileData.gender,
          current_city: profileData.currentCity,
          home_location: profileData.homeLocation,
          total_experience: profileData.totalExperience as any,
          current_salary: profileData.currentSalary ? parseFloat(profileData.currentSalary) : null,
          expected_salary: profileData.expectedSalary ? parseFloat(profileData.expectedSalary) : null,
          notice_period: profileData.noticePeriod ? parseInt(profileData.noticePeriod) : null,
          profile_summary: profileData.profileSummary,
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // Insert education data
      if (educationData.length > 0) {
        const educationInserts = educationData.map(edu => ({
          candidate_id: profile.id,
          education_level: edu.educationLevel as any,
          course_name: edu.courseName,
          specialization: edu.specialization,
          institute_name: edu.instituteName,
          year_of_passing: edu.yearOfPassing ? parseInt(edu.yearOfPassing) : null,
          percentage: edu.percentage ? parseFloat(edu.percentage) : null,
        }));

        const { error: educationError } = await supabase
          .from("candidate_education")
          .insert(educationInserts);
        
        if (educationError) throw educationError;
      }

      // Insert skills data
      if (skillsData.length > 0) {
        const skillsInserts = skillsData.map(skill => ({
          candidate_id: profile.id,
          skill_name: skill.skillName,
          proficiency_level: skill.proficiencyLevel,
          years_of_experience: skill.yearsOfExperience ? parseFloat(skill.yearsOfExperience) : null,
        }));

        const { error: skillsError } = await supabase
          .from("candidate_skills")
          .insert(skillsInserts);
        
        if (skillsError) throw skillsError;
      }

      // Insert experience data
      if (experienceData.length > 0) {
        const experienceInserts = experienceData.map(exp => ({
          candidate_id: profile.id,
          company_name: exp.companyName,
          designation: exp.designation,
          employment_type: exp.employmentType as any,
          start_date: exp.startDate,
          end_date: exp.endDate || null,
          is_current_job: exp.isCurrentJob,
          salary: exp.salary ? parseFloat(exp.salary) : null,
          job_description: exp.jobDescription,
          location: exp.location,
        }));

        const { error: experienceError } = await supabase
          .from("candidate_experience")
          .insert(experienceInserts);
        
        if (experienceError) throw experienceError;
      }

      toast({
        title: "Registration Complete!",
        description: "Your profile has been created successfully.",
      });

      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SignUpForm onSuccess={handleSignUpSuccess} />;
      case 2:
        return (
          <PersonalDetailsForm
            data={profileData}
            onUpdate={setProfileData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <EducationForm
            data={educationData}
            onUpdate={setEducationData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <SkillsForm
            data={skillsData}
            onUpdate={setSkillsData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <ExperienceForm
            data={experienceData}
            onUpdate={setExperienceData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 6:
        return (
          <ProfileSummaryForm
            data={profileData}
            onUpdate={setProfileData}
            onSubmit={handleFinalSubmit}
            onPrevious={handlePrevious}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Candidate Registration</CardTitle>
              <CardDescription>
                Complete your profile to start applying for jobs
              </CardDescription>
              
              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto mt-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Step {currentStep} of {steps.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Steps Navigation */}
              <div className="flex justify-center mt-4">
                <div className="flex flex-wrap gap-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                        step.id === currentStep
                          ? "bg-primary text-primary-foreground"
                          : step.id < currentStep
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className="font-medium">{step.id}</span>
                      <span className="hidden sm:inline">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}