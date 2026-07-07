import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Clock, Camera } from "lucide-react";

export default function CandidateScreenings() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader eyebrow="Assessments" title="Screening Tests" description="Available role-based screening tests." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-accent/30">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="mb-2">L2 Support</Badge>
                <CardTitle>L2 Network Engineer</CardTitle>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <FileCheck className="h-5 w-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />30 min</span>
              <span className="inline-flex items-center gap-1"><Camera className="h-3 w-3" />Camera required</span>
              <span>20 MCQs</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Structured screening covering commercials, availability, and technical L2 network fundamentals.
              Camera stays on for the duration and tab-switching is monitored.
            </p>
            <Button onClick={() => navigate("/careers/screening/l2-network-engineer")}>Start test</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
