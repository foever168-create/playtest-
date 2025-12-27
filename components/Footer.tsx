
import React, { useState } from 'react';
import { EngagementLevel } from '../types';

interface FooterProps {
  onEngagement: (level: EngagementLevel) => void;
  onNote: (note: string) => void;
  isSessionActive: boolean;
  isReminderActive: boolean;
}

const Footer: React.FC<FooterProps> = ({ onEngagement, onNote, isSessionActive, isReminderActive }) => {
  const [noteText, setNoteText] = useState('');

  const handleSendNote = () => {
    if (noteText.trim()) {
      onNote(noteText.trim());
      setNoteText('');
    }
  };

  return (
    <footer className={`glass p-4 sm:px-8 border-t border-amber-500/10 transition-all ${isReminderActive ? 'pulse-reminder' : ''}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
        
        {/* Engagement Control */}
        <div className="flex flex-col gap-2 shrink-0">
          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">學生專注度 (Engagement)</label>
          <div className="flex bg-slate-900 p-1 rounded-xl gap-1 border border-slate-800">
            <button 
              onClick={() => onEngagement('high')}
              disabled={!isSessionActive}
              className="px-4 py-2 rounded-lg text-xs font-bold transition-all hover:bg-emerald-500/20 text-emerald-500 border border-transparent active:scale-95 disabled:opacity-30"
            >
              高
            </button>
            <button 
              onClick={() => onEngagement('medium')}
              disabled={!isSessionActive}
              className="px-4 py-2 rounded-lg text-xs font-bold transition-all hover:bg-amber-500/20 text-amber-500 border border-transparent active:scale-95 disabled:opacity-30"
            >
              中
            </button>
            <button 
              onClick={() => onEngagement('low')}
              disabled={!isSessionActive}
              className="px-4 py-2 rounded-lg text-xs font-bold transition-all hover:bg-red-500/20 text-red-500 border border-transparent active:scale-95 disabled:opacity-30"
            >
              低
            </button>
          </div>
        </div>

        {/* Qualitative Input */}
        <div className="flex-1 w-full relative">
          <input 
            type="text" 
            placeholder={isSessionActive ? "輸入質性觀察紀錄..." : "開始觀課以紀錄筆記"}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            disabled={!isSessionActive}
            onKeyDown={(e) => e.key === 'Enter' && handleSendNote()}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl pl-5 pr-12 py-3 text-sm focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-600 text-slate-200"
          />
          <button 
            onClick={handleSendNote}
            disabled={!isSessionActive || !noteText.trim()}
            className="absolute right-2 top-1.5 p-2 rounded-xl bg-amber-500 text-slate-950 disabled:bg-slate-800 disabled:text-slate-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
