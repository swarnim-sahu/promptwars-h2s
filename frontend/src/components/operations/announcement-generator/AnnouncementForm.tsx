import React from 'react';
import { Sparkles } from 'lucide-react';

interface AnnouncementFormProps {
  incidentType: string;
  setIncidentType: (val: string) => void;
  severity: string;
  setSeverity: (val: string) => void;
  audience: string;
  setAudience: (val: string) => void;
  tone: string;
  setTone: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  loading: boolean;
  onSubmit: (e?: React.FormEvent) => void;
}

export const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  incidentType,
  setIncidentType,
  severity,
  setSeverity,
  audience,
  setAudience,
  tone,
  setTone,
  location,
  setLocation,
  description,
  setDescription,
  loading,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full xl:w-[350px] space-y-4 flex-shrink-0">
      <div className="grid grid-cols-2 gap-4">
        {/* Incident Type */}
        <div className="space-y-1">
          <label htmlFor="ann-incident-type" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Incident Type</label>
          <select
            id="ann-incident-type"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            aria-label="Select incident category"
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
          <label htmlFor="ann-severity" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Severity</label>
          <select
            id="ann-severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            aria-label="Select severity level"
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
          <label htmlFor="ann-audience" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Target Audience</label>
          <select
            id="ann-audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            aria-label="Select announcement target audience"
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
          <label htmlFor="ann-tone" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Target Tone</label>
          <select
            id="ann-tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            aria-label="Select announcement broadcast tone"
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
        <label htmlFor="ann-location" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Location Coordinates</label>
        <input
          id="ann-location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Sector 108 Gate B"
          aria-label="Incident location description"
          className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-fifa-gold-500"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label htmlFor="ann-description" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Incident details description</label>
        <textarea
          id="ann-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the operational incident details briefly..."
          aria-label="Short description of the incident"
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
  );
};
