import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      image: "/lovable-uploads/87e1e778-3b68-41c8-bb46-6e22dae156ed.webp",
      title: "Networks",
      tagline: "Connectivity at scale",
    },
    {
      image: "/lovable-uploads/f3b2f370-c817-48b6-85e7-4f7ea79dcbcc.webp",
      title: "Managed services",
      tagline: "End-to-end operations",
    },
    {
      image: "/lovable-uploads/8a3919a0-25ca-4ddc-8b40-b666e6f34784.webp",
      title: "Digital transformation",
      tagline: "Cloud, data & platforms",
    },
    {
      image: "/lovable-uploads/3452b9b3-2558-42b0-a053-f0efdc7efb72.webp",
      title: "IP services",
      tagline: "ITeS & system integration",
    },
    {
      image: "/lovable-uploads/4cf29a0e-c8b2-46f9-a586-5e1c9216bfe6.webp",
      title: "Resource management",
      tagline: "Technology-enabled staffing",
    },
    {
      image: "/lovable-uploads/32edb691-2f39-4492-8903-2eef4fa3641a.webp",
      title: "Infra installation",
      tagline: "Tower & pole erection",
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-12 lg:mb-16"
        >
          <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
            What we do
          </div>
          <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
            Solutions built for the
            <br />
            <span className="text-muted-foreground">enterprise edge.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
            >
              <Link
                to="/services"
                className="group relative block rounded-3xl overflow-hidden bg-muted aspect-[4/5] sm:aspect-[5/6]"
              >
              <img
                loading="lazy"
                decoding="async"
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />

              <div className="absolute inset-0 p-5 lg:p-7 flex flex-col justify-end">
                <div className="text-background/70 text-xs lg:text-sm uppercase tracking-wider mb-1.5">
                  {service.tagline}
                </div>
                <div className="flex items-end justify-between gap-3">
                  <h3 className="display-headline text-background text-2xl lg:text-4xl">
                    {service.title}
                  </h3>
                  <div className="shrink-0 h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-accent flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5 lg:h-6 lg:w-6 text-accent-foreground" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
