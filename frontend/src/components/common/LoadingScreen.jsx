import React, { useState, useEffect } from 'react';
import { companyInfo } from '../../data/mock';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onComplete && onComplete();
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
    <div className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      {/* Logo Animation */}
      <div className="relative mb-8">
        <img
          src={companyInfo.logo}
          alt={companyInfo.shortName}
          className="h-20 w-20 animate-pulse"
        />
        {/* Glow effect */}
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
      </div>

      {/* Brand Name */}
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-8">
        {companyInfo.shortName}
      </h1>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-slate-500 text-sm">
        Loading...
      </p>
    </div>
  );
};

export default LoadingScreen;
