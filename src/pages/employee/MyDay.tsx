import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { LogIn, LogOut, ListTodo, Clock } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";

export default function EmployeeMyDay() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<any>(null);
  const [attendance, setAttendance] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = async () => {
    if (!user?.email) return;
    const { data: emp } = await supabase.from("employee_profiles").select("*").eq("email", user.email).eq("is_active", true).maybeSingle();
    if (!emp) { setLoading(false); return; }
    setEmployee(emp);

    const today = new Date().toISOString().slice(0, 10);
    const { data: att } = await supabase.from("daily_attendance").select("*").eq("employee_id", emp.id).eq("login_date", today).maybeSingle();
    setAttendance(att);

    const { data: t } = await supabase
      .from("employee_tasks")
      .select("*")
      .eq("employee_id", emp.id)
      .neq("status", "completed")
      .order("due_date", { ascending: true });
    setTasks(t ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const clockIn = async () => {
    if (!employee) return;
    const { error } = await supabase.from("daily_attendance").insert({
      employee_id: employee.id,
      login_date: new Date().toISOString().slice(0, 10),
      login_time: new Date().toISOString(),
      status: "present",
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Clocked in" }); load(); }
  };
  const clockOut = async () => {
    if (!attendance) return;
    const { error } = await supabase.from("daily_attendance").update({ logout_time: new Date().toISOString() }).eq("id", attendance.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Clocked out" }); load(); }
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!employee) return <EmptyState icon={ListTodo} title="No employee profile" description="Your account isn't linked to an employee record. Contact admin." />;

  const hello = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <>
      <PageHeader
        eyebrow={hello}
        title={`${employee.first_name} ${employee.last_name}`}
        description={`${employee.position ?? ""}${employee.department ? " · " + employee.department : ""}`}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" />Attendance</CardTitle></CardHeader>
          <CardContent>
            {!attendance ? (
              <>
                <p className="text-sm text-muted-foreground mb-3">You haven't clocked in yet today.</p>
                <Button onClick={clockIn} className="gap-1"><LogIn className="h-4 w-4" />Clock in</Button>
              </>
            ) : (
              <>
                <div className="text-xs text-muted-foreground">Clocked in</div>
                <div className="text-lg font-semibold mb-1">{new Date(attendance.login_time).toLocaleTimeString()}</div>
                {attendance.logout_time ? (
                  <>
                    <div className="text-xs text-muted-foreground mt-2">Clocked out</div>
                    <div className="text-lg font-semibold">{new Date(attendance.logout_time).toLocaleTimeString()}</div>
                  </>
                ) : (
                  <Button variant="outline" onClick={clockOut} className="mt-3 gap-1"><LogOut className="h-4 w-4" />Clock out</Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><ListTodo className="h-4 w-4" />Open tasks ({tasks.length})</CardTitle></CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing on your plate. Nice work.</p>
            ) : (
              <ul className="divide-y divide-border/60">
                {tasks.slice(0, 5).map((t) => (
                  <li key={t.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{t.title}</div>
                      {t.due_date && <div className="text-xs text-muted-foreground">Due {new Date(t.due_date).toLocaleDateString()}</div>}
                    </div>
                    <Badge variant={t.priority === "high" ? "destructive" : t.priority === "low" ? "outline" : "secondary"} className="capitalize">{t.priority}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
