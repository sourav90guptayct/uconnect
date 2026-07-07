import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import EditProfileModal from "@/components/EditProfileModal";
import { User, MapPin, Phone, Mail, Calendar, Briefcase, GraduationCap, Star, Edit, Download, Sparkles } from "lucide-react";

export default function CandidateProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) { setLoading(false); return; }
    try {
      const { data: p, error } = await supabase.from("candidate_profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (error) { console.error("profile load error", error); setLoading(false); return; }
      if (!p) { setProfile(null); setLoading(false); return; }
      setProfile(p);
      const [{ data: edu }, { data: exp }, { data: sk }] = await Promise.all([
        supabase.from("candidate_education").select("*").eq("candidate_id", p.id).order("year_of_passing", { ascending: false }),
        supabase.from("candidate_experience").select("*").eq("candidate_id", p.id).order("start_date", { ascending: false }),
        supabase.from("candidate_skills").select("*").eq("candidate_id", p.id).order("proficiency_level", { ascending: false }),
      ]);
      setEducation(edu ?? []); setExperience(exp ?? []); setSkills(sk ?? []);
    } catch (e) {
      console.error("profile load exception", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user?.id]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!profile) return <EmptyState icon={User} title="No profile" description="Please complete your registration." actionLabel="Register" onAction={() => navigate("/register")} />;

  const fmt = (d: string) => new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title={`${profile.first_name} ${profile.last_name}`}
        description={profile.profile_summary || "Manage your candidate profile."}
        actions={
          <>
            <EditProfileModal profile={profile} onProfileUpdate={load}>
              <Button variant="outline" size="sm" className="gap-1"><Edit className="h-3.5 w-3.5" />Edit</Button>
            </EditProfileModal>
            {profile.resume_url && (
              <Button variant="outline" size="sm" className="gap-1" onClick={() => window.open(profile.resume_url, "_blank")}>
                <Download className="h-3.5 w-3.5" />Resume
              </Button>
            )}
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">About</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Info icon={Mail} label="Email" value={user?.email} />
            <Info icon={Phone} label="Phone" value={profile.phone} />
            <Info icon={MapPin} label="Current city" value={profile.current_city} />
            <Info icon={MapPin} label="Home" value={profile.home_location} />
            <Info icon={Briefcase} label="Experience" value={profile.total_experience} />
            <Info icon={Calendar} label="DOB" value={profile.date_of_birth ? fmt(profile.date_of_birth) : "—"} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Compensation</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><span className="text-muted-foreground">Current:</span> <span className="font-medium">{profile.current_salary ? `₹${(profile.current_salary/100000).toFixed(1)} LPA` : "—"}</span></div>
            <div><span className="text-muted-foreground">Expected:</span> <span className="font-medium">{profile.expected_salary ? `₹${(profile.expected_salary/100000).toFixed(1)} LPA` : "—"}</span></div>
            <div><span className="text-muted-foreground">Notice:</span> <span className="font-medium">{profile.notice_period ? `${profile.notice_period} days` : "—"}</span></div>
          </CardContent>
        </Card>
      </div>

      {experience.length > 0 && (
        <Card className="mb-4">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Briefcase className="h-4 w-4" />Experience</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {experience.map((e, i) => (
              <div key={e.id}>
                {i > 0 && <Separator className="mb-4" />}
                <div>
                  <h4 className="font-semibold">{e.designation}</h4>
                  <p className="text-sm text-primary">{e.company_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {e.start_date && fmt(e.start_date)} – {e.is_current_job ? "Present" : e.end_date && fmt(e.end_date)}
                    {e.location && ` · ${e.location}`}
                  </p>
                  {e.job_description && <p className="text-sm mt-1.5">{e.job_description}</p>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {education.length > 0 && (
        <Card className="mb-4">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><GraduationCap className="h-4 w-4" />Education</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {education.map((edu, i) => (
              <div key={edu.id}>
                {i > 0 && <Separator className="mb-4" />}
                <h4 className="font-semibold">{edu.course_name}</h4>
                {edu.specialization && <p className="text-sm text-muted-foreground">{edu.specialization}</p>}
                <p className="text-sm text-primary">{edu.institute_name}</p>
                <p className="text-xs text-muted-foreground">{edu.year_of_passing}{edu.percentage ? ` · ${edu.percentage}%` : ""}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {skills.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4" />Skills</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <Badge key={s.id} variant="secondary" className="px-3 py-1">
                {s.skill_name}
                {s.proficiency_level && <span className="ml-2 text-xs">{"★".repeat(s.proficiency_level)}{"☆".repeat(5 - s.proficiency_level)}</span>}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value?: string | null }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value || "—"}</span>
      </div>
    </div>
  );
}
