import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { ArrowRight, Award, Users, Sparkles, Building2, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="relative flex items-center overflow-hidden py-20 lg:py-24" style={{ background: 'var(--gradient-hero)' }}>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-6 mt-4"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-white/90">Trusted by 50+ Organizations Nationwide</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
              Telecom, IT &
              <span className="text-gradient"> Infrastructure</span>
              <br />
              Solutions at
              <span className="text-gradient"> Scale</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg mb-10 text-white/70 leading-relaxed max-w-lg"
            >
              From proprietary ConnectLH™ antenna systems & telecom products to managed IT services, 
              digital transformation and workforce solutions — uConnect Technologies is your 
              single-window partner for end-to-end enterprise technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-13 rounded-xl shadow-lg shadow-accent/25" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border border-white/20 bg-white/5 text-white hover:bg-white/10 text-base px-8 h-13 rounded-xl backdrop-blur-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Schedule a Consultation
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="glass rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/d75128dc-3c18-4149-aba1-d879dab93472.png"
                  alt="Enterprise Technology Infrastructure"
                  className="w-full h-72 object-cover"
                />
                <div className="p-8 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-accent" />
                    <span className="text-accent font-semibold text-sm uppercase tracking-wider">Enterprise Grade</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">End-to-End Infrastructure</h3>
                  <p className="text-white/60 text-sm mb-5">Trusted by India's top telecom operators & enterprises</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 glass rounded-xl px-3 py-2.5">
                      <Building2 className="h-4 w-4 text-accent" />
                      <span className="text-white/80 text-xs font-medium">Pan-India Operations</span>
                    </div>
                    <div className="flex items-center gap-2 glass rounded-xl px-3 py-2.5">
                      <Globe2 className="h-4 w-4 text-accent" />
                      <span className="text-white/80 text-xs font-medium">24/7 NOC Support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-4 shadow-lg shadow-accent/30"
              >
                <Award className="h-7 w-7" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-4"
              >
                <Users className="h-7 w-7 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 pt-8 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto">
            {[
              { value: 50, suffix: "+", label: "Enterprise Clients" },
              { value: 1000, suffix: "+", label: "Deployments" },
              { value: 15, suffix: "+", label: "Industries Served" },
              { value: 98, suffix: "%", label: "Client Retention" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
