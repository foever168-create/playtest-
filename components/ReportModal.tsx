
import React from 'react';
import { ObservationState, TeachingMode, TeachingAction } from '../types';

interface ReportModalProps {
  state: ObservationState;
  subject: string;
  onClose: () => void;
  onReset: () => void;
}

const formatDuration = (s: number) => {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins}分${secs}秒`;
};

const ReportModal: React.FC<ReportModalProps> = ({ state, subject, onClose, onReset }) => {
  
  const generateFormattedText = () => {
    let text = `【Chronos 數位觀課報告】\n`;
    text += `科目：${subject}\n`;
    text += `觀課時間：${new Date(state.startTime!).toLocaleString()}\n`;
    text += `結束時間：${new Date(state.endTime!).toLocaleString()}\n`;
    text += `----------------------------------\n`;
    text += `[教學模式分佈]\n`;
    (Object.entries(state.modeDurations) as [TeachingMode, number][]).forEach(([mode, dur]) => {
      text += `${mode}: ${formatDuration(dur)}\n`;
    });
    text += `\n[教學行為統計]\n`;
    (Object.entries(state.actionCounts) as [TeachingAction, number][]).forEach(([act, count]) => {
      text += `${act}: ${count} 次\n`;
    });
    text += `\n[詳細紀錄流]\n`;
    state.logs.reverse().forEach(log => {
      const time = new Date(log.timestamp).toLocaleTimeString();
      text += `${time} | ${log.name} ${log.value ? `(${log.value})` : ''}\n`;
    });
    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateFormattedText());
    alert('已複製到剪貼簿！');
  };

  const downloadTxt = () => {
    const text = generateFormattedText();
    const blob = new Blob(["\uFEFF" + text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `觀課紀錄_${subject}_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="glass w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col border border-amber-500/30 shadow-2xl">
        <div className="p-6 border-b border-amber-500/10 flex justify-between items-center bg-amber-950/20">
          <div>
            <h2 className="text-xl font-bold text-amber-500">觀課總結報告</h2>
            <p className="text-xs text-slate-400">Session ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">總時長</span>
              <p className="text-2xl font-mono text-amber-400 font-bold">
                {formatDuration(Math.floor((state.endTime! - state.startTime!) / 1000))}
              </p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">觀察科目</span>
              <p className="text-2xl text-slate-200 font-bold">{subject}</p>
            </div>
          </div>

          <div>
             <h3 className="text-sm font-bold text-amber-500/80 mb-3 flex items-center gap-2">
                <div className="w-1 h-3 bg-amber-500 rounded-full" /> 教學模式分析
             </h3>
             <div className="space-y-2">
               {(Object.entries(state.modeDurations) as [TeachingMode, number][]).map(([mode, dur]) => (
                 <div key={mode} className="flex items-center justify-between text-sm bg-slate-900/40 p-2 rounded-lg">
                   <span className="text-slate-400">{mode}</span>
                   <span className="font-mono text-amber-200">{formatDuration(dur)}</span>
                 </div>
               ))}
             </div>
          </div>

          <div>
             <h3 className="text-sm font-bold text-amber-500/80 mb-3 flex items-center gap-2">
                <div className="w-1 h-3 bg-amber-500 rounded-full" /> 行為紀錄摘要
             </h3>
             <div className="flex flex-wrap gap-2">
               {(Object.entries(state.actionCounts) as [TeachingAction, number][]).map(([act, count]) => (
                 <div key={act} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">
                   {act}: <span className="text-amber-400 font-bold">{count}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/80 border-t border-amber-500/10 flex gap-3">
          <button 
            onClick={copyToClipboard}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-sm transition-all border border-slate-700 active:scale-95"
          >
            複製紀錄
          </button>
          <button 
            onClick={downloadTxt}
            className="flex-1 py-3 px-4 Klimt-gradient bg-amber-500 hover:brightness-110 text-slate-950 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-amber-500/20"
          >
            下載 TXT
          </button>
          <button 
            onClick={onReset}
            className="py-3 px-4 bg-red-950/20 border border-red-500/30 text-red-500 rounded-xl font-bold text-sm hover:bg-red-500/10 transition-all active:scale-95"
          >
            重新開始
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
