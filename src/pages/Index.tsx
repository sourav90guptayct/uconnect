import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";

// Lazy load below-the-fold sections to reduce initial JS
const Services = lazy(() => import("@/components/Services"));
const UseCases = lazy(() => import("@/components/UseCases"));
const CareersCTA = lazy(() => import("@/components/CareersCTA"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="min-h-[120px]" />
);


const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section') || location.hash.replace('#', '');

    if (!section) return;

    // Lazy sections may not be mounted yet — retry until found (max ~5s)
    let attempts = 0;
    const timer = window.setInterval(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.clearInterval(timer);
      } else if (++attempts > 50) {
        window.clearInterval(timer);
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, [location]);


  return (
    <div className="min-h-screen">
      <SEO
        title="uConnect Technologies | Global Product & Services Integrator"
        description="Product and services integrator for enterprise networks worldwide: managed services, network deployment, resources management and infra solutions, built around ConnectLH™ hardware."

        path="/"
        image="https://uconnecttech.com/og/home.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What does uConnect Technologies do?",
              acceptedAnswer: { "@type": "Answer", text: "uConnect Technologies delivers telecom infrastructure, IT managed services, ConnectLH™ antennas, FTTH products, RF and fiber cables, PoE solutions, and skilled manpower across global markets." },
            },
            {
              "@type": "Question",
              name: "Where does uConnect Technologies operate?",
              acceptedAnswer: { "@type": "Answer", text: "We operate across 18 telecom circles in India and deliver projects in the USA, Europe, Middle East, Canada, Singapore, Thailand, Vietnam, Philippines, Russia, South America, Nepal, Bhutan and Sri Lanka, with 200+ Tier-1 engineers and 10,000+ ConnectLH™ Links deployed." },
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
          <Services />
          <UseCases />
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
