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
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What does uConnect Technologies do?",
              acceptedAnswer: { "@type": "Answer", text: "uConnect Technologies delivers telecom infrastructure, IT managed services, ConnectLH™ antennas, FTTH products, RF and fiber cables, PoE solutions, and skilled manpower across India." },
            },
            {
              "@type": "Question",
              name: "Where does uConnect Technologies operate?",
              acceptedAnswer: { "@type": "Answer", text: "We operate pan-India across 18 telecom circles, with 200+ Tier-1 engineers, 5 regional warehouses, and 10,000+ ConnectLH™ Links deployed in the field." },
            },
            {
              "@type": "Question",
              name: "What is ConnectLH™?",
              acceptedAnswer: { "@type": "Answer", text: "ConnectLH™ is uConnect's flagship product line of carrier-grade dish and sector antennas, PoE injectors, and outdoor radio accessories built for fixed wireless access, ISP backhaul, and rural broadband." },
            },
            {
              "@type": "Question",
              name: "Who are uConnect's typical customers?",
              acceptedAnswer: { "@type": "Answer", text: "Telecom operators, internet service providers, system integrators, government and PSU networks, and large enterprises that need carrier-grade infrastructure and 24×7 managed operations." },
            },
            {
              "@type": "Question",
              name: "How can I request a quote or datasheet?",
              acceptedAnswer: { "@type": "Answer", text: "Email reachus@youconnecttech.com or use the contact form on this site. Product datasheets are available for download from the Products page." },
            },
          ],
        }}
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
