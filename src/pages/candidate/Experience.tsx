import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Edit } from "lucide-react";
import EditProfileModal from "@/components/EditProfileModal";
import { useNavigate } from "react-router-dom";

export default function CandidateExperience() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const load = async () => {
    if (!user) return;
    const { data: p } = await supabase.from("candidate_profiles").select("*").eq("user_id", user.id).maybeSingle();
    if (!p) { navigate("/register"); return; }
    setProfile(p);
    const { data } = await supabase.from("candidate_experience").select("*").eq("candidate_id", p.id).order("start_date", { ascending: false });
    setRows(data ?? []);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const fmt = (d: string) => (d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "");

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="Experience"
        actions={profile && (
          <EditProfileModal profile={profile} onProfileUpdate={load}>
            <Button variant="outline" size="sm" className="gap-1"><Edit className="h-3.5 w-3.5" />Edit profile</Button>
          </EditProfileModal>
        )}
      />
      {rows.length === 0 ? (
        <EmptyState icon={Briefcase} title="No experience added" description="Add prior roles through the edit profile flow." />
      ) : (
        <div className="space-y-3">
          {rows.map((e) => (
            <Card key={e.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{e.designation}</h4>
                    <p className="text-sm text-primary">{e.company_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {fmt(e.start_date)} – {e.is_current_job ? "Present" : fmt(e.end_date)} {e.location && `· ${e.location}`}
                    </p>
                  </div>
                  {e.employment_type && <span className="text-xs text-muted-foreground">{e.employment_type.replace("_", " ")}</span>}
                </div>
                {e.job_description && <p className="text-sm mt-2 text-muted-foreground">{e.job_description}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
