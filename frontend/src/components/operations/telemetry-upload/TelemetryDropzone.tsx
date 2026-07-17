import React from 'react';
import { UploadCloud } from 'lucide-react';

interface TelemetryDropzoneProps {
  isDragActive: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TelemetryDropzone: React.FC<TelemetryDropzoneProps> = ({
  isDragActive,
  fileInputRef,
  onDrag,
  onDrop,
  onFileInputChange
}) => {
  return (
    <div
      onDragEnter={onDrag}
      onDragOver={onDrag}
      onDragLeave={onDrag}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
      role="button"
      tabIndex={0}
      aria-label="Drag and drop telemetry log file or press Enter to browse files"
      className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 cursor-pointer transition-all focus:outline-none focus:border-fifa-gold-500 focus:ring-1 focus:ring-fifa-gold-500 ${
        isDragActive 
          ? 'border-fifa-gold-500 bg-fifa-gold-950/5' 
          : 'border-[#1f293d] bg-[#0c1220]/40 hover:border-[#2b3a56] hover:bg-[#121826]/30'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        accept=".csv"
        aria-hidden="true"
        tabIndex={-1}
        className="hidden"
      />
      <div className="p-3 bg-black/40 rounded-full border border-[#1f293d] text-gray-400">
        <UploadCloud className="w-8 h-8 animate-bounce" />
      </div>
      <div className="text-center space-y-1">
        <span className="block text-xs font-bold text-white">Drag & drop telemetry log or click to browse</span>
        <span className="block text-[10px] text-gray-500">Supports standard CSV grids with Timestamp, Gate, Occupancy, Weather, and staff counts (Max: 2MB).</span>
      </div>
    </div>
  );
};
