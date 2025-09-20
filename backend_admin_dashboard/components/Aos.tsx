"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface AosProps {
  children: React.ReactNode;
}

export default function Aos({ children }: AosProps) {
  useEffect(() => {
    AOS.init({
      // Global settings for AOS
      duration: 1000, // duration of the animation
      offset: 200, // offset (in px) from the original trigger point
      easing: "ease", // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);
  return <div>{children}</div>;
}
