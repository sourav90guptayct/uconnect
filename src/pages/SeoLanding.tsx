import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getSeoPage, pagesByGroup, groupTitles, type SeoGroup, type SeoPage } from "@/data/seoPages";
import NotFound from "@/pages/NotFound";

const List = ({ heading, items }: { heading: string; items: string[] }) => (
  <div>
    <h2 className="text-2xl font-bold text-foreground">{heading}</h2>
    <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-muted-foreground">
          <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  </div>
);

const SeoLanding = ({ page }: { page: SeoPage }) => {
  const path = `/${page.group}/${page.slug}`;
  const siblings = pagesByGroup(page.group).filter((p) => p.slug !== page.slug).slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={page.title}
        description={page.description}
        path={path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: page.groupLabel, path: `/${page.group}/${page.slug}` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.h1,
          serviceType: page.primaryKeyword,
          description: page.description,
          url: `https://uconnecttech.com${path}`,
          areaServed: { "@type": "Country", name: "India" },
          provider: {
            "@type": "Organization",
            name: "uConnect Technologies",
            url: "https://uconnecttech.com",
          },
        }}
      />
      <Header />

      <main>
        <section className="border-b border-border bg-muted/30 pt-20 pb-14">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                {page.groupLabel}
              </div>
              <h1 className="mt-6 text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {page.h1}
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{page.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  Talk to our team <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  Explore our products
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_300px] gap-12">
              <div className="space-y-14">
                <List heading={page.capabilitiesHeading} items={page.capabilities} />
                <List heading={page.deliverablesHeading} items={page.deliverables} />
                <List heading={page.applicationsHeading} items={page.applications} />

                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Why uConnect for {page.primaryKeyword}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    uConnect Technologies is a product and services integrator founded in 2017, with
                    200+ Tier-1 engineers working across 18 telecom circles, 5 regional warehouses and
                    10,000+ ConnectLH™ links deployed in the field. Product supply, deployment and
                    ongoing operations come from one accountable partner, which keeps designs
                    buildable and support answerable.
                  </p>
                </div>
              </div>

              <aside className="lg:sticky lg:top-24 h-fit space-y-8">
                {page.related.length > 0 && (
                  <div className="rounded-2xl border border-border p-6">
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Related
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {page.related.map((r) => (
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

                <div className="rounded-2xl border border-border bg-muted/40 p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    More {groupTitles[page.group].toLowerCase()}
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {siblings.map((s) => (
                      <li key={s.slug}>
                        <Link
                          to={`/${s.group}/${s.slug}`}
                          className="text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                          {s.h1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-foreground p-6 text-background">
                  <div className="text-sm font-semibold">Request a proposal</div>
                  <p className="mt-2 text-sm text-background/70">
                    Share your scope and our engineering team will respond with a technical approach.
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
};

const SeoLandingRoute = ({ group }: { group: SeoGroup }) => {
  const { slug } = useParams();
  const page = getSeoPage(group, slug);
  if (!page) return <NotFound />;
  return <SeoLanding page={page} />;
};

export default SeoLandingRoute;
