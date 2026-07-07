import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import KpiCard from "@/components/dashboard/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, FileCheck, Briefcase, Sparkles, ArrowRight } from "lucide-react";

export default function CandidateOverview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [completeness, setCompleteness] = useState(0);
  const [apps, setApps] = useState<Record<string, number>>({});
  const [screeningCount, setScreeningCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: p } = await supabase
        .from("candidate_profiles")
        .select("id, first_name, last_name, phone, current_city, total_experience, profile_summary, resume_url, expected_salary, date_of_birth")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!p) {
        navigate("/register");
        return;
      }
      setName(`${p.first_name ?? ""} ${p.last_name ?? ""}`.trim() || user.email || "");
      const fields = [p.phone, p.current_city, p.total_experience, p.profile_summary, p.resume_url, p.expected_salary, p.date_of_birth];
      const filled = fields.filter(Boolean).length;
      setCompleteness(Math.round((filled / fields.length) * 100));

      const { data: appRows } = await supabase
        .from("job_applications")
        .select("application_status")
        .eq("candidate_id", p.id);
      const counts: Record<string, number> = {};
      (appRows ?? []).forEach((a: any) => { counts[a.application_status] = (counts[a.application_status] ?? 0) + 1; });
      setApps(counts);

      if (user.email) {
        const { count } = await supabase.from("screening_submissions").select("id", { count: "exact", head: true }).eq("email", user.email);
        setScreeningCount(count ?? 0);
      }
    })();
  }, [user, navigate]);

  const totalApps = Object.values(apps).reduce((a, b) => a + b, 0);

  return (
    <>
      <PageHeader
        eyebrow={`Welcome back${name ? "," : ""}`}
        title={name || "My Career"}
        description="Your profile snapshot, applications, and next steps."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="col-span-1 sm:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Profile completeness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-3">
              <span className="text-4xl font-bold">{completeness}%</span>
              <Button variant="outline" size="sm" onClick={() => navigate("/candidate/profile")} className="gap-1">
                Complete <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <Progress value={completeness} className="h-2" />
          </CardContent>
        </Card>
        <KpiCard label="Applications" value={totalApps} hint="Total submitted" icon={ClipboardList} delay={0.05} />
        <KpiCard label="Screenings" value={screeningCount} hint="Attempts on file" icon={FileCheck} accent delay={0.1} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Application status</CardTitle></CardHeader>
          <CardContent>
            {totalApps === 0 ? (
              <div className="text-sm text-muted-foreground">
                You haven't applied to any jobs yet.
                <Button variant="link" onClick={() => navigate("/jobs")} className="px-1">Browse jobs</Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {Object.entries(apps).map(([k, v]) => (
                  <Badge key={k} variant="outline" className="text-sm py-1.5 px-3 capitalize">
                    <span className="mr-2 font-semibold text-foreground">{v}</span>{k}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Quick actions</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => navigate("/jobs")} className="justify-start gap-2"><Briefcase className="h-4 w-4" />Browse jobs</Button>
            <Button variant="outline" onClick={() => navigate("/candidate/skills")} className="justify-start gap-2"><Sparkles className="h-4 w-4" />Update skills</Button>
            <Button variant="outline" onClick={() => navigate("/candidate/applications")} className="justify-start gap-2"><ClipboardList className="h-4 w-4" />My applications</Button>
            <Button variant="outline" onClick={() => navigate("/candidate/screenings")} className="justify-start gap-2"><FileCheck className="h-4 w-4" />Screening tests</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
