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
      "uConnect Technologies is an enterprise telecom infrastructure and managed IT services company founded in 2017, with 200+ Tier-1 engineers and delivery presence across India, the USA, Europe, Middle East, Canada, Asia-Pacific, South America and beyond.",
    "mainEntity": {
      "@type": "Organization",
      "name": "uConnect Technologies",
      "foundingDate": "2017",
      "url": "https://uconnecttech.com",
      "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 200 },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "USA" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "Singapore" },
        { "@type": "Country", "name": "Thailand" },
        { "@type": "Country", "name": "Vietnam" },
        { "@type": "Country", "name": "Philippines" },
        { "@type": "Country", "name": "Russia" },
        { "@type": "Country", "name": "Nepal" },
        { "@type": "Country", "name": "Bhutan" },
        { "@type": "Country", "name": "Sri Lanka" },
        { "@type": "Place", "name": "Europe" },
        { "@type": "Place", "name": "Middle East" },
        { "@type": "Place", "name": "South America" },
      ],
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="About uConnect Technologies | Global Telecom Partner Since 2017"
        description="Founded in 2017, uConnect Technologies delivers carrier-grade network deployment and managed IT services across India, the USA, Europe, Middle East, Canada, Asia-Pacific, South America and beyond."
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
