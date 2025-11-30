import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
      <Header />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
