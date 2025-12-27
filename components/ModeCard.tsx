
import React from 'react';
import { TeachingMode } from '../types';

interface ModeCardProps {
  mode: TeachingMode;
  isActive: boolean;
  duration: number;
  onClick: () => void;
  disabled: boolean;
}

const formatDuration = (s: number) => {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ModeCard: React.FC<ModeCardProps> = ({ mode, isActive, duration, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative h-28 rounded-2xl p-4 transition-all overflow-hidden flex flex-col justify-between group
        ${isActive 
          ? 'bg-amber-500 text-slate-950 scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
          : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:border-amber-500/50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Decorative Klimt element */}
      <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none translate-x-4 -translate-y-4`}>
         <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 5" />
         </svg>
      </div>

      <span className={`text-sm font-medium tracking-wide ${isActive ? 'text-slate-900' : 'text-slate-200'}`}>
        {mode}
      </span>

      <div className="flex flex-col items-start">
        <span className={`text-2xl font-mono font-bold tabular-nums ${isActive ? 'text-slate-950' : 'text-amber-500'}`}>
          {formatDuration(duration)}
        </span>
        <span className={`text-[10px] uppercase tracking-tighter ${isActive ? 'text-slate-800' : 'text-slate-600'}`}>
          Cumulative Time
        </span>
      </div>

      {isActive && (
        <div className="absolute top-3 right-3 flex gap-1">
          <div className="w-1 h-1 bg-slate-900 rounded-full animate-bounce" />
          <div className="w-1 h-1 bg-slate-900 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-1 h-1 bg-slate-900 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      )}
    </button>
  );
};

export default ModeCard;
