import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, MapPin, Clock, DollarSign, Calendar } from "lucide-react";

const statusVariant = (s: string): "default" | "secondary" | "outline" | "destructive" => {
  const k = s?.toLowerCase();
  if (k === "shortlisted") return "default";
  if (k === "reviewed") return "secondary";
  if (k === "rejected") return "destructive";
  return "outline";
};

export default function CandidateApplications() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: cp } = await supabase.from("candidate_profiles").select("id").eq("user_id", user.id).maybeSingle();
      if (!cp) { navigate("/register"); return; }
      const { data: apps } = await supabase
        .from("job_applications")
        .select("*")
        .eq("candidate_id", cp.id)
        .order("applied_at", { ascending: false });
      if (apps && apps.length) {
        const { data: jobs } = await supabase
          .from("jobs")
          .select("id, title, company_name, location_city, location_state, salary_min, salary_max, employment_type, experience_required")
          .in("id", apps.map((a) => a.job_id));
        setRows(apps.map((a) => ({ ...a, jobs: jobs?.find((j) => j.id === a.job_id) })));
      }
      setLoading(false);
    })();
  }, [user, navigate]);

  return (
    <>
      <PageHeader
        eyebrow="Career"
        title="My Applications"
        description="Track every job you've applied to."
        actions={<Button variant="outline" onClick={() => navigate("/jobs")}>Browse jobs</Button>}
      />
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No applications yet" description="Start exploring open roles." actionLabel="Browse jobs" onAction={() => navigate("/jobs")} />
      ) : (
        <div className="space-y-3">
          {rows.map((a) => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{a.jobs?.title ?? "Job removed"}</CardTitle>
                    <p className="text-sm text-muted-foreground">{a.jobs?.company_name}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusVariant(a.application_status)} className="capitalize">{a.application_status}</Badge>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Applied {new Date(a.applied_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  {a.jobs?.location_city && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{a.jobs.location_city}, {a.jobs.location_state}</span>}
                  {a.jobs?.employment_type && <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.jobs.employment_type}</span>}
                  {a.jobs?.salary_min && <span className="inline-flex items-center gap-1"><DollarSign className="h-3 w-3" />₹{(a.jobs.salary_min/100000).toFixed(1)}–{(a.jobs.salary_max/100000).toFixed(1)} LPA</span>}
                  {a.jobs?.experience_required && <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{a.jobs.experience_required}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
