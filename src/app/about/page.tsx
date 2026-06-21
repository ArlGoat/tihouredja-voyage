import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Sahara Desert Guides",
  description: "Learn about Tihouredja Voyage and our experienced team of local Tuareg guides in Djanet.",
};

import Image from "next/image";
import { Footer, Header } from "../components";
import { phoneDisplay, whatsappLink } from "../content";

export default function AboutPage() {
  return (
    <main>
      <Header />
      <section className="page-hero about-page-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/drone-hero.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay" />
        <div className="page-hero-content reveal">
          <p className="eyebrow">About Tihouredja Voyage</p>
          <h1>Tuareg-guided journeys through Djanet.</h1>
          <p>
            A desert travel experience built around local guiding, bivouac
            nights, careful logistics, and respect for the fragile landscapes of
            Tassili N&apos;Ajjer.
          </p>
        </div>
      </section>

      <section className="about-intro-section">
        <div className="about-text">
          <h2 className="uppercase-title">ABOUT TIHOUREDJA VOYAGE</h2>
          <p>
            Tihouredja Voyage is a desert tour company that connects the outside world with the wonders of the Tassili N'Ajjer in Djanet, Algeria. As a proudly Tuareg-owned and operated company with three generations of experience in desert tourism, we are dedicated to offering once-in-a-lifetime experiences that immerse you in the natural beauty, rich culture, and ancient history of this remarkable region.
          </p>
        </div>
        <div className="about-img-wrapper">
          <Image
            src="/assets/destinations/ihrir-erg-admer/6601ba7b-1ee3-4b7f-ad5b-6f5a56557183.JPG"
            alt="Tuareg guide"
            fill
            className="cover-img"
          />
        </div>
      </section>

      <section className="about-accordion-section">
        <div className="about-img-wrapper">
          <Image
            src="/assets/destinations/tadrart-rouge/092cbac0-f506-45de-8209-76c5e5846715.JPG"
            alt="Camels in the desert"
            fill
            className="cover-img"
          />
        </div>
        <div className="about-accordion-content">
          <h2 className="uppercase-title">BRIDGING THE GAP: CONNECTING EXPLORERS WITH THE TASSILI N'AJJER</h2>
          <div className="accordion-list">
            <details>
              <summary>Why Tihouredja Voyage?</summary>
              <p>We combine deep local knowledge with modern comfort, ensuring your journey through the Sahara is both authentic and seamless. Our local guides know every dune and hidden canyon.</p>
            </details>
            <details>
              <summary>Authenticity</summary>
              <p>Experience the true Sahara with traditional Tuareg hospitality, from sleeping under the stars to authentic campfire meals and tea ceremonies that have been passed down for generations.</p>
            </details>
            <details>
              <summary>Ethical Travel</summary>
              <p>We prioritize ecotourism by ensuring that our tours have minimal impact on the environment and contribute positively to the local communities. Our approach respects the delicate desert ecosystem and supports the Tuareg people, whose traditional ways of life are deeply attuned to sustainable living. By promoting responsible travel, we help preserve the natural beauty of Djanet while ensuring we protect and sustain the environment for future generations.</p>
            </details>
            <details>
              <summary>Fair Wages</summary>
              <p>At Tihouredja Voyage, we believe that the custodians of this ancient land deserve to directly benefit from its growing appeal to global travellers. Our commitment to fair wages ensures that the Tuareg people and local communities who guide you through the desert are compensated in a way that respects their invaluable role. By choosing Tihouredja Voyage, you support responsible tourism that honors the heritage of the Sahara's true caretakers, while also contributing to their sustainable livelihood.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="about-social-section">
        <div className="about-social-text">
          <h2 className="uppercase-title">TIHOUREDJA VOYAGE</h2>
          <p>
            Join us on a journey with Tihouredja Voyage, where we explore the breathtaking landscapes of the Tassili N'Ajjer, share our daily life living in the Sahara and showcase the diverse beauty of Algeria and the wider world. Through travel videos and photography on TikTok and Instagram, we aim to educate people about this unique region and share our lifestyle travelling the world. Follow along as we discover this Tihouredja Voyage.
          </p>
        </div>
        <div className="social-grid">
          <div className="grid-item"><Image src="/assets/destinations/ihrir-erg-admer/20afec78-1420-49d5-a6f7-201ae858546e.JPG" alt="Gallery 1" fill className="cover-img" /></div>
          <div className="grid-item"><Image src="/assets/destinations/ihrir-erg-admer/bbda4217-3d05-4ec6-8674-72fc6008afc5.JPG" alt="Gallery 2" fill className="cover-img" /></div>
          <div className="grid-item"><Image src="/assets/destinations/ihrir-erg-admer/c9e64b57-fa45-4f52-a3ca-be3f3c303d59.JPG" alt="Gallery 3" fill className="cover-img" /></div>
          <div className="grid-item"><Image src="/assets/destinations/ihrir-erg-admer/577a1eb4-9148-4828-869d-57ad93966fbb.JPG" alt="Gallery 4" fill className="cover-img" /></div>
          <div className="grid-item"><Image src="/assets/destinations/ihrir-erg-admer/a99ffd1d-d063-4422-910b-a8974ded2ed6.JPG" alt="Gallery 5" fill className="cover-img" /></div>
          <div className="grid-item"><Image src="/assets/destinations/ihrir-erg-admer/ebc6ad60-e8d5-4145-b605-e44f0b2886db.JPG" alt="Gallery 6" fill className="cover-img" /></div>
          <div className="grid-item"><Image src="/assets/destinations/ihrir-erg-admer/a482978a-7712-4153-94b8-89a4bd2405a6.JPG" alt="Gallery 7" fill className="cover-img" /></div>
          <div className="grid-item"><Image src="/assets/destinations/ihrir-erg-admer/ee9f7481-7177-461c-888e-ab4a94b020c9.JPG" alt="Gallery 8" fill className="cover-img" /></div>
        </div>
      </section>

      <section className="about-cta-section">
        <p className="cta-headline">JOIN US FOR AN UNFORGETTABLE EXPERIENCE THAT WILL STAY WITH YOU LONG AFTER YOUR TRIP ENDS.</p>
        <a className="button" href="/book-now">Book Now</a>
      </section>
      <Footer />
    </main>
  );
}
