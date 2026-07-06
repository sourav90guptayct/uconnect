import { Separator } from "@/components/ui/separator";
import { Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Products", to: "/products" },
    { label: "Clients", to: "/clients" },
    { label: "Careers", to: "/careers" },
    { label: "Jobs", to: "/jobs" },
    { label: "Support", to: "/support" },
  ];

  const services = [
    { label: "Managed Services", to: "/managed-services" },
    { label: "Networks", to: "/networks" },
    { label: "Infra Installation", to: "/infra-installation" },
    { label: "Resource Management", to: "/resource-management" },
  ];

  const products = [
    { label: "ConnectLH™ Antennas", to: "/products?category=antennas" },
    { label: "Sector Antennas", to: "/products?category=sectorAntennas" },
    { label: "FTTH Products", to: "/products?category=ftth" },
    { label: "Optic Fiber Cables", to: "/products?category=fiberCables" },
    { label: "RF Cables", to: "/products?category=rfCables" },
    { label: "Network & Data Cables", to: "/products?category=networkCables" },
    { label: "Specialized Cables", to: "/products?category=specializedCables" },
    { label: "AC & DC PoE", to: "/products?category=poe" },
    { label: "Racks & Cabinets", to: "/products?category=racks" },
    { label: "BTS Products", to: "/products?category=bts" },
    { label: "Industrial Routers", to: "/products?category=routers" },
    { label: "Industrial Switches", to: "/products?category=switches" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              uConnect<span className="text-gradient"> Technologies</span>
            </div>
            <p className="text-primary-foreground/60 mb-6 text-sm leading-relaxed">
              Your trusted partner for Telecom, IT & Infrastructure solutions. Delivering enterprise technology and products across India.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/uconnect-technologies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="uConnect Technologies on LinkedIn"
                className="h-10 w-10 bg-primary-foreground/5 rounded-xl flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all duration-300"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:reachus@youconnecttech.com"
                aria-label="Email uConnect Technologies"
                className="h-10 w-10 bg-primary-foreground/5 rounded-xl flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all duration-300"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-primary-foreground/80">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-primary-foreground/50 hover:text-accent text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-primary-foreground/80">Our Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="text-primary-foreground/50 hover:text-accent text-sm transition-colors duration-200">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-primary-foreground/80">Our Products</h3>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.label}>
                  <Link to={p.to} className="text-primary-foreground/50 hover:text-accent text-sm transition-colors duration-200">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-primary-foreground/80">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="mailto:reachus@youconnecttech.com" className="text-primary-foreground/50 hover:text-accent text-sm transition-colors break-all">
                  reachus@youconnecttech.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <a href="mailto:support@youconnecttech.com" className="text-primary-foreground/50 hover:text-accent text-sm transition-colors break-all">
                  support@youconnecttech.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-primary-foreground/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-primary-foreground/40 text-xs">© {year} uConnect Technologies. All rights reserved.</div>
          <div className="flex gap-6 text-xs">
            <Link to="/support" className="text-primary-foreground/40 hover:text-accent transition-colors">Support</Link>
            <a href="mailto:reachus@youconnecttech.com" className="text-primary-foreground/40 hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
