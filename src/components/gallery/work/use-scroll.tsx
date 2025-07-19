"use client";

import { useRef, useEffect, useCallback } from 'react';
import { easings } from './animations';

interface UseScrollResult {
  scrollTo: (e: React.MouseEvent, target: string) => void;
  rangeScrollTo: (target: string) => void;
  scrollToImages: (e: React.MouseEvent, target: string) => void;
}

export function useScroll(wrapper?: string): UseScrollResult {
  const locomotiveScrollRef = useRef<any>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        
        locomotiveScrollRef.current = new LocomotiveScroll({
          lenisOptions: {
            wrapper: wrapper ? document.querySelector(wrapper) : window,
            duration: 0.7,
            lerp: 0.1,
            smoothWheel: true,
            wheelMultiplier: 1.3,
          },
        });
      } catch (error) {
        console.error("Error initializing Locomotive Scroll:", error);
      }
    };

    initScroll();

    // Cleanup function
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, [wrapper]);

  const scrollTo = useCallback((e: React.MouseEvent, currentLink: string) => {
    e.preventDefault();
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(currentLink, {
        duration: 1.5,
        easing: easings.easeInOutExpo,
      });
    } else {
      // Fallback to native scroll
      const element = document.querySelector(currentLink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const scrollToImages = useCallback((e: React.MouseEvent, currentLink: string) => {
    e.preventDefault();
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(currentLink, {
        duration: 2,
        offset: -100,
        easing: easings.easeInOutExpo,
      });
    } else {
      // Fallback to native scroll
      const element = document.querySelector(currentLink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const rangeScrollTo = useCallback((currentLink: string) => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(currentLink, {
        duration: 1.5,
      });
    } else {
      // Fallback to native scroll
      if (typeof window !== 'undefined') {
        const scrollPosition = parseFloat(currentLink);
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  return {
    scrollTo,
    rangeScrollTo,
    scrollToImages,
  };
} 