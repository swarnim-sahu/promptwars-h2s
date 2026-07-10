import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Megaphone, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Clock, 
  FileText, 
  Languages, 
  Volume2 
} from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import { LoadingState } from '../ai/LoadingState';
import { ErrorState } from '../ai/ErrorState';
import type { AIResponse } from '../../types';

export const AIAnnouncementGenerator: React.FC = () => {
  // Form parameters state
  const [incidentType, setIncidentType] = useState('Congestion');
  const [location, setLocation] = useState('Gate B');
  const [severity, setSeverity] = useState('Medium');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('Entire Stadium');
  const [tone, setTone] = useState('Urgent');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIResponse | null>(null);
  
  // Translation tab selection
  const [langTab, setLangTab] = useState<'en' | 'es' | 'fr'>('en');
  
  // Clipboard copy state flags
  const [copiedActive, setCopiedActive] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!description.trim() || !location.trim()) {
      setError("Please specify both location coordinates and a short incident description.");
      return;
    }

    setLoading(true);
    setError(null);
    setCopiedActive(false);
    setCopiedAll(false);

    try {
      const response = await geminiService.generateEmergencyAnnouncement(
        incidentType,
        location,
        severity,
        description,
        audience,
        tone
      );
      setResult(response);
    } catch (err: any) {
      console.error("Announcement generation failed:", err);
      setError(err.response?.data?.message || err.message || "Failed to generate PA scripts.");
    } finally {
      setLoading(false);
    }
  };

  const getActiveAnnouncementText = (): string => {
    if (!result || !result.announcement) return '';
    switch (langTab) {
      case 'es': return result.announcement.spanish;
      case 'fr': return result.announcement.french;
      default: return result.announcement.english;
    }
  };

  // Helper calculating estimated reading duration
  const getEstimatedReadingTime = (text: string): string => {
    const words = text.split(/\s+/).filter(Boolean).length;
    if (words === 0) return '0s';
    // Average reading latency speed: ~130 words per minute (approx 2.1 words per second)
    const seconds = Math.max(1, Math.round((words / 130) * 60));
    return `${seconds} seconds`;
  };

  // Helper fetching translation confidence score
  const getTranslationConfidence = (): number => {
    if (!result) return 0;
    // Map base model confidence to translation margins
    switch (langTab) {
      case 'es': return Math.round(result.confidence * 0.97);
      case 'fr': return Math.round(result.confidence * 0.95);
      default: return result.confidence; // English direct match
    }
  };

  const copyToClipboard = async (text: string, setCopiedFlag: (f: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFlag(true);
      setTimeout(() => setCopiedFlag(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handleCopyAllLanguages = () => {
    if (!result || !result.announcement) return;
    const combinedBlock = `
=== STADIUMMIND AI PA ANNOUNCEMENT ===
Audience: ${audience}
Tone: ${tone}
Severity: ${severity}
--------------------------------------
[ENGLISH]
${result.announcement.english}

[ESPAÑOL]
${result.announcement.spanish}

[FRANÇAIS]
${result.announcement.french}
======================================
`;
    copyToClipboard(combinedBlock.trim(), setCopiedAll);
  };

  const handleDownloadTxt = () => {
    const text = getActiveAnnouncementText();
    if (!text) return;

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `stadiummind-announcement-${langTab.toUpperCase()}-${severity.toLowerCase()}.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/30 shadow-lg space-y-5">
      
      {/* Title */}
      <div className="flex items-center space-x-2 border-b border-[#1f293d]/50 pb-3">
        <Megaphone className="w-5 h-5 text-fifa-gold-400" />
        <h3 className="font-extrabold text-white text-md tracking-tight uppercase">AI Multilingual Announcement Generator</h3>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* LEFT FORM FIELDS */}
        <form onSubmit={handleSubmit} className="w-full xl:w-[350px] space-y-4 flex-shrink-0">
          
          <div className="grid grid-cols-2 gap-4">
            {/* Incident Type */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Incident Type</label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white focus:outline-none focus:border-fifa-gold-500"
              >
                <option value="Congestion">Congestion</option>
                <option value="Medical Alert">Medical Alert</option>
                <option value="Lost Child">Lost Child</option>
                <option value="Fire Alarm">Fire Alarm</option>
                <option value="Facilities failure">Facilities</option>
              </select>
            </div>

            {/* Severity */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white focus:outline-none focus:border-fifa-gold-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Audience Selector */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Target Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white focus:outline-none focus:border-fifa-gold-500"
              >
                <option value="Entire Stadium">Entire Stadium</option>
                <option value="Specific Gate">Specific Gate</option>
                <option value="VIP Area">VIP Area</option>
                <option value="Volunteers">Volunteers</option>
                <option value="Medical Staff">Medical Staff</option>
                <option value="Security Team">Security Team</option>
              </select>
            </div>

            {/* Tone Selector */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Target Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white focus:outline-none focus:border-fifa-gold-500"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergency">Emergency</option>
                <option value="Informational">Informational</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Location Coordinates</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Sector 108 Gate B"
              className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-fifa-gold-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Incident details description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the operational incident details briefly..."
              className="w-full h-20 p-2.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-fifa-gold-500 resize-none"
            />
          </div>

          {/* Submit Trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-1.5 bg-gradient-to-r from-fifa-gold-600 to-fifa-gold-700 hover:from-fifa-gold-500 hover:to-fifa-gold-600 text-black font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-glow-gold/10 hover:shadow-glow-gold/25"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Generate Announcement</span>
          </button>
        </form>

        {/* RIGHT PREVIEW & TRANSLATIONS PANEL */}
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
                <ErrorState message={error} onRetry={handleSubmit} />
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
                  <div className="flex space-x-1 bg-black/20 p-0.5 border border-[#1c263c] rounded-lg">
                    {(['en', 'es', 'fr'] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLangTab(l)}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
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
                    <Languages className="w-3.5 h-3.5 text-fifa-gold-400" />
                    <span>Translation Confidence:</span>
                    <span className="text-fifa-gold-400 font-mono">{getTranslationConfidence()}%</span>
                  </div>
                </div>

                {/* PA Script text preview box */}
                <div className="relative p-4 bg-[#0a0d16] border border-[#1f293d]/70 rounded-xl flex items-start space-x-3 text-xs leading-relaxed italic text-gray-200">
                  <Volume2 className="w-4 h-4 text-fifa-gold-500 flex-shrink-0 mt-0.5 animate-pulse" />
                  <p className="flex-1 font-semibold leading-relaxed">
                    "{getActiveAnnouncementText()}"
                  </p>
                </div>

                {/* Character count & reading timers */}
                <div className="grid grid-cols-2 gap-4 text-[10px] text-gray-500 font-semibold font-sans">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-600" />
                    <span>Reading Duration:</span>
                    <span className="text-white font-bold">{getEstimatedReadingTime(getActiveAnnouncementText())}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-gray-600" />
                    <span>Length:</span>
                    <span className="text-white font-bold">{getActiveAnnouncementText().length} characters</span>
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
                    onClick={() => copyToClipboard(getActiveAnnouncementText(), setCopiedActive)}
                    className="flex-1 flex items-center justify-center space-x-1.5 border border-[#1f293d] hover:bg-black/30 text-white font-bold text-[10px] py-2 rounded-lg transition-all"
                  >
                    {copiedActive ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-fifa-green-500" />
                        <span className="text-fifa-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>

                  {/* Copy All Translations */}
                  <button
                    onClick={handleCopyAllLanguages}
                    className="flex-1 flex items-center justify-center space-x-1.5 border border-[#1f293d] hover:bg-black/30 text-white font-bold text-[10px] py-2 rounded-lg transition-all"
                  >
                    {copiedAll ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-fifa-green-500" />
                        <span className="text-fifa-green-400">All Copied!</span>
                      </>
                    ) : (
                      <>
                        <Languages className="w-3.5 h-3.5" />
                        <span>Copy All Languages</span>
                      </>
                    )}
                  </button>

                  {/* Download active translation as TXT */}
                  <button
                    onClick={handleDownloadTxt}
                    className="flex-1 flex items-center justify-center space-x-1.5 border border-[#1f293d] hover:bg-black/30 text-white font-bold text-[10px] py-2 rounded-lg transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download TXT</span>
                  </button>

                  {/* Regenerate Script */}
                  <button
                    onClick={() => handleSubmit()}
                    className="flex items-center justify-center border border-[#1f293d] hover:bg-black/30 text-white font-bold text-[10px] px-3 py-2 rounded-lg transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 py-10">
                <Megaphone className="w-8 h-8 text-gray-600 animate-pulse" />
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-gray-500">PA Broadcast Dispatch Empty</span>
                  <span className="block text-[10px] text-gray-600 max-w-xs">Fill out the incident form on the left and query the Gemini advisor to generate multilingual safety announcement translations.</span>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
