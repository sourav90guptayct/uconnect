import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Edit, Upload, FileText, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  profile_picture_url?: string;
}

interface EditProfileModalProps {
  profile: CandidateProfile;
  onProfileUpdate: () => void;
  children: React.ReactNode;
}

export default function EditProfileModal({ profile, onProfileUpdate, children }: EditProfileModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingProfilePicture, setUploadingProfilePicture] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile.first_name,
    lastName: profile.last_name,
    phone: profile.phone,
    dateOfBirth: profile.date_of_birth,
    gender: profile.gender,
    currentCity: profile.current_city,
    homeLocation: profile.home_location,
    totalExperience: profile.total_experience,
    currentSalary: profile.current_salary?.toString() || '',
    expectedSalary: profile.expected_salary?.toString() || '',
    noticePeriod: profile.notice_period?.toString() || '',
    profileSummary: profile.profile_summary,
    resumeUrl: profile.resume_url,
    profilePictureUrl: profile.profile_picture_url || ''
  });

  useEffect(() => {
    setFormData({
      firstName: profile.first_name,
      lastName: profile.last_name,
      phone: profile.phone,
      dateOfBirth: profile.date_of_birth,
      gender: profile.gender,
      currentCity: profile.current_city,
      homeLocation: profile.home_location,
      totalExperience: profile.total_experience,
      currentSalary: profile.current_salary?.toString() || '',
      expectedSalary: profile.expected_salary?.toString() || '',
      noticePeriod: profile.notice_period?.toString() || '',
      profileSummary: profile.profile_summary,
      resumeUrl: profile.resume_url,
      profilePictureUrl: profile.profile_picture_url || ''
    });
  }, [profile]);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadingResume(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/resume.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, {
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      updateField('resumeUrl', publicUrl);
      
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been updated."
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, or WebP image.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadingProfilePicture(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile-picture.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, {
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      updateField('profilePictureUrl', publicUrl);
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully."
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingProfilePicture(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('candidate_profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          current_city: formData.currentCity,
          home_location: formData.homeLocation,
          total_experience: formData.totalExperience as any,
          current_salary: formData.currentSalary ? parseInt(formData.currentSalary) : null,
          expected_salary: formData.expectedSalary ? parseInt(formData.expectedSalary) : null,
          notice_period: formData.noticePeriod ? parseInt(formData.noticePeriod) : null,
          profile_summary: formData.profileSummary,
          resume_url: formData.resumeUrl,
          profile_picture_url: formData.profilePictureUrl
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });

      onProfileUpdate();
      setOpen(false);
    } catch (error: any) {
      console.error('Update error:', error);
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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and profile details.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.profilePictureUrl} alt="Profile picture" />
                <AvatarFallback className="text-2xl">
                  {formData.firstName?.charAt(0)}{formData.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0">
                <Label htmlFor="profilePicture" className="cursor-pointer">
                  <div className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors">
                    <Camera className="h-4 w-4" />
                  </div>
                </Label>
                <Input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  disabled={uploadingProfilePicture}
                  className="hidden"
                />
              </div>
            </div>
            {uploadingProfilePicture && (
              <div className="text-sm text-muted-foreground">
                Uploading profile picture...
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateField("dateOfBirth", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentCity">Current City *</Label>
              <Input
                id="currentCity"
                value={formData.currentCity}
                onChange={(e) => updateField("currentCity", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeLocation">Home Location</Label>
              <Input
                id="homeLocation"
                value={formData.homeLocation}
                onChange={(e) => updateField("homeLocation", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalExperience">Total Experience *</Label>
              <Select value={formData.totalExperience} onValueChange={(value: "fresher" | "1-2" | "3-5" | "6-10" | "10+") => updateField("totalExperience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresher">Fresher</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentSalary">Current Salary (Annual)</Label>
              <Input
                id="currentSalary"
                type="number"
                value={formData.currentSalary}
                onChange={(e) => updateField("currentSalary", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary (Annual)</Label>
              <Input
                id="expectedSalary"
                type="number"
                value={formData.expectedSalary}
                onChange={(e) => updateField("expectedSalary", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="noticePeriod">Notice Period (Days)</Label>
              <Input
                id="noticePeriod"
                type="number"
                value={formData.noticePeriod}
                onChange={(e) => updateField("noticePeriod", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileSummary">Profile Summary *</Label>
            <Textarea
              id="profileSummary"
              value={formData.profileSummary}
              onChange={(e) => updateField("profileSummary", e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Resume Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="resume">Update Resume/CV</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              {formData.resumeUrl ? (
                <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                  <FileText className="h-5 w-5" />
                  <span>Resume uploaded</span>
                </div>
              ) : (
                <div className="space-y-2 mb-2">
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    Upload your resume in PDF or Word format (max 5MB)
                  </div>
                </div>
              )}
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                disabled={uploadingResume}
              />
              {uploadingResume && (
                <div className="text-sm text-muted-foreground mt-2">
                  Uploading resume...
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}