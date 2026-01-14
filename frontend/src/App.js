import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from "./components/ui/sonner";
import LoadingScreen from "./components/common/LoadingScreen";
import BackToTop from "./components/common/BackToTop";
import HomePage from "./components/pages/HomePage";
import ContactPage from "./components/pages/ContactPage";
import AboutPage from "./components/pages/AboutPage";
import SolutionsPage from "./components/pages/SolutionsPage";
import CaseStudiesPage from "./components/pages/CaseStudiesPage";
import InsightsPage from "./components/pages/InsightsPage";
import InsightDetailPage from "./components/pages/InsightDetailPage";

// Page transition wrapper component
const PageWrapper = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("entering");
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip animation on first mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setTransitionStage("entered");
      return;
    }

    // When location changes, start exit animation
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("exiting");

      // After exit animation, update location and start enter animation
      const exitTimer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("entering");
        window.scrollTo({ top: 0, behavior: "instant" });

        // Complete enter animation
        const enterTimer = setTimeout(() => {
          setTransitionStage("entered");
        }, 400);

        return () => clearTimeout(enterTimer);
      }, 300);

      return () => clearTimeout(exitTimer);
    }
  }, [location, displayLocation]);

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
        {children}
      </div>
    </>
  );
};

// AnimatedRoutes component with location-based transitions
const AnimatedRoutes = () => {
  return (
    <PageWrapper>
      <Routes>
        {/* English Routes */}
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/en" element={<HomePage />} />
        <Route path="/en/about" element={<AboutPage />} />
        <Route path="/en/solutions" element={<SolutionsPage />} />
        <Route path="/en/solutions/:id" element={<SolutionsPage />} />
        <Route path="/en/case-studies" element={<CaseStudiesPage />} />
        <Route path="/en/case-studies/:id" element={<CaseStudiesPage />} />
        <Route path="/en/insights" element={<InsightsPage />} />
        <Route path="/en/insights/:slug" element={<InsightDetailPage />} />
        <Route path="/en/contact" element={<ContactPage />} />

        {/* Indonesian Routes */}
        <Route path="/id" element={<HomePage />} />
        <Route path="/id/tentang" element={<AboutPage />} />
        <Route path="/id/about" element={<AboutPage />} />
        <Route path="/id/solusi" element={<SolutionsPage />} />
        <Route path="/id/solutions" element={<SolutionsPage />} />
        <Route path="/id/solusi/:id" element={<SolutionsPage />} />
        <Route path="/id/studi-kasus" element={<CaseStudiesPage />} />
        <Route path="/id/case-studies" element={<CaseStudiesPage />} />
        <Route path="/id/studi-kasus/:id" element={<CaseStudiesPage />} />
        <Route path="/id/insight" element={<InsightsPage />} />
        <Route path="/id/insights" element={<InsightsPage />} />
        <Route path="/id/insight/:slug" element={<InsightDetailPage />} />
        <Route path="/id/kontak" element={<ContactPage />} />
        <Route path="/id/contact" element={<ContactPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </PageWrapper>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      {/* Main app wrapper - hidden until loading complete to prevent flicker */}
      <div
        className="App"
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
        <BackToTop />
        <Toaster position="top-right" richColors />
      </div>

      {/* Loading screen on top */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
    </LanguageProvider>
  );
}

export default App;
