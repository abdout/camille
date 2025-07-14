'use client';

import React, { useState } from 'react';
import { ImageGallery } from '@/components/enter/gallery';
import { LoadingScreen } from '@/components/enter/loading';
import '@/components/enter/style.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <ImageGallery />
      )}
    </>
  );
} 