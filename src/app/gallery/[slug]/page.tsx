"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { anim, PageAnim } from "@/components/gallery/work/animations";
import { useData } from "@/components/gallery/work/use-data";
import { useParams } from "next/navigation";
import { ProgressBar } from "@/components/gallery/work/progress-bar";
import { useDocumentTitle } from "@/components/gallery/work/utils";
import { WorksHeader } from "@/components/gallery/work/works-header";
import { Hero } from "@/components/gallery/work/hero";
import { WorkImages } from "@/components/gallery/work/work-images";
import { WorksLink } from "@/components/gallery/work/works-link";
import "../globals.css";

export default function WorkDetails() {
  const params = useParams();
  const slug = params.slug as string;
  const navigating = useRef(false);
  const { data, isLoading, error } = useData(`/data/works/${slug}.json`);

  useEffect(() => {
    if (!navigating.current) {
      window.scrollTo(0, 0);
    }
  }, []);

  const setNavigating = (state: boolean) => {
    navigating.current = state;
  };

  // Set document title
  useDocumentTitle(
    data?.documentTitle ? data.documentTitle : "Camille Mormal"
  );

  // Show error state
  if (error) {
    return (
      <div className="work-layout font-neue-haas-display">
        <main className="main">
          <div className="error-state">
            <h2>Error loading work</h2>
            <p>Please try refreshing the page.</p>
          </div>
        </main>
      </div>
    );
  }

  // Show loading state
  if (isLoading || !data) {
    return (
      <div className="work-layout font-neue-haas-display">
        <main className="main">
          <div className="loading-state" style={{ opacity: 0 }}>
            <div className="loader"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="work-layout font-neue-haas-display">
      <main className="main">
        <motion.main {...anim(PageAnim.presencePage)} className="works-details">
          <ProgressBar />
          <WorksHeader />
          <Hero data={data} />
          <WorkImages data={data} />
          <WorksLink data={data} setNavigating={setNavigating} />
        </motion.main>
      </main>
    </div>
  );
} 