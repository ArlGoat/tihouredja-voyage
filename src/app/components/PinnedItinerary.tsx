"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function PinnedItinerary({
  itinerary,
  images,
  kicker = "The Itinerary"
}: {
  itinerary: { day: string; title: string; copy: string }[];
  images: string[];
  kicker?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    const ctx = gsap.context(() => {
      // Track which day is in view
      const dayBlocks = gsap.utils.toArray(".itinerary-day-block") as HTMLElement[];
      
      dayBlocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveDay(i);
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, [itinerary]);

  return (
    <section className="pinned-itinerary-section" ref={containerRef}>
      <div className="pinned-left" ref={leftRef}>
        <div className="pinned-image-container">
          {images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Day ${i + 1}`}
              fill
              className={`pinned-img ${activeDay === i ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
      <div className="pinned-right" ref={rightRef}>
        <div className="itinerary-header">
          <p className="eyebrow">{kicker}</p>
          <h2>Daily Breakdown</h2>
        </div>
        <div className="itinerary-days-list">
          {itinerary.map((item, i) => (
            <div key={i} className={`itinerary-day-block ${activeDay === i ? "active" : ""}`}>
              <div className="day-number-wrapper">
                <span className="day-number">{item.day}</span>
                <div className="day-line"></div>
              </div>
              <div className="day-content">
                {images[i] && (
                  <div className="mobile-day-image">
                    <Image src={images[i]} alt={item.title} fill />
                  </div>
                )}
                <h3 className="day-title">{item.title}</h3>
                <p className="day-copy">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
