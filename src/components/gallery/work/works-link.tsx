"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useRouter } from "next/navigation";
import { AnchorLink } from "./anchor-link";

interface WorksLinkProps {
  setNavigating: (state: boolean) => void;
  data: {
    next: {
      image: string;
      slug: string;
      title: string;
    };
  };
}

export const WorksLink: React.FC<WorksLinkProps> = ({ setNavigating, data }) => {
  const { next: nextData } = data;
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [progressValue, setProgressValue] = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["0% 0%", "100% 100%"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 30%)", "inset(0% 0%)"]
  );

  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 3000,
    damping: 50,
  });

  const handleNavigate = () => {
    setHasNavigated(true);
    setNavigating(true);
    router.push(`/gallery/${nextData.slug}`);
  };

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const roundedProgress = Math.round(latest * 100);
    setProgressValue(roundedProgress);

    if (roundedProgress >= 100 && !hasNavigated) {
      handleNavigate();
    }
  });

  useEffect(() => {
    if (hasNavigated) {
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, 0);
        setNavigating(false);
        setHasNavigated(false);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [hasNavigated, setNavigating]);

  return (
    <section className="link" ref={container}>
      <div className="link--sticky">
        <motion.img
          src={nextData.image}
          alt=""
          className="link__image"
          style={{ clipPath, scale }}
        />
        <div className="link__title">
          <h1>{nextData.title}</h1>
          <div className="progress">
            <span className="progress__num">{progressValue}%</span>
            <AnchorLink
              toSection="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate();
              }}
            >
              Next Project
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
}; 