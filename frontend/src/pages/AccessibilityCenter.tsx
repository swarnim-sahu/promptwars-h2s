import React from 'react';
import { motion } from 'framer-motion';
import { Ear, HelpCircle, Eye, Info } from 'lucide-react';

export const AccessibilityCenter: React.FC = () => {
  const supports = [
    { title: 'Audio Descriptive Commentary', desc: 'Real-time text-to-speech commentary and audio cues for visually impaired fans.', icon: Eye },
    { title: 'Sign Language Assist', desc: 'AI-generated sign translation overlay for announcement displays.', icon: Ear },
    { title: 'Accessible Route Guide', desc: 'Step-by-step navigation avoiding steps, escalators, or heavy crowd bottlenecks.', icon: Info },
    { title: 'Multilingual Sensory Care', desc: 'Calm zone locations and real-time noise level forecasts inside the arena.', icon: HelpCircle },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-[#1f293d] pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight">Accessibility Center</h1>
        <p className="text-gray-400 mt-1">Specialized assistance services powered by inclusive stadium technologies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supports.map((sup, i) => {
          const Icon = sup.icon;
          return (
            <motion.div
              key={sup.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-xl border border-[#1f293d] bg-[#121826]/40 flex space-x-4"
            >
              <div className="p-3 bg-sky-950 text-sky-400 rounded-lg h-fit">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{sup.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{sup.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
