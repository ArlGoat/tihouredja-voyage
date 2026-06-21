import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos | Guides du Désert du Sahara",
  description: "Découvrez Tihouredja Voyage et notre équipe de guides locaux touaregs expérimentés à Djanet.",
};

import Image from "next/image";
import { Footer, Header } from "../../components";
import { phoneDisplay, whatsappLink } from "../../frContent";

export default function AboutPage() {
  return (
    <main>
      <Header locale="fr" />
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
          <p className="eyebrow">À propos de Tihouredja Voyage</p>
          <h1>Voyages guidés par des Touaregs à travers Djanet.</h1>
          <p>
            Une expérience de voyage dans le désert axée sur les guides locaux, les nuits en bivouac, 
            une logistique soignée et le respect des paysages fragiles du Tassili N&apos;Ajjer.
          </p>
        </div>
      </section>

      <section className="about-intro-section">
        <div className="about-text">
          <h2 className="uppercase-title">À PROPOS DE TIHOUREDJA VOYAGE</h2>
          <p>
            Tihouredja Voyage est une agence de voyage dans le désert qui connecte le monde extérieur aux merveilles du Tassili N'Ajjer à Djanet, en Algérie. En tant qu'entreprise fièrement détenue et gérée par des Touaregs avec trois générations d'expérience dans le tourisme saharien, nous sommes déterminés à offrir des expériences uniques qui vous plongent dans la beauté naturelle, la riche culture et l'histoire ancienne de cette région remarquable.
          </p>
        </div>
        <div className="about-img-wrapper">
          <Image
            src="/assets/destinations/ihrir-erg-admer/6601ba7b-1ee3-4b7f-ad5b-6f5a56557183.JPG"
            alt="Guide Touareg"
            fill
            className="cover-img"
          />
        </div>
      </section>

      <section className="about-accordion-section">
        <div className="about-img-wrapper">
          <Image
            src="/assets/destinations/tadrart-rouge/092cbac0-f506-45de-8209-76c5e5846715.JPG"
            alt="Chameaux dans le désert"
            fill
            className="cover-img"
          />
        </div>
        <div className="about-accordion-content">
          <h2 className="uppercase-title">CRÉER DES LIENS : CONNECTER LES EXPLORATEURS AU TASSILI N'AJJER</h2>
          <div className="accordion-list">
            <details>
              <summary>Pourquoi Tihouredja Voyage ?</summary>
              <p>Nous combinons une connaissance locale approfondie avec un confort moderne, garantissant que votre voyage à travers le Sahara est à la fois authentique et fluide. Nos guides locaux connaissent chaque dune et chaque canyon caché.</p>
            </details>
            <details>
              <summary>Authenticité</summary>
              <p>Découvrez le vrai Sahara avec l'hospitalité traditionnelle Touareg, allant de nuits à la belle étoile à d'authentiques repas au feu de camp et cérémonies du thé transmises de génération en génération.</p>
            </details>
            <details>
              <summary>Voyage Éthique</summary>
              <p>Nous privilégions l'écotourisme en veillant à ce que nos circuits aient un impact minimal sur l'environnement et contribuent positivement aux communautés locales. Notre approche respecte l'écosystème délicat du désert et soutient le peuple Touareg, dont les modes de vie traditionnels sont en parfaite harmonie avec le développement durable. En promouvant le tourisme responsable, nous aidons à préserver la beauté naturelle de Djanet et à protéger l'environnement pour les générations futures.</p>
            </details>
            <details>
              <summary>Salaires Équitables</summary>
              <p>Chez Tihouredja Voyage, nous pensons que les gardiens de cette terre ancienne méritent de bénéficier directement de son attrait croissant auprès des voyageurs du monde entier. Notre engagement envers des salaires équitables garantit que les populations Touaregs et les communautés locales qui vous guident dans le désert sont rémunérées d'une manière qui respecte leur rôle inestimable. En choisissant Tihouredja Voyage, vous soutenez un tourisme responsable qui honore l'héritage des véritables gardiens du Sahara, tout en contribuant à leur mode de vie durable.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="about-social-section">
        <div className="about-social-text">
          <h2 className="uppercase-title">TIHOUREDJA VOYAGE</h2>
          <p>
            Rejoignez-nous pour un voyage avec Tihouredja Voyage, où nous explorons les paysages époustouflants du Tassili N'Ajjer, partageons notre vie quotidienne dans le Sahara et mettons en valeur la beauté diversifiée de l'Algérie et du reste du monde. À travers nos vidéos de voyage et nos photographies sur TikTok et Instagram, nous visons à éduquer les gens sur cette région unique et à partager notre mode de vie. Suivez-nous alors que nous découvrons ce Tihouredja Voyage.
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
        <p className="cta-headline">REJOIGNEZ-NOUS POUR UNE EXPÉRIENCE INOUBLIABLE QUI RESTERA GRAVÉE DANS VOTRE MÉMOIRE LONGTEMPS APRÈS LA FIN DE VOTRE VOYAGE.</p>
        <a className="button" href="/fr/book-now">Réserver</a>
      </section>
      <Footer locale="fr" />
    </main>
  );
}
