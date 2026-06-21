"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface LightboxGalleryProps {
  images: string[];
  altPrefix: string;
}

export default function LightboxGallery({ images, altPrefix }: LightboxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Ensure portal only renders on client
  useEffect(() => setMounted(true), []);

  // Intersection Observer for staggered reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            const delay = (index % 3) * 120;
            setTimeout(() => {
              setVisibleImages((prev) => new Set([...prev, index]));
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [images]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setZoomed(false);
  };
  const closeLightbox = () => {
    setSelectedIndex(null);
    setZoomed(false);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomed(false);
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomed(false);
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  };

  const toggleZoom = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!zoomed && contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    }
    setZoomed((prev) => !prev);
  }, [zoomed]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!zoomed || !contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, [zoomed]);

  // Keyboard navigation + lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomed) {
          setZoomed(false);
        } else {
          closeLightbox();
        }
      }
      if (e.key === "ArrowRight" && !zoomed)
        setSelectedIndex((p) => (p !== null ? (p + 1) % images.length : null));
      if (e.key === "ArrowLeft" && !zoomed)
        setSelectedIndex((p) =>
          p !== null ? (p - 1 + images.length) % images.length : null
        );
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, images.length, zoomed]);

  const lightboxContent = selectedIndex !== null ? (
    <div className="lightbox-overlay" onClick={zoomed ? () => setZoomed(false) : closeLightbox}>
      <button className={`lightbox-close ${zoomed ? "lightbox-hide-ui" : ""}`} onClick={closeLightbox} aria-label="Close">
        &times;
      </button>
      <button className={`lightbox-nav prev ${zoomed ? "lightbox-hide-ui" : ""}`} onClick={showPrev} aria-label="Previous image">
        &#10094;
      </button>
      <div
        ref={contentRef}
        className={`lightbox-content ${zoomed ? "lightbox-zoomed" : ""}`}
        onClick={toggleZoom}
        onMouseMove={handleMouseMove}
        style={zoomed ? {
          cursor: "zoom-out",
          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
        } : {
          cursor: "zoom-in",
        }}
      >
        <Image
          src={images[selectedIndex]}
          alt={`${altPrefix} full size ${selectedIndex + 1}`}
          width={1800}
          height={1200}
          className="lightbox-image"
          sizes="90vw"
          priority
          draggable={false}
        />
      </div>
      <button className={`lightbox-nav next ${zoomed ? "lightbox-hide-ui" : ""}`} onClick={showNext} aria-label="Next image">
        &#10095;
      </button>
      <div className={`lightbox-counter ${zoomed ? "lightbox-hide-ui" : ""}`}>
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="destination-photo-grid">
        {images.map((image, index) => (
          <div
            key={image}
            ref={(el) => { imageRefs.current[index] = el; }}
            data-index={index}
            className={`gallery-item-wrapper ${visibleImages.has(index) ? "gallery-item-visible" : ""}`}
          >
            <Image
              src={image}
              alt={`${altPrefix} ${index + 1}`}
              width={760}
              height={540}
              sizes="(max-width: 880px) 50vw, 33vw"
              onClick={() => openLightbox(index)}
              className="gallery-image-interactive"
            />
          </div>
        ))}
      </div>

      {mounted && lightboxContent && createPortal(lightboxContent, document.body)}
    </>
  );
}
