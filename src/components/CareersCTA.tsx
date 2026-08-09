import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CareersCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-accent text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <h2 className="display-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.95]">
              Create a better future
              <br />
              with us
            </h2>
            <p className="mt-6 sm:mt-8 text-white/80 text-base sm:text-lg max-w-xl">
              Join a global team of engineers, integrators and innovators building the networks that power tomorrow.
            </p>
            <div className="mt-8 sm:mt-10">
              <Button
                onClick={() => navigate("/careers")}
                variant="outline"
                size="xl"
                className="bg-white text-foreground border-white hover:bg-white/90 hover:text-foreground rounded-full px-8 py-6 text-base font-semibold"
              >
                Join our team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div className="relative aspect-square w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:ml-auto overflow-hidden rounded-2xl">
              <img
                src="/lovable-uploads/hero-enterprise-network.webp"
                alt="uConnect team working on enterprise network infrastructure"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareersCTA;
