import React from "react";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedGradientText = ({ children, className = "" }: AnimatedGradientTextProps) => {
  const text = String(children) || "";

  return (
    <span className={`group inline-flex items-baseline ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent transition-all duration-500 ease-out group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-slate-100 group-hover:scale-[1.02]"
          style={{
            transitionDelay: `${index * 25}ms`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedGradientText;
