import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, Building2, Briefcase, Calendar } from "lucide-react";

export default function EmployeeProfile() {
  const { user } = useAuth();
  const [emp, setEmp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user?.email) return;
      const { data } = await supabase.from("employee_profiles").select("*").eq("email", user.email).maybeSingle();
      setEmp(data);
      setLoading(false);
    })();
  }, [user]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!emp) return <EmptyState icon={User} title="No employee profile" description="Contact admin to link your account." />;

  return (
    <>
      <PageHeader eyebrow="Employee" title={`${emp.first_name} ${emp.last_name}`} description={emp.position ?? ""} />
      <Card>
        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Info icon={Mail} label="Email" value={emp.email} />
          <Info icon={Phone} label="Phone" value={emp.phone} />
          <Info icon={Building2} label="Department" value={emp.department} />
          <Info icon={Briefcase} label="Position" value={emp.position} />
          <Info icon={User} label="Employee ID" value={emp.employee_id} />
          <Info icon={Calendar} label="Hired" value={emp.hire_date ? new Date(emp.hire_date).toLocaleDateString() : "—"} />
        </CardContent>
      </Card>
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
