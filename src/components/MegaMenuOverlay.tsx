import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

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
      { label: "Clients & partners", to: "/clients" },
    ],
  },
  {
    title: "Reach us",
    links: [
      { label: "Contact", to: "/?section=contact" },
      { label: "Support", to: "/support" },
    ],
  },
];

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const activeTabs = panels[panel].tabs;
  const activeTab = activeTabs[Math.min(tab, activeTabs.length - 1)];

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
            className="relative h-full w-full grid lg:grid-cols-[minmax(280px,32%)_1fr] bg-background overflow-y-auto"
          >
            {/* Left rail */}
            <div className="bg-background px-6 sm:px-10 py-8 lg:py-10 border-r border-border">
              <div className="flex items-start justify-between">
                <Link to="/" onClick={onClose} className="text-xl font-bold text-primary">
                  uConnect<span className="text-gradient"> Technologies</span>
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
                  const isActive = item.key && panel === item.key;
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
                      }}
                      onMouseEnter={() => {
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

            {/* Right panel */}
            <div className="bg-muted/40 px-6 sm:px-10 py-8 lg:py-14">
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
                className="mt-8 grid sm:grid-cols-2 gap-x-10 gap-y-9"
              >
                {activeTab.groups.map((g) => (
                  <div key={g.title}>
                    <div className="text-base font-bold text-foreground">{g.title}</div>
                    <ul className="mt-3 space-y-2.5">
                      {g.links.map((l) => (
                        <li key={l.label + l.to}>
                          <Link
                            to={l.to}
                            onClick={onClose}
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

              <Link
                to={activeTab.cta.to}
                onClick={onClose}
                className="mt-10 inline-flex items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors"
              >
                {activeTab.cta.label}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenuOverlay;
