"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { companyInfo } from "@/lib/data";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo Animation */}
      <div className="relative mb-8">
        <Image
          src={companyInfo.logo}
          alt={companyInfo.shortName}
          width={80}
          height={80}
          className="animate-pulse"
        />
        {/* Glow effect */}
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
      </div>

      {/* Animated Brand Name - Character by Character Animation */}
      <h1 className="text-2xl font-bold mb-8 flex">
        {companyInfo.shortName.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent opacity-0 animate-fadeInChar"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: "forwards",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-slate-500 text-sm">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
