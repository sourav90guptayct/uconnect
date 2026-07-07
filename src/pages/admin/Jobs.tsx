import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Power, PowerOff, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company_name: string;
  location_city: string;
  location_state: string;
  salary_min: number;
  salary_max: number;
  application_count: number;
  is_active: boolean;
  created_at: string;
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("id, title, company_name, location_city, location_state, salary_min, salary_max, application_count, is_active, created_at")
      .order("created_at", { ascending: false });
    if (!error) setJobs((data as Job[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id: string, current: boolean) => {
    const { error } = await supabase.from("jobs").update({ is_active: !current }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: current ? "Job deactivated" : "Job activated" });
      load();
    }
  };

  const filtered = jobs.filter((j) =>
    !q.trim() ||
    j.title.toLowerCase().includes(q.toLowerCase()) ||
    j.company_name?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageHeader eyebrow="Talent Ops" title="Jobs" description="Manage every job posting on the platform." />
      <div className="mb-4 flex items-center gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title or company" className="pl-9" />
        </div>
      </div>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Briefcase} title="No jobs found" description="Try clearing the search or post a new job from the legacy dashboard." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Salary (LPA)</TableHead>
                    <TableHead className="text-center">Apps</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((j) => (
                    <TableRow key={j.id}>
                      <TableCell className="font-medium">{j.title}</TableCell>
                      <TableCell>{j.company_name}</TableCell>
                      <TableCell className="text-muted-foreground">{j.location_city}, {j.location_state}</TableCell>
                      <TableCell>
                        {j.salary_min && j.salary_max
                          ? `${(j.salary_min / 100000).toFixed(1)}–${(j.salary_max / 100000).toFixed(1)}`
                          : "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{j.application_count ?? 0}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={j.is_active ? "default" : "secondary"}>
                          {j.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={j.is_active ? "outline" : "default"}
                          onClick={() => toggle(j.id, j.is_active)}
                          className="gap-1"
                        >
                          {j.is_active ? <><PowerOff className="h-3 w-3" /> Deactivate</> : <><Power className="h-3 w-3" /> Activate</>}
                        </Button>
                      </TableCell>
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
