import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { user } = useAuth();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const change = async () => {
    if (pw.length < 8) return toast({ title: "Weak password", description: "Use at least 8 characters.", variant: "destructive" });
    if (pw !== pw2) return toast({ title: "Mismatch", description: "Passwords don't match.", variant: "destructive" });
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setSaving(false);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setPw(""); setPw2("");
    toast({ title: "Password updated" });
  };

  return (
    <>
      <PageHeader eyebrow="Account" title="Settings" description="Your admin account and preferences." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{user?.email}</span></div>
            <div><span className="text-muted-foreground">Role:</span> <span className="font-medium">Administrator</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Change password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="pw">New password</Label>
              <Input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="pw2">Confirm</Label>
              <Input id="pw2" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
            </div>
            <Button onClick={change} disabled={saving}>{saving ? "Updating…" : "Update password"}</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
