import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export interface PolicySection {
  title: string;
  body: string;
  points?: string[];
}

interface Props {
  eyebrow: string;
  title: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  path: string;
  icon: LucideIcon;
  sections: PolicySection[];
  related?: { label: string; to: string }[];
}

const PolicyPage = ({
  eyebrow,
  title,
  intro,
  seoTitle,
  seoDescription,
  path,
  icon: Icon,
  sections,
  related = [],
}: Props) => (
  <div className="min-h-screen bg-background">
    <SEO
      title={seoTitle}
      description={seoDescription}
      path={path}
      breadcrumbs={[{ name: "Home", path: "/" }, { name: eyebrow, path }]}
    />
    <Header />

    <main>
      <section className="border-b border-border bg-muted/30 pt-32 pb-14">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <Icon className="h-4 w-4" />
              {eyebrow}
            </div>
            <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-foreground leading-tight">{title}</h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{intro}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            <div className="space-y-12">
              {sections.map((s, i) => (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="scroll-mt-28"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-sm font-mono text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl font-bold text-foreground">{s.title}</h2>
                  </div>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{s.body}</p>
                  {s.points && (
                    <ul className="mt-5 space-y-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-3 text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 h-fit space-y-8">
              <div className="rounded-2xl border border-border bg-muted/40 p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  On this page
                </div>
                <ul className="mt-4 space-y-2.5">
                  {sections.map((s) => (
                    <li key={s.title}>
                      <a
                        href={`#${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {related.length > 0 && (
                <div className="rounded-2xl border border-border p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Related
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {related.map((r) => (
                      <li key={r.to}>
                        <Link
                          to={r.to}
                          className="text-sm text-foreground hover:text-accent transition-colors"
                        >
                          {r.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl bg-foreground p-6 text-background">
                <div className="text-sm font-semibold">Questions or concerns?</div>
                <p className="mt-2 text-sm text-background/70">
                  Write to our team and we will route your query to the right owner.
                </p>
                <a
                  href="mailto:reachus@youconnecttech.com"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-background hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  reachus@youconnecttech.com
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default PolicyPage;
