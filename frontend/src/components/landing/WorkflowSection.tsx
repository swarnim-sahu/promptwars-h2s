import React from 'react';
import { motion } from 'framer-motion';
import { Database, Search, Cpu, CheckCircle } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Collect Stadium Data',
      desc: 'Aggregates live transit signals, ticket verification, and crowd camera feeds.',
      icon: Database,
    },
    {
      step: '02',
      title: 'AI Analysis',
      desc: 'Gemini models process crowd metrics, safety hazards, and resource gaps.',
      icon: Search,
    },
    {
      step: '03',
      title: 'Intelligent Recommendations',
      desc: 'Suggests real-time rerouting, dispatcher assignments, or sensor overrides.',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'Better Match-Day Experience',
      desc: 'Safe, sustainable, and inclusive event logistics for all matches.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-fifa-gold-500 bg-fifa-gold-950/20 px-3 py-1.5 rounded-full border border-fifa-gold-800/40">
            Workflow Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How StadiumMind AI Operates
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Understanding the real-time processing sequence connecting stadium hardware to human coordination.
          </p>
        </div>

        {/* Workflow Line/Stack */}
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-[40px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-fifa-green-600 via-fifa-gold-500 to-fifa-green-500 opacity-30" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
                >
                  {/* Step bubble */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border border-[#1f293d] bg-[#0c1220] flex items-center justify-center text-white relative z-10 hover:border-fifa-green-500 transition-colors shadow-lg">
                      <Icon className="w-7 h-7 text-fifa-gold-400" />
                    </div>
                    {/* Glowing index tag */}
                    <span className="absolute -top-1 -right-1 bg-fifa-green-600 text-white font-mono font-extrabold text-[10px] w-6 h-6 rounded-full flex items-center justify-center border border-black shadow">
                      {item.step}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-white text-lg">{item.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto lg:mx-0">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
