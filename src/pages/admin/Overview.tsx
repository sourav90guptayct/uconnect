import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import KpiCard from "@/components/dashboard/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, FileText, Mail, FileVideo, ShieldCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import SEO from "@/components/SEO";

interface Stats {
  totalJobs: number;
  activeJobs: number;
  totalCandidates: number;
  totalApplications: number;
  totalScreenings: number;
  recommendedScreenings: number;
  totalContacts: number;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Array<{ id: string; type: string; label: string; when: string }>>([]);

  useEffect(() => {
    (async () => {
      const [jobs, activeJobs, candidates, apps, screenings, recScreenings, contacts, recentApps, recentContacts, recentScreens] =
        await Promise.all([
          supabase.from("jobs").select("id", { count: "exact", head: true }),
          supabase.from("jobs").select("id", { count: "exact", head: true }).eq("is_active", true),
          supabase.from("candidate_profiles").select("id", { count: "exact", head: true }),
          supabase.from("job_applications").select("id", { count: "exact", head: true }),
          supabase.from("screening_submissions").select("id", { count: "exact", head: true }),
          supabase.from("screening_submissions").select("id", { count: "exact", head: true }).ilike("recommendation", "Recommended%"),
          supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
          supabase.from("job_applications").select("id, applied_at").order("applied_at", { ascending: false }).limit(5),
          supabase.from("contact_submissions").select("id, full_name, created_at").order("created_at", { ascending: false }).limit(5),
          supabase.from("screening_submissions").select("id, candidate_name, created_at").order("created_at", { ascending: false }).limit(5),
        ]);

      setStats({
        totalJobs: jobs.count ?? 0,
        activeJobs: activeJobs.count ?? 0,
        totalCandidates: candidates.count ?? 0,
        totalApplications: apps.count ?? 0,
        totalScreenings: screenings.count ?? 0,
        recommendedScreenings: recScreenings.count ?? 0,
        totalContacts: contacts.count ?? 0,
      });

      const feed = [
        ...(recentApps.data ?? []).map((r) => ({ id: r.id, type: "application", label: "New job application", when: r.applied_at as string })),
        ...(recentContacts.data ?? []).map((r) => ({ id: r.id, type: "contact", label: `Contact from ${r.full_name}`, when: r.created_at as string })),
        ...(recentScreens.data ?? []).map((r) => ({ id: r.id, type: "screening", label: `Screening: ${r.candidate_name}`, when: r.created_at as string })),
      ]
        .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
        .slice(0, 8);
      setRecent(feed);
    })();
  }, []);

  return (
    <>
      <SEO title="Admin Overview | uConnect" description="Admin dashboard overview" path="/admin" noindex />
      <PageHeader
        eyebrow="Command Center"
        title="Overview"
        description="A live snapshot of activity across jobs, candidates, screenings, and inbound requests."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        <KpiCard label="Active Jobs" value={stats?.activeJobs ?? "—"} hint={`${stats?.totalJobs ?? 0} total`} icon={Briefcase} accent delay={0} />
        <KpiCard label="Candidates" value={stats?.totalCandidates ?? "—"} hint="Registered profiles" icon={Users} delay={0.05} />
        <KpiCard label="Applications" value={stats?.totalApplications ?? "—"} hint="All time" icon={FileText} delay={0.1} />
        <KpiCard label="Screenings" value={stats?.totalScreenings ?? "—"} hint={`${stats?.recommendedScreenings ?? 0} recommended`} icon={FileVideo} delay={0.15} />
        <KpiCard label="Contact Requests" value={stats?.totalContacts ?? "—"} hint="Inbox" icon={Mail} delay={0.2} />
        <KpiCard label="Admin Users" value={1} hint="You" icon={ShieldCheck} delay={0.25} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet.</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {recent.map((r) => (
                <li key={`${r.type}-${r.id}`} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="capitalize">{r.type}</Badge>
                    <span className="text-sm">{r.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(r.when), { addSuffix: true })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
