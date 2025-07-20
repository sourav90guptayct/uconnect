import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, ChevronDown, Code, Database, Smartphone, Globe, Shield, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };
  return <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-end items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+(91) 8979199267 </span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>reachus@youconnecttech.com</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-primary">
              YouConnect
              <span className="text-accent"> Technologies</span>
            </div>
            
            {/* Navigation items next to logo */}
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#about" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                About Us
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                Services
              </a>
              <a href="#careers" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                Careers
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
                Contact Us
              </a>
            </nav>
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {user && (
              <Button 
                variant="outline"
                onClick={() => navigate('/admin')}
              >
                Admin
              </Button>
            )}
            <Button 
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleAuthAction}
            >
              {user ? 'Sign Out' : 'Sign In'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="lg:hidden p-2 rounded-md text-foreground hover:text-primary">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#careers" className="text-foreground hover:text-primary transition-colors">
                Careers
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
              {user && (
                <Button 
                  variant="outline"
                  className="w-fit"
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </Button>
              )}
              <Button 
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-fit"
                onClick={handleAuthAction}
              >
                {user ? 'Sign Out' : 'Sign In'}
              </Button>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;