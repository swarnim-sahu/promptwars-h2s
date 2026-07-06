import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockAIDecisions } from '../../shared/mockData';
import { Cpu, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const AIDecisionCard: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const decision = mockAIDecisions[activeIdx];

  const toggleAction = (actionKey: string) => {
    setCompletedActions((prev) => ({
      ...prev,
      [actionKey]: !prev[actionKey],
    }));
  };

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/40 shadow-lg space-y-5 flex flex-col justify-between h-full min-h-[480px]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1f293d] pb-4">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-fifa-gold-400" />
          <h3 className="font-extrabold text-white text-lg tracking-tight">AI Decision Advisory</h3>
        </div>
        <div className="flex space-x-1.5">
          {mockAIDecisions.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIdx(i);
                setCompletedActions({});
              }}
              className={`w-5 h-5 rounded-full text-[10px] font-bold border transition-all ${
                activeIdx === i
                  ? 'bg-fifa-gold-500 border-fifa-gold-400 text-black'
                  : 'border-[#1f293d] bg-black/30 text-gray-500 hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={decision.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-4 flex-1 flex flex-col justify-between"
        >
          {/* Main Decision Info & Confidence */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-fifa-gold-400 uppercase tracking-widest">Recommended Action</span>
              <h4 className="text-md font-bold text-white leading-snug">{decision.title}</h4>
            </div>
            
            {/* Radial confidence meter */}
            <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#1c263c" strokeWidth="3" fill="transparent" />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="#d9a00d"
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray={150}
                  strokeDashoffset={150 - (150 * decision.confidence) / 100}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="absolute text-[10px] font-extrabold text-white font-mono">{Math.round(decision.confidence)}%</span>
            </div>
          </div>

          {/* Reasoning Details */}
          <div className="p-3 bg-[#151c2d]/70 rounded-xl border border-[#1f293d]/60 space-y-1 text-xs">
            <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wider flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 text-fifa-gold-400" />Reasoning Basis</span>
            <p className="text-gray-300 leading-relaxed font-medium">{decision.reasoning}</p>
          </div>

          {/* Suggested Actions Checklist */}
          <div className="space-y-2">
            <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wider block">Suggested Execution List</span>
            <div className="space-y-1.5">
              {decision.actions.map((act, index) => {
                const isDone = !!completedActions[`${decision.id}-${index}`];
                return (
                  <button
                    key={index}
                    onClick={() => toggleAction(`${decision.id}-${index}`)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start space-x-2.5 ${
                      isDone
                        ? 'bg-fifa-green-950/20 border-fifa-green-800 text-fifa-green-400'
                        : 'bg-black/20 border-[#1f293d] hover:border-[#2b3a56] text-gray-300'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-fifa-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded border border-gray-600 mt-0.5 flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-gray-500">
                        {index + 1}
                      </span>
                    )}
                    <span className={isDone ? 'line-through text-gray-500 font-medium' : 'font-medium'}>{act}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expected Impact info block */}
          <div className="pt-3 border-t border-[#1f293d]/50 text-xs flex justify-between items-center">
            <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wider flex items-center"><Sparkles className="w-3.5 h-3.5 mr-1 text-fifa-green-500" />Projected Impact</span>
            <span className="text-fifa-green-400 font-bold font-sans text-right max-w-[200px] leading-normal">{decision.impact}</span>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
};
