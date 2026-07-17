import React, { useState, useCallback, useMemo } from 'react';
import { Megaphone } from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import type { AIResponse } from '../../types';
import { AnnouncementForm } from './announcement-generator/AnnouncementForm';
import { AnnouncementPreview } from './announcement-generator/AnnouncementPreview';

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

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
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
  }, [incidentType, location, severity, description, audience, tone]);

  const activeAnnouncementText = useMemo((): string => {
    if (!result || !result.announcement) return '';
    switch (langTab) {
      case 'es': return result.announcement.spanish;
      case 'fr': return result.announcement.french;
      default: return result.announcement.english;
    }
  }, [result, langTab]);

  // Helper calculating estimated reading duration
  const estimatedReadingTime = useMemo((): string => {
    const words = activeAnnouncementText.split(/\s+/).filter(Boolean).length;
    if (words === 0) return '0s';
    // Average reading latency speed: ~130 words per minute (approx 2.1 words per second)
    const seconds = Math.max(1, Math.round((words / 130) * 60));
    return `${seconds} seconds`;
  }, [activeAnnouncementText]);

  // Helper fetching translation confidence score
  const translationConfidence = useMemo((): number => {
    if (!result) return 0;
    // Map base model confidence to translation margins
    switch (langTab) {
      case 'es': return Math.round(result.confidence * 0.97);
      case 'fr': return Math.round(result.confidence * 0.95);
      default: return result.confidence; // English direct match
    }
  }, [result, langTab]);

  const copyToClipboard = useCallback(async (text: string, setCopiedFlag: (f: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFlag(true);
      setTimeout(() => setCopiedFlag(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  }, []);

  const handleCopyAllLanguages = useCallback(() => {
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
  }, [result, audience, tone, severity, copyToClipboard]);

  const handleDownloadTxt = useCallback(() => {
    const text = activeAnnouncementText;
    if (!text) return;

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `stadiummind-announcement-${langTab.toUpperCase()}-${severity.toLowerCase()}.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [activeAnnouncementText, langTab, severity]);

  const handleCopyActive = useCallback(() => {
    copyToClipboard(activeAnnouncementText, setCopiedActive);
  }, [activeAnnouncementText, copyToClipboard]);

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/30 shadow-lg space-y-5">
      
      {/* Title */}
      <div className="flex items-center space-x-3 border-b border-[#1f293d]/50 pb-3">
        <Megaphone className="w-5 h-5 text-fifa-gold-400" />
        <h3 className="font-extrabold text-white text-md tracking-tight uppercase">AI Multilingual Announcement Generator</h3>
        <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-fifa-gold-950/40 text-fifa-gold-400 border border-fifa-gold-900/30 font-sans uppercase">
          Workflow Step 3: Multilingual PA Script Generator
        </span>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <AnnouncementForm
          incidentType={incidentType}
          setIncidentType={setIncidentType}
          severity={severity}
          setSeverity={setSeverity}
          audience={audience}
          setAudience={setAudience}
          tone={tone}
          setTone={setTone}
          location={location}
          setLocation={setLocation}
          description={description}
          setDescription={setDescription}
          loading={loading}
          onSubmit={handleSubmit}
        />
        <AnnouncementPreview
          loading={loading}
          error={error}
          result={result}
          langTab={langTab}
          setLangTab={setLangTab}
          activeAnnouncementText={activeAnnouncementText}
          estimatedReadingTime={estimatedReadingTime}
          translationConfidence={translationConfidence}
          copiedActive={copiedActive}
          copiedAll={copiedAll}
          onCopyActive={handleCopyActive}
          onCopyAll={handleCopyAllLanguages}
          onDownloadTxt={handleDownloadTxt}
          onRetrySubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
