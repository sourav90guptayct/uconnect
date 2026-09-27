import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import rutm50 from "@/assets/teltonika-rutm50.png.asset.json";
import trb501 from "@/assets/teltonika-trb501.png.asset.json";
import swm280 from "@/assets/teltonika-swm280.png.asset.json";
import trm500 from "@/assets/teltonika-trm500.png.asset.json";
import tap400 from "@/assets/teltonika-tap400.png.asset.json";
import otd500 from "@/assets/teltonika-otd500.png.asset.json";

const featured = [
  { name: "RUTM50", type: "Industrial 5G router", image: rutm50.url },
  { name: "TRB501", type: "5G IoT gateway", image: trb501.url },
  { name: "SWM280", type: "Managed Ethernet switch", image: swm280.url },
  { name: "TRM500", type: "5G cellular modem", image: trm500.url },
  { name: "TAP400", type: "Wireless access point", image: tap400.url },
  { name: "OTD500", type: "Outdoor 5G router", image: otd500.url },
];

const ProductShowcase = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="teltonika-showcase-title" className="overflow-hidden border-y border-border bg-background py-14 lg:py-20">
      <div className="container mx-auto px-4 mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Distributed by uConnect Technologies</p>
          <h2 id="teltonika-showcase-title" className="display-headline text-foreground text-3xl sm:text-4xl lg:text-5xl">Teltonika Networks</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">Industrial IoT routers, gateways and connected networking equipment for demanding environments.</p>
        </div>
        <Button asChild variant="ctaOutline" className="shrink-0 self-start sm:self-auto">
          <Link to="/teltonika-networks">View all products <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="overflow-hidden" aria-label="Featured Teltonika Networks products">
        <motion.div
          className="flex w-max"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={reduceMotion ? undefined : { duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-4 pr-4 lg:gap-5 lg:pr-5" aria-hidden={copy === 1}>
              {featured.map((product) => (
                <Link key={product.name} to={`/teltonika-networks#${product.name.toLowerCase()}`} tabIndex={copy === 1 ? -1 : undefined} className="group block w-56 sm:w-64 lg:w-72 shrink-0 border border-border bg-card rounded-md overflow-hidden hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <img src={product.image} alt={`${product.name} — ${product.type}`} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4 flex items-start justify-between gap-2">
                    <div><h3 className="font-bold text-foreground text-lg">{product.name}</h3><p className="text-sm text-muted-foreground">{product.type}</p></div>
                    <ArrowUpRight className="h-4 w-4 text-accent shrink-0 mt-1" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
