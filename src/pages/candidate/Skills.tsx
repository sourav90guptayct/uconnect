import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Edit } from "lucide-react";
import EditProfileModal from "@/components/EditProfileModal";
import { useNavigate } from "react-router-dom";

export default function CandidateSkills() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const load = async () => {
    if (!user) return;
    const { data: p } = await supabase.from("candidate_profiles").select("*").eq("user_id", user.id).maybeSingle();
    if (!p) { navigate("/register"); return; }
    setProfile(p);
    const { data } = await supabase.from("candidate_skills").select("*").eq("candidate_id", p.id).order("proficiency_level", { ascending: false });
    setRows(data ?? []);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="Skills"
        actions={profile && (
          <EditProfileModal profile={profile} onProfileUpdate={load}>
            <Button variant="outline" size="sm" className="gap-1"><Edit className="h-3.5 w-3.5" />Edit profile</Button>
          </EditProfileModal>
        )}
      />
      {rows.length === 0 ? (
        <EmptyState icon={Sparkles} title="No skills added" description="Add skills to help employers find you." />
      ) : (
        <Card>
          <CardContent className="p-6 flex flex-wrap gap-2">
            {rows.map((s) => (
              <Badge key={s.id} variant="secondary" className="px-3 py-1.5 text-sm">
                {s.skill_name}
                {s.proficiency_level && <span className="ml-2 text-xs">{"★".repeat(s.proficiency_level)}{"☆".repeat(5 - s.proficiency_level)}</span>}
                {s.years_of_experience && <span className="ml-2 text-xs text-muted-foreground">· {s.years_of_experience}y</span>}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
