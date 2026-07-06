import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { CommandCenterPreview } from '../components/landing/CommandCenterPreview';
import { StatsSection } from '../components/landing/StatsSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { WorkflowSection } from '../components/landing/WorkflowSection';
import { BenefitsSection } from '../components/landing/BenefitsSection';
import { Footer } from '../components/landing/Footer';
import { useApp } from '../context/AppContext';

export const Landing: React.FC = () => {
  const { theme } = useApp();

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate lightweight glowing particle nodes
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    top: `${Math.random() * 90 + 5}%`,
    left: `${Math.random() * 90 + 5}%`,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#090d16] text-[#f3f4f6]' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Background Floating Glowing Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.1, y: 0 }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              y: [-15, 15, -15],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? (particle.id % 2 === 0 ? '#22c55e' : '#ffd700') : '#15803d',
              filter: 'blur(1.5px)',
            }}
          />
        ))}
      </div>

      {/* Main Page Layout Wrapper */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navbar onScrollToSection={handleScrollToSection} />

        {/* Hero Section */}
        <HeroSection onLearnMoreClick={() => handleScrollToSection('preview')} />

        {/* Live Command Center Mock Preview */}
        <CommandCenterPreview />

        {/* Statistics Banner */}
        <StatsSection />

        {/* Section Break/Divider */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1f293d] to-transparent" />
        </div>

        {/* Operational Features */}
        <FeaturesSection />

        {/* Section Break/Divider */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1f293d] to-transparent" />
        </div>

        {/* Process Stepper */}
        <WorkflowSection />

        {/* Section Break/Divider */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1f293d] to-transparent" />
        </div>

        {/* Value Propositions */}
        <BenefitsSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
