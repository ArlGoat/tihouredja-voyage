import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "../components";
import HorizontalDestinations from "../components/HorizontalDestinations";
import { destinationGroups } from "../content";

const slugs = ["tadrart-rouge", "ihrir-erg-admer", "tassili-najjer-sefar"];

const marqueeItems = [
  "Tadrart Rouge", "·", "Tassili N'Ajjer Sefar", "·",
  "Sahara Desert", "·", "Ihrir & Erg Admer", "·",
  "Djanet Algeria", "·", "UNESCO Heritage", "·",
  "Tuareg Culture", "·", "Bivouac Nights", "·",
];

export default function DestinationsPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="page-hero destinations-page-hero">
        <div className="page-hero-overlay" />
        <div className="page-hero-content reveal">
          <p className="eyebrow">Our destinations</p>
          <h1>Tadrart Rouge, Ihrir, and Sefar</h1>
          <p>
            Three of the Sahara&apos;s most extraordinary circuits — red dunes,
            prehistoric carvings, oasis gueltas, and open desert silence.
          </p>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="dest-marquee-track" aria-hidden="true">
        <div className="dest-marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={item === "·" ? "dest-marquee-dot" : "dest-marquee-word"}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Destination overview cards */}
      <HorizontalDestinations 
        destinations={destinationGroups} 
        slugs={slugs} 
        exploreText="Explore"
      />



      <Footer />
    </main>
  );
}
