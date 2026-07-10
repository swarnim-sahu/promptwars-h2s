import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Users, 
  CloudSun, 
  FlameKindling,
  Trash2
} from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import type { AIResponse } from '../../types';

interface TelemetryUploadCardProps {
  onAnalysisComplete: (result: AIResponse) => void;
  onReset: () => void;
}

export const TelemetryUploadCard: React.FC<TelemetryUploadCardProps> = ({ 
  onAnalysisComplete, 
  onReset 
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedStats, setParsedStats] = useState<any | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = async (selectedFile: File) => {
    setError(null);
    setParsedStats(null);

    // 1. File type verification
    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      setError("Unsupported file format. Please upload a valid .csv telemetry spreadsheet.");
      return;
    }

    // 2. File size verification (2MB limit)
    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("File exceeds maximum allowable size. The upload limit is 2MB.");
      return;
    }

    setFile(selectedFile);
    await uploadAndParseFile(selectedFile);
  };

  const uploadAndParseFile = async (targetFile: File) => {
    setLoading(true);
    setUploadProgress(10);
    setError(null);

    try {
      const stats = await geminiService.parseCsvTelemetryFile(targetFile, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 90) / progressEvent.total);
        setUploadProgress(10 + percentCompleted);
      });

      setUploadProgress(100);
      setParsedStats(stats);
    } catch (err: any) {
      console.error("CSV parse failure:", err);
      setError(err.response?.data?.message || err.message || "Failed to validate and parse telemetry CSV file.");
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const runGeminiAnalysis = async () => {
    if (!parsedStats) return;
    setLoading(true);
    setError(null);

    try {
      const result = await geminiService.analyzeCsvTelemetryStats(parsedStats);
      onAnalysisComplete(result);
    } catch (err: any) {
      console.error("Gemini CSV analysis failure:", err);
      setError(err.response?.data?.message || err.message || "Gemini operational analytics analysis aborted.");
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setParsedStats(null);
    setError(null);
    setUploadProgress(0);
    onReset();
  };

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/30 shadow-lg space-y-5">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#1f293d]/50 pb-3">
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="w-5 h-5 text-fifa-gold-400" />
          <h3 className="font-extrabold text-white text-md tracking-tight uppercase">AI Telemetry Ingest & Analytics</h3>
        </div>
        {file && (
          <button
            onClick={clearFile}
            className="flex items-center space-x-1 text-xs text-rose-400 hover:text-rose-300 font-bold border border-rose-950 px-2.5 py-1 rounded-lg bg-rose-950/20 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Loader</span>
          </button>
        )}
      </div>

      {/* Drag & Drop Area */}
      {!file && (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 cursor-pointer transition-all ${
            isDragActive 
              ? 'border-fifa-gold-500 bg-fifa-gold-950/5' 
              : 'border-[#1f293d] bg-[#0c1220]/40 hover:border-[#2b3a56] hover:bg-[#121826]/30'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept=".csv"
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
      )}

      {/* Uploading progress indicator */}
      {file && loading && !parsedStats && (
        <div className="p-8 border border-[#1f293d] bg-[#0c1220]/40 rounded-2xl flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-w-xs space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <span>Uploading & Parsing telemetry log...</span>
              <span className="text-white">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-[#1c263c] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-fifa-gold-500 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Parsing errors */}
      {error && (
        <div className="p-4 border border-rose-950 bg-rose-950/10 rounded-xl flex items-start space-x-3 text-xs text-rose-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <span className="block font-bold text-white">Ingestion Mismatch</span>
            <span className="block">{error}</span>
          </div>
        </div>
      )}

      {/* Ingested Stats Review Dashboard Grid */}
      {parsedStats && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          
          {/* Stats Review Card */}
          <div className="p-5 border border-fifa-green-950 bg-fifa-green-950/5 rounded-2xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-fifa-green-950 pb-2">
              <CheckCircle className="w-4 h-4 text-fifa-green-500" />
              <span className="text-xs font-bold text-white uppercase tracking-tight">Telemetry Statistics Generated ({file?.name})</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
                <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Total records</span>
                <span className="text-white text-md font-mono font-extrabold">{parsedStats.totalRecords}</span>
              </div>

              <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
                <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Average occupancy</span>
                <span className="text-white text-md font-mono font-extrabold">{parsedStats.averageOccupancy}%</span>
              </div>

              <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
                <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Average entry rate</span>
                <span className="text-white text-md font-mono font-extrabold">{parsedStats.averageEntryRate} /min</span>
              </div>

              <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
                <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Total volunteers</span>
                <span className="text-white text-md font-mono font-extrabold flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1 text-gray-500" /> {parsedStats.totalVolunteers}
                </span>
              </div>

              <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
                <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Weather environments</span>
                <span className="text-white text-xs font-semibold truncate flex items-center">
                  <CloudSun className="w-3.5 h-3.5 mr-1 text-sky-400" /> {parsedStats.weatherSummary}
                </span>
              </div>

              <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
                <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Medical reports</span>
                <span className="text-white text-md font-mono font-extrabold">{parsedStats.totalMedical}</span>
              </div>

              <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 col-span-2 space-y-1">
                <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Congestion hotspots</span>
                <span className="text-white text-xs font-bold truncate flex items-center">
                  <FlameKindling className="w-3.5 h-3.5 mr-1 text-rose-500" />
                  {parsedStats.congestedGates.length > 0 
                    ? parsedStats.congestedGates.join(', ') 
                    : 'None flagged (under 80% limit)'
                  }
                </span>
              </div>

            </div>
          </div>

          {/* Analyze CTA button */}
          <div className="flex justify-end pt-1">
            <button
              onClick={runGeminiAnalysis}
              disabled={loading}
              className="flex items-center space-x-2 bg-gradient-to-r from-fifa-gold-500 to-fifa-gold-600 hover:from-fifa-gold-400 hover:to-fifa-gold-500 text-black font-extrabold text-xs px-6 py-3 rounded-xl shadow-glow-gold/15 hover:shadow-glow-gold/35 transition-all disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{loading ? "Generating Report..." : "Analyze Stats with Gemini AI"}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
