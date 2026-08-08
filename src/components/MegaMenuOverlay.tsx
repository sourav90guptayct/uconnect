import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/assets/uconnect-logo.png";


type PanelKey = "what" | "who" | "products";

const servicesGroups = [
  {
    title: "Managed Services",
    links: [
      { label: "24×7 NOC operations", to: "/managed-services" },
      { label: "SLA-backed field support", to: "/managed-services" },
      { label: "Preventive maintenance", to: "/managed-services" },
    ],
  },
  {
    title: "Network Deployment",
    links: [
      { label: "Networks", to: "/networks" },
      { label: "Rollout & integration", to: "/networks" },
      { label: "Survey, QA & audits", to: "/networks" },
    ],
  },
  {
    title: "Resources Management",
    links: [
      { label: "Technology-enabled staffing", to: "/resource-management" },
      { label: "Managed engineering teams", to: "/resource-management" },
    ],
  },
  {
    title: "Infra Solutions",
    links: [
      { label: "Infra installation", to: "/infra-installation" },
      { label: "Tower & pole erection", to: "/infra-installation" },
      { label: "Site infrastructure", to: "/infra-installation" },
    ],
  },
];

const productGroups = [
  {
    title: "Radio & Antennas",
    links: [
      { label: "Dish antennas", to: "/products?category=antennas" },
      { label: "Sector antennas", to: "/products?category=sectorAntennas" },
      { label: "4G/5G outdoor routers", to: "/products?category=routers" },
    ],
  },
  {
    title: "Power & Networking",
    links: [
      { label: "AC & DC PoE", to: "/products?category=poe" },
      { label: "Switches", to: "/products?category=switches" },
      { label: "Network cables", to: "/products?category=networkCables" },
    ],
  },
  {
    title: "Fiber & FTTH",
    links: [
      { label: "FTTH products", to: "/products?category=ftth" },
      { label: "Fiber cables", to: "/products?category=fiberCables" },
      { label: "RF cables", to: "/products?category=rfCables" },
    ],
  },
  {
    title: "Site Infrastructure",
    links: [
      { label: "Racks & cabinets", to: "/products?category=racks" },
      { label: "BTS installation", to: "/products?category=bts" },
      { label: "Fabricated products", to: "/products?category=fabricated" },
    ],
  },
];

const whoGroups = [
  {
    title: "Company",
    links: [
      { label: "About uConnect", to: "/about" },
      { label: "Our story since 2017", to: "/about" },
      { label: "Leadership & governance", to: "/governance" },
      { label: "Clients & partners", to: "/clients" },
    ],
  },
  {
    title: "How we work",
    links: [
      { label: "Business practices & policies", to: "/business-practices" },
      { label: "Quality, health, safety & environment", to: "/quality-hse" },
      { label: "Risk & project governance", to: "/governance" },
    ],
  },
  {
    title: "Industries we serve",
    links: [
      { label: "Telecommunications", to: "/?section=use-cases" },
      { label: "Government & Public Safety", to: "/?section=use-cases" },
      { label: "Rail & Transportation", to: "/?section=use-cases" },
      { label: "Energy & Utilities", to: "/?section=use-cases" },
      { label: "Enterprise & Industrial", to: "/?section=use-cases" },
      { label: "Digital Infrastructure", to: "/?section=use-cases" },
    ],
  },
];

const featured: Record<PanelKey, { eyebrow: string; title: string; body: string; to: string; cta: string }> = {
  what: {
    eyebrow: "Integrator",
    title: "Product and services under one accountable owner",
    body: "Managed services, network deployment, resource management and infra solutions delivered across 18 telecom circles.",
    to: "/services",
    cta: "Explore our capabilities",
  },
  products: {
    eyebrow: "ConnectLH™",
    title: "Field-proven telecom hardware, 10,000+ links deployed",
    body: "Antennas, routers, PoE, switches, FTTH, fiber and RF cables, racks and fabricated site infrastructure with datasheets on request.",
    to: "/products",
    cta: "Browse the catalogue",
  },
  who: {
    eyebrow: "Since 2017",
    title: "Built on disciplined governance and 200+ Tier-1 engineers",
    body: "Documented decision rights, project governance and safety practice on every site — read how we run the business.",
    to: "/governance",
    cta: "How we are governed",
  },
};

const panels: Record<
  PanelKey,
  { tabs: { id: string; label: string; groups: typeof servicesGroups; cta: { label: string; to: string } }[] }
> = {
  what: {
    tabs: [
      { id: "services", label: "Services", groups: servicesGroups, cta: { label: "View all services", to: "/services" } },
      { id: "products", label: "Products", groups: productGroups, cta: { label: "View all products", to: "/products" } },
    ],
  },
  products: {
    tabs: [
      { id: "products", label: "ConnectLH™", groups: productGroups, cta: { label: "View all products", to: "/products" } },
    ],
  },
  who: {
    tabs: [
      { id: "who", label: "Who we are", groups: whoGroups, cta: { label: "About us", to: "/about" } },
    ],
  },
};

const railItems: { key: PanelKey | null; label: string; to?: string; external?: boolean }[] = [
  { key: "what", label: "What We Do" },
  { key: "who", label: "Who We Are" },
  { key: "products", label: "Products" },
  { key: null, label: "Careers", to: "/careers", external: true },
  { key: null, label: "Clients", to: "/clients" },
  { key: null, label: "Contact Us", to: "/?section=contact" },
  { key: null, label: "Sign In", to: "/auth" },
];


interface Props {
  open: boolean;
  onClose: () => void;
}

const MegaMenuOverlay = ({ open, onClose }: Props) => {
  const [panel, setPanel] = useState<PanelKey>("what");
  const [tab, setTab] = useState(0);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close the menu and, when already on the target page, scroll to the section
  const handleNavClick = (to: string) => {
    onClose();
    const [path, query] = to.split("?");
    const section = new URLSearchParams(query || "").get("section");
    if (section && path === location.pathname) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  };


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      setMobilePanelOpen(false);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const activeTabs = panels[panel].tabs;
  const activeTab = activeTabs[Math.min(tab, activeTabs.length - 1)];

  const rightPanel = (
    <div className="bg-muted/40 px-6 sm:px-10 py-8 lg:py-14">
      {isMobile && (
        <button
          onClick={() => setMobilePanelOpen(false)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}
      <div className="flex items-center gap-8 border-b border-border">
        {activeTabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setTab(i)}
            className={cn(
              "pb-3 -mb-px text-lg sm:text-xl font-bold transition-colors border-b-2",
              activeTab.id === t.id
                ? "text-accent border-accent"
                : "text-foreground border-transparent hover:text-accent"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={panel + activeTab.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-9"
      >
        {activeTab.groups.map((g) => (
          <div key={g.title}>
            <div className="text-base font-bold text-foreground">{g.title}</div>
            <ul className="mt-3 space-y-2.5">
              {g.links.map((l) => (
                <li key={l.label + l.to}>
                  <Link
                    to={l.to}
                    onClick={() => handleNavClick(l.to)}
                    className="text-[15px] text-muted-foreground hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
        <Link
          to={activeTab.cta.to}
          onClick={onClose}
          className="inline-flex w-fit items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors"
        >
          {activeTab.cta.label}
        </Link>

        <Link
          to={featured[panel].to}
          onClick={onClose}
          className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:border-accent"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">
            {featured[panel].eyebrow}
          </div>
          <div className="mt-2 text-lg font-bold text-foreground">{featured[panel].title}</div>
          <p className="mt-2 text-sm text-muted-foreground">{featured[panel].body}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
            {featured[panel].cta}
            <ChevronRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60]"
        >
          <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />

          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative h-full w-full grid lg:grid-cols-[minmax(260px,26%)_1fr] bg-background overflow-hidden lg:overflow-y-auto"
          >
            {/* Left rail */}
            <div className="bg-background px-6 sm:px-10 py-8 lg:py-10 border-r border-border h-full overflow-y-auto">
              <div className="flex items-start justify-between">
                <Link to="/" onClick={onClose} className="inline-block">
                  <img
                    src={logo}
                    alt="uConnect Technologies"
                    className="h-8 md:h-10 w-auto"
                    width={1792}
                    height={1024}
                    loading="eager"
                  />
                </Link>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 -mt-1 text-foreground hover:text-accent transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-10 divide-y divide-border border-t border-border">
                {railItems.map((item) => {
                  const isActive = item.key && panel === item.key && !isMobile;
                  if (!item.key) {
                    return (
                      <Link
                        key={item.label}
                        to={item.to!}
                        onClick={onClose}
                        className="flex items-center gap-2 py-5 text-2xl sm:text-3xl font-bold text-foreground hover:text-accent transition-colors"
                      >
                        {item.label}
                        {item.external && <ExternalLink className="h-4 w-4 text-accent" />}
                      </Link>
                    );
                  }
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setPanel(item.key as PanelKey);
                        setTab(0);
                        if (isMobile) setMobilePanelOpen(true);
                      }}
                      onMouseEnter={() => {
                        if (isMobile) return;
                        setPanel(item.key as PanelKey);
                        setTab(0);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between py-5 text-left text-2xl sm:text-3xl font-bold transition-colors",
                        isActive ? "text-accent" : "text-foreground hover:text-accent"
                      )}
                    >
                      {item.label}
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right panel — desktop inline */}
            {!isMobile && rightPanel}

            {/* Right panel — mobile slide-in from right */}
            {isMobile && (
              <AnimatePresence>
                {mobilePanelOpen && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 z-10 bg-background overflow-y-auto"
                  >
                    {rightPanel}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default MegaMenuOverlay;
