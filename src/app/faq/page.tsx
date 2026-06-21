import { Footer, Header, AccordionItem } from "../components";
import { faqs } from "../content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Tihouredja Voyage",
  description: "Find answers to the most common questions about our Sahara Desert tours, weather conditions, safety, what to pack, and booking process.",
};

export default function FaqPage() {
  return (
    <main>
      <Header />
      <section className="page-hero faq-page-hero">
        <div className="page-hero-overlay" />
        <div className="page-hero-content reveal">
          <p className="eyebrow">Frequently asked questions</p>
          <h1>What travelers ask before Djanet.</h1>
          <p>
            Essential answers about booking, safety, seasons, visa help,
            accommodation, packing, and desert travel.
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
      <Footer />
    </main>
  );
}
