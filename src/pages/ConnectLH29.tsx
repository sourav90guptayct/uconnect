import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { connectlh29 as product, connectlh29Enquiry } from "@/data/connectlh29";

const specificationGroups = [
  { title: "Electrical specifications", rows: product.electrical },
  { title: "Mechanical specifications", rows: product.mechanical },
  { title: "Environmental specifications", rows: product.environmental },
];

export default function ConnectLH29() {
  const reducedMotion = useReducedMotion();
  return (
    <div className="min-h-screen bg-background">
      <SEO title={product.title} description={product.metaDescription} path={product.path}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: product.model, path: product.path }]}
        jsonLd={{ "@context": "https://schema.org", "@type": "Product", name: product.name,
          model: product.model, brand: { "@type": "Brand", name: "ConnectLH" },
          description: product.description, image: product.image, url: `https://uconnecttech.com${product.path}`,
          additionalProperty: product.electrical.map(([name, value]) => ({ "@type": "PropertyValue", name, value })) }} />
      <Header />
      <main className="pt-24 lg:pt-28">
        <section className="container mx-auto px-4 pb-12 lg:pb-16">
          <Link to="/products?category=antennas" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-8"><ArrowLeft className="h-4 w-4" /> Dish antennas</Link>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="product-media-gray aspect-square max-h-[520px] w-full flex items-center justify-center p-8 sm:p-12 rounded-md">
              <img src={product.image} alt="ConnectLH 29CLH4959 dual-polarisation dish antenna" className="w-full h-full object-contain" fetchPriority="high" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">ConnectLH™ · Dish antennas</p>
              <h1 className="display-headline text-4xl sm:text-5xl text-foreground">29CLH4959<span className="block mt-3 text-2xl sm:text-3xl">29 dBi 2×2 MIMO dish antenna</span></h1>
              <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>
              <dl className="grid grid-cols-3 gap-3 border-y border-border py-5 my-7">
                {[['Frequency', '4.9–5.9 GHz'], ['Gain', '29 ±1 dBi'], ['Protection', 'IP65']].map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground mb-2">{label}</dt><dd className="font-semibold text-sm sm:text-base text-foreground">{value}</dd></div>)}
              </dl>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="cta" size="lg"><a href={connectlh29Enquiry}>Enquire with sales <Mail className="ml-2 h-4 w-4" /></a></Button>
                <Button asChild variant="outline" size="lg"><a href={product.datasheet} target="_blank" rel="noopener noreferrer">Download datasheet <Download className="ml-2 h-4 w-4" /></a></Button>
              </div>
            </div>
          </motion.div>
        </section>
        <section className="border-t border-border bg-muted/30 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="display-headline text-3xl sm:text-4xl text-foreground">Technical specifications</h2>
            <p className="mt-4 text-muted-foreground">Published values from the 29CLH4959 technical datasheet. Specifications are subject to change without notice.</p>
            <div className="grid lg:grid-cols-3 gap-8 mt-9 items-start">
              {specificationGroups.map(({ title, rows }) => <div key={title}>
                <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
                <dl>{rows.map(([label, value]) => <div key={label} className="grid grid-cols-2 gap-4 border-b border-border py-3 text-sm"><dt className="text-muted-foreground">{label}</dt><dd className="text-foreground font-medium break-words">{value}</dd></div>)}</dl>
              </div>)}
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div><h2 className="display-headline text-3xl text-foreground">Plan your wireless link</h2><p className="mt-5 text-muted-foreground leading-relaxed">Share your radio model, operating frequency and installation requirements with uConnect to discuss antenna selection, connectors and mounting. Suitability depends on your link design and local spectrum requirements.</p><Button asChild variant="outline" className="mt-6"><Link to="/services/rf-planning">RF planning services <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
            <div><h2 className="display-headline text-3xl text-foreground">Pricing & project enquiries</h2><p className="mt-5 text-muted-foreground leading-relaxed">Send your quantity, destination country and required delivery date to our sales team for pricing, availability and delivery details.</p><a href={connectlh29Enquiry} className="block mt-5 text-accent break-words hover:underline">reachus@youconnecttech.com</a><Button asChild variant="cta" className="mt-6"><a href={connectlh29Enquiry}>Request pricing <ArrowRight className="ml-2 h-4 w-4" /></a></Button></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}