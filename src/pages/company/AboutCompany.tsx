import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import deploymentImage from "@/assets/networks-deployment.jpg";

const productFamilies = [
  { name: "Antennas & RF", detail: "Wireless access, backhaul and RF connections.", image: "/products/dish-antenna-32dbi.jpg", to: "/products?category=antennas", alt: "ConnectLH dish antenna" },
  { name: "Industrial Ethernet", detail: "Switching and routing for connected sites.", image: "/products/clhs-2710gh-switch.webp", to: "/products?category=switches", alt: "Industrial Ethernet switch" },
  { name: "PoE & power", detail: "Power-over-Ethernet equipment for network installations.", image: "/products/dcclh-35-56.jpg", to: "/products?category=poe", alt: "DC PoE device" },
  { name: "Fiber infrastructure", detail: "Cables, splitters and termination hardware.", image: "/products/fiber-patch-cord-1.webp", to: "/products?category=fiberCables", alt: "Fiber optic patch cords" },
];

const services = [
  { title: "Network deployment", description: "Design, installation and integration for telecom and enterprise networks.", to: "/networks" },
  { title: "Managed services", description: "Ongoing network operations and field support after commissioning.", to: "/managed-services" },
  { title: "Resource management", description: "Skilled engineers and technical teams for delivery and operations.", to: "/resource-management" },
  { title: "Infrastructure solutions", description: "Site infrastructure installation and integration for connected environments.", to: "/infra-installation" },
];

const AboutCompany = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="About uConnect Technologies | ConnectLH™ Products & Network Services"
      description="Meet uConnect Technologies: ConnectLH™ telecom and industrial networking products backed by network deployment, managed services, resource management and infrastructure solutions."
      path="/company/about"
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Company", path: "/company/about" }, { name: "About uConnect", path: "/company/about" }]}
    />
    <Header />
    <main>
      <section className="relative flex min-h-[540px] items-end overflow-hidden bg-foreground pb-14 pt-32 sm:min-h-[610px] lg:pb-20">
        <img src="/products/fiber-optic-hero.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="container relative mx-auto px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-background/70">
            <Link to="/">Home</Link><span>/</span><span className="text-background">About uConnect</span>
          </nav>
          <p className="mb-4 text-xs font-semibold uppercase text-accent">uConnect Technologies · Since 2017</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-background sm:text-5xl lg:text-6xl">A product company.<br />Built for real networks.</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-background/90 sm:text-lg">Through ConnectLH™, we bring telecom and industrial networking products to the field. Our engineering teams also design, deploy and support the networks they power.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="ctaAccent" size="lg"><Link to="/products">Explore products <ArrowRight aria-hidden="true" /></Link></Button>
            <Button asChild variant="ctaOutlineOnDark" size="lg"><Link to="/company/services">Explore services <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </motion.div>
      </section>

      <section className="border-b border-border bg-background py-14 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            <div><p className="mb-3 text-xs font-semibold uppercase text-accent">Who we are</p><h2 className="max-w-lg text-3xl font-bold text-foreground sm:text-4xl">Hardware at the heart of what we do.</h2></div>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>uConnect Technologies is a products-and-services company focused on connectivity. ConnectLH™ is our telecom and industrial networking portfolio: antennas, PoE, industrial Ethernet, routers, fiber and the hardware that brings networks together.</p>
              <p>Our field experience informs how we select and engineer for deployment. Alongside the portfolio, we provide the people and services to take networks from planning through day-to-day operation.</p>
              <Link to="/company/connectlh" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">Meet ConnectLH™ <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div><p className="mb-3 text-xs font-semibold uppercase text-accent">ConnectLH™ portfolio</p><h2 className="max-w-2xl text-3xl font-bold text-foreground sm:text-4xl">Products you can put to work.</h2></div>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">View full product catalogue <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productFamilies.map((product, index) => (
              <motion.article key={product.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06 }} className="overflow-hidden border border-border bg-card">
                <Link to={product.to} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-background p-5"><img src={product.image} alt={product.alt} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" /></div>
                  <div className="border-t border-border p-5"><h3 className="flex items-start justify-between gap-2 text-lg font-semibold text-foreground">{product.name}<ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /></h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.detail}</p></div>
                </Link>
              </motion.article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Also in the range: 4G/5G connectivity, racks, enclosures and telecom infrastructure.</p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div className="overflow-hidden"><img src={deploymentImage} alt="Technician inspecting a wireless network installation" loading="lazy" className="aspect-[4/3] w-full object-cover" /></div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-accent">Beyond the product</p>
            <h2 className="max-w-xl text-3xl font-bold text-foreground sm:text-4xl">We know what happens after the box is opened.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Products are only part of the network. Our teams help plan the architecture, put infrastructure in place and keep it running. That connection between equipment and execution is what defines uConnect.</p>
            <div className="mt-8 divide-y divide-border border-t border-border">
              {services.map((service) => <Link key={service.title} to={service.to} className="group flex items-start justify-between gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span><strong className="block font-semibold text-foreground group-hover:text-accent">{service.title}</strong><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{service.description}</span></span><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /></Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
        <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div><p className="mb-3 text-xs font-semibold uppercase text-accent">Our story</p><h2 className="max-w-lg text-3xl font-bold text-foreground sm:text-4xl">Field experience shapes the portfolio.</h2></div>
          <div className="space-y-5 leading-relaxed text-muted-foreground"><p>Founded in 2017, uConnect brings product selection and engineering together with hands-on network delivery. Our work across 18 telecom circles and 10,000+ deployed links informs how we approach real-world connectivity.</p><p>Today, the ConnectLH™ portfolio sits alongside network deployment, managed services, resource management and infrastructure solutions — so customers can work with one team across equipment and execution.</p></div>
        </div>
      </section>

      <section className="bg-foreground py-16 lg:py-20"><div className="container mx-auto px-6 lg:px-8"><h2 className="max-w-3xl text-3xl font-bold text-background sm:text-4xl">Building a network? Start with the right products and people.</h2><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="ctaOnDark" size="lg"><Link to="/products">Browse products <ArrowRight aria-hidden="true" /></Link></Button><Button asChild variant="ctaOutlineOnDark" size="lg"><Link to="/company/contact">Contact uConnect <ArrowRight aria-hidden="true" /></Link></Button></div></div></section>
    </main>
    <Footer />
  </div>
);

export default AboutCompany;