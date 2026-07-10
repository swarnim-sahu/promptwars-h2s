import React from 'react';

interface ConfidenceIndicatorProps {
  confidence: number;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ confidence, size = 'md' }) => {
  const radius = 24;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const dimensions = {
    sm: 'w-10 h-10 text-[9px]',
    md: 'w-14 h-14 text-xs',
    lg: 'w-20 h-20 text-sm',
  };

  const ringColor = confidence >= 85 ? 'stroke-fifa-green-500' : confidence >= 60 ? 'stroke-fifa-gold-500' : 'stroke-rose-500';

  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${dimensions[size]}`}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#1f293d"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={stroke + 0.5}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${ringColor} transition-all duration-1000`}
        />
      </svg>
      <span className="absolute font-extrabold text-white font-mono">{Math.round(confidence)}%</span>
    </div>
  );
};
