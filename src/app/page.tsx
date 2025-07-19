"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we're coming from gallery or if gallery styles are contaminating
    const checkForGalleryContamination = () => {
      const hasGalleryClass = document.documentElement.classList.contains('work-layout') || 
                             document.body.classList.contains('work-layout');
      const referrer = document.referrer;
      const isFromGallery = referrer.includes('/gallery') || hasGalleryClass;
      
      // Check sessionStorage flag set by gallery page
      const visitedGallery = sessionStorage.getItem('visitedGallery') === 'true';
      
      // Check for gallery-specific CSS variables that indicate contamination
      const hasGalleryVars = getComputedStyle(document.documentElement).getPropertyValue('--c-white') || 
                            getComputedStyle(document.documentElement).getPropertyValue('--c-black');
      
      return isFromGallery || hasGalleryVars || hasGalleryClass || visitedGallery;
    };

    // Force refresh if coming from gallery
    if (checkForGalleryContamination()) {
      setIsRefreshing(true);
      
      // Clear the gallery flag to prevent infinite refreshes
      sessionStorage.removeItem('visitedGallery');
      
      // Small delay to show loading state before refresh
      setTimeout(() => {
        // Force complete page reload to reset all styles
        window.location.reload();
      }, 500);
      
      return;
    }

    // Clean up any residual gallery styles
    const cleanupGalleryStyles = () => {
      // Remove work-layout class from document
      document.documentElement.classList.remove('work-layout');
      document.body.classList.remove('work-layout');
      
      // Reset any overflow/scroll modifications
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
      
      // Clear CSS variables
      document.documentElement.style.removeProperty('--c-white');
      document.documentElement.style.removeProperty('--c-black');
      document.documentElement.style.removeProperty('--g-100');
      document.documentElement.style.removeProperty('--g-90');
      document.documentElement.style.removeProperty('--g-80');
      document.documentElement.style.removeProperty('--g-70');
      
      // Reset scroll position
      window.scrollTo(0, 0);
      
      // Force style recalculation
      document.body.offsetHeight;
    };

    // Normal homepage load
    cleanupGalleryStyles();

    // Show loading for smooth transition
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsReady(true), 100);
    }, 300);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  // Show refreshing state
  if (isRefreshing) {
    return <Loading message="Refreshing homepage..." />;
  }

  // Show loading state
  if (isLoading) {
    return <Loading message="Preparing homepage..." />;
  }

  return (
    <div 
      className={`flex flex-col items-center justify-center h-screen text-white space-y-2 transition-opacity duration-300 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1 className="text-4xl font-bold ">Award Winning</h1>
      <Link href="https://camillemormal.com/" className="underline text-blue-500 text-lg">camillemormal.com</Link>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8 mt-8">
        <Link href="/gallery" className="bg-neutral-800 w-40 h-32 rounded-xl text-lg flex items-center justify-center">gallery</Link>
        <Link href="/slider" className="bg-neutral-800 w-40 h-32 rounded-xl text-lg flex items-center justify-center">slider</Link>
        <Link href="/enter" className="bg-neutral-800 w-40 h-32 rounded-xl text-lg flex items-center justify-center">enter</Link>
      </div>
      <Link href="https://github.com/abdout/camille" className="absolute top-6 right-6">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M12.006 2a9.85 9.85 0 0 0-6.484 2.44a10.32 10.32 0 0 0-3.393 6.17a10.48 10.48 0 0 0 1.317 6.955a10.05 10.05 0 0 0 5.4 4.418c.504.095.683-.223.683-.494c0-.245-.01-1.052-.014-1.908c-2.78.62-3.366-1.21-3.366-1.21a2.7 2.7 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621c.317.044.62.163.885.346c.266.183.487.426.647.71c.135.253.318.476.538.655a2.08 2.08 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37c-2.219-.259-4.554-1.138-4.554-5.07a4.02 4.02 0 0 1 1.031-2.75a3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05c.37.858.406 1.828.101 2.713a4.02 4.02 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.47 2.47 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814c0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421a10.47 10.47 0 0 0 1.313-6.948a10.32 10.32 0 0 0-3.39-6.165A9.85 9.85 0 0 0 12.007 2Z" clipRule="evenodd" strokeWidth="0.5" stroke="#fff"/></svg>
      </Link>

    </div>
  );
}
