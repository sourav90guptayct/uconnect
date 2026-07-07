import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Edit } from "lucide-react";
import EditProfileModal from "@/components/EditProfileModal";
import { useNavigate } from "react-router-dom";

export default function CandidateEducation() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const load = async () => {
    if (!user) return;
    const { data: p } = await supabase.from("candidate_profiles").select("*").eq("user_id", user.id).maybeSingle();
    if (!p) { navigate("/register"); return; }
    setProfile(p);
    const { data } = await supabase.from("candidate_education").select("*").eq("candidate_id", p.id).order("year_of_passing", { ascending: false });
    setRows(data ?? []);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="Education"
        actions={profile && (
          <EditProfileModal profile={profile} onProfileUpdate={load}>
            <Button variant="outline" size="sm" className="gap-1"><Edit className="h-3.5 w-3.5" />Edit profile</Button>
          </EditProfileModal>
        )}
      />
      {rows.length === 0 ? (
        <EmptyState icon={GraduationCap} title="No education added" description="Add your qualifications through the edit profile flow." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rows.map((e) => (
            <Card key={e.id}>
              <CardContent className="p-5">
                <h4 className="font-semibold">{e.course_name}</h4>
                {e.specialization && <p className="text-sm text-muted-foreground">{e.specialization}</p>}
                <p className="text-sm text-primary mt-1">{e.institute_name}</p>
                <p className="text-xs text-muted-foreground mt-1">{e.year_of_passing}{e.percentage ? ` · ${e.percentage}%` : ""}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
