import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import plazaAsset from "@/assets/bhubaneswar-plaza.jpg.asset.json";
import footbridgeAsset from "@/assets/bhubaneswar-footbridge.jpg.asset.json";
import junctionAsset from "@/assets/bhubaneswar-junction.jpg.asset.json";
import flagParkAsset from "@/assets/bhubaneswar-flag-park.jpg.asset.json";
import resilientParkAsset from "@/assets/bhubaneswar-resilient-park.jpg.asset.json";
import urbanParkAsset from "@/assets/bhubaneswar-urban-park.jpg.asset.json";
import bukcParkAsset from "@/assets/bhubaneswar-bukc-park.jpg.asset.json";
import streetAsset from "@/assets/bhubaneswar-street.jpg.asset.json";

const img = (asset: { url: string }) => `https://uconnecttech.com${asset.url}`;

const gallery = [
  { src: img(plazaAsset), caption: "City centre public realm", span: true, alt: "Rendered aerial view of the Bhubaneswar smart city plaza with landscaped walkways and civic buildings" },
  { src: img(footbridgeAsset), caption: "Foot over bridge with digital display", alt: "Rendered foot over bridge over a BRTS corridor with a city bus passing below" },
  { src: img(junctionAsset), caption: "Smart junction redesign", alt: "Rendered aerial view of a redesigned smart junction with cycle tracks and landscaped medians" },
  { src: img(flagParkAsset), caption: "Integrated command & public spaces", alt: "Aerial photo of a redeveloped city park with a tall flag plaza and amphitheatre" },
  { src: img(resilientParkAsset), caption: "Resilient parks & riverfront", alt: "Rendered aerial view of a resilient urban park with wetlands and event lawns" },
  { src: img(urbanParkAsset), caption: "Floodable urban park", alt: "Rendered aerial view of a floodable urban park with meandering walking trails" },
  { src: img(bukcParkAsset), caption: "Biju upstream knowledge corridor park", alt: "Rendered aerial view of the BUKC park with play zones and canopy bridges" },
  { src: img(streetAsset), caption: "Complete streets & cycle tracks", alt: "Street photo of a redeveloped Bhubaneswar corridor with protected cycle tracks and BRTS stop" },
];

const tags = ["Surveillance & safe city", "Smart streets & corridors", "Public Wi-Fi & connectivity"];

const FeaturedSmartCity = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-widest mb-4">
            <MapPin className="h-4 w-4" />
            Featured project
          </div>
          <h2 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-7xl">
            Bhubaneswar
            <br />
            <span className="text-muted-foreground">Smart City.</span>
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Safe-city surveillance, city-wide connectivity and smarter public spaces — engineered and delivered by uConnect Technologies across Bhubaneswar's busiest corridors, parks and civic spaces.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((item, index) => (
            <motion.figure
              key={item.caption}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.08, duration: 0.6 }}
              className={`group relative rounded-3xl overflow-hidden border border-border ${
                item.span ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  item.span ? "aspect-[4/3] sm:aspect-auto sm:min-h-[420px]" : "aspect-[4/3]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-sm font-medium text-foreground">
                {item.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSmartCity;
