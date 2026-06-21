import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artisanat Touareg | Tihouredja Voyage",
  description: "Découvrez le magnifique et authentique artisanat touareg à Djanet. Soutenez les artisans locaux en achetant des bijoux, de la maroquinerie et des articles traditionnels.",
};

import Image from "next/image";
import { Footer, Header } from "../../components";
import { craftGallery, craftHighlights } from "../../frContent";

export default function CraftPage() {
  return (
    <main>
      <Header locale="fr" />
      <section className="page-hero craft-page-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/crafting-hero.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay" />
        <div className="page-hero-content reveal">
          <p className="eyebrow">Artisanat traditionnel</p>
          <h1>Culture artisanale du Sahara</h1>
          <p>
            Une page dédiée aux images d'artisanat et d'industrie traditionnelle 
            du Tassili N'Ajjer.
          </p>
        </div>
      </section>

      <section className="craft-section page-section">
        <div className="craft-track" aria-label="Traditional craft carousel">
          {craftHighlights.map((item) => (
            <article className="craft-card reveal" key={item.title}>
              <div
                className="craft-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="destination-gallery-heading craft-gallery-title reveal">
          <p className="eyebrow">Galerie d'artisanat traditionnel</p>
          <h2>Photos d'artisanat local</h2>
        </div>
        <div className="destination-photo-grid compact">
          {craftGallery.map((image) => (
            <Image
              src={image}
              alt="Traditional industry"
              width={760}
              height={540}
              sizes="(max-width: 880px) 50vw, 33vw"
              key={image}
            />
          ))}
        </div>
      </section>
      <Footer locale="fr" />
    </main>
  );
}
