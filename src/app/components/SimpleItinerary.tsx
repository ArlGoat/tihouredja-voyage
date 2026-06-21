import React from "react";

export default function SimpleItinerary({
  itinerary,
  kicker = "The Itinerary"
}: {
  itinerary: { day: string; title: string; copy: string }[];
  kicker?: string;
}) {
  return (
    <section className="simple-itinerary-section page-section">
      <div className="simple-itinerary-header reveal">
        <p className="eyebrow">{kicker}</p>
        <h2>Daily Breakdown</h2>
      </div>
      <div className="simple-itinerary-grid">
        {itinerary.map((item, i) => (
          <div key={i} className="simple-day-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="simple-day-top">
              <span className="simple-day-num">{item.day}</span>
              <div className="simple-day-line"></div>
            </div>
            <h3 className="simple-day-title">{item.title}</h3>
            <p className="simple-day-copy">{item.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
