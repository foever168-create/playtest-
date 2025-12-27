
import React from 'react';
import { LogEntry } from '../types';

interface LogStreamProps {
  logs: LogEntry[];
}

const LogStream: React.FC<LogStreamProps> = ({ logs }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-900/50 p-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest flex justify-between border-b border-slate-800">
        <span>Timeline</span>
        <span>Observation Event</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-40 italic">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 8V12L15 15" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p className="mt-2 text-xs">等待紀錄資料...</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-4 group">
              <span className="text-[10px] font-mono text-slate-500 pt-1 shrink-0 tabular-nums">
                {new Date(log.timestamp).toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <div className="flex flex-col min-w-0">
                <span className={`text-sm font-medium ${
                  log.type === 'action' ? 'text-amber-300' : 
                  log.type === 'mode' ? 'text-amber-500' : 
                  log.type === 'engagement' ? 'text-emerald-400' : 'text-slate-300'
                }`}>
                  {log.name}
                </span>
                {log.value && (
                  <span className="text-xs text-slate-500 italic truncate">
                    {log.value}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default LogStream;
