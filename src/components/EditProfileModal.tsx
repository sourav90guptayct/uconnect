import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CandidateProfile, EducationData, SkillData, ExperienceData } from "@/types/registration";

// Import the individual forms
import PersonalDetailsForm from "./registration/PersonalDetailsForm";
import EducationForm from "./registration/EducationForm";
import SkillsForm from "./registration/SkillsForm";
import ExperienceForm from "./registration/ExperienceForm";
import ProfileSummaryForm from "./registration/ProfileSummaryForm";

interface EditProfileModalProps {
  profile: any;
  onProfileUpdate: () => void;
  children: React.ReactNode;
}

export default function EditProfileModal({ profile, onProfileUpdate, children }: EditProfileModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Profile data states
  const [personalData, setPersonalData] = useState<CandidateProfile>({
    firstName: profile.first_name || "",
    lastName: profile.last_name || "",
    email: user?.email || "",
    phone: profile.phone || "",
    dateOfBirth: profile.date_of_birth || "",
    gender: profile.gender || "",
    currentCity: profile.current_city || "",
    homeLocation: profile.home_location || "",
    totalExperience: profile.total_experience || "fresher",
    currentSalary: profile.current_salary?.toString() || "",
    expectedSalary: profile.expected_salary?.toString() || "",
    noticePeriod: profile.notice_period?.toString() || "",
    profileSummary: profile.profile_summary || "",
    resumeUrl: profile.resume_url || "",
    maritalStatus: profile.marital_status || "",
    familyDetails: profile.family_details || "",
    caste: profile.caste || "",
    disabilityStatus: profile.disability_status || "",
    profilePictureUrl: profile.profile_picture_url || "",
    industry: profile.industry || ""
  });

  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
  const [experienceData, setExperienceData] = useState<ExperienceData[]>([]);

  // Fetch all profile data when modal opens
  useEffect(() => {
    if (open && profile.id) {
      fetchProfileData();
    }
  }, [open, profile.id]);

  const fetchProfileData = async () => {
    try {
      // Fetch education
      const { data: education } = await supabase
        .from('candidate_education')
        .select('*')
        .eq('candidate_id', profile.id);

      if (education) {
        setEducationData(education.map(edu => ({
          educationLevel: edu.education_level,
          courseName: edu.course_name,
          specialization: edu.specialization || "",
          instituteName: edu.institute_name,
          yearOfPassing: edu.year_of_passing?.toString() || "",
          percentage: edu.percentage?.toString() || ""
        })));
      }

      // Fetch skills
      const { data: skills } = await supabase
        .from('candidate_skills')
        .select('*')
        .eq('candidate_id', profile.id);

      if (skills) {
        setSkillsData(skills.map(skill => ({
          skillName: skill.skill_name,
          proficiencyLevel: skill.proficiency_level || 1,
          yearsOfExperience: skill.years_of_experience?.toString() || ""
        })));
      }

      // Fetch experience
      const { data: experience } = await supabase
        .from('candidate_experience')
        .select('*')
        .eq('candidate_id', profile.id);

      if (experience) {
        setExperienceData(experience.map(exp => ({
          companyName: exp.company_name,
          designation: exp.designation,
          employmentType: exp.employment_type,
          startDate: exp.start_date,
          endDate: exp.end_date || "",
          isCurrentJob: exp.is_current_job || false,
          salary: exp.salary?.toString() || "",
          jobDescription: exp.job_description || "",
          location: exp.location || ""
        })));
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleSaveAll = async () => {
    setIsLoading(true);
    try {
      // Update personal details
      const { error: profileError } = await supabase
        .from('candidate_profiles')
        .update({
          first_name: personalData.firstName,
          last_name: personalData.lastName,
          phone: personalData.phone,
          date_of_birth: personalData.dateOfBirth,
          gender: personalData.gender,
          current_city: personalData.currentCity,
          home_location: personalData.homeLocation,
          total_experience: personalData.totalExperience as any,
          current_salary: personalData.currentSalary ? parseInt(personalData.currentSalary) : null,
          expected_salary: personalData.expectedSalary ? parseInt(personalData.expectedSalary) : null,
          notice_period: personalData.noticePeriod ? parseInt(personalData.noticePeriod) : null,
          profile_summary: personalData.profileSummary,
          resume_url: personalData.resumeUrl,
          profile_picture_url: personalData.profilePictureUrl,
          marital_status: personalData.maritalStatus,
          family_details: personalData.familyDetails,
          caste: personalData.caste,
          disability_status: personalData.disabilityStatus,
          industry: personalData.industry as any
        })
        .eq('id', profile.id);

      if (profileError) throw profileError;

      // Delete and recreate education records
      await supabase.from('candidate_education').delete().eq('candidate_id', profile.id);
      if (educationData.length > 0) {
        const educationInserts = educationData.map(edu => ({
          candidate_id: profile.id,
          education_level: edu.educationLevel as any,
          course_name: edu.courseName,
          specialization: edu.specialization,
          institute_name: edu.instituteName,
          year_of_passing: edu.yearOfPassing ? parseInt(edu.yearOfPassing) : null,
          percentage: edu.percentage ? parseFloat(edu.percentage) : null
        }));

        const { error: educationError } = await supabase
          .from('candidate_education')
          .insert(educationInserts);

        if (educationError) throw educationError;
      }

      // Delete and recreate skills records
      await supabase.from('candidate_skills').delete().eq('candidate_id', profile.id);
      if (skillsData.length > 0) {
        const skillsInserts = skillsData.map(skill => ({
          candidate_id: profile.id,
          skill_name: skill.skillName,
          proficiency_level: skill.proficiencyLevel,
          years_of_experience: skill.yearsOfExperience ? parseFloat(skill.yearsOfExperience) : null
        }));

        const { error: skillsError } = await supabase
          .from('candidate_skills')
          .insert(skillsInserts);

        if (skillsError) throw skillsError;
      }

      // Delete and recreate experience records
      await supabase.from('candidate_experience').delete().eq('candidate_id', profile.id);
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
          location: exp.location
        }));

        const { error: experienceError } = await supabase
          .from('candidate_experience')
          .insert(experienceInserts);

        if (experienceError) throw experienceError;
      }

      toast({
        title: "Profile updated successfully",
        description: "All your profile information has been saved."
      });

      onProfileUpdate();
      setOpen(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Complete Profile</DialogTitle>
          <DialogDescription>
            Update your personal information, education, skills, experience, and profile summary.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <PersonalDetailsForm
              data={personalData}
              onUpdate={setPersonalData}
              onNext={() => setActiveTab("education")}
              onPrevious={() => {}}
            />
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <EducationForm
              data={educationData}
              onUpdate={setEducationData}
              onNext={() => setActiveTab("skills")}
              onPrevious={() => setActiveTab("personal")}
            />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillsForm
              data={skillsData}
              onUpdate={setSkillsData}
              onNext={() => setActiveTab("experience")}
              onPrevious={() => setActiveTab("education")}
            />
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <ExperienceForm
              data={experienceData}
              onUpdate={setExperienceData}
              onNext={() => setActiveTab("summary")}
              onPrevious={() => setActiveTab("skills")}
            />
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <ProfileSummaryForm
              data={personalData}
              onUpdate={setPersonalData}
              onSubmit={handleSaveAll}
              onPrevious={() => setActiveTab("experience")}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveAll} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}