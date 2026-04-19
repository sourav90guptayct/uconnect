import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 pb-12 lg:pt-28 lg:pb-16"
      style={{ background: "var(--gradient-hero-soft)" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Editorial headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-6xl"
        >
          <h1 className="display-headline text-foreground text-[2.75rem] sm:text-6xl lg:text-8xl xl:text-[8.5rem]">
            Deploy. Connect.
            <br />
            <span className="text-accent">Empower.</span>{" "}
            <span className="text-foreground/90">The enterprise edge.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            From proprietary ConnectLH™ antenna systems and telecom products to
            managed IT services, digital transformation and workforce solutions
            — uConnect Technologies is your single-window partner for end-to-end
            enterprise technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-7 h-12 text-base"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-7 h-12 text-base border-foreground/20 hover:bg-foreground/5"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact us
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero image with sticker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mt-12 lg:mt-16"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-card">
            <img
              src="/lovable-uploads/d75128dc-3c18-4149-aba1-d879dab93472.webp"
              alt="Enterprise telecom infrastructure deployed by uConnect Technologies"
              fetchPriority="high"
              decoding="async"
              className="w-full h-[280px] sm:h-[400px] lg:h-[560px] object-cover"
            />
          </div>

          {/* Sticker badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6, type: "spring" }}
            className="hidden md:flex absolute top-4 right-4 lg:top-8 lg:right-8 w-32 h-32 lg:w-44 lg:h-44 bg-accent rounded-full items-center justify-center shadow-xl shadow-accent/30 animate-wobble"
          >
            <div className="text-center -rotate-6">
              <div className="text-accent-foreground font-bold text-xl lg:text-3xl leading-tight tracking-tight">
                ConnectLH™
              </div>
              <div className="text-accent-foreground/90 font-semibold text-xs lg:text-sm uppercase tracking-wider mt-1">
                New Series
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 lg:mt-16 pt-10 border-t border-foreground/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 50, suffix: "+", label: "Enterprise clients" },
              { value: 1000, suffix: "+", label: "Deployments" },
              { value: 15, suffix: "+", label: "Industries served" },
              { value: 98, suffix: "%", label: "Client retention" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="display-headline text-4xl lg:text-6xl text-foreground">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs lg:text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
