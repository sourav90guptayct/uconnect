import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import HamaraAcademy from "@/components/HamaraAcademy";
import HamaraJobs from "@/components/HamaraJobs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <HamaraAcademy />
      <HamaraJobs />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
