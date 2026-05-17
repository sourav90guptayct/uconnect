import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import SEO from "@/components/SEO";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="About uConnect Technologies — Telecom & IT Partner"
        description="Founded in 2017, uConnect Technologies serves 50+ enterprise clients with telecom infrastructure, IT managed services, and skilled manpower across India."
        path="/about"
      />
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
