import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type MenuKey = "products" | "services";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const closeTimer = useRef<number | null>(null);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminCheck();
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthAction = () => {
    if (user) signOut();
    else navigate('/auth');
  };

  const productCategories = [
    { slug: "antennas", label: "Dish Antennas", desc: "ConnectLH™ 2×2 MIMO dual-pol dishes", image: "/products/category-antennas.png" },
    { slug: "sectorAntennas", label: "Sector Antennas", desc: "16/19/21 dBi dual-pol sector antennas", image: "/products/category-sectorAntennas.jpg" },
    { slug: "routers", label: "4G/5G Outdoor Routers", desc: "Industrial cellular routers — CLH500, CLH951, CLHM31", image: "/products/category-routers.png" },
    { slug: "poe", label: "AC & DC PoE", desc: "Power over Ethernet adapters & injectors", image: "/products/category-poe.png" },
    { slug: "switches", label: "Switches", desc: "Managed & unmanaged industrial Ethernet", image: "/products/category-switches.png" },
    { slug: "ftth", label: "FTTH Products", desc: "Fiber-to-home connectivity solutions", image: "/products/category-ftth.png" },
    { slug: "fiberCables", label: "Fiber Cables", desc: "Optic fiber cable assemblies", image: "/products/category-fiberCables.png" },
    { slug: "rfCables", label: "RF Cables", desc: "RF & coaxial cables", image: "/products/category-rfCables.png" },
    { slug: "networkCables", label: "Network Cables", desc: "CAT5, CAT6 & patch cords", image: "/products/category-networkCables.jpg" },
    { slug: "racks", label: "Racks & Cabinets", desc: "Wall mount, outdoor floor & data centre", image: "/products/category-racks.webp" },
    { slug: "bts", label: "BTS Installation", desc: "Site infrastructure components", image: "/products/category-bts.jpg" },
    { slug: "fabricated", label: "Fabricated Products", desc: "Poles, trays, mounts & stands", image: "/products/category-fabricated.webp" },
  ];

  const serviceCategories = [
    { slug: "networks", label: "Networks", desc: "Connectivity at scale", href: "/networks", image: "/services/networks.jpg" },
    { slug: "managed-services", label: "Managed Services", desc: "End-to-end operations & SLAs", href: "/managed-services", image: "/services/managed-services.jpg" },
    { slug: "resource-management", label: "Resource Management", desc: "Technology-enabled staffing", href: "/resource-management", image: "/services/resource-management.jpg" },
    { slug: "infra-installation", label: "Infra Installation", desc: "Tower & pole erection services", href: "/infra-installation", image: "/services/infra-installation.jpg" },
  ];

  const publicLinks: Array<{ to: string; label: string; menu?: MenuKey }> = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services", menu: "services" },
    { to: "/products", label: "Products", menu: "products" },
    { to: "/careers", label: "Careers" },
    { to: "/clients", label: "Clients" },
    { to: "/?section=contact", label: "Contact" },
  ];

  const authLinks = [
    { to: "/profile", label: "My Profile" },
    ...(!isAdmin ? [{ to: "/my-applications", label: "My Applications" }] : []),
    ...(isAdmin ? [{ to: "/employer-dashboard", label: "Employer Dashboard" }] : []),
    { to: "/careers", label: "All Jobs" },
    { to: "/support", label: "Support" },
  ];

  const links = user ? authLinks : publicLinks;

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 150);
  };
  const openOn = (key: MenuKey) => {
    cancelClose();
    setOpenMenu(key);
  };

  const activeItems =
    openMenu === "products" ? productCategories :
    openMenu === "services" ? serviceCategories : [];
  const activeMeta =
    openMenu === "products"
      ? { label: "Our products", basePath: "/products", queryKey: "category" as const }
      : openMenu === "services"
      ? { label: "Our services", basePath: "/services", queryKey: "service" as const }
      : null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm" : "bg-background border-b border-border"
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            uConnect<span className="text-gradient"> Technologies</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {(links as typeof publicLinks).map((link) => {
              const hasMenu = "menu" in link && !!link.menu;
              if (hasMenu) {
                const key = link.menu as MenuKey;
                const isOpen = openMenu === key;
                return (
                  <div
                    key={link.to}
                    className="relative"
                    onMouseEnter={() => openOn(key)}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      to={link.to}
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isOpen ? "text-accent" : "text-foreground/70 hover:text-foreground"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                  onMouseEnter={scheduleClose}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="ml-4 flex items-center gap-2">
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl text-sm shadow-md shadow-accent/20"
                onClick={handleAuthAction}
                onMouseEnter={scheduleClose}
              >
                {user ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>
          </nav>

          <button onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} aria-controls="mobile-nav" className="lg:hidden p-2 rounded-xl text-foreground hover:text-accent transition-colors">
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              {(links as typeof publicLinks).map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="text-foreground/70 hover:text-accent transition-colors text-sm py-1">
                  {link.label}
                </Link>
              ))}
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-fit rounded-xl text-sm" onClick={() => { handleAuthAction(); setIsMenuOpen(false); }}>
                {user ? 'Sign Out' : 'Sign In'}
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Full-width mega menu (inseego-style) */}
      {openMenu && activeMeta && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full bg-background border-b border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => openOn(openMenu)}
          onMouseLeave={scheduleClose}
        >
          <div className="container mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-border">
              <div className="text-xs font-semibold text-accent uppercase tracking-widest">
                {activeMeta.label}
              </div>
              <Link
                to={activeMeta.basePath}
                onClick={() => setOpenMenu(null)}
                className="text-xs font-semibold text-foreground/70 hover:text-accent"
              >
                View all →
              </Link>
            </div>
            <div className={cn(
              "grid gap-x-4 gap-y-6",
              openMenu === "services"
                ? "grid-cols-2 md:grid-cols-4"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
            )}>
              {activeItems.map((cat) => {
                const to = "href" in cat && cat.href ? cat.href : `${activeMeta.basePath}?${activeMeta.queryKey}=${cat.slug}`;
                const image = "image" in cat ? (cat as any).image : null;
                const isService = openMenu === "services";
                return (
                  <Link
                    key={cat.slug}
                    to={to}
                    onClick={() => setOpenMenu(null)}
                    className="group flex flex-col items-center text-center rounded-xl p-3 hover:bg-muted transition-colors"
                  >
                    {image ? (
                      <div className={cn(
                        "mb-3 flex items-center justify-center rounded-lg overflow-hidden transition-colors",
                        isService
                          ? "h-32 w-full bg-muted/40"
                          : "h-20 w-20 bg-muted/40 group-hover:bg-background"
                      )}>
                        <img loading="lazy" decoding="async"
                          src={image}
                          alt={cat.label}


                          className={cn(
                            "h-full w-full group-hover:scale-105 transition-transform duration-300",
                            isService ? "object-cover" : "max-h-full max-w-full object-contain"
                          )}
                        />
                      </div>
                    ) : (
                      <div className="h-20 w-20 mb-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent font-bold text-xl">
                        {cat.label.charAt(0)}
                      </div>
                    )}
                    <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
                      {cat.label}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1 leading-snug line-clamp-2">
                      {cat.desc}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
