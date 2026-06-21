import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "../../components";
import HorizontalDestinations from "../../components/HorizontalDestinations";
import { destinationGroups } from "../../frContent";

const slugs = ["tadrart-rouge", "ihrir-erg-admer", "tassili-najjer-sefar"];

const marqueeItems = [
  "Tadrart Rouge", "·", "Tassili N'Ajjer Sefar", "·",
  "Désert du Sahara", "·", "Ihrir & Erg Admer", "·",
  "Djanet Algérie", "·", "Patrimoine de l'UNESCO", "·",
  "Culture Touareg", "·", "Nuits en Bivouac", "·",
];

export default function DestinationsPage() {
  return (
    <main>
      <Header locale="fr" />

      {/* Hero */}
      <section className="page-hero destinations-page-hero">
        <div className="page-hero-overlay" />
        <div className="page-hero-content reveal">
          <p className="eyebrow">Nos destinations</p>
          <h1>Tadrart Rouge, Ihrir, et Sefar</h1>
          <p>
            Trois des circuits les plus extraordinaires du Sahara — dunes rouges,
            gravures préhistoriques, oasis et silence du désert.
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
        exploreText="Explorer"
        prefix="/fr"
      />



      <Footer locale="fr" />
    </main>
  );
}
