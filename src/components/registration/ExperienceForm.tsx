import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { ExperienceData } from "@/pages/Register";

interface ExperienceFormProps {
  data: ExperienceData[];
  onUpdate: (data: ExperienceData[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const emptyExperience: ExperienceData = {
  companyName: "",
  designation: "",
  employmentType: "full_time",
  startDate: "",
  endDate: "",
  isCurrentJob: false,
  salary: "",
  jobDescription: "",
  location: "",
};

export default function ExperienceForm({ data, onUpdate, onNext, onPrevious }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<ExperienceData[]>(
    data.length > 0 ? data : [emptyExperience]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validExperiences = experiences.filter(exp => 
      exp.companyName.trim() !== "" && exp.designation.trim() !== ""
    );
    onUpdate(validExperiences);
    onNext();
  };

  const addExperience = () => {
    setExperiences([...experiences, emptyExperience]);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const updateExperience = (index: number, field: keyof ExperienceData, value: string | boolean) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
  };

  const handleCurrentJobChange = (index: number, isCurrentJob: boolean) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, isCurrentJob, endDate: isCurrentJob ? "" : exp.endDate } : exp
    );
    setExperiences(updatedExperiences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
              {experiences.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name *</Label>
                  <Input
                    value={experience.companyName}
                    onChange={(e) => updateExperience(index, "companyName", e.target.value)}
                    placeholder="Google, Microsoft, etc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Designation *</Label>
                  <Input
                    value={experience.designation}
                    onChange={(e) => updateExperience(index, "designation", e.target.value)}
                    placeholder="Software Engineer, Project Manager, etc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select
                    value={experience.employmentType}
                    onValueChange={(value) => updateExperience(index, "employmentType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={experience.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                    disabled={experience.isCurrentJob}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Salary (Annual)</Label>
                  <Input
                    type="number"
                    value={experience.salary}
                    onChange={(e) => updateExperience(index, "salary", e.target.value)}
                    placeholder="75000"
                  />
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id={`currentJob-${index}`}
                    checked={experience.isCurrentJob}
                    onCheckedChange={(checked) => handleCurrentJobChange(index, checked as boolean)}
                  />
                  <Label htmlFor={`currentJob-${index}`}>This is my current job</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  value={experience.jobDescription}
                  onChange={(e) => updateExperience(index, "jobDescription", e.target.value)}
                  placeholder="Describe your role, responsibilities, and achievements..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Experience
      </Button>

      <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
        <strong>Tips:</strong>
        <ul className="mt-2 space-y-1">
          <li>• If you're a fresher, you can skip this section or add internships</li>
          <li>• Focus on achievements and quantifiable results</li>
          <li>• Use action verbs to describe your responsibilities</li>
          <li>• Keep descriptions concise but informative</li>
        </ul>
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