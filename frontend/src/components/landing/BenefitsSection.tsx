import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Award, HelpCircle } from 'lucide-react';

type BenefitTab = 'fans' | 'organizers' | 'volunteers' | 'emergency';

export const BenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BenefitTab>('organizers');

  const tabs: { id: BenefitTab; label: string; icon: any }[] = [
    { id: 'organizers', label: 'For Organizers & Managers', icon: Shield },
    { id: 'emergency', label: 'For Emergency Staff', icon: HelpCircle },
    { id: 'volunteers', label: 'For Volunteer Stewards', icon: Award },
    { id: 'fans', label: 'For Fans (Prototype)', icon: Users },
  ];

  const content = {
    organizers: {
      headline: 'Maximum Stadium Operations Control',
      desc: 'Monitor crowd safety and stadium infrastructure parameters from a unified Explainable AI command console.',
      items: [
        'Real-time crowd flow density heatmaps indicating bottleneck limits.',
        'Actionable AI decision recommendations detail exactly WHY recommendations are generated.',
        'Automated dispatch alerts coordinating volunteer tasks based on telemetry.',
        'Unified dashboard integrating gate queues, concession nodes, and ticket check-ins.',
      ],
      color: 'border-fifa-gold-500/30 text-fifa-gold-400',
    },
    emergency: {
      headline: 'Rapid Tactical Response Coordination',
      desc: 'Accelerate first-responder dispatcher coordination by routing squads through optimal concourse pathways.',
      items: [
        'Priority incident summaries detailing location, logs, and severity thresholds.',
        'Evacuation route calculations automatically directing foot traffic away from risk sectors.',
        'Unified system health dashboard tracking sensor net, emergency net, and camera stream statuses.',
        'Dynamic gate redirect instructions ensuring fast ingress/egress corridor creation.',
      ],
      color: 'border-rose-500/30 text-rose-400',
    },
    volunteers: {
      headline: 'Directed Concourse Walkway Tasks',
      desc: 'Equip volunteer stewards with local checklists and zone directions to manage congestion hotspots.',
      items: [
        'Dynamic task checklists based on AI recommendations logs.',
        'Direct connection to the command center advisory announcements.',
        'Facility reporting parameters tracking escalator or elevator failures.',
        'Visual guides indicating spectator stand entries requiring crowd containment.',
      ],
      color: 'border-sky-500/30 text-sky-400',
    },
    fans: {
      headline: 'Prototype: stress-free match attendance',
      desc: 'Extensible mobile app prototype allowing fans to plan regional transport routes and view gate check-in delays.',
      items: [
        'Transit planner routing to underutilized gates.',
        'Wait-time predictors forecasting restroom and concession queues.',
        'Accessible pathways routing specifically configured for strollers or wheelchair assistance.',
        'Multilingual translation system to read stadium PA broadcast announcements instantly.',
      ],
      color: 'border-fifa-green-500/30 text-fifa-green-400',
    },
  };

  return (
    <section id="solutions" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-fifa-green-400 bg-fifa-green-950/20 px-3 py-1.5 rounded-full border border-fifa-green-800/40">
            Operations Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Targeted Operational Value
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm font-medium leading-relaxed">
            Discover the direct value added for every stakeholder managing match day operations.
          </p>
        </div>

        {/* Tab Selector */}
        <div id="benefits" className="flex flex-wrap justify-center gap-3 border-b border-[#1f293d] pb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all focus:outline-none focus:ring-1 focus:ring-fifa-gold-500 ${
                  isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#121826] border border-[#1f293d] rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <Icon className="w-4.5 h-4.5" />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[300px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left text description */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl font-extrabold text-white">
                  {content[activeTab].headline}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {content[activeTab].desc}
                </p>
                <div className="h-px bg-[#1f293d]/50" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content[activeTab].items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs text-gray-300 font-semibold leading-relaxed">
                      <span className="w-2.5 h-2.5 rounded-full bg-fifa-green-500 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right decorative visual box */}
              <div className="lg:col-span-5 p-8 rounded-2xl border bg-black/10 flex flex-col justify-center space-y-4 border-[#1f293d]">
                <div className="flex items-center space-x-2 border-b border-[#1f293d]/50 pb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-sans">Role Objective</span>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-white font-extrabold uppercase tracking-tight block">Stadium Command Protocol</span>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                    This module connects to the centralized Gemini safety engine, delivering high-confidence decisions directly to the targeted operations teams.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
