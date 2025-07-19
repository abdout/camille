"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { anim, PageAnim } from "@/components/gallery/work/animations";
import { useData } from "@/components/gallery/work/use-data";
import { Works } from "@/components/gallery/work/works";
import { LoadingScreen } from "@/components/gallery/enter/loading";
import { ImageGallery } from "@/components/gallery/enter/gallery";
import { classNames } from "@/components/gallery/work/utils";
import '@/components/enter/style.css';
import './globals.css';

type PageState = 'loading' | 'gallery' | 'work';

export default function Home() {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [animationKey, setAnimationKey] = useState(0);
  const { data, isLoading, error } = useData("/data/home.json");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoadingComplete = () => {
    setPageState('gallery');
  };

  const handleGalleryComplete = () => {
    setPageState('work');
  };

  // Function to restart the animation sequence (useful for debugging or user action)
  const restartAnimation = () => {
    setAnimationKey(prev => prev + 1);
    setPageState('loading');
  };

  // Show error state
  if (error) {
    return (
      <div className="work-layout font-neue-haas-display">
        <main className="main">
          <div className="error-state">
            <h2>Error loading data</h2>
            <p>Please try refreshing the page.</p>
            <button onClick={restartAnimation} style={{ marginTop: '10px' }}>
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="work-layout font-neue-haas-display">
      <main className="main">
        {pageState === 'loading' && (
          <LoadingScreen 
            key={`loading-${animationKey}`}
            onComplete={handleLoadingComplete} 
          />
        )}
        
        {pageState === 'gallery' && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1000,
            backgroundColor: '#121214',
            overflow: 'hidden'
          }}>
            <ImageGallery 
              key={`gallery-${animationKey}`}
              onComplete={handleGalleryComplete} 
            />
          </div>
        )}
        
        {pageState === 'work' && !isLoading && data && (
          <motion.main 
            {...anim(PageAnim.presencePage)} 
            className={classNames("home")}
          >
            <Works data={data} />
          </motion.main>
        )}

        {pageState === 'work' && isLoading && (
          <div className="loading-state" style={{ opacity: 0 }}>
            <div className="loader"></div>
          </div>
        )}

        {/* Debug button for testing (remove in production) */}
        {process.env.NODE_ENV === 'development' && pageState === 'work' && (
          <button 
            onClick={restartAnimation}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 9999,
              padding: '10px 15px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Restart Animation
          </button>
        )}
      </main>
    </div>
  );
}
