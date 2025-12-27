
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  isSessionActive: boolean;
  onToggleSession: () => void;
  subject: string;
  setSubject: (s: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isSessionActive, onToggleSession, subject, setSubject }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('zh-TW', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('zh-TW', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-amber-500/10">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-wider text-amber-100 flex items-center gap-2">
             <span className="text-amber-500 font-serif">CHRONOS</span>
             <span className="text-xs text-slate-400 font-normal hidden sm:inline">數位觀課儀表板</span>
          </h1>
          <p className="text-amber-500/60 text-[10px] tracking-[0.2em] font-light">ELEVATED OBSERVATION SYSTEM</p>
        </div>
        
        <div className="ml-4 h-10 w-[1px] bg-slate-800" />
        
        <select 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isSessionActive}
          className="bg-slate-900/50 border border-amber-500/30 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-amber-500 transition-all text-amber-200"
        >
          {['國文', '英文', '數學', '自然', '社會', '體育', '藝術', '數位應用'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-2xl font-mono text-amber-400 tabular-nums">{time}</span>
          <span className="text-[10px] text-slate-500 uppercase">System Synchronized</span>
        </div>

        <button 
          onClick={onToggleSession}
          className="relative group transition-transform active:scale-95"
        >
          {isSessionActive ? (
            <div className="flex items-center gap-3 bg-red-950/40 border border-red-500/50 px-4 py-2 rounded-full text-red-400 hover:bg-red-900/40 transition-colors">
               <svg width="24" height="24" viewBox="0 0 24 24" className="filter drop-shadow-sm">
                  <defs>
                    <linearGradient id="stopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#7f1d1d', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <rect x="5" y="5" width="14" height="14" rx="2" fill="url(#stopGrad)" />
               </svg>
               <span className="font-bold tracking-widest text-sm">STOP</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-amber-950/40 border border-amber-500/50 px-4 py-2 rounded-full text-amber-500 hover:bg-amber-900/40 transition-colors">
               <div className="relative w-6 h-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" className="absolute animate-rotate-slow">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" className="ml-0.5">
                    <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                  </svg>
               </div>
               <span className="font-bold tracking-widest text-sm">START</span>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
