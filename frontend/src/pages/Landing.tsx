import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Activity, Users, Eye, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, ROUTES } from '../shared/constants';

export const Landing: React.FC = () => {
  const features = [
    {
      title: 'Fan Experience',
      desc: 'Seamless transit routing, seat guidance, concessions queue monitoring, and personalized AI assistants.',
      icon: Users,
      path: ROUTES.FAN_DASHBOARD,
      color: 'from-fifa-green-500 to-emerald-600',
    },
    {
      title: 'Stadium Operations',
      desc: 'Real-time crowd analysis, heatmaps, resource allocation, and predictive logistics for operators.',
      icon: Activity,
      path: ROUTES.OPS_DASHBOARD,
      color: 'from-fifa-gold-500 to-amber-600',
    },
    {
      title: 'Accessibility Center',
      desc: 'Smart navigation for reduced-mobility fans, automated sign language translation, and audio descriptions.',
      icon: Eye,
      path: ROUTES.ACCESSIBILITY,
      color: 'from-sky-500 to-blue-600',
    },
    {
      title: 'Sustainability Tracker',
      desc: 'AI-guided energy consumption, waste classification assistance, and smart water management systems.',
      icon: Leaf,
      path: ROUTES.SUSTAINABILITY,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-fifa-green-800 bg-fifa-green-950/30 text-fifa-green-400 text-xs font-semibold"
        >
          <Shield className="w-4.5 h-4.5" />
          <span>FIFA World Cup 2026 Hackathon Project</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight"
        >
          Welcome to{' '}
          <span className="bg-gradient-to-r from-fifa-green-500 via-fifa-gold-400 to-fifa-green-400 bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
        >
          {APP_TAGLINE}. Elevating crowd operations, safety, sustainability, and inclusivity using state-of-the-art AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to={ROUTES.FAN_DASHBOARD}
            className="flex items-center space-x-2 bg-gradient-to-r from-fifa-green-600 to-fifa-green-700 hover:from-fifa-green-500 hover:to-fifa-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-glow-green transition-all"
          >
            <span>Enter Fan Hub</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </Link>
          <Link
            to={ROUTES.OPS_DASHBOARD}
            className="flex items-center space-x-2 bg-[#121826] border border-[#1f293d] hover:bg-[#1a2335] text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            <span>Launch Command Center</span>
          </Link>
        </motion.div>
      </section>

      {/* Feature Cards Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center tracking-tight">AI command capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group relative rounded-xl border border-[#1f293d] bg-[#121826]/30 p-6 hover:border-fifa-green-800 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`p-3 w-fit rounded-lg bg-gradient-to-tr ${feature.color} text-white mb-4 shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-fifa-green-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{feature.desc}</p>
                </div>
                <Link
                  to={feature.path}
                  className="flex items-center space-x-1 text-sm font-semibold text-fifa-green-400 hover:text-fifa-green-300 w-fit transition-colors"
                >
                  <span>Explore module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
