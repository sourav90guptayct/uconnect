import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";

interface Employee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  position: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminEmployees() {
  const [rows, setRows] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("employee_profiles")
        .select("id, employee_id, first_name, last_name, email, department, position, is_active, created_at")
        .order("created_at", { ascending: false });
      setRows((data as Employee[]) ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <PageHeader eyebrow="Workforce" title="Employees" description="Employee roster and status." />
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState
          icon={UserCog}
          title="No employees yet"
          description="Employees created via the legacy admin flow will appear here."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-mono text-xs">{e.employee_id}</TableCell>
                      <TableCell>{e.first_name} {e.last_name}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.department ?? "—"}</TableCell>
                      <TableCell>{e.position ?? "—"}</TableCell>
                      <TableCell>{e.is_active ? "Active" : "Inactive"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
