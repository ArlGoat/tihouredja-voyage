import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foire Aux Questions (FAQ) | Tihouredja Voyage",
  description: "Trouvez les réponses aux questions les plus fréquentes sur nos circuits dans le désert du Sahara, la météo, la sécurité, quoi emporter et comment réserver.",
};

import { Footer, Header, AccordionItem } from "../../components";
import { faqs } from "../../frContent";

export default function FaqPage() {
  return (
    <main>
      <Header locale="fr" />
      <section className="page-hero faq-page-hero">
        <div className="page-hero-overlay" />
        <div className="page-hero-content reveal">
          <p className="eyebrow">Foire aux questions</p>
          <h1>Ce que les voyageurs demandent avant Djanet.</h1>
          <p>
            Des réponses essentielles sur la réservation, la sécurité, les saisons, 
            les visas, l'hébergement, les bagages et le voyage dans le désert.
          </p>
        </div>
      </section>

      <section className="faq-section page-section">
        <div className="faq-grid">
          {faqs.map(([question, answer]) => (
            <AccordionItem
              key={question}
              title={question}
              copy={answer}
            />
          ))}
        </div>
      </section>
      <Footer locale="fr" />
    </main>
  );
}
