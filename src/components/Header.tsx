import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
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
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-accent">
                YOUCONNECT
              </span>
              <span className="text-primary text-sm block font-normal">
                WINNING TOGETHER
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About Us
            </a>
            <a href="/#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="/#why-choose-us" className="text-foreground hover:text-primary transition-colors">
              Why Choose Us
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
            {user && (
              <Button 
                variant="outline"
                onClick={() => navigate('/admin')}
                className="border-primary text-primary hover:bg-primary/10"
              >
                Admin
              </Button>
            )}
            <Button 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
              onClick={handleAuthAction}
            >
              {user ? 'Sign Out' : 'Sign In'}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="lg:hidden p-2 rounded-md text-foreground hover:text-primary">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="lg:hidden pb-4 border-t border-border mt-4">
            <nav className="flex flex-col space-y-4 bg-card border rounded-lg p-4 m-2">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="/#services" className="text-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="/#why-choose-us" className="text-foreground hover:text-primary transition-colors">
                Why Choose Us
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
              {user && (
                <Button 
                  variant="outline"
                  className="w-fit border-primary text-primary hover:bg-primary/10"
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </Button>
              )}
              <Button 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-fit font-semibold"
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