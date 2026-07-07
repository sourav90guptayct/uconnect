import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarClock } from "lucide-react";

export default function EmployeeAttendance() {
  const { user } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user?.email) return;
      const { data: emp } = await supabase.from("employee_profiles").select("id").eq("email", user.email).maybeSingle();
      if (!emp) { setLoading(false); return; }
      const { data } = await supabase.from("daily_attendance").select("*").eq("employee_id", emp.id).order("login_date", { ascending: false }).limit(60);
      setRows(data ?? []);
      setLoading(false);
    })();
  }, [user]);

  const hours = (a: any) => {
    if (!a.login_time || !a.logout_time) return "—";
    const ms = new Date(a.logout_time).getTime() - new Date(a.login_time).getTime();
    return (ms / 3600000).toFixed(1) + "h";
  };

  return (
    <>
      <PageHeader eyebrow="Attendance" title="Attendance history" description="Your last 60 clock-in records." />
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState icon={CalendarClock} title="No attendance yet" description="Clock in from the My Day page." />
      ) : (
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Login</TableHead>
                <TableHead>Logout</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{new Date(r.login_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(r.login_time).toLocaleTimeString()}</TableCell>
                  <TableCell>{r.logout_time ? new Date(r.logout_time).toLocaleTimeString() : "—"}</TableCell>
                  <TableCell>{hours(r)}</TableCell>
                  <TableCell className="capitalize">{r.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent></Card>
      )}
    </>
  );
}
