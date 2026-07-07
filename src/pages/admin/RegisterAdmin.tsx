import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

export default function RegisterAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const submit = async () => {
    if (!email || password.length < 8) {
      return toast({
        title: "Invalid input",
        description: "Enter a valid email and password (min 8 characters).",
        variant: "destructive",
      });
    }
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-user", {
        body: { email, password, role: "admin" },
      });
      if (error || (data as any)?.error) {
        throw new Error(error?.message || (data as any)?.error || "Failed");
      }
      toast({ title: "Admin created", description: `${email} can now sign in.` });
      setEmail("");
      setPassword("");
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Access"
        title="Register Admin"
        description="Create a new administrator account. They will be able to sign in immediately."
      />
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> New administrator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@company.com" />
          </div>
          <div>
            <Label htmlFor="pw">Temporary password</Label>
            <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
          </div>
          <Button onClick={submit} disabled={saving}>
            {saving ? "Creating…" : "Create admin"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
