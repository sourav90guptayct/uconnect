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
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              YouConnect
              <span className="text-accent"> Technologies</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="#home" 
                    className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="#about" 
                    className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}
                  >
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium leading-none text-primary">Development Services</h4>
                        <div className="grid gap-2">
                          <a href="#services" className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                            <Code className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-sm font-medium">Web Development</div>
                              <div className="text-xs text-muted-foreground">Custom web applications</div>
                            </div>
                          </a>
                          <a href="#services" className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                            <Smartphone className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-sm font-medium">Mobile Apps</div>
                              <div className="text-xs text-muted-foreground">iOS & Android development</div>
                            </div>
                          </a>
                          <a href="#services" className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                            <Database className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-sm font-medium">Backend Solutions</div>
                              <div className="text-xs text-muted-foreground">APIs & database management</div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium leading-none text-primary">Digital Solutions</h4>
                        <div className="grid gap-2">
                          <a href="#services" className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                            <Globe className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-sm font-medium">Digital Marketing</div>
                              <div className="text-xs text-muted-foreground">SEO & online presence</div>
                            </div>
                          </a>
                          <a href="#services" className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                            <Shield className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-sm font-medium">Cybersecurity</div>
                              <div className="text-xs text-muted-foreground">Security consulting</div>
                            </div>
                          </a>
                          <a href="#services" className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                            <Zap className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-sm font-medium">Cloud Solutions</div>
                              <div className="text-xs text-muted-foreground">Scalable infrastructure</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="#why-choose-us" 
                    className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}
                  >
                    Why Choose Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    href="#contact" 
                    className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-primary")}
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-2 ml-4">
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
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="lg:hidden p-2 rounded-md text-foreground hover:text-primary">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-4">
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