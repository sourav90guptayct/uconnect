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
    { slug: "antennas", label: "Dish Antennas", desc: "ConnectLH™ 2×2 MIMO dual-pol dishes" },
    { slug: "poe", label: "AC & DC PoE", desc: "Power over Ethernet adapters & injectors" },
    { slug: "switches", label: "Managed PoE Switches", desc: "Carrier-grade L2+ Gigabit switches" },
    { slug: "ftth", label: "FTTH Products", desc: "Fiber-to-home connectivity solutions" },
    { slug: "fiberCables", label: "Fiber Cables", desc: "Optic fiber cable assemblies" },
    { slug: "rfCables", label: "RF Cables", desc: "RF & coaxial cables" },
    { slug: "networkCables", label: "Network Cables", desc: "CAT5, CAT6 & patch cords" },
    { slug: "racks", label: "Racks & Cabinets", desc: "Open frame, closed & wall-mount" },
    { slug: "bts", label: "BTS Installation", desc: "Site infrastructure components" },
    { slug: "fabricated", label: "Fabricated Products", desc: "Poles, trays, mounts & stands" },
  ];

  const serviceCategories = [
    { slug: "networks", label: "Networks", desc: "Connectivity infrastructure & monitoring" },
    { slug: "managed-services", label: "Managed Services", desc: "End-to-end operations & SLAs" },
    { slug: "digital-transformation", label: "Digital Transformation", desc: "Cloud, data & enterprise platforms" },
    { slug: "ip-services", label: "IP Services", desc: "ITeS & system integration" },
    { slug: "resource-management", label: "Resource Management", desc: "Technology-enabled staffing" },
    { slug: "infra-installation", label: "Infra Installation", desc: "Tower & pole erection services" },
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
            <div className="ml-4">
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl text-sm shadow-md shadow-accent/20"
                onClick={handleAuthAction}
                onMouseEnter={scheduleClose}
              >
                {user ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>
          </nav>

          <button onClick={toggleMenu} className="lg:hidden p-2 rounded-xl text-foreground hover:text-accent transition-colors">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
              {activeItems.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`${activeMeta.basePath}?${activeMeta.queryKey}=${cat.slug}`}
                  onClick={() => setOpenMenu(null)}
                  className="block rounded-xl p-4 hover:bg-muted transition-colors group"
                >
                  <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {cat.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {cat.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
