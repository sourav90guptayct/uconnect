import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  accent?: boolean;
  delay?: number;
}

export default function KpiCard({ label, value, hint, icon: Icon, accent, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "relative overflow-hidden border-border/60 bg-card/80 backdrop-blur transition-shadow hover:shadow-lg",
          accent && "border-accent/30"
        )}
      >
        {accent && (
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
        )}
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="t-eyebrow text-muted-foreground mb-3">{label}</p>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {value}
              </p>
              {hint && (
                <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
              )}
            </div>
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                accent
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary/5 text-primary"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
