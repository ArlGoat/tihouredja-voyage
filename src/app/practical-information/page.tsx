import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practical Information | Sahara Travel Tips",
  description: "Everything you need to know before your Sahara Desert tour: visa formalities, what to pack, health tips, photography guidelines, and more.",
};

import Image from "next/image";
import { Header, Footer } from "../components";
import { practicalInformation } from "../content";

export default function PracticalInformationPage() {
  return (
    <main className="practical-info-page">
      <Header />

      <section className="page-hero practical-info-hero">
        <div className="page-hero-overlay" />
        <div className="page-hero-content reveal">
          <p className="eyebrow">How to prepare for your departure?</p>
          <h1>Practical Information</h1>
        </div>
      </section>

      <section className="practical-content-section">
        <div className="practical-blocks">
          {practicalInformation.map((info, index) => (
            <article 
              className={`info-block reveal ${index % 2 === 1 ? 'info-block-reverse' : ''}`} 
              key={info.title}
            >
              <div className="info-block-image">
                <Image
                  src={info.image}
                  alt={info.title}
                  width={800}
                  height={600}
                  sizes="(max-width: 880px) 100vw, 50vw"
                />
              </div>
              <div className="info-block-text">
                <h2>{info.title}</h2>
                <div className="info-block-copy">
                  {/* Split by sentences or just show as one paragraph depending on length, 
                      but since we have it as one string, we render it directly */}
                  <p>{info.copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
