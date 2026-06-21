"use client";
import { useState, useRef, useEffect } from "react";
import { useForm, ValidationError } from '@formspree/react';
import ScrollTrigger from "gsap/ScrollTrigger";
import { AccordionItem, Footer, Header } from "../../components";
import { itinerary, pricing, tourDates, whatsappLink } from "../../frContent";
import { countriesFr } from "../../countriesFr";

export default function BookNowPage() {
  const [state, handleSubmit] = useForm("xdavrkqj");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [totalParticipants, setTotalParticipants] = useState(1);
  const [additionalParticipants, setAdditionalParticipants] = useState<{name: string, nationality: string}[]>([]);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleWhatsApp = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    let message = "Bonjour, je souhaite demander un circuit privé.\n\n";
    
    for (let [key, value] of formData.entries()) {
      if (value && typeof value === 'string') {
        message += `*${key}:* ${value}\n`;
      }
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`${whatsappLink}?text=${encodedMessage}`, "_blank");
  };

  useEffect(() => {
    // Whenever the form layout changes (expanding/shrinking), refresh GSAP ScrollTrigger
    // to prevent the page from jumping or scrolling incorrectly.
    ScrollTrigger.refresh();
    setTimeout(() => ScrollTrigger.refresh(), 100);
    setTimeout(() => ScrollTrigger.refresh(), 300);
  }, [selectedDestination, additionalParticipants.length, showOptions]);

  return (
    <main>
      <Header locale="fr" />
      <section className="page-hero book-page-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/booking-hero.mp4" type="video/mp4" />
        </video>
        <div className="page-hero-overlay" />
        <div className="page-hero-content reveal">
          <p className="eyebrow">Réserver maintenant</p>
          <h1>Groupes programmés ou circuits privés, à votre façon.</h1>
          <p>
            Choisissez un départ en groupe ou demandez un circuit sur mesure adapté 
            à vos dates, à la taille de votre groupe, à vos destinations préférées, 
            à votre niveau d'activité et à votre rythme de voyage.
          </p>
        </div>
      </section>

      <section className="booking-section page-section">
        <div className="booking-copy reveal">
          <p className="eyebrow">L'aventure vous attend</p>
          <h2>Demande de circuit privé</h2>
          <p>
            Les voyages privés sont conçus autour de votre destination, du nombre 
            de jours, du rythme souhaité et de vos compagnons de voyage.
          </p>
          <div className="benefits">
            <span>Évitez les foules</span>
            <span>Votre circuit, à votre façon</span>
            <span>Une connexion plus profonde</span>
          </div>
        </div>

        <div className="booking-panel reveal">
          <h3>Envoyer une demande</h3>
          {state.succeeded ? (
            <div className="success-message" style={{ padding: "40px 0", textAlign: "center", color: "var(--accent)" }}>
              <h3>Merci !</h3>
              <p>Nous avons bien reçu votre demande de réservation et vous contacterons sous peu.</p>
            </div>
          ) : (
            <form className="premium-form" onSubmit={handleSubmit} ref={formRef}>
            <div className="form-row">
              <label>
                Prénom (requis)
                <input name="firstName" type="text" required />
              </label>
              <label>
                Nom (requis)
                <input name="lastName" type="text" required />
              </label>
            </div>
            <div className="form-row">
              <label>
                E-mail (requis)
                <input name="email" type="email" required />
              </label>
              <label>
                Numéro de téléphone (requis)
                <input name="phone" type="tel" placeholder="+33" required />
              </label>
            </div>
            
            <label>
              Nationalité (requis)
              <input name="nationality" list="countriesFr" placeholder="Rechercher une nationalité..." required />
            </label>

            <label>
              Nombre de participants (requis)
              <input 
                name="participants" 
                type="number" 
                min="1" 
                required 
                value={totalParticipants || ""}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 1;
                  setTotalParticipants(count);
                  const additionalCount = Math.max(0, count - 1);
                  if (additionalCount > additionalParticipants.length) {
                    const extra = Array(additionalCount - additionalParticipants.length).fill({ name: "", nationality: "" });
                    setAdditionalParticipants([...additionalParticipants, ...extra]);
                  } else if (additionalCount < additionalParticipants.length) {
                    setAdditionalParticipants(additionalParticipants.slice(0, additionalCount));
                  }
                }}
              />
            </label>

            {additionalParticipants.length > 0 && (
              <div className="participants-dynamic-section">
                <label>Détails des autres participants</label>
                {additionalParticipants.map((p, index) => (
                  <div key={index} className={`participant-row ${removingIndex === index ? "removing" : ""}`}>
                    <input 
                      name={`Additional Participant ${index + 1} Name`} 
                      type="text" 
                      placeholder="Nom complet" 
                      required 
                      value={p.name}
                      onChange={(e) => {
                        const newP = [...additionalParticipants];
                        newP[index].name = e.target.value;
                        setAdditionalParticipants(newP);
                      }}
                    />
                    <input 
                      name={`Additional Participant ${index + 1} Nationality`}
                      list="countriesFr" 
                      placeholder="Rechercher une nationalité..." 
                      required 
                      value={p.nationality}
                      onChange={(e) => {
                        const newP = [...additionalParticipants];
                        newP[index].nationality = e.target.value;
                        setAdditionalParticipants(newP);
                      }}
                    />
                    <button type="button" className="remove-participant" onClick={() => {
                      if (removingIndex !== null) return;
                      setRemovingIndex(index);
                      setTimeout(() => {
                        setAdditionalParticipants(prev => prev.filter((_, i) => i !== index));
                        setTotalParticipants(prev => prev - 1);
                        setRemovingIndex(null);
                      }, 300);
                    }}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <button 
              type="button" 
              className="add-participant-button" 
              onClick={() => {
                setTotalParticipants(prev => prev + 1);
                setAdditionalParticipants([...additionalParticipants, { name: "", nationality: "" }]);
              }}
            >
              + Ajouter un autre participant
            </button>
            
            <datalist id="countriesFr">
              {countriesFr.map(c => <option key={c} value={c} />)}
            </datalist>

            <label>
              Destination souhaitée (requis)
              <select 
                name="destination" 
                required 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
              >
                <option value="" disabled>Sélectionnez une option</option>
                {tourDates.map(tour => (
                  <option key={tour.title} value={tour.title}>{tour.title}</option>
                ))}
                <option value="Circuit privé sur mesure">Circuit privé sur mesure</option>
              </select>
            </label>

            <label>
              Dates souhaitées (requis)
              {(() => {
                const selectedTour = tourDates.find(t => t.title === selectedDestination);
                if (selectedTour) {
                  return (
                    <select name="dates" required defaultValue="">
                      <option value="" disabled>Sélectionnez une date disponible</option>
                      {selectedTour.dates.map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  );
                }
                return (
                  <input name="dates" type="text" placeholder="ex: 10 Juin - 15 Juin" required />
                );
              })()}
            </label>

            <label>
              Durée du voyage (requis)
              <input name="duration" type="text" placeholder="ex: 5 jours" required />
            </label>

            <label>
              Langue préférée
              <select name="language" defaultValue="Français">
                <option>Français</option>
                <option>Anglais</option>
                <option>Arabe</option>
              </select>
            </label>

            <label>
              Avez-vous besoin d'aide pour le visa ? (requis)
              <select name="visa" required defaultValue="">
                <option value="" disabled>Sélectionnez une option</option>
                <option>Oui</option>
                <option>Non</option>
              </select>
            </label>

            <fieldset className="radio-group">
              <legend>Restrictions alimentaires</legend>
              <div className="radio-options">
                <label className="radio-label">
                  <input type="radio" name="diet" value="Aucune" defaultChecked />
                  <span className="radio-custom"></span>
                  Aucune
                </label>
                <label className="radio-label">
                  <input type="radio" name="diet" value="Végétarien" />
                  <span className="radio-custom"></span>
                  Végétarien
                </label>
              </div>
            </fieldset>

            <label>
              Autres informations
              <textarea name="otherInfo" />
            </label>

            {!showOptions ? (
              <button 
                type="button" 
                className="primary-button full submit-button"
                onClick={() => {
                  if (formRef.current?.checkValidity()) {
                    setShowOptions(true);
                  } else {
                    formRef.current?.reportValidity();
                  }
                }}
              >
                Envoyer la demande de réservation
              </button>
            ) : (
              <div className="submit-options-panel reveal">
                <p style={{ textAlign: "center", marginBottom: "16px", fontWeight: 700, fontSize: "14px" }}>Comment souhaitez-vous envoyer votre demande ?</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <button type="submit" className="primary-button submit-button" disabled={state.submitting}>
                    {state.submitting ? "Envoi en cours..." : "Envoyer par e-mail"}
                  </button>
                  <button 
                    type="button" 
                    className="primary-button submit-button" 
                    style={{ background: "#25D366", borderColor: "#25D366", color: "white" }}
                    onClick={handleWhatsApp}
                  >
                    Envoyer via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </form>
          )}
        </div>
      </section>

      <section className="tours-section">
        <div className="section-heading reveal">
          <p className="eyebrow">Prochains circuits en groupe</p>
          <h2>Départs programmés et prix transparents</h2>
        </div>
        <div className="tour-grid">
          {tourDates.map((tour) => (
            <article className="tour-card reveal" key={tour.title}>
              <p>{tour.duration}</p>
              <h3>{tour.title}</h3>
              <ul>
                {tour.dates.map((date) => (
                  <li key={date}>{date}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="price-card reveal">
            <p>Tarifs de groupe</p>
            <h3>Le prix final dépend de la taille du groupe confirmé.</h3>
            {pricing.map(([group, price]) => (
              <div key={group}>
                <span>{group}</span>
                <strong>{price}</strong>
              </div>
            ))}
          </article>
        </div>
      </section>


      <Footer locale="fr" />
    </main>
  );
}
