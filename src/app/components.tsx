"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { phoneDisplay, whatsappLink } from "./content";

type Locale = "en" | "fr";

const navLabels = {
  en: {
    destinations: "Destinations",
    craft: "Craft",
    book: "Book Now",
    about: "About",
    faq: "FAQ",
    practical: "Practical Info",
    whatsapp: "WhatsApp",
  },
  fr: {
    destinations: "Destinations",
    craft: "Artisanat",
    book: "Réserver",
    about: "À propos",
    faq: "FAQ",
    practical: "Infos Pratiques",
    whatsapp: "WhatsApp",
  },
};

const mapSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="60" viewBox="0 0 400 60" preserveAspectRatio="none"><defs><linearGradient id="r" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect width="400" height="60" fill="black"/><rect width="400" height="60" rx="30" fill="url(#r)"/><rect width="400" height="60" rx="30" fill="url(#b)" style="mix-blend-mode:difference"/><rect x="4" y="4" width="392" height="52" rx="26" fill="hsl(0, 0%, 50%)" style="filter:blur(3px)"/></svg>`;

export function Header({ locale = "en" }: { locale?: Locale } = {}) {
  const pathname = usePathname() || "/";
  const labels = navLabels[locale];
  
  const [clickedLang, setClickedLang] = useState<Locale | null>(null);
  const currentDisplayLang = clickedLang || locale;
  
  const togglePath = locale === "en" 
    ? `/fr${pathname === "/" ? "" : pathname}`
    : pathname.replace(/^\/fr/, "") || "/";
    
  const prefix = locale === "fr" ? "/fr" : "";

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="liquid-glass" colorInterpolationFilters="sRGB">
            <feImage href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(mapSvg)}`} x="0" y="0" width="100%" height="100%" result="map" preserveAspectRatio="none" />
            
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" scale="-180" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" scale="-170" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            
            <feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="B" scale="-160" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>
      <input type="checkbox" id="mobile-menu-toggle" className="mobile-menu-checkbox" aria-hidden="true" />

      <header className="site-header">
        <Link className="brand" href={prefix || "/"} aria-label="Tihouredja Voyage home">
          <Image
            className="brand-logo"
            src="/logo.PNG"
            alt="Tihouredja Voyage logo"
            width={38}
            height={38}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="nav-dropdown">
            <Link href={`${prefix}/destinations`} className="nav-dropdown-trigger">
              {labels.destinations} <span className="dropdown-arrow">▾</span>
            </Link>
            <div className="nav-dropdown-menu">
              <Link href={`${prefix}/destinations/tadrart-rouge`} className="nav-dropdown-item">
                <span className="dropdown-item-title">Tadrart Rouge</span>
                <span className="dropdown-item-sub">Red dunes & canyons</span>
              </Link>
              <Link href={`${prefix}/destinations/ihrir-erg-admer`} className="nav-dropdown-item">
                <span className="dropdown-item-title">Ihrir & Erg Admer</span>
                <span className="dropdown-item-sub">Oasis & golden dunes</span>
              </Link>
              <Link href={`${prefix}/destinations/tassili-najjer-sefar`} className="nav-dropdown-item">
                <span className="dropdown-item-title">Tassili n'Ajjer Sefar</span>
                <span className="dropdown-item-sub">A museum under the open sky</span>
              </Link>
            </div>
          </div>
          <Link href={`${prefix}/craft`}>{labels.craft}</Link>
          <Link href={`${prefix}/practical-information`}>{labels.practical}</Link>
          <Link href={`${prefix}/book-now`}>{labels.book}</Link>
          <Link href={`${prefix}/about`}>{labels.about}</Link>
          <Link href={`${prefix}/faq`}>{labels.faq}</Link>
        </nav>
        <div className="header-actions">
          <div className={`language-switch is-${currentDisplayLang}`} aria-label="Language selector">
            <div className="lang-slider" />
            <Link 
              className={`lang-option ${currentDisplayLang === "en" ? "active" : ""}`} 
              href={locale === "fr" ? togglePath : "#"} 
              scroll={false}
              onClick={(e) => { 
                if (locale === 'en') e.preventDefault(); 
                else setClickedLang('en'); 
              }}
            >EN</Link>
            <Link 
              className={`lang-option ${currentDisplayLang === "fr" ? "active" : ""}`} 
              href={locale === "en" ? togglePath : "#"} 
              scroll={false}
              onClick={(e) => { 
                if (locale === 'fr') e.preventDefault(); 
                else setClickedLang('fr'); 
              }}
            >FR</Link>
          </div>

          <label className="hamburger" htmlFor="mobile-menu-toggle" aria-label="Toggle menu">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </label>
        </div>
      </header>

      <div className="mobile-menu-overlay">
        <nav className="mobile-menu-nav" aria-label="Mobile navigation">
          <Link href={`${prefix}/destinations`}>{labels.destinations}</Link>
          <Link href={`${prefix}/destinations/tadrart-rouge`} style={{paddingLeft: "14px", fontSize: "13px", opacity: 0.7}}>↳ Tadrart Rouge</Link>
          <Link href={`${prefix}/destinations/ihrir-erg-admer`} style={{paddingLeft: "14px", fontSize: "13px", opacity: 0.7}}>↳ Ihrir & Erg Admer</Link>
          <Link href={`${prefix}/destinations/tassili-najjer-sefar`} style={{paddingLeft: "14px", fontSize: "13px", opacity: 0.7}}>↳ Tassili n'Ajjer Sefar</Link>
          <Link href={`${prefix}/craft`}>{labels.craft}</Link>
          <Link href={`${prefix}/practical-information`}>{labels.practical}</Link>
          <Link href={`${prefix}/book-now`}>{labels.book}</Link>
          <Link href={`${prefix}/about`}>{labels.about}</Link>
          <Link href={`${prefix}/faq`}>{labels.faq}</Link>

        </nav>
      </div>
    </>
  );
}

export function Footer({ locale = "en" }: { locale?: Locale } = {}) {
  const isFr = locale === "fr";
  const prefix = isFr ? "/fr" : "";

  return (
    <footer className="premium-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo-small">
            <img src="/logo.PNG" alt="Tihouredja Voyage" style={{ width: "90px", marginBottom: "24px" }} />
          </div>
          <p className="footer-tagline">
            {isFr
              ? "Circuits dans le désert de Djanet, aventures au Tassili N'Ajjer, méharées et voyages sahariens sur mesure."
              : "Djanet desert tours, Tassili N'Ajjer adventures, camel treks, and bespoke Sahara journeys."}
          </p>
        </div>
        
        <div className="footer-links-col">
          <p className="footer-col-title">{isFr ? "Explorer" : "Explore"}</p>
          <div className="footer-links-grid">
            <Link href={prefix || "/"}>{isFr ? "Accueil" : "Home"}</Link>
            <Link href={`${prefix}/destinations`}>Destinations</Link>
            <Link href={`${prefix}/craft`}>{isFr ? "Artisanat" : "Craft"}</Link>
            <Link href={`${prefix}/practical-information`}>{isFr ? "Infos Pratiques" : "Practical Info"}</Link>
            <Link href={`${prefix}/book-now`}>{isFr ? "Réserver" : "Book Now"}</Link>
            <Link href={`${prefix}/about`}>{isFr ? "À propos" : "About Us"}</Link>
            <Link href={`${prefix}/faq`}>FAQ</Link>
          </div>
        </div>

        <div className="footer-contacts-col">
          <p className="footer-col-title">{isFr ? "Contacts" : "Contacts"}</p>
          <div className="contact-links">
            <a href="mailto:tihouredjavoyages56@gmail.com" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              tihouredjavoyages56@gmail.com
            </a>
            <a href="tel:0557607547" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              0557 60 75 47
            </a>
            <a href="tel:0666002268" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              0666 00 22 68
            </a>
          </div>
        </div>

        <div className="footer-social-col">
          <p className="footer-col-title">{isFr ? "Réseaux Sociaux" : "Socials"}</p>
          <div className="social-icons-row">
            <a href="https://instagram.com/tihouredja_voyages" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://tiktok.com/@tihouredja_voyage1" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
            <a href="https://facebook.com/tihouredjavoyage" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="social-icon">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Tihouredja Voyage. {isFr ? "Tous droits réservés." : "All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
}

interface AccordionItemProps {
  title: string;
  copy: string;
  day?: string;
  isOpen?: boolean;
}

export function AccordionItem({ title, copy, day, isOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(isOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [open]);

  return (
    <div className={`premium-accordion-item reveal ${open ? "is-open" : ""}`}>
      <div 
        className="premium-accordion-summary" 
        onClick={() => setOpen(!open)}
      >
        <span className="summary-text">{day ? `${day}: ` : ""}{title}</span>
        <span className="summary-icon">
          <span className="icon-line horizontal"></span>
          <span className="icon-line vertical"></span>
        </span>
      </div>
      <div 
        className="premium-accordion-content-wrapper" 
        style={{ height: contentHeight }}
      >
        <div className="premium-accordion-content" ref={contentRef}>
          <p>{copy}</p>
        </div>
      </div>
    </div>
  );
}
