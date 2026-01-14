import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Start fade out
    setIsTransitioning(true);

    // After fade out, update children and fade in
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isTransitioning
          ? "opacity-0 translate-y-2"
          : "opacity-100 translate-y-0"
      }`}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
