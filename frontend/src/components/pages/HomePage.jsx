import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import HeroSection from '../sections/HeroSection';
import TrustStrip from '../sections/TrustStrip';
import PhilosophySection from '../sections/PhilosophySection';
import ExpertiseSection from '../sections/ExpertiseSection';
import HowWeWorkSection from '../sections/HowWeWorkSection';
import ProjectsSection from '../sections/ProjectsSection';
import ClientsSection from '../sections/ClientsSection';
import InsightsSection from '../sections/InsightsSection';
import FinalCtaSection from '../sections/FinalCtaSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <HeroSection />
        <TrustStrip />
        <PhilosophySection />
        <ExpertiseSection />
        <HowWeWorkSection />
        <ProjectsSection />
        <ClientsSection />
        <InsightsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
