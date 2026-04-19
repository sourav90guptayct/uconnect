import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Loader2 } from "lucide-react";

const initialState = {
  fullName: "",
  mobile: "",
  email: "",
  state: "",
  city: "",
  qualification: "",
  specialization: "",
  experienceLevel: "",
  currentCompany: "",
  jobPosition: "",
  experienceYears: "",
};

const JobApplicationForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof typeof initialState, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.mobile || !form.email || !form.jobPosition || !form.experienceLevel) {
      toast({
        title: "Missing required fields",
        description: "Please fill Name, Mobile, Email, Job Position and Experience.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-careers-form", {
        body: form,
      });
      if (error) throw error;

      toast({
        title: "Application submitted! 🎉",
        description: "Our team will reach out to you shortly.",
      });
      setForm(initialState);
    } catch (err: any) {
      console.error("Application submit error:", err);
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Apply for a Position</CardTitle>
        <CardDescription>
          Fill the form below and our talent team will get back to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input id="mobile" type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email ID *</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualification">Qualification</Label>
            <Select value={form.qualification} onValueChange={(v) => update("qualification", v)}>
              <SelectTrigger id="qualification"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="10th">10th</SelectItem>
                <SelectItem value="12th">12th</SelectItem>
                <SelectItem value="Diploma">Diploma</SelectItem>
                <SelectItem value="Graduate">Graduate</SelectItem>
                <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization / Stream</Label>
            <Input id="specialization" placeholder="e.g. B Tech, ECE" value={form.specialization} onChange={(e) => update("specialization", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobPosition">Job Position *</Label>
            <Select value={form.jobPosition} onValueChange={(v) => update("jobPosition", v)}>
              <SelectTrigger id="jobPosition"><SelectValue placeholder="Select position" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="RF Engineer">RF Engineer</SelectItem>
                <SelectItem value="Technician">Technician</SelectItem>
                <SelectItem value="BackOffice TL">BackOffice TL</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Experience Level *</Label>
            <Select value={form.experienceLevel} onValueChange={(v) => update("experienceLevel", v)}>
              <SelectTrigger id="experienceLevel"><SelectValue placeholder="Fresher / Experienced" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="Experienced">Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experienceYears">Years of Experience</Label>
            <Select value={form.experienceYears} onValueChange={(v) => update("experienceYears", v)}>
              <SelectTrigger id="experienceYears"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="1 Year">1 Year</SelectItem>
                <SelectItem value="1 - 2 Year">1 - 2 Year</SelectItem>
                <SelectItem value="2 Year">2 Year</SelectItem>
                <SelectItem value="> 2 Years">&gt; 2 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="currentCompany">Current / Last Company</Label>
            <Input id="currentCompany" value={form.currentCompany} onChange={(e) => update("currentCompany", e.target.value)} />
          </div>

          <div className="md:col-span-2 flex justify-end pt-2">
            <Button type="submit" size="lg" disabled={submitting} className="min-w-40">
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
              ) : (
                <><Send className="mr-2 h-4 w-4" /> Submit Application</>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobApplicationForm;
