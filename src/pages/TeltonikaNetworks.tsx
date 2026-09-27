import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { teltonikaGroups } from "@/data/teltonika";
import rutm50 from "@/assets/teltonika-rutm50.png.asset.json";
import trb501 from "@/assets/teltonika-trb501.png.asset.json";
import swm280 from "@/assets/teltonika-swm280.png.asset.json";
import trm500 from "@/assets/teltonika-trm500.png.asset.json";
import tap400 from "@/assets/teltonika-tap400.png.asset.json";
import otd500 from "@/assets/teltonika-otd500.png.asset.json";

const images: Record<string, string> = {
  rutm50: rutm50.url, trb501: trb501.url, swm280: swm280.url,
  trm500: trm500.url, tap400: tap400.url, otd500: otd500.url,
};
const featuredImages: Record<string, string> = {
  routers: rutm50.url, gateways: trb501.url, "ethernet-switches": swm280.url,
  modems: trm500.url, "access-points": tap400.url,
};

const TeltonikaNetworks = () => {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");
  const { hash } = useLocation();
  const groups = teltonikaGroups.filter((group) => activeGroup === "all" || group.id === activeGroup);
  const matching = groups.map((group) => ({
    ...group,
    models: group.models.filter((model) => model.name.toLowerCase().includes(query.trim().toLowerCase())),
  })).filter((group) => group.models.length);
  const total = teltonikaGroups.reduce((sum, group) => sum + group.models.length, 0);

  useEffect(() => {
    if (!hash) return;
    const model = hash.slice(1);
    const group = teltonikaGroups.find((entry) => entry.models.some((item) => item.name.toLowerCase() === model));
    if (group) {
      setActiveGroup(group.id);
      setQuery("");
      requestAnimationFrame(() => setTimeout(() => document.getElementById(model)?.scrollIntoView({ block: "center", behavior: "smooth" }), 100));
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Teltonika Networks Industrial Routers & Gateways | uConnect Technologies"
        description="Explore Teltonika Networks industrial IoT routers, cellular gateways, Ethernet switches, modems and access points distributed by uConnect Technologies."
        path="/teltonika-networks"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Teltonika Networks", path: "/teltonika-networks" }]}
      />
      <Header />
      <main>
        <section className="border-b border-border bg-muted/40 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Distributed by uConnect Technologies</p>
            <h1 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl max-w-4xl">Teltonika Networks</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">Industrial IoT routers, gateways and networking equipment engineered for reliable connectivity in the field.</p>
            <p className="mt-4 text-sm text-muted-foreground">{total} models across {teltonikaGroups.length} product families · Availability varies by market</p>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12 lg:py-16" aria-label="Teltonika product catalogue">
          <div className="flex flex-col gap-5 mb-9">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input aria-label="Search Teltonika models" placeholder="Search by model, e.g. RUTM50" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Filter product family">
              <Button variant={activeGroup === "all" ? "default" : "outline"} size="sm" aria-pressed={activeGroup === "all"} onClick={() => setActiveGroup("all")}>All products</Button>
              {teltonikaGroups.map((group) => <Button key={group.id} variant={activeGroup === group.id ? "default" : "outline"} size="sm" aria-pressed={activeGroup === group.id} onClick={() => setActiveGroup(group.id)}>{group.title}</Button>)}
            </div>
          </div>
          {matching.length ? matching.map((group) => (
            <section key={group.id} className="border-t border-border py-9" aria-labelledby={`group-${group.id}`}>
              <div className="flex items-center gap-5 mb-6">
                {featuredImages[group.id] && <img src={featuredImages[group.id]} alt="" loading="lazy" className="h-20 w-28 object-contain bg-muted rounded-md hidden sm:block" />}
                <div>
                  <h2 id={`group-${group.id}`} className="display-headline text-2xl sm:text-3xl text-foreground">{group.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{group.models.length} models</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {group.models.map((model) => (
                  <a id={model.name.toLowerCase()} key={model.url} href={model.url} target="_blank" rel="noopener noreferrer" className="group border border-border bg-card rounded-md p-4 min-h-20 flex items-center justify-between gap-2 hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors" aria-label={`${model.name} details on Teltonika Networks`}>
                    <span className="font-semibold text-foreground group-hover:text-accent break-words">{model.name}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  </a>
                ))}
              </div>
              <a href={group.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-5 text-sm text-accent hover:underline">Official {group.title.toLowerCase()} details <ArrowUpRight className="h-4 w-4" /></a>
            </section>
          )) : <p className="py-10 text-muted-foreground" role="status">No models match your search.</p>}
          <div className="border-t border-border pt-10 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div><h2 className="text-2xl text-foreground">Need help choosing a model?</h2><p className="text-muted-foreground mt-2">Ask uConnect about specifications and availability for your project.</p></div>
            <Button asChild variant="cta"><a href="mailto:reachus@youconnecttech.com?subject=Teltonika%20Networks%20product%20enquiry">Enquire by email <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeltonikaNetworks;
