import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import AboutStory from "@/components/about/AboutStory";
import SEO from "@/components/SEO";

const AboutPage = () => {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://uconnecttech.com/about",
    "name": "About uConnect Technologies",
    "description":
      "uConnect Technologies is an enterprise telecom infrastructure and managed IT services company founded in 2017, with 200+ Tier-1 engineers across 18 circles in India.",
    "mainEntity": {
      "@type": "Organization",
      "name": "uConnect Technologies",
      "foundingDate": "2017",
      "url": "https://uconnecttech.com",
      "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 200 },
      "areaServed": { "@type": "Country", "name": "India" },
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="About uConnect Technologies — India's Telecom & IT Infrastructure Partner"
        description="Founded in 2017, uConnect Technologies delivers carrier-grade telecom infrastructure, ConnectLH™ products, and managed IT services. 200+ Tier-1 engineers, 18 circles, 10,000+ Links deployed, 5 regional warehouses."
        path="/about"
        image="https://uconnecttech.com/og/about.jpg"
        jsonLd={aboutJsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
      />
      <Header />
      <main>
        <About />
        <AboutStory />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
