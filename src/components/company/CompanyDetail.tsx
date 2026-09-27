import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

type Item = { title: string; text: string; image?: string; to?: string };
export type CompanyPageData = {
  path: string; label: string; title: string; intro: string; image: string;
  sections: { label: string; title: string; intro?: string; items: Item[] }[];
  process?: string[];
  links: { label: string; to: string }[];
  closing: string;
};

export const CompanyDetail = ({ data }: { data: CompanyPageData }) => (
  <div className="min-h-screen bg-background">
    <SEO title={`${data.label} | uConnect Technologies`} description={data.intro} path={data.path} breadcrumbs={[{ name: "Home", path: "/" }, { name: "Company", path: "/company/about" }, { name: data.label, path: data.path }]} />
    <Header />
    <main>
      <section className="relative min-h-[540px] overflow-hidden bg-foreground pt-32 pb-20 flex items-end">
        <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/70 to-transparent" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="container relative mx-auto px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex gap-2 text-sm text-background/70"><Link to="/">Home</Link><span>/</span><Link to="/company/about">Company</Link><span>/</span><span className="text-background">{data.label}</span></nav>
          <p className="mb-4 text-sm font-semibold uppercase text-accent">{data.label}</p>
          <h1 className="max-w-4xl text-4xl font-bold text-background sm:text-5xl lg:text-6xl">{data.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/85">{data.intro}</p>
        </motion.div>
      </section>
      {data.process && <section className="border-b border-border bg-muted/40 py-10"><div className="container mx-auto px-6 lg:px-8"><p className="mb-5 text-xs font-semibold uppercase text-accent">From requirement to field</p><ol className="flex flex-wrap gap-x-3 gap-y-4">{data.process.map((step, i) => <li key={step} className="flex items-center gap-3 text-sm font-semibold text-foreground"><span className="text-accent">{String(i + 1).padStart(2, "0")}</span>{step}{i < data.process.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}</li>)}</ol></div></section>}
      {data.sections.map((section, index) => <section key={section.title} className={`py-16 lg:py-20 ${index % 2 ? "bg-muted/30" : "bg-background"}`}><div className="container mx-auto px-6 lg:px-8"><div className="mb-10 max-w-3xl"><p className="mb-3 text-xs font-semibold uppercase text-accent">{section.label}</p><h2 className="text-3xl font-bold text-foreground sm:text-4xl">{section.title}</h2>{section.intro && <p className="mt-4 text-muted-foreground">{section.intro}</p>}</div><div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{section.items.map((item) => <motion.article key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="border-t border-border pt-5">{item.image && <img src={item.image} alt={item.title} loading="lazy" className="mb-5 aspect-[4/3] w-full bg-muted object-contain p-4" />}<h3 className="text-xl font-semibold text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>{item.to && <Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline" to={item.to}>Explore <ArrowUpRight className="h-4 w-4" /></Link>}</motion.article>)}</div></div></section>)}
      <section className="bg-foreground py-16"><div className="container mx-auto px-6 lg:px-8"><h2 className="max-w-3xl text-3xl font-bold text-background sm:text-4xl">{data.closing}</h2><div className="mt-8 flex flex-wrap gap-3">{data.links.map((link) => <Button key={link.label} asChild variant="ctaOnDark" size="lg"><Link to={link.to}>{link.label}<ArrowRight className="h-4 w-4" /></Link></Button>)}<Button asChild variant="ctaOutlineOnDark" size="lg"><a href={`mailto:reachus@youconnecttech.com?subject=${encodeURIComponent(data.label + " enquiry")}`}><Mail className="h-4 w-4" />Talk to our team</a></Button></div></div></section>
    </main><Footer />
  </div>
);
