import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              YouConnect
              <span className="text-accent"> Technologies</span>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Your trusted partner for comprehensive manpower solutions. 
              Connecting talent with opportunity across all industries.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Temporary Staffing
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Permanent Recruitment
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contract Staffing
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Executive Search
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  HR Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  123 Business District<br />
                  Tech Tower, Floor 15<br />
                  Metropolitan City, State 12345
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-primary-foreground/80">+(91) 8979199267</div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-primary-foreground/80">reachus@youconnecttech.com</div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-primary-foreground/80 text-sm">
            © 2024 YouConnect Technologies. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;