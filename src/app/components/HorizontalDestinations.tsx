"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalDestinationsProps {
  destinations: {
    name: string;
    kicker: string;
    cover: string;
    copy: string;
  }[];
  slugs: string[];
  exploreText?: string;
  prefix?: string;
}

export default function HorizontalDestinations({
  destinations,
  slugs,
  exploreText = "Explore",
  prefix = ""
}: HorizontalDestinationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const cards = Array.from(trackRef.current.children);
    
    const ctx = gsap.context(() => {
      // Fade and slide up each card on scroll
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
        
        // Simple vertical parallax effect for the images
        const img = imgRefs.current[i];
        if (img) {
          gsap.fromTo(img,
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [destinations.length]);

  return (
    <div className="horizontal-dest-wrapper" style={{ background: "#000" }}>
      <section ref={containerRef} className="horizontal-dest-section" style={{ padding: "80px 0 120px 0" }}>
        <div style={{ position: "relative", textAlign: "center", paddingBottom: "60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "100%" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 400, color: "var(--sand)", letterSpacing: "3px", textTransform: "uppercase", margin: 0 }}>
            {prefix === "/fr" ? "Choisissez votre expédition" : "Choose your expedition"}
          </h2>
          <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.4)", textTransform: "uppercase", letterSpacing: "4px", margin: 0 }}>
            {prefix === "/fr" ? "Faites défiler pour découvrir" : "Scroll to explore"}
          </p>
        </div>
        <div ref={trackRef} className="horizontal-dest-track">
        {destinations.map((dest, i) => (
          <div key={i} className="horizontal-dest-panel">
            <Link
              href={`${prefix}/destinations/${slugs[i]}`}
              className="horizontal-dest-card"
              aria-label={`${exploreText} ${dest.name}`}
            >
              <div className="horizontal-img-wrapper">
                <div 
                  className="parallax-inner"
                  ref={(el) => { imgRefs.current[i] = el; }}
                  style={{ height: "130%", top: "-15%" }}
                >
                  <Image
                    src={dest.cover}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 992px) 100vw, 80vw"
                    className="horizontal-dest-img"
                    priority={i === 0}
                  />
                </div>
              </div>
              <div className="horizontal-dest-blur" />
              <div className="horizontal-dest-overlay" />
              <div className="horizontal-dest-content">
                <p className="horizontal-dest-kicker">{dest.kicker}</p>
                <h3 className="horizontal-dest-title">{dest.name}</h3>
                <p className="horizontal-dest-copy">{dest.copy}</p>
                <div className="horizontal-dest-cta">
                  <span className="cta-text">{exploreText}</span>
                  <div className="cta-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      </section>
    </div>
  );
}
