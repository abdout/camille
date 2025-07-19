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

  // Show error state
  if (error) {
    return (
      <div className="work-layout font-neue-haas-display">
        <main className="main">
          <div className="error-state">
            <h2>Error loading data</h2>
            <p>Please try refreshing the page.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="work-layout font-neue-haas-display">
      <main className="main">
        {pageState === 'loading' && (
          <LoadingScreen onComplete={handleLoadingComplete} />
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
            <ImageGallery onComplete={handleGalleryComplete} />
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
      </main>
    </div>
  );
}
