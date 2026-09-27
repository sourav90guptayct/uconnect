import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";




type PanelKey = "products" | "solutions" | "industries" | "resources" | "partners" | "support" | "company";

const productsGroups = [
  {
    title: "Wireless & RF",
    links: [
      { label: "Wireless Antennas", to: "/products?category=antennas" },
      { label: "Sector Antennas", to: "/products?category=sectorAntennas" },
      { label: "RF Connectivity", to: "/products?category=rfCables" },
      { label: "4G/5G Connectivity", to: "/products?category=routers" },
    ],
  },
  {
    title: "Networking & Power",
    links: [
      { label: "Industrial Ethernet", to: "/products?category=switches" },
      { label: "PoE & Power", to: "/products?category=poe" },
      { label: "Network Cables", to: "/products?category=networkCables" },
    ],
  },
  {
    title: "Fiber & Infrastructure",
    links: [
      { label: "Fiber Connectivity", to: "/products?category=fiberCables" },
      { label: "FTTH Products", to: "/products?category=ftth" },
      { label: "Racks & Enclosures", to: "/products?category=racks" },
      { label: "Telecom Infrastructure", to: "/products?category=bts" },
    ],
  },
];

const solutionsGroups = [
  {
    title: "Connectivity",
    links: [
      { label: "Wireless Backhaul", to: "/networks" },
      { label: "Rural Broadband", to: "/networks" },
      { label: "Smart City Connectivity", to: "/networks" },
    ],
  },
  {
    title: "Surveillance & Safety",
    links: [
      { label: "CCTV & Video Surveillance", to: "/infra-installation" },
      { label: "Public Safety Networks", to: "/infra-installation" },
    ],
  },
  {
    title: "Sector Solutions",
    links: [
      { label: "Industrial Networking", to: "/managed-services" },
      { label: "Transportation Connectivity", to: "/networks" },
    ],
  },
];

const industriesGroups = [
  {
    title: "Telecom & Connectivity",
    links: [
      { label: "Telecom", to: "/?section=use-cases" },
      { label: "WISP", to: "/?section=use-cases" },
      { label: "Enterprise", to: "/?section=use-cases" },
    ],
  },
  {
    title: "Infrastructure & Transport",
    links: [
      { label: "Transportation", to: "/?section=use-cases" },
      { label: "Ports & Logistics", to: "/?section=use-cases" },
      { label: "Utilities", to: "/?section=use-cases" },
    ],
  },
  {
    title: "Public & Heavy Industry",
    links: [
      { label: "Government & Smart Cities", to: "/?section=use-cases" },
      { label: "Industrial", to: "/?section=use-cases" },
      { label: "Oil & Gas", to: "/?section=use-cases" },
    ],
  },
];

const resourcesGroups = [
  {
    title: "Documentation",
    links: [
      { label: "Datasheets", to: "/products" },
      { label: "User Manuals", to: "/support" },
      { label: "Installation Guides", to: "/support" },
      { label: "Quick Start Guides", to: "/support" },
    ],
  },
  {
    title: "Technical Files",
    links: [
      { label: "Firmware", to: "/support" },
      { label: "MIB Files", to: "/support" },
      { label: "CAD Drawings", to: "/support" },
      { label: "Certifications", to: "/quality-hse" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Application Notes", to: "/support" },
      { label: "White Papers", to: "/business-practices" },
      { label: "Case Studies", to: "/clients" },
    ],
  },
];

const partnersGroups = [
  {
    title: "Distribution",
    links: [
      { label: "Find a Distributor", to: "/support" },
      { label: "Become a Distributor", to: "/?section=contact" },
    ],
  },
  {
    title: "Alliances",
    links: [
      { label: "System Integrators", to: "/clients" },
      { label: "OEM / Private Label Program", to: "/?section=contact" },
    ],
  },
];

const supportGroups = [
  {
    title: "Help & Service",
    links: [
      { label: "Technical Support", to: "/support" },
      { label: "Warranty & RMA", to: "/support" },
    ],
  },
  {
    title: "Product Services",
    links: [
      { label: "Product Registration", to: "/support" },
      { label: "Product Verification", to: "/support" },
      { label: "Downloads", to: "/support" },
    ],
  },
];

const companyGroups = [
  {
    title: "Who We Are",
    links: [
      { label: "About uConnect", to: "/company/about" },
      { label: "ConnectLH™", to: "/company/connectlh" },
      { label: "Global Presence", to: "/company/global-presence" },
    ],
  },
  {
    title: "How We Work",
    links: [
      { label: "Manufacturing", to: "/company/manufacturing" },
      { label: "Quality & Testing", to: "/company/quality-testing" },
      { label: "Governance", to: "/governance" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Services", to: "/company/services" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/company/contact" },
    ],
  },
];

const featured: Record<PanelKey, { eyebrow: string; title: string; body: string; to: string; cta: string }> = {
  products: {
    eyebrow: "ConnectLH™",
    title: "Field-proven telecom hardware, 10,000+ links deployed",
    body: "Antennas, routers, PoE, switches, FTTH, fiber and RF cables, racks and fabricated site infrastructure with datasheets on request.",
    to: "/products",
    cta: "Browse the catalogue",
  },
  solutions: {
    eyebrow: "Integrator",
    title: "Product and services under one accountable owner",
    body: "Managed services, network deployment, resource management and infra solutions delivered across 18 telecom circles.",
    to: "/services",
    cta: "Explore our capabilities",
  },
  industries: {
    eyebrow: "18 circles",
    title: "Connectivity for every sector we serve",
    body: "From telecom operators and WISPs to ports, utilities, government and heavy industry — engineered for real-world conditions.",
    to: "/?section=use-cases",
    cta: "See industries in action",
  },
  resources: {
    eyebrow: "Resource Library",
    title: "Every document your engineering team needs",
    body: "Datasheets, manuals, firmware, certifications and case studies — available on request from our support team.",
    to: "/support",
    cta: "Request documentation",
  },
  partners: {
    eyebrow: "Partner Network",
    title: "Grow with the ConnectLH™ ecosystem",
    body: "Distributors, system integrators and OEM partners across regions — backed by 5 regional warehouses.",
    to: "/?section=contact",
    cta: "Become a partner",
  },
  support: {
    eyebrow: "24×7 Support",
    title: "SLA-backed support from Tier-1 engineers",
    body: "Technical support, warranty and RMA handled by the same team that designs and deploys the networks.",
    to: "/support",
    cta: "Get support",
  },
  company: {
    eyebrow: "Since 2017",
    title: "Built on disciplined governance and 200+ Tier-1 engineers",
    body: "Documented decision rights, project governance and safety practice on every site — read how we run the business.",
    to: "/company/about",
    cta: "About uConnect",
  },
};

const panels: Record<
  PanelKey,
  { tabs: { id: string; label: string; groups: typeof productsGroups; cta: { label: string; to: string } }[] }
> = {
  products: {
    tabs: [
      { id: "products", label: "ConnectLH™ Products", groups: productsGroups, cta: { label: "View all products", to: "/products" } },
    ],
  },
  solutions: {
    tabs: [
      { id: "solutions", label: "Solutions", groups: solutionsGroups, cta: { label: "View all services", to: "/services" } },
    ],
  },
  industries: {
    tabs: [
      { id: "industries", label: "Industries", groups: industriesGroups, cta: { label: "Industries we serve", to: "/?section=use-cases" } },
    ],
  },
  resources: {
    tabs: [
      { id: "resources", label: "Resources", groups: resourcesGroups, cta: { label: "Visit support", to: "/support" } },
    ],
  },
  partners: {
    tabs: [
      { id: "partners", label: "Partners", groups: partnersGroups, cta: { label: "Partner with us", to: "/?section=contact" } },
    ],
  },
  support: {
    tabs: [
      { id: "support", label: "Support", groups: supportGroups, cta: { label: "Contact support", to: "/support" } },
    ],
  },
  company: {
    tabs: [
      { id: "company", label: "Company", groups: companyGroups, cta: { label: "About us", to: "/company/about" } },
    ],
  },
};

const railItems: { key: PanelKey | null; label: string; to?: string; external?: boolean }[] = [
  { key: "products", label: "Products" },
  { key: "solutions", label: "Solutions" },
  { key: "industries", label: "Industries" },
  { key: "resources", label: "Resources" },
  { key: "partners", label: "Partners" },
  { key: "support", label: "Support" },
  { key: "company", label: "Company" },
  { key: null, label: "Careers", to: "/careers", external: true },
  { key: null, label: "Sign In", to: "/auth" },
];


interface Props {
  open: boolean;
  onClose: () => void;
}

const MegaMenuOverlay = ({ open, onClose }: Props) => {
  const [panel, setPanel] = useState<PanelKey>("products");
  const [tab, setTab] = useState(0);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  // Phones use a full-screen drilldown; tablet and desktop retain the expanding rail.
  const [isCompact, setIsCompact] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const isMobile = isCompact;


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
    <div className="min-h-full bg-muted/40 px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
      {isMobile && (
        <button
          onClick={() => setMobilePanelOpen(false)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={panel}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-8 border-b border-border">
            {activeTabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setTab(i)}
                className={cn(
                  "-mb-px border-b-2 pb-3 text-lg font-bold transition-colors sm:text-xl",
                  activeTab.id === t.id
                    ? "border-accent text-accent"
                    : "border-transparent text-foreground hover:text-accent"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-8 grid gap-x-10 gap-y-9 sm:grid-cols-2 xl:grid-cols-3"
          >
            {activeTab.groups.map((g, index) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.035 }}
              >
                <div className="text-base font-bold text-foreground">{g.title}</div>
                <ul className="mt-3 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label + l.to}>
                      <Link
                        to={l.to}
                        onClick={() => handleNavClick(l.to)}
                        className="text-[15px] text-muted-foreground transition-colors hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <Link
              to={activeTab.cta.to}
              onClick={onClose}
              className="inline-flex w-fit items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
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
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                {featured[panel].cta}
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
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
            initial={{ x: "-100%" }}
            animate={{
              x: 0,
              width: isCompact
                ? "100vw"
                : mobilePanelOpen
                  ? "calc(100vw - 32px)"
                  : "440px",
            }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 flex overflow-hidden bg-background shadow-2xl sm:inset-y-4 sm:left-4 sm:rounded-sm"
          >
            {/* Left rail */}
            <div className="relative z-20 h-full w-full flex-shrink-0 overflow-y-auto border-r border-border bg-background px-6 py-8 sm:w-[424px] sm:px-10 lg:py-12">
              <div className="flex items-start justify-between gap-4">
                <Link to="/" onClick={onClose} className="text-2xl font-bold tracking-tight text-foreground inline-flex items-center gap-2">
                  uConnect<span className="text-gradient"> Technologies</span>
                  <ChevronRight className="h-6 w-6 text-accent flex-shrink-0 ml-1" />
                </Link>
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 -mt-1 text-foreground hover:text-accent transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-10 mb-6 divide-y divide-border border-t border-border">
                {railItems.map((item) => {
                  const isActive = item.key && panel === item.key && mobilePanelOpen;
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
                        setMobilePanelOpen(true);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between py-5 text-left text-2xl sm:text-3xl font-bold transition-colors",
                        isActive ? "text-accent" : "text-foreground hover:text-accent"
                      )}
                    >
                      {item.label}
                      <ChevronRight className="h-5 w-5 flex-shrink-0 ml-4" />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sub panel — the drawer expands first, then its content reveals. */}
            <AnimatePresence>
              {mobilePanelOpen && (
                <motion.div
                  initial={{ x: isCompact ? "100%" : -28, opacity: isCompact ? 1 : 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isCompact ? "100%" : -16, opacity: 0 }}
                  transition={{
                    duration: isCompact ? 0.38 : 0.32,
                    delay: isCompact ? 0 : 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "bg-background h-full overflow-y-auto",
                    isCompact
                      ? "absolute inset-0 z-30"
                      : "relative z-10 min-w-0 flex-1"
                  )}
                >
                  {rightPanel}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default MegaMenuOverlay;
