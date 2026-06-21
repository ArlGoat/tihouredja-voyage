import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuareg Craft & Artisanat | Tihouredja Voyage",
  description: "Discover the beautiful and authentic Tuareg crafts in Djanet. Support local artisans by purchasing handmade jewelry, leather goods, and traditional items.",
};

import Image from "next/image";
import { Footer, Header } from "../components";
import { craftGallery, craftHighlights } from "../content";

export default function CraftPage() {
  return (
    <main>
      <Header />
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
          <p className="eyebrow">Traditional industry</p>
          <h1>Handmade culture from the Sahara</h1>
          <p>
            A dedicated page for the craft and traditional industry images from
            the client&apos;s local folder.
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
          <p className="eyebrow">Traditional industry gallery</p>
          <h2>Local craft photos</h2>
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
      <Footer />
    </main>
  );
}
