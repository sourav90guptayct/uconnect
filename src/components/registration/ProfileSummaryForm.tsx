import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { CandidateProfile } from "@/pages/Register";

interface ProfileSummaryFormProps {
  data: CandidateProfile;
  onUpdate: (data: CandidateProfile) => void;
  onSubmit: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export default function ProfileSummaryForm({ 
  data, 
  onUpdate, 
  onSubmit, 
  onPrevious, 
  isLoading 
}: ProfileSummaryFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const updateField = (field: keyof CandidateProfile, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Almost Done!
          </CardTitle>
          <CardDescription>
            Add a professional summary to complete your profile and make it stand out to employers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profileSummary">Profile Summary *</Label>
              <Textarea
                id="profileSummary"
                value={data.profileSummary}
                onChange={(e) => updateField("profileSummary", e.target.value)}
                placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives. This will be one of the first things employers see about you..."
                rows={6}
                required
              />
              <div className="text-sm text-muted-foreground">
                {data.profileSummary.length}/500 characters recommended
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Tips for a great profile summary:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Start with your current role or professional identity</li>
                <li>• Highlight your key skills and areas of expertise</li>
                <li>• Mention years of experience and significant achievements</li>
                <li>• Include your career goals and what you're looking for</li>
                <li>• Keep it concise but compelling (300-500 characters)</li>
                <li>• Use keywords relevant to your target industry</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Example:</h4>
              <p className="text-sm text-blue-800">
                "Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. 
                Proven track record of delivering scalable web applications for Fortune 500 companies. 
                Passionate about clean code, agile methodologies, and mentoring junior developers. 
                Seeking challenging opportunities in a dynamic tech environment to drive innovation and growth."
              </p>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onPrevious}>
                Previous
              </Button>
              <Button type="submit" disabled={isLoading || !data.profileSummary.trim()}>
                {isLoading ? "Creating Profile..." : "Complete Registration"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}