import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CandidateProfile } from "@/pages/Register";

interface PersonalDetailsFormProps {
  data: CandidateProfile;
  onUpdate: (data: CandidateProfile) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "marketing", label: "Marketing" },
  { value: "real_estate", label: "Real Estate" },
  { value: "automotive", label: "Automotive" },
  { value: "aerospace", label: "Aerospace" },
  { value: "energy", label: "Energy" },
  { value: "media", label: "Media" },
  { value: "hospitality", label: "Hospitality" },
  { value: "construction", label: "Construction" },
  { value: "agriculture", label: "Agriculture" },
  { value: "logistics", label: "Logistics" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "government", label: "Government" },
  { value: "non_profit", label: "Non-Profit" },
  { value: "other", label: "Other" },
];

export default function PersonalDetailsForm({ data, onUpdate, onNext, onPrevious }: PersonalDetailsFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const updateField = (field: keyof CandidateProfile, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      updateField('profilePictureUrl', urlData.publicUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Your profile picture has been updated.",
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    updateField('profilePictureUrl', '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={data.profilePictureUrl} alt="Profile" />
            <AvatarFallback className="text-lg">
              {data.firstName.charAt(0)}{data.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {data.profilePictureUrl && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={removeImage}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="profile-picture"
            disabled={isUploading}
          />
          <Label
            htmlFor="profile-picture"
            className="cursor-pointer flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md text-sm font-medium"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Photo"}
          </Label>
          <span className="text-xs text-muted-foreground">Max 5MB</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={data.gender} onValueChange={(value) => updateField("gender", value)}>
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
            value={data.currentCity}
            onChange={(e) => updateField("currentCity", e.target.value)}
            placeholder="New York, NY"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="homeLocation">Home Location</Label>
          <Input
            id="homeLocation"
            value={data.homeLocation}
            onChange={(e) => updateField("homeLocation", e.target.value)}
            placeholder="Los Angeles, CA"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalExperience">Total Experience *</Label>
          <Select value={data.totalExperience} onValueChange={(value) => updateField("totalExperience", value)}>
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
            value={data.currentSalary}
            onChange={(e) => updateField("currentSalary", e.target.value)}
            placeholder="50000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedSalary">Expected Salary (Annual)</Label>
          <Input
            id="expectedSalary"
            type="number"
            value={data.expectedSalary}
            onChange={(e) => updateField("expectedSalary", e.target.value)}
            placeholder="60000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="noticePeriod">Notice Period (Days)</Label>
          <Input
            id="noticePeriod"
            type="number"
            value={data.noticePeriod}
            onChange={(e) => updateField("noticePeriod", e.target.value)}
            placeholder="30"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select value={data.maritalStatus} onValueChange={(value) => updateField("maritalStatus", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="caste">Caste</Label>
          <Input
            id="caste"
            value={data.caste}
            onChange={(e) => updateField("caste", e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="disabilityStatus">Disability Status</Label>
          <Select value={data.disabilityStatus} onValueChange={(value) => updateField("disabilityStatus", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select disability status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="visual_impairment">Visual Impairment</SelectItem>
              <SelectItem value="hearing_impairment">Hearing Impairment</SelectItem>
              <SelectItem value="mobility_impairment">Mobility Impairment</SelectItem>
              <SelectItem value="cognitive_impairment">Cognitive Impairment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry Preference</Label>
          <Select value={data.industry} onValueChange={(value) => updateField("industry", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select preferred industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="familyDetails">Family Details</Label>
        <Textarea
          id="familyDetails"
          value={data.familyDetails}
          onChange={(e) => updateField("familyDetails", e.target.value)}
          placeholder="Brief information about your family (optional)"
          rows={3}
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}