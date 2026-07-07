import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Submission {
  id: string;
  role: string;
  candidate_name: string;
  email: string;
  phone: string;
  current_location: string;
  qualification: string;
  total_experience: string;
  current_company: string;
  current_designation: string;
  owns_laptop: string;
  comfortable_manesar: string;
  comfortable_shifts: string;
  joining_availability: string;
  current_ctc: string;
  expected_ctc: string;
  comfortable_25k: string;
  score: number;
  recommendation: string;
  tab_switches: number;
  fullscreen_exits: number;
  window_blurs: number;
  video_url: string | null;
  video_uploaded: boolean;
  created_at: string;
}

function recBadge(rec: string) {
  if (rec.startsWith("Recommended")) return "default";
  if (rec.startsWith("Hold")) return "secondary";
  return "destructive";
}

function toCsv(rows: Submission[]) {
  const cols = [
    "created_at", "candidate_name", "email", "phone", "current_location",
    "qualification", "total_experience", "current_company", "current_designation",
    "owns_laptop", "comfortable_manesar", "comfortable_shifts", "joining_availability",
    "current_ctc", "expected_ctc", "comfortable_25k",
    "score", "recommendation", "tab_switches", "fullscreen_exits", "window_blurs", "video_url",
  ];
  const escape = (v: any) => {
    const s = v === null || v === undefined ? "" : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = cols.join(",");
  const body = rows.map((r) => cols.map((c) => escape((r as any)[c])).join(",")).join("\n");
  return `${header}\n${body}`;
}

export default function AdminScreenings() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      const { data, error } = await supabase
        .from("screening_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setRows(data as Submission[]);
      setLoading(false);
    })();
  }, [isAdmin]);

  if (authLoading || adminLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card><CardContent className="p-8">Admin access required.</CardContent></Card>
      </div>
    );
  }

  const download = () => {
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `screening-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Screening submissions — Admin" description="Admin screening submissions" path="/admin/screenings" />
      <Header />
      <main className="container mx-auto px-4 py-24">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Screening Test Submissions ({rows.length})</CardTitle>
            <Button onClick={download} disabled={!rows.length}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading submissions...</p>
            ) : rows.length === 0 ? (
              <p className="text-muted-foreground">No submissions yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Recommendation</TableHead>
                      <TableHead>Violations (T/F/B)</TableHead>
                      <TableHead>Video</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</TableCell>
                        <TableCell>{r.candidate_name}</TableCell>
                        <TableCell>{r.phone}</TableCell>
                        <TableCell>{r.email}</TableCell>
                        <TableCell>{r.score}/20</TableCell>
                        <TableCell><Badge variant={recBadge(r.recommendation) as any}>{r.recommendation}</Badge></TableCell>
                        <TableCell>{r.tab_switches}/{r.fullscreen_exits}/{r.window_blurs}</TableCell>
                        <TableCell>
                          {r.video_url ? (
                            <a href={r.video_url} target="_blank" rel="noreferrer" className="text-primary inline-flex items-center gap-1">
                              Open <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-muted-foreground text-xs">{r.video_uploaded ? "—" : "Pending"}</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
