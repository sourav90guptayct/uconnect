import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface JobPostFormProps {
  onSuccess: () => void;
}

export default function JobPostForm({ onSuccess }: JobPostFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    job_description: '',
    location_city: '',
    location_state: '',
    location_district: '',
    salary_min: '',
    salary_max: '',
    employment_type: 'permanent',
    job_type: 'full_time',
    experience_required: '',
    required_skills: '',
    preferred_skills: '',
    key_responsibilities: '',
    education_requirements: '',
    industry_type: '',
    department: '',
    role_category: '',
    job_highlights: '',
    requirements: '',
    application_deadline: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const jobData = {
        ...formData,
        salary_min: formData.salary_min ? parseFloat(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseFloat(formData.salary_max) : null,
        required_skills: formData.required_skills ? formData.required_skills.split(',').map(s => s.trim()) : [],
        preferred_skills: formData.preferred_skills ? formData.preferred_skills.split(',').map(s => s.trim()) : [],
        key_responsibilities: formData.key_responsibilities ? formData.key_responsibilities.split('\n').filter(s => s.trim()) : [],
        job_highlights: formData.job_highlights ? formData.job_highlights.split('\n').filter(s => s.trim()) : [],
        requirements: formData.requirements ? formData.requirements.split('\n').filter(s => s.trim()) : [],
        application_deadline: formData.application_deadline || null,
        posted_by: user.id
      };

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) throw error;

      toast({
        title: "Job Posted Successfully",
        description: "The job has been posted and is now active."
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post job.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="job_description">Job Description *</Label>
            <Textarea
              id="job_description"
              value={formData.job_description}
              onChange={(e) => handleInputChange('job_description', e.target.value)}
              className="min-h-24"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location_city">City *</Label>
              <Input
                id="location_city"
                value={formData.location_city}
                onChange={(e) => handleInputChange('location_city', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location_state">State *</Label>
              <Input
                id="location_state"
                value={formData.location_state}
                onChange={(e) => handleInputChange('location_state', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location_district">District</Label>
              <Input
                id="location_district"
                value={formData.location_district}
                onChange={(e) => handleInputChange('location_district', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary_min">Minimum Salary (Annual)</Label>
              <Input
                id="salary_min"
                type="number"
                value={formData.salary_min}
                onChange={(e) => handleInputChange('salary_min', e.target.value)}
                placeholder="e.g., 500000"
              />
            </div>
            <div>
              <Label htmlFor="salary_max">Maximum Salary (Annual)</Label>
              <Input
                id="salary_max"
                type="number"
                value={formData.salary_max}
                onChange={(e) => handleInputChange('salary_max', e.target.value)}
                placeholder="e.g., 800000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employment_type">Employment Type</Label>
              <Select value={formData.employment_type} onValueChange={(value) => handleInputChange('employment_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="job_type">Job Type</Label>
              <Select value={formData.job_type} onValueChange={(value) => handleInputChange('job_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">Full Time</SelectItem>
                  <SelectItem value="part_time">Part Time</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="experience_required">Experience Required *</Label>
            <Input
              id="experience_required"
              value={formData.experience_required}
              onChange={(e) => handleInputChange('experience_required', e.target.value)}
              placeholder="e.g., 2-5 years"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="required_skills">Required Skills (comma-separated)</Label>
              <Input
                id="required_skills"
                value={formData.required_skills}
                onChange={(e) => handleInputChange('required_skills', e.target.value)}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>
            <div>
              <Label htmlFor="preferred_skills">Preferred Skills (comma-separated)</Label>
              <Input
                id="preferred_skills"
                value={formData.preferred_skills}
                onChange={(e) => handleInputChange('preferred_skills', e.target.value)}
                placeholder="e.g., TypeScript, GraphQL"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="key_responsibilities">Key Responsibilities (one per line)</Label>
            <Textarea
              id="key_responsibilities"
              value={formData.key_responsibilities}
              onChange={(e) => handleInputChange('key_responsibilities', e.target.value)}
              placeholder="Develop web applications&#10;Collaborate with team members&#10;Write clean code"
              className="min-h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="industry_type">Industry</Label>
              <Input
                id="industry_type"
                value={formData.industry_type}
                onChange={(e) => handleInputChange('industry_type', e.target.value)}
                placeholder="e.g., Technology"
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="e.g., Engineering"
              />
            </div>
            <div>
              <Label htmlFor="role_category">Role Category</Label>
              <Input
                id="role_category"
                value={formData.role_category}
                onChange={(e) => handleInputChange('role_category', e.target.value)}
                placeholder="e.g., Software Development"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="education_requirements">Education Requirements</Label>
            <Input
              id="education_requirements"
              value={formData.education_requirements}
              onChange={(e) => handleInputChange('education_requirements', e.target.value)}
              placeholder="e.g., Bachelor's in Computer Science"
            />
          </div>

          <div>
            <Label htmlFor="application_deadline">Application Deadline</Label>
            <Input
              id="application_deadline"
              type="date"
              value={formData.application_deadline}
              onChange={(e) => handleInputChange('application_deadline', e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}