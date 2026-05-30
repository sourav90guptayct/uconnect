import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";

// Lazy load below-the-fold sections to reduce initial JS
const About = lazy(() => import("@/components/About"));
const Services = lazy(() => import("@/components/Services"));
const UseCases = lazy(() => import("@/components/UseCases"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="min-h-[200px]" />
);

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle section scroll from URL parameter
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');
    
    if (section) {
      // Small delay to ensure the DOM is ready
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <SEO
        title="uConnect Technologies — Telecom & IT Infrastructure Partner in India"
        description="Enterprise telecom infrastructure, IT managed services, ConnectLH™ antennas, FTTH products, and skilled manpower. 200+ Tier-1 engineers across 18 circles, 10,000+ Links deployed."
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Services />
          <UseCases />
          <WhyChooseUs />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
