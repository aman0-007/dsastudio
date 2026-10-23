import React from 'react';

interface StatusBarProps {
  message: string;
  stepCount: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({ message, stepCount }) => {
  return (
    <div className="bg-slate-900 text-slate-100 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl font-mono text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 border border-slate-800 shadow-sm w-full max-w-full overflow-hidden">
      <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
        <span className="text-slate-500 select-none text-[11px] sm:text-xs uppercase tracking-wider font-semibold shrink-0">
          Status:
        </span>
        <p className="text-slate-200 truncate font-sans text-xs sm:text-sm font-normal">
          {message}
        </p>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2 text-slate-400 text-[11px] sm:text-xs shrink-0 select-none border-t sm:border-t-0 border-slate-800/80 pt-1 sm:pt-0">
        <span className="sm:hidden text-slate-600">Execution Progress</span>
        <span className="font-mono bg-slate-800/80 px-2 py-0.5 rounded-md text-emerald-400">
          Step: {stepCount}
        </span>
      </div>
    </div>
  );
};
