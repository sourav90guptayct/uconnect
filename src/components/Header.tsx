import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import MegaMenuOverlay from "@/components/MegaMenuOverlay";


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminCheck();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthAction = () => {
    if (user) signOut();
    else navigate("/auth");
  };

  const authLinks = isAdmin
    ? [{ to: "/admin", label: "Admin Console" }]
    : [
        { to: "/profile", label: "My Profile" },
        { to: "/my-applications", label: "My Applications" },
        { to: "/careers", label: "All Jobs" },
        { to: "/support", label: "Support" },
      ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-background border-b border-border"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              uConnect<span className="text-gradient"> Technologies</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              {user && (
                <nav className="hidden lg:flex items-center gap-1">
                  {authLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              )}


              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full text-sm shadow-md shadow-accent/20"
                onClick={handleAuthAction}
              >
                {user ? "Sign Out" : "Sign In"}
              </Button>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border text-sm font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MegaMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
export default Header;
