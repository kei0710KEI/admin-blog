"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const TopLoadingLineApp = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => {
      setLoadingProgress(80);
    };

    const handleComplete = () => {
      setLoadingProgress(100);
      setTimeout(() => setLoadingProgress(0), 500); // Reset progress after a short delay
    };

    // Simulate loading for App Router
    handleStart();
    const timer = setTimeout(handleComplete, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <div className="topLoadingLine" style={{ width: `${loadingProgress}%` }} />
  );
};

export default TopLoadingLineApp;
