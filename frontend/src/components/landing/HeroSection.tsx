import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/constants';

interface HeroSectionProps {
  onLearnMoreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLearnMoreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax mouse movements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transformations for the stadium layers (further layers move less, closer layers move more)
  const rotateX = useTransform(smoothY, [-300, 300], [15, -15]);
  const rotateY = useTransform(smoothX, [-300, 300], [-15, 15]);

  const translateLayer1X = useTransform(smoothX, [-300, 300], [-10, 10]);
  const translateLayer1Y = useTransform(smoothY, [-300, 300], [-10, 10]);

  const translateLayer2X = useTransform(smoothX, [-300, 300], [-20, 20]);
  const translateLayer2Y = useTransform(smoothY, [-300, 300], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      {/* Background Animated Gradients & Glowing particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-fifa-green-950/20 blur-[120px] animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-fifa-gold-950/20 blur-[150px] animate-pulse duration-[8000ms]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Text */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-fifa-green-800/40 bg-fifa-green-950/20 text-fifa-green-400 text-xs font-semibold shadow-glow-green"
          >
            <Shield className="w-4 h-4 text-fifa-green-400" />
            <span className="tracking-wide uppercase text-[10px]">Built for PromptWars 2026</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            AI Command Center for{' '}
            <span className="bg-gradient-to-r from-fifa-green-400 via-fifa-gold-400 to-emerald-400 bg-clip-text text-transparent">
              Stadium Operations
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Real-time operational intelligence, crowd safety management, AI-driven decision support, and volunteer coordination at FIFA-scale matches. Centralized neural command center designed specifically for Stadium Operations Managers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <Link
              to={ROUTES.OPS_DASHBOARD}
              className="group relative flex items-center space-x-2 bg-gradient-to-r from-fifa-green-600 to-fifa-green-700 hover:from-fifa-green-500 hover:to-fifa-green-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-glow-green hover:shadow-glow-green/80 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <span>Launch Operations Center</span>
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={onLearnMoreClick}
              className="flex items-center space-x-2 bg-[#121826]/80 border border-[#1f293d] hover:bg-[#1a2335] hover:border-fifa-gold-500/40 text-gray-300 hover:text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-current text-fifa-gold-400" />
              <span>Learn More</span>
            </button>
          </motion.div>
        </div>

        {/* Futuristic Stadium Parallax SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="lg:col-span-5 flex justify-center items-center relative min-h-[300px] sm:min-h-[450px]"
        >
          {/* Main 3D tilt frame */}
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="w-full max-w-[380px] h-[380px] relative flex items-center justify-center"
          >
            {/* Layer 1: Background grid lines (moves least) */}
            <motion.div 
              style={{ x: translateLayer1X, y: translateLayer1Y, transformStyle: 'preserve-3d' }}
              className="absolute inset-0 flex items-center justify-center opacity-30"
            >
              <div className="w-[300px] h-[300px] rounded-full border border-dashed border-[#1f293d] animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[220px] h-[220px] rounded-full border border-dotted border-[#1f293d]" />
            </motion.div>

            {/* Layer 2: Main Stadium Wireframe (moves moderately) */}
            <motion.div
              style={{ x: translateLayer2X, y: translateLayer2Y, transformStyle: 'preserve-3d', z: 30 }}
              className="absolute flex items-center justify-center"
            >
              {/* Central Glowing Orb representing AI Neural Center */}
              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-fifa-green-500/30 to-fifa-gold-500/30 blur-2xl animate-pulse" />

              <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
                {/* Outermost ring */}
                <ellipse cx="170" cy="170" rx="150" ry="80" stroke="#15803d" strokeWidth="1.5" strokeDasharray="6 6" className="animate-[spin_40s_linear_infinite]" />
                
                {/* Inner arena ring */}
                <ellipse cx="170" cy="170" rx="110" ry="55" stroke="#d9a00d" strokeWidth="2" />
                
                {/* Pitch center */}
                <rect x="130" y="150" width="80" height="40" rx="2" stroke="#22c55e" strokeWidth="1" />
                <ellipse cx="170" cy="170" rx="12" ry="12" stroke="#22c55e" strokeWidth="1" />

                {/* Tactical scanner nodes */}
                <circle cx="50" cy="150" r="4" fill="#22c55e" className="animate-ping" />
                <circle cx="50" cy="150" r="4" fill="#22c55e" />

                <circle cx="290" cy="190" r="4" fill="#ffd700" className="animate-ping" style={{ animationDelay: '1s' }} />
                <circle cx="290" cy="190" r="4" fill="#ffd700" />

                <circle cx="170" cy="100" r="5" fill="#ef4444" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                <circle cx="170" cy="100" r="5" fill="#ef4444" />

                {/* Radar Sweep Arc */}
                <path d="M 170 170 L 60 140 A 150 80 0 0 1 170 90 Z" fill="url(#radarGradient)" opacity="0.25" className="origin-[170px_170px] animate-[spin_6s_linear_infinite]" />

                {/* Defs for gradients */}
                <defs>
                  <linearGradient id="radarGradient" x1="170" y1="170" x2="60" y2="140" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Floating particle clusters */}
            <div className="absolute top-[10%] left-[20%] w-2 h-2 rounded-full bg-fifa-green-400 blur-[1px] animate-bounce" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-[15%] right-[25%] w-1.5 h-1.5 rounded-full bg-fifa-gold-400 blur-[1px] animate-bounce" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            <div className="absolute top-[60%] left-[10%] w-1 h-1 rounded-full bg-sky-400 blur-[0.5px] animate-ping" style={{ animationDuration: '3s' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
