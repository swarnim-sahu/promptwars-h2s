import React from 'react';
import { motion } from 'framer-motion';
import { Users, Route, ShieldAlert, Accessibility, Leaf, Languages } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'AI Crowd Intelligence',
      desc: 'Predictive bottleneck detection at gates, corridors, and turnstile check-in queues to balance stadium traffic flow.',
      icon: Users,
      color: 'group-hover:text-fifa-green-400 group-hover:bg-fifa-green-950/30 text-fifa-green-400 border-fifa-green-800/30',
    },
    {
      title: 'Operations Flow Routing',
      desc: 'Dynamic concourse routing directing traffic to underutilized gates and exit paths to relieve high crowd pressure.',
      icon: Route,
      color: 'group-hover:text-fifa-gold-400 group-hover:bg-fifa-gold-950/30 text-fifa-gold-400 border-fifa-gold-800/30',
    },
    {
      title: 'AI Dispatch & Comms',
      desc: 'Generates optimal steward task allocations, warning broadcasts, and incident summaries during match day surges.',
      icon: ShieldAlert,
      color: 'group-hover:text-rose-400 group-hover:bg-rose-950/30 text-rose-400 border-rose-800/30',
    },
    {
      title: 'Inclusive Crowd Access',
      desc: 'Ensures accessibility entrance lanes, descriptive guidance, and wheelchair path allocation analytics.',
      icon: Accessibility,
      color: 'group-hover:text-sky-400 group-hover:bg-sky-950/30 text-sky-400 border-sky-800/30',
    },
    {
      title: 'Eco-Event Analytics',
      desc: 'Tracks green metrics, water resource depletion, recycling logs, and HVAC parameters to lower event footprint.',
      icon: Leaf,
      color: 'group-hover:text-emerald-400 group-hover:bg-emerald-950/30 text-emerald-400 border-emerald-800/30',
    },
    {
      title: 'Multilingual PA Scripting',
      desc: 'Formulates clear, safety-oriented PA voice scripts translated instantly across English, Spanish, and French.',
      icon: Languages,
      color: 'group-hover:text-violet-400 group-hover:bg-violet-950/30 text-violet-400 border-violet-800/30',
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-fifa-green-400 bg-fifa-green-950/20 px-3 py-1.5 rounded-full border border-fifa-green-800/40 animate-pulse">
            System Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Comprehensive Operational Suite
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-medium leading-relaxed">
            Discover the six core AI submodules configured to coordinate safety, routing, and green compliance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/30 hover:border-fifa-green-800/60 hover:bg-[#121826]/75 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl border w-fit transition-all duration-300 bg-black/20 ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-fifa-green-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-medium">{feat.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1f293d]/50 flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  <span>Command Module</span>
                  <span className="text-fifa-green-500 font-extrabold">Active Core</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
