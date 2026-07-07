import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const COLUMNS = [
  { key: "pending", label: "To do" },
  { key: "in_progress", label: "In progress" },
  { key: "completed", label: "Done" },
] as const;

export default function EmployeeTasks() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = async () => {
    if (!user?.email) return;
    const { data: emp } = await supabase.from("employee_profiles").select("*").eq("email", user.email).maybeSingle();
    if (!emp) { setLoading(false); return; }
    setEmployee(emp);
    const { data: t } = await supabase.from("employee_tasks").select("*").eq("employee_id", emp.id).order("created_at", { ascending: false });
    setTasks(t ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user]);

  const setStatus = async (id: string, status: string) => {
    const patch: any = { status };
    if (status === "in_progress") patch.started_at = new Date().toISOString();
    if (status === "completed") patch.completed_at = new Date().toISOString();
    const { error } = await supabase.from("employee_tasks").update(patch).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else load();
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!employee) return <EmptyState icon={ListTodo} title="No employee profile" description="Contact admin to link your account." />;

  return (
    <>
      <PageHeader eyebrow="Work" title="Tasks" description="Move your tasks across columns to track progress." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => {
          const list = tasks.filter((t) => t.status === col.key);
          return (
            <Card key={col.key}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  {col.label}
                  <Badge variant="outline">{list.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {list.length === 0 && <p className="text-xs text-muted-foreground">Nothing here.</p>}
                {list.map((t) => (
                  <div key={t.id} className="rounded-lg border p-3 bg-card/60">
                    <div className="text-sm font-medium">{t.title}</div>
                    {t.description && <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</div>}
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant={t.priority === "high" ? "destructive" : t.priority === "low" ? "outline" : "secondary"} className="text-[10px] capitalize">{t.priority}</Badge>
                      <div className="flex gap-1">
                        {col.key !== "pending" && <Button size="sm" variant="ghost" className="h-6 text-[10px] px-2" onClick={() => setStatus(t.id, "pending")}>← To do</Button>}
                        {col.key !== "in_progress" && <Button size="sm" variant="ghost" className="h-6 text-[10px] px-2" onClick={() => setStatus(t.id, "in_progress")}>Start</Button>}
                        {col.key !== "completed" && <Button size="sm" variant="ghost" className="h-6 text-[10px] px-2" onClick={() => setStatus(t.id, "completed")}>Done →</Button>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
