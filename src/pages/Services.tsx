import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Network, Users, Building, Briefcase, Search, Settings } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const slug = searchParams.get("service");
    if (slug) {
      // wait for paint
      setTimeout(() => {
        const el = document.getElementById(`service-${slug}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  const services = [
    {
      slug: "networks",
      icon: Network,
      image: "/lovable-uploads/4404a0c7-dfe8-4d6c-a763-8ddc0c228f40.webp",
      title: "Networks",
      tagline: "Connectivity at scale",
      description: "End-to-end networking — infrastructure, connectivity, monitoring and 24/7 support.",
      features: ["Network infrastructure", "Connectivity solutions", "Network monitoring", "Maintenance & support"],
    },
    {
      slug: "managed-services",
      icon: Users,
      image: "/lovable-uploads/115872b6-8d21-43a0-b6ed-a612375446ba.webp",
      title: "Managed services",
      tagline: "End-to-end operations",
      description: "Comprehensive process management so you focus on the work that matters.",
      features: ["End-to-end process management", "24/7 operational support", "Performance monitoring", "Service level agreements"],
    },
    {
      slug: "digital-transformation",
      icon: Building,
      image: "/lovable-uploads/3a00d3ac-8dd2-40fb-b5bb-bf516bd60ff2.webp",
      title: "Digital transformation",
      tagline: "Cloud, data & platforms",
      description: "Modernize IT, migrate to the cloud and deploy secure enterprise platforms.",
      features: ["Cloud migration", "Digital platforms", "Data management", "Enterprise IT solutions"],
    },
    {
      slug: "ip-services",
      icon: Briefcase,
      image: "/lovable-uploads/2d02a26b-70d0-4eb8-98e3-04f141cb0bff.webp",
      title: "IP services",
      tagline: "ITeS & system integration",
      description: "Cutting-edge IP and ITeS solutions that empower business growth.",
      features: ["IP infrastructure", "ITeS solutions", "Technology consulting", "System integration"],
    },
    {
      slug: "resource-management",
      icon: Search,
      image: "/lovable-uploads/55b3aa6c-9ace-4e67-9a9d-05f41feefab1.png",
      title: "Resource management",
      tagline: "Technology-enabled staffing",
      description: "Skilled technology professionals and efficient resource allocation.",
      features: ["Technology staffing", "Resource allocation", "Skill management", "Workforce optimization"],
    },
    {
      slug: "infra-installation",
      icon: Settings,
      image: "/lovable-uploads/36d182be-8602-4bb3-9554-331999f9b0ed.webp",
      title: "Infra installation",
      tagline: "Tower & pole erection",
      description: "Self-supporting structures, guy mast towers and complete erection services.",
      features: ["Self support installations", "Guy mast tower setup", "Pole erection services", "Tower erection services"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Editorial Hero */}
      <section
        className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
        style={{ background: "var(--gradient-hero-soft)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl"
          >
            <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-5">
              Our services
            </div>
            <h1 className="display-headline text-foreground text-5xl sm:text-6xl lg:text-8xl">
              Build. Operate.
              <br />
              <span className="text-accent">Transform.</span>{" "}
              <span className="text-foreground/80">At enterprise scale.</span>
            </h1>
            <p className="mt-8 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              From telecom infrastructure and IT services to digital transformation and branded
              product lines — uConnect Technologies delivers end-to-end solutions across Telecom,
              IT and Enterprise verticals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Tiles */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                id={`service-${service.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="scroll-mt-24 group bg-card border border-border rounded-3xl overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-background/90 backdrop-blur flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-background/80 text-xs uppercase tracking-wider mb-1">
                      {service.tagline}
                    </div>
                    <h3 className="display-headline text-background text-2xl lg:text-3xl">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6 lg:p-7">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5">
                    {service.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm text-foreground/80">
                        <div className="h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
              Ready to deploy?
              <br />
              <span className="text-muted-foreground">Let's talk.</span>
            </h2>
            <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl">
              Tell us about your project and our team will respond within one business day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/?section=contact">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-7 h-12">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/?section=contact">
                <Button size="lg" variant="outline" className="rounded-full px-7 h-12 border-foreground/20 hover:bg-foreground/5">
                  Request a quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
