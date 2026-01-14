"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<
    "entering" | "entered" | "exiting"
  >("entered");
  const previousPathname = useRef(pathname);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip animation on first mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // When pathname changes, start exit animation
    if (pathname !== previousPathname.current) {
      setTransitionStage("exiting");

      // After exit animation, update children and start enter animation
      const exitTimer = setTimeout(() => {
        setDisplayChildren(children);
        previousPathname.current = pathname;
        setTransitionStage("entering");
        window.scrollTo({ top: 0, behavior: "instant" });

        // Complete enter animation
        const enterTimer = setTimeout(() => {
          setTransitionStage("entered");
        }, 400);

        return () => clearTimeout(enterTimer);
      }, 300);

      return () => clearTimeout(exitTimer);
    } else {
      // Same pathname, just update children (e.g., data changes)
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  // Get animation classes based on transition stage
  const getTransitionClasses = () => {
    switch (transitionStage) {
      case "exiting":
        return "opacity-0 scale-[0.98] blur-[2px]";
      case "entering":
        return "opacity-0 translate-y-4";
      case "entered":
        return "opacity-100 translate-y-0 scale-100 blur-0";
      default:
        return "opacity-100";
    }
  };

  return (
    <>
      {/* Page transition overlay - visible during transition */}
      <div
        className={`fixed inset-0 z-[60] pointer-events-none transition-all duration-300 ease-out ${
          transitionStage === "exiting" || transitionStage === "entering"
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        {/* Dark overlay with gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 transition-all duration-300 ${
            transitionStage === "exiting"
              ? "opacity-100"
              : transitionStage === "entering"
              ? "opacity-80"
              : "opacity-0"
          }`}
        />

        {/* Centered loading indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`transition-all duration-300 ${
              transitionStage === "exiting" || transitionStage === "entering"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
          >
            {/* Animated rings */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-2 border-cyan-400/40 rounded-full animate-ping" />
              <div className="absolute inset-2 border-2 border-cyan-400/60 rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-cyan-400/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Top progress line */}
        <div
          className={`absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 transition-all duration-500 ${
            transitionStage === "exiting"
              ? "w-1/3"
              : transitionStage === "entering"
              ? "w-2/3"
              : "w-full opacity-0"
          }`}
        />
      </div>

      {/* Page content with animation */}
      <div
        className={`transition-all duration-400 ease-out ${getTransitionClasses()}`}
      >
        {displayChildren}
      </div>
    </>
  );
};

export default PageTransition;
