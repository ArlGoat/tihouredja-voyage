import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tassili N'Ajjer Sefar | Sahara Desert Expeditions",
  description: "Embark on an 8-day trek to Tassili n'Ajjer and Sefar, the world's largest open-air museum of prehistoric rock art.",
};

import Image from "next/image";
import { Header, Footer } from "../../components";
import SimpleItinerary from "../../components/SimpleItinerary";
import { destinationGroups, sefarGallery, tourDates } from "../../content";
import LightboxGallery from "../LightboxGallery";

const destination = destinationGroups[2];

export default function TassiliNajjerSefarPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section 
        className="page-hero sefar-page-hero"
        style={{ backgroundImage: `url(${destination.cover})` }}
      >
        <div className="page-hero-overlay" />
        <div className="page-hero-content reveal">
          <p className="eyebrow">{destination.kicker}</p>
          <h1>{destination.name}</h1>
        </div>
      </section>

      {/* Intro & Details */}
      <section className="dest-details-section">
        <div className="dest-details-left">
          <div className="dest-details-intro reveal">
            <p className="eyebrow">The Experience</p>
            <h2 className="text-reveal">Journey into {destination.name}</h2>
            <p className="dest-details-copy">{destination.copy}</p>
          </div>

          {/* Tour Dates Section */}
          <div className="tour-dates-container reveal" style={{ animationDelay: "0.2s", marginTop: "40px" }}>
            <div className="dates-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dates-header-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
              </svg>
              <h3 className="dates-title">Upcoming Departures ({tourDates[2].duration})</h3>
            </div>
            <div className="dates-grid">
              {tourDates[2].dates.map((date, i) => (
                <div key={i} className="date-ticket">
                  <span className="date-ticket-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--clay)" strokeWidth="2">
                      <circle cx="12" cy="12" r="5"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                  </span>
                  <span className="date-ticket-text">{date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dest-details-right reveal" style={{ animationDelay: "0.3s" }}>
          <div className="dest-editorial-image">
            <Image src={sefarGallery[0]} alt="Sefar" fill />
          </div>
          <div className="dest-editorial-image offset-image">
            <Image src={sefarGallery[1]} alt="Sefar Exploring" fill />
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      {destination.itinerary && destination.itinerary.length > 0 && (
        <SimpleItinerary 
          itinerary={destination.itinerary}
          kicker="The Journey"
        />
      )}

      {/* Gallery */}
      <section className="destination-gallery-section page-section" style={{ paddingTop: 0 }}>
        <article className="destination-gallery-block reveal">
          <LightboxGallery images={sefarGallery} altPrefix={destination.name} />
        </article>
      </section>

      <Footer />
    </main>
  );
}
