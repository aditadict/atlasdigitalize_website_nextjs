import React from "react";

// Placeholder Lottie component - Replace with actual Lottie JSON files
const LottieIcon = ({ type, size = 48, className = "" }) => {
  // Simple animated placeholders until you add actual Lottie JSON files
  const iconConfigs = {
    // Tech & Development
    database: {
      colors: ["#06b6d4", "#0891b2"],
      animation: "animate-spin-slow",
      icon: "💾",
    },
    code: {
      colors: ["#06b6d4", "#3b82f6"],
      animation: "animate-pulse",
      icon: "</>",
    },
    server: {
      colors: ["#6366f1", "#8b5cf6"],
      animation: "animate-bounce",
      icon: "🖥️",
    },
    cloud: {
      colors: ["#06b6d4", "#0ea5e9"],
      animation: "animate-pulse",
      icon: "☁️",
    },

    // Business & Analytics
    chart: {
      colors: ["#10b981", "#059669"],
      animation: "animate-pulse",
      icon: "📊",
    },
    users: {
      colors: ["#f59e0b", "#d97706"],
      animation: "animate-bounce",
      icon: "👥",
    },
    building: {
      colors: ["#6b7280", "#4b5563"],
      animation: "animate-pulse",
      icon: "🏢",
    },

    // Communication & Support
    message: {
      colors: ["#06b6d4", "#0891b2"],
      animation: "animate-bounce",
      icon: "💬",
    },
    phone: {
      colors: ["#10b981", "#059669"],
      animation: "animate-pulse",
      icon: "📱",
    },
    mail: {
      colors: ["#f59e0b", "#d97706"],
      animation: "animate-pulse",
      icon: "✉️",
    },

    // Process & Workflow
    settings: {
      colors: ["#6366f1", "#8b5cf6"],
      animation: "animate-spin-slow",
      icon: "⚙️",
    },
    rocket: {
      colors: ["#ef4444", "#dc2626"],
      animation: "animate-bounce",
      icon: "🚀",
    },
    target: {
      colors: ["#10b981", "#059669"],
      animation: "animate-pulse",
      icon: "🎯",
    },

    // Default fallback
    default: {
      colors: ["#06b6d4", "#0891b2"],
      animation: "animate-pulse",
      icon: "✨",
    },
  };

  const config = iconConfigs[type] || iconConfigs.default;

  return (
    <div
      className={`relative flex items-center justify-center rounded-lg bg-gradient-to-br from-${config.colors[0]}/20 to-${config.colors[1]}/20 border border-${config.colors[0]}/30 ${config.animation} ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 rounded-lg opacity-20"
        style={{
          background: `linear-gradient(135deg, ${config.colors[0]}40 0%, ${config.colors[1]}40 100%)`,
        }}
      />

      {/* Icon or text content */}
      <div className="relative z-10 text-white text-xl">{config.icon}</div>

      {/* Optional glow effect */}
      <div
        className="absolute inset-0 rounded-lg blur-sm opacity-30"
        style={{
          background: `linear-gradient(135deg, ${config.colors[0]}20 0%, ${config.colors[1]}20 100%)`,
        }}
      />
    </div>
  );
};

export default LottieIcon;

// Usage examples:
// <LottieIcon type="database" size={64} />
// <LottieIcon type="code" size={48} className="mx-auto" />
// <LottieIcon type="users" size={32} />

// To replace with actual Lottie:
// import Lottie from 'lottie-react';
// import databaseAnimation from '../assets/lottie/database.json';
// return <Lottie animationData={databaseAnimation} style={{width: size, height: size}} className={className} />;
