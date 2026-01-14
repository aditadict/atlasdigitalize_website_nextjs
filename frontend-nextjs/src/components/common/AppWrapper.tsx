"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "@/components/common/LoadingScreen";
import PageTransition from "@/components/common/PageTransition";

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasLoaded = sessionStorage.getItem("atlas-loaded");
    
    if (hasLoaded) {
      // Skip loading screen on subsequent navigations
      setIsLoading(false);
    }
    
    setIsMounted(true);
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("atlas-loaded", "true");
    setIsLoading(false);
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen" style={{ visibility: "hidden" }}>
        {children}
      </div>
    );
  }

  return (
    <>
      {/* Main app wrapper - hidden until loading complete */}
      <div
        className="flex flex-col min-h-screen"
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <PageTransition>{children}</PageTransition>
      </div>

      {/* Loading screen on top */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
    </>
  );
};

export default AppWrapper;
