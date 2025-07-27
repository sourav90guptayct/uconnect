import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CandidateProfile } from "@/pages/Register";

interface PersonalDetailsFormProps {
  data: CandidateProfile;
  onUpdate: (data: CandidateProfile) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function PersonalDetailsForm({ data, onUpdate, onNext, onPrevious }: PersonalDetailsFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const updateField = (field: keyof CandidateProfile, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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