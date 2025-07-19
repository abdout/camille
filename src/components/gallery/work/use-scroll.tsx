"use client";

import { useRef, useEffect, useCallback, useState } from 'react';
import { easings } from './animations';

interface UseScrollResult {
  scrollTo: (e: React.MouseEvent, target: string) => void;
  rangeScrollTo: (target: string) => void;
  scrollToImages: (e: React.MouseEvent, target: string) => void;
  isReady: boolean;
}

export function useScroll(wrapper?: string): UseScrollResult {
  const locomotiveScrollRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const initScroll = async () => {
      try {
        // Wait for DOM to be completely ready
        await new Promise(resolve => {
          if (document.readyState === 'complete') {
            resolve(true);
          } else {
            window.addEventListener('load', () => resolve(true));
          }
        });

        // Additional small delay to ensure all components are mounted
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        
        // Destroy any existing instance
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.destroy();
        }
        
        locomotiveScrollRef.current = new LocomotiveScroll({
          lenisOptions: {
            wrapper: wrapper ? document.querySelector(wrapper) : window,
            duration: 0.7,
            lerp: 0.1,
            smoothWheel: true,
            wheelMultiplier: 1.3,
            // Explicitly enable keyboard
            keyboard: true,
            // Ensure touch events work
            touchMultiplier: 2,
            // Prevent native scroll
            prevent: (node) => node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || node.tagName === 'SELECT',
          },
        });

        // Force update scroll position and refresh
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.start();
          
          // Refresh after a short delay to ensure everything is calculated correctly
          setTimeout(() => {
            if (locomotiveScrollRef.current) {
              locomotiveScrollRef.current.refresh();
              setIsReady(true);
            }
          }, 100);
        }
      } catch (error) {
        console.error("Error initializing Locomotive Scroll:", error);
        // Even if Locomotive fails, set ready to true so native scroll can work
        setIsReady(true);
      }
    };

    initScroll();

    // Cleanup function
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
        setIsReady(false);
      }
    };
  }, [wrapper]);

  // Add window resize handler to refresh Locomotive Scroll
  useEffect(() => {
    const handleResize = () => {
      if (locomotiveScrollRef.current && isReady) {
        locomotiveScrollRef.current.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady]);

  const scrollTo = useCallback((e: React.MouseEvent, currentLink: string) => {
    e.preventDefault();
    
    if (locomotiveScrollRef.current && isReady) {
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
  }, [isReady]);

  const scrollToImages = useCallback((e: React.MouseEvent, currentLink: string) => {
    e.preventDefault();
    
    if (locomotiveScrollRef.current && isReady) {
      locomotiveScrollRef.current.scrollTo(currentLink, {
        duration: 2,
        offset: -100,
        easing: easings.easeInOutExpo,
      });
    } else {
      // Fallback to native scroll with offset
      const element = document.querySelector(currentLink);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [isReady]);

  const rangeScrollTo = useCallback((currentLink: string) => {
    if (locomotiveScrollRef.current && isReady) {
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
  }, [isReady]);

  return {
    scrollTo,
    rangeScrollTo,
    scrollToImages,
    isReady,
  };
} 