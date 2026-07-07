import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Check, Download, ExternalLink, FileText, FileVideo, Search, ShieldAlert, X } from "lucide-react";
import { L2_SCREENING_QUESTIONS, type ScreeningQuestion } from "@/data/l2ScreeningQuestions";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

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
  answers: any;
  score: number;
  recommendation: string;
  tab_switches: number;
  fullscreen_exits: number;
  window_blurs: number;
  video_url: string | null;
  video_uploaded: boolean;
  resume_url: string | null;
  created_at: string;
}

// Answer count = questions the candidate was shown (mixed pool means 20–25).
const totalQuestions = (r: Submission) =>
  r.answers && typeof r.answers === "object" ? Object.keys(r.answers).length : 0;

function recBadge(rec: string) {
  if (rec?.startsWith("Recommended")) return "default";
  if (rec?.startsWith("Hold")) return "secondary";
  return "destructive";
}

function toCsv(rows: Submission[]) {
  const cols = [
    "created_at","candidate_name","email","phone","current_location","qualification","total_experience",
    "current_company","current_designation","owns_laptop","comfortable_manesar","comfortable_shifts",
    "joining_availability","current_ctc","expected_ctc","comfortable_25k","score","recommendation",
    "tab_switches","fullscreen_exits","window_blurs","video_url",
  ];
  const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc((r as any)[c])).join(","))].join("\n");
}

const QUESTION_MAP: Record<number, ScreeningQuestion> = L2_SCREENING_QUESTIONS.reduce(
  (acc, q) => ((acc[q.id] = q), acc),
  {} as Record<number, ScreeningQuestion>,
);

const DIFF_COLORS: Record<string, string> = { easy: "#22c55e", moderate: "#f59e0b", hard: "#ef4444" };

export default function AdminScreenings() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [rec, setRec] = useState("all");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [answerKey, setAnswerKey] = useState<Record<number, number> | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("screening_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      setRows((data as Submission[]) ?? []);
      setLoading(false);
    })();
    (async () => {
      const { data, error } = await supabase.functions.invoke("get-screening-answer-key");
      if (!error && data?.answer_key) setAnswerKey(data.answer_key);
    })();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (rec !== "all" && !r.recommendation?.toLowerCase().startsWith(rec)) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        if (
          !r.candidate_name?.toLowerCase().includes(s) &&
          !r.email?.toLowerCase().includes(s) &&
          !r.phone?.includes(s)
        )
          return false;
      }
      return true;
    });
  }, [rows, q, rec]);

  const download = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `screenings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openResume = async (resumeRef: string) => {
    // resumeRef is stored as "screening-resumes/<uuid>.ext"; strip the bucket prefix.
    const path = resumeRef.startsWith("screening-resumes/")
      ? resumeRef.slice("screening-resumes/".length)
      : resumeRef;
    const { data, error } = await supabase.storage
      .from("screening-resumes")
      .createSignedUrl(path, 60 * 10); // 10 minute link
    if (error || !data?.signedUrl) {
      console.error("Signed URL failed:", error);
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageHeader
        eyebrow="Screening"
        title="L2 Network Engineer submissions"
        description="Every candidate attempt with score, recommendation, violations, and video."
        actions={
          <Button onClick={download} disabled={!filtered.length} className="gap-1">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, phone" className="pl-9" />
        </div>
        <Select value={rec} onValueChange={setRec}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All recommendations</SelectItem>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="hold">Hold</SelectItem>
            <SelectItem value="not">Not recommended</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} of {rows.length}</span>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <EmptyState icon={FileVideo} title="No submissions" description="Nothing matches the current filters." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Recommendation</TableHead>
                    <TableHead>Violations</TableHead>
                    <TableHead>CV</TableHead>
                    <TableHead>Video</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => {
                    const total = totalQuestions(r);
                    return (
                      <TableRow key={r.id} className="cursor-pointer" onClick={() => setSelected(r)}>
                        <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                          {new Date(r.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="font-medium">{r.candidate_name}</TableCell>
                        <TableCell className="text-xs">
                          <div>{r.email}</div>
                          <div className="text-muted-foreground">{r.phone}</div>
                        </TableCell>
                        <TableCell className="font-mono">
                          {r.score}/{total || "?"}
                          {total > 0 && (
                            <span className="ml-1 text-xs text-muted-foreground">
                              ({Math.round((r.score / total) * 100)}%)
                            </span>
                          )}
                        </TableCell>
                        <TableCell><Badge variant={recBadge(r.recommendation) as any}>{r.recommendation}</Badge></TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1 text-xs">
                            <ShieldAlert className="h-3 w-3" />
                            {r.tab_switches}/{r.fullscreen_exits}/{r.window_blurs}
                          </span>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          {r.resume_url ? (
                            <button
                              className="text-primary inline-flex items-center gap-1 text-xs hover:underline"
                              onClick={() => openResume(r.resume_url!)}
                            >
                              <FileText className="h-3 w-3" /> Open
                            </button>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          {r.video_url ? (
                            <a href={r.video_url} target="_blank" rel="noreferrer" className="text-primary inline-flex items-center gap-1 text-xs">
                              Open <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground">{r.video_uploaded ? "—" : "Pending"}</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.candidate_name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <section>
                  <h4 className="t-eyebrow text-muted-foreground mb-2">Result</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">{selected.score}<span className="text-muted-foreground text-base">/{totalQuestions(selected) || "?"}</span></span>
                    <Badge variant={recBadge(selected.recommendation) as any}>{selected.recommendation}</Badge>
                  </div>
                </section>
                <section className="grid grid-cols-2 gap-3 text-sm">
                  <Info label="Email" value={selected.email} />
                  <Info label="Phone" value={selected.phone} />
                  <Info label="Location" value={selected.current_location} />
                  <Info label="Experience" value={selected.total_experience} />
                  <Info label="Company" value={selected.current_company} />
                  <Info label="Designation" value={selected.current_designation} />
                  <Info label="Qualification" value={selected.qualification} />
                  <Info label="Owns laptop" value={selected.owns_laptop} />
                  <Info label="OK with Manesar" value={selected.comfortable_manesar} />
                  <Info label="OK with shifts" value={selected.comfortable_shifts} />
                  <Info label="Joining" value={selected.joining_availability} />
                  <Info label="Current CTC" value={selected.current_ctc} />
                  <Info label="Expected CTC" value={selected.expected_ctc} />
                  <Info label="OK with 25K" value={selected.comfortable_25k} />
                </section>
                <section>
                  <h4 className="t-eyebrow text-muted-foreground mb-2">Anti-cheat</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <Info label="Tab switches" value={selected.tab_switches} />
                    <Info label="Fullscreen exits" value={selected.fullscreen_exits} />
                    <Info label="Window blurs" value={selected.window_blurs} />
                  </div>
                </section>
                {selected.resume_url && (
                  <section>
                    <h4 className="t-eyebrow text-muted-foreground mb-2">CV / Resume</h4>
                    <button
                      onClick={() => openResume(selected.resume_url!)}
                      className="text-primary text-sm inline-flex items-center gap-1 hover:underline"
                    >
                      <FileText className="h-3 w-3" /> Open uploaded CV
                    </button>
                  </section>
                )}
                {selected.video_url && (
                  <section>
                    <h4 className="t-eyebrow text-muted-foreground mb-2">Video</h4>
                    <a href={selected.video_url} target="_blank" rel="noreferrer" className="text-primary text-sm inline-flex items-center gap-1">
                      Open on Google Drive <ExternalLink className="h-3 w-3" />
                    </a>
                  </section>
                )}

                <AnswerBreakdown submission={selected} answerKey={answerKey} />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-md border border-border/60 bg-muted/30 p-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-medium truncate">{value ?? "—"}</div>
    </div>
  );
}

function AnswerBreakdown({
  submission,
  answerKey,
}: {
  submission: Submission;
  answerKey: Record<number, number> | null;
}) {
  const answers = (submission.answers ?? {}) as Record<string, number>;
  const entries = Object.entries(answers).map(([qid, sel]) => {
    const id = Number(qid);
    const q = QUESTION_MAP[id];
    const correctIdx = answerKey?.[id];
    const isCorrect = correctIdx != null ? correctIdx === sel : null;
    return { id, question: q, selected: sel, correctIdx, isCorrect };
  });
  entries.sort((a, b) => a.id - b.id);

  const totalCorrect = entries.filter((e) => e.isCorrect === true).length;
  const totalWrong = entries.filter((e) => e.isCorrect === false).length;

  // Category = difficulty
  const byCategory: Record<string, { correct: number; wrong: number }> = {};
  entries.forEach((e) => {
    const cat = e.question?.difficulty ?? "unknown";
    byCategory[cat] ??= { correct: 0, wrong: 0 };
    if (e.isCorrect === true) byCategory[cat].correct += 1;
    else if (e.isCorrect === false) byCategory[cat].wrong += 1;
  });
  const catOrder = ["easy", "moderate", "hard"];
  const barData = catOrder
    .filter((c) => byCategory[c])
    .map((c) => ({ category: c[0].toUpperCase() + c.slice(1), correct: byCategory[c].correct, wrong: byCategory[c].wrong }));

  const pieData = catOrder
    .filter((c) => byCategory[c])
    .map((c) => ({ name: c[0].toUpperCase() + c.slice(1), value: byCategory[c].correct, key: c }));

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="t-eyebrow text-muted-foreground">Question breakdown</h4>
        {answerKey && (
          <span className="text-xs text-muted-foreground">
            {totalCorrect} correct · {totalWrong} wrong
          </span>
        )}
      </div>

      {!answerKey ? (
        <p className="text-xs text-muted-foreground">Loading answer key…</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground mb-2">Correct answers by category</div>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70} label>
                        {pieData.map((d) => (
                          <Cell key={d.key} fill={DIFF_COLORS[d.key] ?? "#64748b"} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground mb-2">Right vs wrong per category</div>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="correct" stackId="a" fill="#22c55e" name="Correct" />
                      <Bar dataKey="wrong" stackId="a" fill="#ef4444" name="Wrong" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <ol className="space-y-2">
            {entries.map((e, idx) => {
              const opts = e.question?.options ?? [];
              return (
                <li key={e.id} className="rounded-md border border-border/60 bg-muted/20 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-medium">
                      Q{idx + 1}. {e.question?.question ?? `Question ${e.id}`}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {e.question?.difficulty ?? "?"}
                      </Badge>
                      {e.isCorrect === true ? (
                        <Badge className="gap-1 bg-green-600 hover:bg-green-600"><Check className="h-3 w-3" /> Right</Badge>
                      ) : e.isCorrect === false ? (
                        <Badge variant="destructive" className="gap-1"><X className="h-3 w-3" /> Wrong</Badge>
                      ) : (
                        <Badge variant="secondary">—</Badge>
                      )}
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {opts.map((opt, i) => {
                      const isChosen = i === e.selected;
                      const isRight = i === e.correctIdx;
                      const cls = isRight
                        ? "border-green-500/60 bg-green-500/10"
                        : isChosen
                        ? "border-red-500/60 bg-red-500/10"
                        : "border-border/40";
                      return (
                        <li key={i} className={`text-xs rounded border px-2 py-1 flex items-center gap-2 ${cls}`}>
                          <span className="font-mono text-[10px] text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                          <span className="flex-1">{opt}</span>
                          {isChosen && <span className="text-[10px] text-muted-foreground">chosen</span>}
                          {isRight && <Check className="h-3 w-3 text-green-600" />}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </section>
  );
}
