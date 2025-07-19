"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { anim, PageAnim, WorksAnim } from "./animations";
import { AnchorLink } from "./anchor-link";

interface HeroProps {
  data: {
    hero: {
      image: string;
      title: string[];
      leadDesigner: string;
      doneWith: string;
    };
  };
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { hero: heroData } = data;
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["0% 0%", "100% 0%"],
  });

  const objectPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["50% 0vh", "50% 20vh"]
  );

  return (
    <motion.section
      {...anim(PageAnim.block)}
      className="hero"
      ref={container}
    >
      <motion.img
        src={heroData.image}
        alt=""
        className="hero__background"
        style={{ objectPosition }}
      />
      <div className="description">
        <div className="title">
          {heroData.title.map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </div>
        <div className="lead-designer">
          <h2>Lead Designer</h2>
          <p>{heroData.leadDesigner}</p>
        </div>
        <div className="done-with">
          <h2>Done With</h2>
          <p>{heroData.doneWith}</p>
        </div>
        <div className="scroll-down">
          <AnchorLink toSection="#works-images" className="small-text">
            Scroll Down
          </AnchorLink>
        </div>
      </div>
    </motion.section>
  );
}; 