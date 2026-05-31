import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import networksImg from "@/assets/networks-highway.jpg";
import managedImg from "@/assets/managed-hero.jpg";
import resourceImg from "@/assets/resource-hero.jpg";
import infraImg from "@/assets/infra-hero.jpg";

const Services = () => {
  const services = [
    {
      image: networksImg,
      title: "Networks",
      tagline: "Connectivity at scale",
      href: "/networks",
    },
    {
      image: managedImg,
      title: "Managed services",
      tagline: "End-to-end operations",
      href: "/managed-services",
    },
    {
      image: resourceImg,
      title: "Resource management",
      tagline: "Technology-enabled staffing",
      href: "/resource-management",
    },
    {
      image: infraImg,
      title: "Infra installation",
      tagline: "Tower & pole erection",
      href: "/infra-installation",
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
                to={service.href}
                className="group relative block rounded-3xl overflow-hidden bg-muted aspect-[4/5] sm:aspect-[5/6]"
              >
              <img
                loading="lazy"
                decoding="async"
                src={service.image}
                alt={`${service.title} — uConnect Technologies service`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />

              <div className="absolute top-4 right-4 lg:top-5 lg:right-5 h-9 w-9 lg:h-12 lg:w-12 rounded-full bg-accent flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-lg">
                <ArrowUpRight className="h-4 w-4 lg:h-6 lg:w-6 text-accent-foreground" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-7">
                <div className="text-background/70 text-[10px] lg:text-sm uppercase tracking-wider mb-1.5">
                  {service.tagline}
                </div>
                <h3 className="display-headline text-background text-xl sm:text-2xl lg:text-4xl leading-tight">
                  {service.title}
                </h3>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
