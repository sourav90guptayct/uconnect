import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { EducationData } from "@/pages/Register";

interface EducationFormProps {
  data: EducationData[];
  onUpdate: (data: EducationData[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const emptyEducation: EducationData = {
  educationLevel: "",
  courseName: "",
  specialization: "",
  instituteName: "",
  yearOfPassing: "",
  percentage: "",
};

export default function EducationForm({ data, onUpdate, onNext, onPrevious }: EducationFormProps) {
  const [educations, setEducations] = useState<EducationData[]>(
    data.length > 0 ? data : [emptyEducation]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validEducations = educations.filter(edu => 
      edu.educationLevel && edu.courseName && edu.instituteName
    );
    onUpdate(validEducations);
    onNext();
  };

  const addEducation = () => {
    setEducations([...educations, emptyEducation]);
  };

  const removeEducation = (index: number) => {
    if (educations.length > 1) {
      setEducations(educations.filter((_, i) => i !== index));
    }
  };

  const updateEducation = (index: number, field: keyof EducationData, value: string) => {
    const updatedEducations = educations.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducations(updatedEducations);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {educations.map((education, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Education {index + 1}</CardTitle>
              {educations.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Education Level *</Label>
                  <Select
                    value={education.educationLevel}
                    onValueChange={(value) => updateEducation(index, "educationLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th Grade</SelectItem>
                      <SelectItem value="12th">12th Grade</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Course Name *</Label>
                  <Input
                    value={education.courseName}
                    onChange={(e) => updateEducation(index, "courseName", e.target.value)}
                    placeholder="Computer Science, MBA, etc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Input
                    value={education.specialization}
                    onChange={(e) => updateEducation(index, "specialization", e.target.value)}
                    placeholder="Software Engineering, Marketing, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Institute Name *</Label>
                  <Input
                    value={education.instituteName}
                    onChange={(e) => updateEducation(index, "instituteName", e.target.value)}
                    placeholder="University/College name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Year of Passing</Label>
                  <Input
                    type="number"
                    value={education.yearOfPassing}
                    onChange={(e) => updateEducation(index, "yearOfPassing", e.target.value)}
                    placeholder="2023"
                    min="1980"
                    max="2030"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Percentage/CGPA</Label>
                  <Input
                    type="number"
                    value={education.percentage}
                    onChange={(e) => updateEducation(index, "percentage", e.target.value)}
                    placeholder="85.5"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Education
      </Button>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}