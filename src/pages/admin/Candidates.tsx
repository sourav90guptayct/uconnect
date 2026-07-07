import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Users, Search, Mail, Phone, MapPin } from "lucide-react";

interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  current_city: string;
  total_experience: string;
  expected_salary: number;
  user_id: string;
  created_at: string;
  email?: string;
}

export default function AdminCandidates() {
  const [rows, setRows] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("candidate_profiles")
        .select("id, first_name, last_name, phone, current_city, total_experience, expected_salary, user_id, created_at")
        .order("created_at", { ascending: false });
      if (data) {
        const withEmails = await Promise.all(
          data.map(async (c) => {
            const { data: email } = await supabase.rpc("get_user_email", { user_uuid: c.user_id });
            return { ...c, email: (email as string) ?? undefined };
          })
        );
        setRows(withEmails as Candidate[]);
      }
      setLoading(false);
    })();
  }, []);

  const filtered = rows.filter((r) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return (
      `${r.first_name} ${r.last_name}`.toLowerCase().includes(s) ||
      r.email?.toLowerCase().includes(s) ||
      r.phone?.includes(s) ||
      r.current_city?.toLowerCase().includes(s)
    );
  });

  return (
    <>
      <PageHeader eyebrow="Talent Pool" title="Candidates" description="Every registered candidate profile with contact + snapshot info." />
      <div className="mb-4 flex items-center gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, email, phone, city" className="pl-9" />
        </div>
      </div>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Users} title="No candidates" description="No profiles match your search." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Expected (LPA)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.first_name} {c.last_name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5 text-xs">
                          <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{c.email ?? "—"}</span>
                          <span className="inline-flex items-center gap-1 text-muted-foreground"><Phone className="h-3 w-3" />{c.phone ?? "—"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{c.current_city ?? "—"}</span>
                      </TableCell>
                      <TableCell>{c.total_experience ?? "—"}</TableCell>
                      <TableCell>{c.expected_salary ? (c.expected_salary / 100000).toFixed(1) : "—"}</TableCell>
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
