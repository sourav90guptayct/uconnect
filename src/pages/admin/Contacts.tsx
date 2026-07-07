import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MailOpen, Trash2, Mail, Phone, Building2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Submission {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  created_at: string;
}

export default function AdminContacts() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Submission | null>(null);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as Submission[]) ?? []);
    setLoading(false);
    if (data && data.length && !active) setActive(data[0] as Submission);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const remove = async (id: string) => {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Deleted" });
    setActive(null);
    load();
  };

  return (
    <>
      <PageHeader eyebrow="Inbox" title="Contact submissions" description="Inbound requests from the site contact form." />
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState icon={MailOpen} title="Inbox is clear" description="New contact submissions will show up here." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
          <Card className="p-2 lg:h-[70vh] lg:overflow-y-auto">
            {rows.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r)}
                className={`w-full text-left p-3 rounded-lg mb-1 transition-colors border ${
                  active?.id === r.id ? "bg-accent/10 border-accent/30" : "border-transparent hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm truncate">{r.full_name}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground truncate">{r.message}</div>
              </button>
            ))}
          </Card>
          <Card>
            <CardContent className="p-6">
              {active ? (
                <>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="t-h3">{active.full_name}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{active.email}</span>
                        {active.phone && <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{active.phone}</span>}
                        {active.company && <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" />{active.company}</span>}
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(active.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <a href={`mailto:${active.email}`}>Reply</a>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => remove(active.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
                    {active.message}
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Select a message.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
