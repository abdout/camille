"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { anim, PageAnim } from "@/components/work/animations";
import { DataProvider } from "@/components/work/data-provider";
import { useParams } from "next/navigation";
import { ProgressBar } from "@/components/work/progress-bar";
import { useDocumentTitle } from "@/components/work/utils";
import { WorksHeader } from "@/components/work/works-header";
import { Hero } from "@/components/work/hero";
import { WorkImages } from "@/components/work/work-images";
import { WorksLink } from "@/components/work/works-link";
import { useDataContext } from "@/components/work/data-provider";

export default function WorkDetails() {
  const params = useParams();
  const slug = params.slug as string;
  const navigating = useRef(false);

  useEffect(() => {
    if (!navigating.current) {
      window.scrollTo(0, 0);
    }
  }, []);

  const setNavigating = (state: boolean) => {
    navigating.current = state;
  };

  return (
    <motion.main {...anim(PageAnim.presencePage)} className="works-details">
      <DataProvider url={`/data/works/${slug}.json`}>
        <Title />
        <ProgressBar />
        <WorksHeader />
        <Hero />
        <WorkImages />
        <WorksLink setNavigating={setNavigating} />
      </DataProvider>
    </motion.main>
  );
}

const Title = () => {
  const { data } = useDataContext<any>();
  
  useDocumentTitle(
    data?.documentTitle ? data.documentTitle : "Camille Mormal"
  );

  return null;
}; 