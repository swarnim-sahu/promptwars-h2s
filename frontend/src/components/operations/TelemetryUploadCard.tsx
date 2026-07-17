import React, { useState, useRef, useCallback } from 'react';
import { FileSpreadsheet, AlertCircle, Trash2 } from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import type { AIResponse } from '../../types';
import { TelemetryDropzone } from './telemetry-upload/TelemetryDropzone';
import { TelemetryParsedDashboard } from './telemetry-upload/TelemetryParsedDashboard';

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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const uploadAndParseFile = useCallback(async (targetFile: File) => {
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
  }, []);

  const validateAndProcessFile = useCallback(async (selectedFile: File) => {
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
  }, [uploadAndParseFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  }, [validateAndProcessFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  }, [validateAndProcessFile]);

  const runGeminiAnalysis = useCallback(async () => {
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
  }, [parsedStats, onAnalysisComplete]);

  const clearFile = useCallback(() => {
    setFile(null);
    setParsedStats(null);
    setError(null);
    setUploadProgress(0);
    onReset();
  }, [onReset]);

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/30 shadow-lg space-y-5">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#1f293d]/50 pb-3">
        <div className="flex items-center space-x-3">
          <FileSpreadsheet className="w-5 h-5 text-fifa-gold-400" aria-hidden="true" />
          <h3 className="font-extrabold text-white text-md tracking-tight uppercase">AI Telemetry Ingest & Analytics</h3>
          <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-fifa-gold-950/40 text-fifa-gold-400 border border-fifa-gold-900/30 font-sans uppercase">
            Workflow Step 1: Ingest CSV Data
          </span>
        </div>
        {file && (
          <button
            onClick={clearFile}
            aria-label="Reset telemetry uploader"
            className="flex items-center space-x-1 text-xs text-rose-400 hover:text-rose-300 font-bold border border-rose-950 px-2.5 py-1 rounded-lg bg-rose-950/20 transition-all focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Loader</span>
          </button>
        )}
      </div>

      {/* Drag & Drop Area */}
      {!file && (
        <TelemetryDropzone
          isDragActive={isDragActive}
          fileInputRef={fileInputRef}
          onDrag={handleDrag}
          onDrop={handleDrop}
          onFileInputChange={handleFileInput}
        />
      )}

      {/* Uploading progress indicator */}
      {file && loading && !parsedStats && (
        <div className="p-8 border border-[#1f293d] bg-[#0c1220]/40 rounded-2xl flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-w-xs space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <span>Uploading & Parsing telemetry log...</span>
              <span className="text-white">{uploadProgress}%</span>
            </div>
            <div 
              role="progressbar"
              aria-valuenow={uploadProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${uploadProgress}% uploaded`}
              aria-label="CSV telemetry upload and parsing progress"
              className="w-full bg-[#1c263c] h-1.5 rounded-full overflow-hidden"
            >
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
        <div className="p-4 border border-rose-950 bg-rose-950/10 rounded-xl flex items-start space-x-3 text-xs text-rose-300" role="alert">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1 leading-relaxed">
            <span className="block font-bold text-white">Ingestion Mismatch</span>
            <span className="block">{error}</span>
          </div>
        </div>
      )}

      {/* Ingested Stats Review Dashboard Grid */}
      {parsedStats && (
        <TelemetryParsedDashboard
          fileName={file?.name || ''}
          parsedStats={parsedStats}
          loading={loading}
          onRunGeminiAnalysis={runGeminiAnalysis}
        />
      )}
    </div>
  );
};
