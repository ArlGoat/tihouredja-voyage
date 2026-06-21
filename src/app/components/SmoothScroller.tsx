"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger early so it's available everywhere
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const prevPathname = useRef(pathname);

  // On route change (NOT initial mount), scroll to top UNLESS it's a language switch
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathname.current = pathname;
      return;
    }

    const prev = prevPathname.current;
    prevPathname.current = pathname;

    // Detect language switch: /about <-> /fr/about, / <-> /fr, etc.
    const stripLang = (p: string) => p.replace(/^\/fr/, "") || "/";
    const isLangSwitch = stripLang(prev) === stripLang(pathname) && prev !== pathname;

    if (!isLangSwitch) {
      // Real page navigation — scroll to top
      const lenis = lenisRef.current?.lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }

    setTimeout(() => ScrollTrigger.refresh(), 200);
    setTimeout(() => ScrollTrigger.refresh(), 800);
  }, [pathname]);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener("resize", refreshScrollTrigger);
    
    // Refresh repeatedly to catch late layout shifts (like images loading)
    setTimeout(refreshScrollTrigger, 100);
    setTimeout(refreshScrollTrigger, 500);
    setTimeout(refreshScrollTrigger, 1500);
    setTimeout(refreshScrollTrigger, 3000);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("resize", refreshScrollTrigger);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

