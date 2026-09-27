import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const featured = [
  { name: "29CLH4959", type: "29 dBi dish antenna", image: "/products/dish-antenna-29dbi.jpg", category: "antennas" },
  { name: "19 dBi Sector", type: "Sector antenna", image: "/products/sector-antenna-19dbi.jpg", category: "sectorAntennas" },
  { name: "ACCLH-566-100", type: "56V AC PoE injector", image: "/products/acclh-566-100.jpg", category: "poe" },
  { name: "CLH202", type: "Managed Gigabit PoE+ switch", image: "/products/clh202-switch.jpg", category: "switches" },
  { name: "CLH500", type: "Outdoor 5G/4G router", image: "/products/clh500-router.jpg", category: "routers" },
  { name: "ConnectLH™ Racks", type: "Outdoor network cabinets", image: "/products/outdoor-floor-rack.jpg", category: "racks" },
];

const ConnectLHShowcase = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="connectlh-showcase-title" className="overflow-hidden border-b border-border bg-background py-14 lg:py-20">
      <div className="container mx-auto px-4 mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Putting Imagination to work · Designed by uConnect</p>
          <h2 id="connectlh-showcase-title" className="display-headline text-foreground text-3xl sm:text-4xl lg:text-5xl">ConnectLH™ Products</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">Our own antennas, PoE, industrial switches and outdoor connectivity products, engineered for real-world networks.</p>
        </div>
        <Button asChild variant="ctaOutline" className="shrink-0 self-start sm:self-auto">
          <Link to="/products">Explore ConnectLH™ products <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="overflow-hidden" aria-label="Featured ConnectLH products">
        <motion.div
          className="flex w-max"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={reduceMotion ? undefined : { duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-4 pr-4 lg:gap-5 lg:pr-5" aria-hidden={copy === 1}>
              {featured.map((product) => (
                <Link
                  key={product.name}
                  to={`/products?category=${product.category}`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="group block w-56 sm:w-64 lg:w-72 shrink-0 border border-border bg-card rounded-md overflow-hidden hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
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

export default ConnectLHShowcase;
