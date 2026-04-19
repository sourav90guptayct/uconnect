import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useNavigate, Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services", hasMenu: "services" as const },
    { to: "/products", label: "Products", hasMenu: "products" as const },
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

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm" : "bg-background border-b border-border"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            uConnect<span className="text-gradient"> Technologies</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((link) => (
                  <NavigationMenuItem key={link.to}>
                    {('hasMenu' in link && link.hasMenu) ? (() => {
                      const isProducts = link.hasMenu === "products";
                      const items = isProducts ? productCategories : serviceCategories;
                      const label = isProducts ? "Our products" : "Our services";
                      const basePath = isProducts ? "/products" : "/services";
                      const queryKey = isProducts ? "category" : "service";
                      return (
                        <>
                          <NavigationMenuTrigger className="text-foreground/70 hover:text-foreground text-sm bg-transparent">
                            {link.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-[640px] p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="text-xs font-semibold text-accent uppercase tracking-widest">
                                  {label}
                                </div>
                                <Link to={basePath} className="text-xs font-semibold text-foreground/70 hover:text-accent">
                                  View all →
                                </Link>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                {items.map((cat) => (
                                  <NavigationMenuLink asChild key={cat.slug}>
                                    <Link
                                      to={`${basePath}?${queryKey}=${cat.slug}`}
                                      className="block rounded-xl p-3 hover:bg-muted transition-colors group"
                                    >
                                      <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                                        {cat.label}
                                      </div>
                                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {cat.desc}
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      );
                    })() : (
                      <NavigationMenuLink asChild>
                        <Link to={link.to} className={cn(navigationMenuTriggerStyle(), "text-foreground/70 hover:text-foreground text-sm")}>
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}

              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center space-x-2 ml-4">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl text-sm shadow-md shadow-accent/20" onClick={handleAuthAction}>
                {user ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>
          </div>

          <button onClick={toggleMenu} className="lg:hidden p-2 rounded-xl text-foreground hover:text-accent transition-colors">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              {links.map((link) => (
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
    </header>
  );
};
export default Header;
