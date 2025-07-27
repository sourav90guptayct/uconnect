import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2 } from "lucide-react";
import { SkillData } from "@/pages/Register";

interface SkillsFormProps {
  data: SkillData[];
  onUpdate: (data: SkillData[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const emptySkill: SkillData = {
  skillName: "",
  proficiencyLevel: 3,
  yearsOfExperience: "",
};

const proficiencyLabels = {
  1: "Beginner",
  2: "Novice",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export default function SkillsForm({ data, onUpdate, onNext, onPrevious }: SkillsFormProps) {
  const [skills, setSkills] = useState<SkillData[]>(
    data.length > 0 ? data : [emptySkill]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validSkills = skills.filter(skill => skill.skillName.trim() !== "");
    onUpdate(validSkills);
    onNext();
  };

  const addSkill = () => {
    setSkills([...skills, emptySkill]);
  };

  const removeSkill = (index: number) => {
    if (skills.length > 1) {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const updateSkill = (index: number, field: keyof SkillData, value: string | number) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    setSkills(updatedSkills);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Skill {index + 1}</CardTitle>
              {skills.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Skill Name *</Label>
                  <Input
                    value={skill.skillName}
                    onChange={(e) => updateSkill(index, "skillName", e.target.value)}
                    placeholder="React, Python, Project Management, etc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Input
                    type="number"
                    value={skill.yearsOfExperience}
                    onChange={(e) => updateSkill(index, "yearsOfExperience", e.target.value)}
                    placeholder="2.5"
                    step="0.5"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>
                  Proficiency Level: {proficiencyLabels[skill.proficiencyLevel as keyof typeof proficiencyLabels]}
                </Label>
                <Slider
                  value={[skill.proficiencyLevel]}
                  onValueChange={(value) => updateSkill(index, "proficiencyLevel", value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Novice</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addSkill}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Skill
      </Button>

      <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
        <strong>Tips:</strong>
        <ul className="mt-2 space-y-1">
          <li>• Include both technical and soft skills</li>
          <li>• Be honest about your proficiency level</li>
          <li>• Add skills relevant to your target job</li>
          <li>• Include programming languages, frameworks, tools, etc.</li>
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