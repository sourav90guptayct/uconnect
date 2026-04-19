import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Loader2 } from "lucide-react";

const STATES = [
  "Jammu & Kashmir", "Himachal Pradesh", "DL/NCR", "Haryana", "Punjab",
  "Uttar Pradesh", "Uttarakhand", "Bihar", "Madhya Pradesh", "Andhra Pradesh",
  "Telengana", "Rajasthan", "West Bangal", "North East", "Karnataka",
  "Maharashtra & Goa", "Tamil Nadu", "Kerelam", "Gujarat", "Odisha",
];
const EDUCATION = ["Graduate", "Diploma", "10th", "12th", "Post Graduate"];
const EXPERIENCE = ["Experienced", "Fresher"];
const PROFILES = ["RF Engineer", "Rigger/Technician", "Back Office /Team Leader", "FTTH Engineer", "Switch/Router Engineer"];
const TOTAL_EXP = ["0-1 Year", "1 - 2 Year", "2 - 3 Year", "> 3 Years"];
const BIKE = ["Yes", "No", "Can be arranged"];
const LAPTOP = ["No", "Yes", "Can be arranged"];

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
  hasBike: "",
  hasLaptop: "",
};

const JobApplicationForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof typeof initialState, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required: (keyof typeof initialState)[] = [
      "fullName", "mobile", "email", "state", "city",
      "qualification", "specialization", "experienceLevel",
      "currentCompany", "jobPosition", "experienceYears",
      "hasBike", "hasLaptop",
    ];
    const missing = required.filter((k) => !form[k]);
    if (missing.length) {
      toast({
        title: "All fields are required",
        description: "Please complete every field before submitting.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-careers-form", {
        body: form,
      });
      if (error) throw error;
      if (data && data.ok === false) throw new Error(data.error || "Submission failed");

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
          Fill the form below and our talent team will get back to you. All fields are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Phone Number *</Label>
            <Input id="mobile" type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Select value={form.state} onValueChange={(v) => update("state", v)}>
              <SelectTrigger id="state"><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent className="max-h-72">
                {STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualification">Education *</Label>
            <Select value={form.qualification} onValueChange={(v) => update("qualification", v)}>
              <SelectTrigger id="qualification"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {EDUCATION.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialization">Degree *</Label>
            <Input id="specialization" placeholder="e.g. B Tech, B.Sc" value={form.specialization} onChange={(e) => update("specialization", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobPosition">Interested Profile *</Label>
            <Select value={form.jobPosition} onValueChange={(v) => update("jobPosition", v)}>
              <SelectTrigger id="jobPosition"><SelectValue placeholder="Select profile" /></SelectTrigger>
              <SelectContent>
                {PROFILES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Experience *</Label>
            <Select value={form.experienceLevel} onValueChange={(v) => update("experienceLevel", v)}>
              <SelectTrigger id="experienceLevel"><SelectValue placeholder="Fresher / Experienced" /></SelectTrigger>
              <SelectContent>
                {EXPERIENCE.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experienceYears">Total Experience *</Label>
            <Select value={form.experienceYears} onValueChange={(v) => update("experienceYears", v)}>
              <SelectTrigger id="experienceYears"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {TOTAL_EXP.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="currentCompany">Previous Company *</Label>
            <Input id="currentCompany" value={form.currentCompany} onChange={(e) => update("currentCompany", e.target.value)} required />
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
