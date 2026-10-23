import React from 'react';
import { SortingStep } from '../sorting/types';

interface SortingViewProps {
  step: SortingStep;
}

export const SortingView: React.FC<SortingViewProps> = ({ step }) => {
  const { arr, comparing = [], swapping = [], sorted = [], pivot = null } = step;
  const maxVal = Math.max(...arr, 1);

  return (
    <div className="w-full h-full flex justify-center items-end gap-1.5 sm:gap-3 px-4 pb-4 min-h-[320px]">
      {arr.map((val, idx) => {
        let colorClass = "bg-slate-200 text-slate-700 border-slate-300";

        if (sorted.includes(idx)) {
          colorClass = "bg-emerald-500 text-white border-emerald-600 shadow-sm";
        } else if (swapping.includes(idx)) {
          colorClass = "bg-rose-500 text-white border-rose-600 scale-105 shadow-md";
        } else if (comparing.includes(idx)) {
          colorClass = "bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-200";
        } else if (pivot === idx) {
          colorClass = "bg-indigo-500 text-white border-indigo-600 ring-2 ring-indigo-200";
        }

        const heightPct = Math.max((val / maxVal) * 82, 12);

        return (
          <div
            key={idx}
            className="flex-1 max-w-[54px] flex flex-col items-center gap-1.5 h-full justify-end group transition-all"
          >
            <span className="text-[11px] font-mono font-medium text-slate-500">
              {val}
            </span>
            <div
              style={{ height: `${heightPct}%` }}
              className={`visualizer-bar w-full rounded-lg border flex items-end justify-center pb-1 text-xs font-mono font-bold select-none ${colorClass}`}
            />
            <span className="text-[10px] font-mono text-slate-400 select-none">
              {idx}
            </span>
          </div>
        );
      })}
    </div>
  );
};
