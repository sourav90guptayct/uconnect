import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import SEO from "@/components/SEO";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="About uConnect Technologies — Telecom & IT Partner"
        description="Founded in 2017, uConnect Technologies serves top carrier customers with 200+ Tier-1 engineers across 18 circles, 10,000+ UBR links installed, and 30+ ongoing projects."
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
