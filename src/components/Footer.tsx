import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10">
          <div>
            <div className="text-2xl font-bold mb-4">
              uConnect<span className="text-gradient"> Technologies</span>
            </div>
            <p className="text-primary-foreground/60 mb-6 text-sm leading-relaxed">
              Your trusted partner for Telecom, IT & Infrastructure solutions. Delivering enterprise technology and products across India.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 bg-primary-foreground/5 rounded-xl flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-primary-foreground/80">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" }, { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" }, { label: "Products", href: "/products" },
                { label: "Careers", href: "/careers" }, { label: "Jobs", href: "/jobs" },
                { label: "Support", href: "/support" },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-primary-foreground/50 hover:text-accent text-sm transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-primary-foreground/80">Our Services</h3>
            <ul className="space-y-3">
              {["Managed Services", "Networks", "Infra Installation", "Resource Management", "Digital Transformation", "IP Services"].map((s, i) => (
                <li key={i}>
                  <a href="/services" className="text-primary-foreground/50 hover:text-accent text-sm transition-colors duration-200">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-primary-foreground/80">Our Products</h3>
            <ul className="space-y-3">
              {["ConnectLH™ Antennas", "FTTH Products", "Fiber Cables", "RF Cables", "Network Cables", "Racks & Cabinets", "BTS Installation"].map((s, i) => (
                <li key={i}>
                  <a href="/products" className="text-primary-foreground/50 hover:text-accent text-sm transition-colors duration-200">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-primary-foreground/80">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <div className="text-primary-foreground/50 text-sm">Plot No 1398 Govindpur<br />Distt. Saharanpur Uttar Pradesh</div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <div className="text-primary-foreground/50 text-sm">+91-8979199267</div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <div className="text-primary-foreground/50 text-sm">reachus@youconnecttech.com</div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-primary-foreground/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-primary-foreground/40 text-xs">© 2024 uConnect Technologies. All rights reserved.</div>
          <div className="flex gap-6 text-xs">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t, i) => (
              <a key={i} href="#" className="text-primary-foreground/40 hover:text-accent transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
