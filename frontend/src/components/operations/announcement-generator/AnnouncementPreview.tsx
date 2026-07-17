import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Languages, 
  Volume2, 
  Clock, 
  FileText, 
  Check, 
  Copy, 
  Download, 
  RotateCcw 
} from 'lucide-react';
import { LoadingState } from '../../ai/LoadingState';
import { ErrorState } from '../../ai/ErrorState';
import type { AIResponse } from '../../../types';

interface AnnouncementPreviewProps {
  loading: boolean;
  error: string | null;
  result: AIResponse | null;
  langTab: 'en' | 'es' | 'fr';
  setLangTab: (tab: 'en' | 'es' | 'fr') => void;
  activeAnnouncementText: string;
  estimatedReadingTime: string;
  translationConfidence: number;
  copiedActive: boolean;
  copiedAll: boolean;
  onCopyActive: () => void;
  onCopyAll: () => void;
  onDownloadTxt: () => void;
  onRetrySubmit: (e?: React.FormEvent) => void;
}

export const AnnouncementPreview: React.FC<AnnouncementPreviewProps> = ({
  loading,
  error,
  result,
  langTab,
  setLangTab,
  activeAnnouncementText,
  estimatedReadingTime,
  translationConfidence,
  copiedActive,
  copiedAll,
  onCopyActive,
  onCopyAll,
  onDownloadTxt,
  onRetrySubmit
}) => {
  return (
    <div className="flex-1 min-h-[250px] p-5 rounded-2xl border border-[#1f293d] bg-black/10 flex flex-col justify-between">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <LoadingState message="Connecting to Gemini translation engines..." />
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <ErrorState message={error} onRetry={onRetrySubmit} />
          </motion.div>
        ) : result && result.announcement ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 flex-1 flex flex-col justify-between"
          >
            {/* Language tab switcher and confidence score */}
            <div className="flex items-center justify-between border-b border-[#1f293d]/50 pb-3">
              <div 
                role="tablist" 
                aria-label="Announcement languages" 
                className="flex space-x-1 bg-black/20 p-0.5 border border-[#1c263c] rounded-lg"
              >
                {(['en', 'es', 'fr'] as const).map((l) => (
                  <button
                    key={l}
                    role="tab"
                    aria-selected={langTab === l}
                    aria-controls="announcement-text-preview"
                    onClick={() => setLangTab(l)}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all focus:outline-none focus:ring-1 focus:ring-fifa-gold-500 ${
                      langTab === l
                        ? 'bg-fifa-gold-500 border border-fifa-gold-400 text-black shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {l === 'en' ? 'English' : l === 'es' ? 'Español' : 'Français'}
                  </button>
                ))}
              </div>

              {/* Translation Confidence */}
              <div className="flex items-center space-x-1 text-[10px] text-gray-500 font-bold font-sans">
                <Languages className="w-3.5 h-3.5 text-fifa-gold-400" aria-hidden="true" />
                <span>Translation Confidence:</span>
                <span className="text-fifa-gold-400 font-mono">{translationConfidence}%</span>
              </div>
            </div>

            {/* PA Script text preview box */}
            <div 
              id="announcement-text-preview"
              role="tabpanel"
              aria-label={`${langTab === 'en' ? 'English' : langTab === 'es' ? 'Spanish' : 'French'} script preview`}
              className="relative p-4 bg-[#0a0d16] border border-[#1f293d]/70 rounded-xl flex items-start space-x-3 text-xs leading-relaxed italic text-gray-200"
            >
              <Volume2 className="w-4 h-4 text-fifa-gold-500 flex-shrink-0 mt-0.5 animate-pulse" aria-hidden="true" />
              <p lang={langTab} className="flex-1 font-semibold leading-relaxed">
                "{activeAnnouncementText}"
              </p>
            </div>

            {/* Character count & reading timers */}
            <div className="grid grid-cols-2 gap-4 text-[10px] text-gray-500 font-semibold font-sans">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-600" aria-hidden="true" />
                <span>Reading Duration:</span>
                <span className="text-white font-bold">{estimatedReadingTime}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-gray-600" aria-hidden="true" />
                <span>Length:</span>
                <span className="text-white font-bold">{activeAnnouncementText.length} characters</span>
              </div>
            </div>

            {/* Dispatch & broadcast actions list */}
            {result.recommendedActions && (
              <div className="p-3 bg-[#121826]/70 rounded-xl border border-[#1f293d]/60 space-y-1.5 text-[11px] leading-relaxed">
                <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wider block font-sans">Recommended Dispatch Actions</span>
                <ul className="list-disc pl-4 text-gray-300 space-y-0.5 font-medium">
                  {result.recommendedActions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap gap-3 border-t border-[#1f293d]/30 pt-4">
              {/* Copy Active Translation */}
              <button
                onClick={onCopyActive}
                aria-label="Copy active announcement translation to clipboard"
                className="flex-1 flex items-center justify-center space-x-1.5 border border-[#1f293d] hover:bg-black/30 text-white font-bold text-[10px] py-2 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-fifa-gold-500"
              >
                {copiedActive ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-fifa-green-500" aria-hidden="true" />
                    <span className="text-fifa-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>

              {/* Copy All Translations */}
              <button
                onClick={onCopyAll}
                aria-label="Copy all generated translations to clipboard"
                className="flex-1 flex items-center justify-center space-x-1.5 border border-[#1f293d] hover:bg-black/30 text-white font-bold text-[10px] py-2 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-fifa-gold-500"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-fifa-green-500" aria-hidden="true" />
                    <span className="text-fifa-green-400">All Copied!</span>
                  </>
                ) : (
                  <>
                    <Languages className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy All Languages</span>
                  </>
                )}
              </button>

              {/* Download active translation as TXT */}
              <button
                onClick={onDownloadTxt}
                aria-label="Download active announcement translation as text file"
                className="flex-1 flex items-center justify-center space-x-1.5 border border-[#1f293d] hover:bg-black/30 text-white font-bold text-[10px] py-2 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-fifa-gold-500"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download TXT</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-fifa-gold-950/20 flex items-center justify-center border border-fifa-gold-900/30">
              <RotateCcw className="w-5 h-5 text-fifa-gold-400" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white uppercase tracking-tight">No script generated yet</span>
              <p className="text-gray-500 text-[10px] mt-1 max-w-[220px] mx-auto leading-relaxed">
                Specify incident coordinates and details on the left, then click Generate to construct PA broadcasts.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
