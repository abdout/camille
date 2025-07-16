"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { anim, PageAnim } from "@/components/work/animations";
import { DataProvider } from "@/components/work/data-provider";
import { Works } from "@/components/work/works";
import { classNames } from "@/components/work/utils";

export default function Home() {
  const [loaderFinished, setLoaderFinished] = useState(true); // Set to true for now, will implement loader later

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // <motion.main 
    //   {...anim(PageAnim.presencePage)} 
    //   className={classNames("home", {
    //     "home--loading": !loaderFinished,
    //   })}
    // >
      <DataProvider url="/data/home.json">
        <Works />
      </DataProvider>
    // </motion.main>
  );
}
