import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, ChevronDown, Code, Database, Smartphone, Globe, Shield, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useNavigate, Link } from "react-router-dom";
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
  const { isAdmin } = useAdminCheck();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              uConnect
              <span className="text-accent"> Technologies</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {!user ? (
                  // Show marketing navigation for non-logged in users
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to="/" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                          Home
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to="/?section=about" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                          About Us
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/services" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                        Services
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/careers" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                        Careers
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to="/?section=contact" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                          Contact
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </>
                ) : (
                  // Show profile-focused navigation for logged-in users
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to="/profile" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                          My Profile
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/jobs" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                        Job Search
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/my-applications" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                        My Applications
                      </Link>
                    </NavigationMenuItem>

                    {isAdmin && (
                      <NavigationMenuItem>
                        <Link to="/employer-dashboard" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                          Employer Dashboard
                        </Link>
                      </NavigationMenuItem>
                    )}

                    <NavigationMenuItem>
                      <Link to="/careers" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                        All Jobs
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link to="/support" className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}>
                          Support
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-2 ml-4">
              {!user && (
                <Button 
                  variant="outline"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              )}
              <Button 
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleAuthAction}
              >
                {user ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="lg:hidden p-2 rounded-md text-foreground hover:text-primary">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              {!user ? (
                // Show marketing navigation for non-logged in users
                <>
                  <Link to="/" className="text-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link to="/?section=about" className="text-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                  <Link to="/services" className="text-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                  <Link to="/careers" className="text-foreground hover:text-primary transition-colors">
                    Careers
                  </Link>
                  <Link to="/?section=contact" className="text-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </>
              ) : (
                // Show profile-focused navigation for logged-in users
                <>
                  <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
                    My Profile
                  </Link>
                  <Link to="/jobs" className="text-foreground hover:text-primary transition-colors">
                    Job Search
                  </Link>
                  <Link to="/my-applications" className="text-foreground hover:text-primary transition-colors">
                    My Applications
                  </Link>
                  {isAdmin && (
                    <Link to="/employer-dashboard" className="text-foreground hover:text-primary transition-colors">
                      Employer Dashboard
                    </Link>
                  )}
                  <Link to="/careers" className="text-foreground hover:text-primary transition-colors">
                    All Jobs
                  </Link>
                  <Link to="/support" className="text-foreground hover:text-primary transition-colors">
                    Support
                  </Link>
                </>
              )}
              {!user && (
                <Button 
                  variant="outline"
                  className="w-fit"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              )}
              <Button 
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-fit"
                onClick={handleAuthAction}
              >
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