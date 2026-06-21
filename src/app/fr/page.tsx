import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours et Expéditions dans le Désert du Sahara | Algérie",
  description: "Vivez la magie du désert du Sahara. Nous proposons des circuits guidés haut de gamme à Djanet, Tassili n'Ajjer, Tadrart Rouge et Ihrir.",
};

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "../components";
import { destinationGroups, tripHighlights, homeServices, practicalInformation, tadrartGallery, ihrirGallery } from "../frContent";

export default function Home() {
  return (
    <main>
      <Header locale="fr" />

      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/sahara-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content reveal">
          <p className="eyebrow">Circuits dans le désert du Tassili N&apos;Ajjer</p>
          <h1>Tihouredja Voyage</h1>
          <p className="hero-copy">
            Découvrez Djanet à travers les dunes rouges, les peintures rupestres anciennes, 
            les expéditions en 4x4, les routes des oasis et l'hospitalité vivante de la culture Touareg.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/fr/book-now">
              Réserver un voyage
            </Link>
            <Link className="ghost-button" href="/fr/destinations">
              Explorer les circuits
            </Link>
          </div>
        </div>
      </section>

      <section className="lifetime-section">
        <div className="section-heading centered reveal">
          <p className="eyebrow">Voyage dans le désert de Djanet</p>
          <h2>Le voyage d'une vie</h2>
        </div>
        <div className="story-grid">
          {tripHighlights.map((item) => (
            <article className="story-card reveal" key={item.title}>
              <Image
                src={item.image}
                alt={item.title}
                width={720}
                height={660}
                sizes="(max-width: 880px) 100vw, 33vw"
              />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-services-section">
        <div className="section-heading centered reveal">
          <p className="eyebrow">Votre Confort & Sécurité</p>
          <h2>Ce que nous offrons</h2>
        </div>
        <div className="services-list-container">
          {homeServices.map((service) => (
            <article className="service-card-animated" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <div className="service-text-content">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-practical-info-section">
        <div className="section-heading centered reveal" style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 900, textTransform: "none", marginBottom: "8px" }}>Informations pratiques</h2>
          <p className="eyebrow" style={{ color: "rgba(255, 115, 115, 1)", textTransform: "none", fontSize: "28px", fontStyle: "italic", fontWeight: 400, fontFamily: "Georgia, serif" }}>Comment préparer votre départ ?</p>
        </div>
        <div className="practical-preview-grid">
          {practicalInformation.slice(0, 3).map((info, idx) => {
            return (
              <article className="practical-preview-card reveal" key={info.title} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="practical-preview-image">
                  <Image src={info.image} alt={info.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3>{info.title}</h3>
                <p>{info.preview}</p>
              </article>
            );
          })}
        </div>
        <div className="center-actions reveal" style={{ marginTop: "50px" }}>
          <Link className="primary-button" href="/fr/practical-information" style={{ backgroundColor: "rgba(255, 140, 66, 1)", border: "none" }}>
            En savoir plus
          </Link>
        </div>
      </section>

      <section className="home-destinations-section">
        <div className="section-heading centered reveal">
          <p className="eyebrow">Nos destinations</p>
          <h2>Choisissez votre itinéraire</h2>
        </div>
        <div className="home-destination-list">
          {destinationGroups.map((destination) => (
            <article className="home-destination reveal" key={destination.name}>
              <div className="home-destination-heading">
                <p className="eyebrow">{destination.kicker}</p>
                <h3>{destination.name}</h3>
                <p>{destination.copy}</p>
              </div>
              <div className="home-destination-gallery">
                {destination.gallery.slice(0, 3).map((image) => (
                  <Image
                    src={image}
                    alt={destination.name}
                    width={760}
                    height={540}
                    sizes="(max-width: 880px) 50vw, 33vw"
                    key={image}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="center-actions">
          <Link className="primary-button" href="/fr/destinations">
            Découvrir toutes nos destinations
          </Link>
        </div>
      </section>

      <Footer locale="fr" />
    </main>
  );
}
