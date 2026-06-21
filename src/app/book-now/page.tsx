"use client";
import { useState, useRef, useEffect } from "react";
import { useForm, ValidationError } from '@formspree/react';
import ScrollTrigger from "gsap/ScrollTrigger";
import { AccordionItem, Footer, Header } from "../components";
import { itinerary, pricing, tourDates, whatsappLink } from "../content";
import { countries } from "../countries";

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
    let message = "Hello, I would like to request a private tour.\n\n";
    
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
      <Header />
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
          <p className="eyebrow">Book now</p>
          <h1>Scheduled groups or private tours, your way.</h1>
          <p>
            Choose a group departure or request a bespoke tour around your
            dates, group size, destination preferences, activity level, and
            travel rhythm.
          </p>
        </div>
      </section>

      <section className="booking-section page-section">
        <div className="booking-copy reveal">
          <p className="eyebrow">Adventure awaits</p>
          <h2>Private tour request</h2>
          <p>
            Private trips are shaped around your destination, number of days,
            preferred pace, and travel companions.
          </p>
          <div className="benefits">
            <span>Escape the crowds</span>
            <span>Your tour, your way</span>
            <span>A deeper connection</span>
          </div>
        </div>

        <div className="booking-panel reveal">
          <h3>Send a request</h3>
          {state.succeeded ? (
            <div className="success-message" style={{ padding: "40px 0", textAlign: "center", color: "var(--accent)" }}>
              <h3>Thank you!</h3>
              <p>We have received your booking request and will be in touch shortly.</p>
            </div>
          ) : (
            <form className="premium-form" onSubmit={handleSubmit} ref={formRef}>
            <div className="form-row">
              <label>
                First Name (required)
                <input name="firstName" type="text" required />
              </label>
              <label>
                Last Name (required)
                <input name="lastName" type="text" required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Email (required)
                <input name="email" type="email" required />
              </label>
              <label>
                Phone Number (required)
                <input name="phone" type="tel" placeholder="+213" required />
              </label>
            </div>
            
            <label>
              Nationality (required)
              <input name="nationality" list="countries" placeholder="Search nationality..." required />
            </label>

            <label>
              Number of Participants (required)
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
                <label>Additional Participants Details</label>
                {additionalParticipants.map((p, index) => (
                  <div key={index} className={`participant-row ${removingIndex === index ? "removing" : ""}`}>
                    <input 
                      name={`Additional Participant ${index + 1} Name`} 
                      type="text" 
                      placeholder="Full Name" 
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
                      list="countries" 
                      placeholder="Search nationality..." 
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
              + Add Another Participant
            </button>
            
            <datalist id="countries">
              {countries.map(c => <option key={c} value={c} />)}
            </datalist>

            <label>
              Preferred Destination (required)
              <select 
                name="destination" 
                required 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                {tourDates.map(tour => (
                  <option key={tour.title} value={tour.title}>{tour.title}</option>
                ))}
                <option value="Custom private route">Custom private route</option>
              </select>
            </label>

            <label>
              Preferred Dates (required)
              {(() => {
                const selectedTour = tourDates.find(t => t.title === selectedDestination);
                if (selectedTour) {
                  return (
                    <select name="dates" required defaultValue="">
                      <option value="" disabled>Select an available date</option>
                      {selectedTour.dates.map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  );
                }
                return (
                  <input name="dates" type="text" placeholder="e.g., 10th June - 15th June" required />
                );
              })()}
            </label>

            <label>
              Trip Duration (required)
              <input name="duration" type="text" placeholder="e.g., 5 days" required />
            </label>

            <label>
              Preferred Language
              <select name="language" defaultValue="English">
                <option>English</option>
                <option>French</option>
                <option>Arabic</option>
              </select>
            </label>

            <label>
              Do you need visa assistance? (required)
              <select name="visa" required defaultValue="">
                <option value="" disabled>Select an option</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>

            <fieldset className="radio-group">
              <legend>Dietary Restrictions</legend>
              <div className="radio-options">
                <label className="radio-label">
                  <input type="radio" name="diet" value="None" defaultChecked />
                  <span className="radio-custom"></span>
                  None
                </label>
                <label className="radio-label">
                  <input type="radio" name="diet" value="Vegetarian" />
                  <span className="radio-custom"></span>
                  Vegetarian
                </label>
              </div>
            </fieldset>

            <label>
              Other Information
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
                Submit Booking Request
              </button>
            ) : (
              <div className="submit-options-panel reveal">
                <p style={{ textAlign: "center", marginBottom: "16px", fontWeight: 700, fontSize: "14px" }}>How would you like to send your request?</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <button type="submit" className="primary-button submit-button" disabled={state.submitting}>
                    {state.submitting ? "Sending..." : "Send via Email"}
                  </button>
                  <button 
                    type="button" 
                    className="primary-button submit-button" 
                    style={{ background: "#25D366", borderColor: "#25D366", color: "white" }}
                    onClick={handleWhatsApp}
                  >
                    Send via WhatsApp
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
          <p className="eyebrow">Upcoming group tours</p>
          <h2>Fixed departures and clear pricing</h2>
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
            <p>Group pricing</p>
            <h3>Final price depends on confirmed group size.</h3>
            {pricing.map(([group, price]) => (
              <div key={group}>
                <span>{group}</span>
                <strong>{price}</strong>
              </div>
            ))}
          </article>
        </div>
      </section>


      <Footer />
    </main>
  );
}
