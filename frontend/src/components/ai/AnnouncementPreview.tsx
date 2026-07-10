import React, { useState } from 'react';
import { Megaphone, Globe } from 'lucide-react';
import type { MultilingualAnnouncement } from '../../types';

interface AnnouncementPreviewProps {
  announcement: MultilingualAnnouncement;
}

type Lang = 'en' | 'es' | 'fr';

export const AnnouncementPreview: React.FC<AnnouncementPreviewProps> = ({ announcement }) => {
  const [lang, setLang] = useState<Lang>('en');

  const languages: { key: Lang; label: string }[] = [
    { key: 'en', label: 'English' },
    { key: 'es', label: 'Español' },
    { key: 'fr', label: 'Français' },
  ];

  const getBroadcastText = () => {
    switch (lang) {
      case 'es': return announcement.spanish;
      case 'fr': return announcement.french;
      default: return announcement.english;
    }
  };

  return (
    <div className="p-4 bg-[#121826]/80 rounded-xl border border-[#1f293d] space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1f293d] pb-2">
        <div className="flex items-center space-x-2 text-sky-400 font-bold uppercase tracking-widest text-[9px]">
          <Megaphone className="w-4 h-4 animate-pulse" />
          <span>Multilingual Broadcast Preview</span>
        </div>
        <div className="flex space-x-1 border border-[#1c263c] rounded bg-black/20 p-0.5">
          {languages.map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                lang === l.key
                  ? 'bg-sky-950/45 border border-sky-800 text-sky-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {l.key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Broadcast Text Box */}
      <div className="relative p-3 bg-black/25 rounded-lg border border-[#1f293d]/50 text-xs text-gray-200 leading-relaxed italic">
        <Globe className="absolute top-2 right-2 w-3.5 h-3.5 text-gray-600" />
        "{getBroadcastText()}"
      </div>
    </div>
  );
};
