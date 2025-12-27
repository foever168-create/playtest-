
import React from 'react';
import { TeachingAction } from '../types';

interface ActionButtonProps {
  action: TeachingAction;
  count: number;
  onClick: () => void;
  disabled: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ action, count, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-3 rounded-xl flex items-center gap-3 border transition-all active:scale-95
        ${disabled 
          ? 'opacity-40 border-slate-800 bg-slate-900/40' 
          : 'border-amber-500/20 bg-slate-900/60 hover:border-amber-500/60 hover:bg-slate-800 group'
        }
      `}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold Klimt-gradient bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors`}>
        {count}
      </div>
      <span className="text-sm text-slate-300 group-hover:text-amber-100 font-medium">{action}</span>
    </button>
  );
};

export default ActionButton;
