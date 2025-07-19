'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useGalleryAnimation } from '@/components/enter/useAnimation';

interface ImageGalleryProps {
  onComplete?: () => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ onComplete }) => {
  const { initializeAnimations } = useGalleryAnimation(onComplete);

  useEffect(() => {
    // Initialize animations after component mounts
    const timer = setTimeout(initializeAnimations, 100);
    return () => clearTimeout(timer);
  }, [initializeAnimations]);

  return (
    <div id="app">
      <div id="grid">
        <div className="column one">
          <div className="item">
            <div className="content">
              <Image src="/images/0.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/1.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/2.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/3.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
        
        <div className="column two">
          <div className="item">
            <div className="content">
              <Image src="/images/4.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/5.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/6.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/7.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
        
        <div className="column three">
          <div className="item">
            <div className="content">
              <Image src="/images/8.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/9.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content home">
              <Image src="/images/home.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/10.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
        
        <div className="column four">
          <div className="item">
            <div className="content">
              <Image src="/images/11.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/12.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/13.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/14.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
        
        <div className="column five">
          <div className="item">
            <div className="content">
              <Image src="/images/15.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/16.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/17.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="item">
            <div className="content">
              <Image src="/images/18.jpg" alt="" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 