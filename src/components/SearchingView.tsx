import React from 'react';
import { SearchingStep } from '../searching/types';

interface SearchingViewProps {
  step: SearchingStep;
  algorithmId: string;
}

export const SearchingView: React.FC<SearchingViewProps> = ({ step, algorithmId }) => {
  const { arr, inspecting = -1, found = -1, low, mid, high } = step;

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center gap-2 sm:gap-3 px-4 min-h-[320px]">
      {arr.map((val, idx) => {
        let colorClass = "bg-white text-slate-800 border-slate-200 shadow-xs";
        const pointerBadges: React.ReactNode[] = [];

        if (idx === found) {
          colorClass = "bg-emerald-500 text-white border-emerald-600 scale-105 shadow-md ring-2 ring-emerald-300";
        } else if (idx === inspecting) {
          colorClass = "bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-300";
        } else if (low !== undefined && high !== undefined && (idx < low || idx > high)) {
          colorClass = "bg-slate-50 text-slate-400 border-slate-200 opacity-35";
        }

        if (algorithmId === 'binary') {
          if (idx === low) {
            pointerBadges.push(
              <span key="low" className="bg-blue-600 text-white text-[9px] px-1 rounded-xs font-mono font-bold">
                L
              </span>
            );
          }
          if (idx === mid) {
            pointerBadges.push(
              <span key="mid" className="bg-purple-600 text-white text-[9px] px-1 rounded-xs font-mono font-bold">
                M
              </span>
            );
          }
          if (idx === high) {
            pointerBadges.push(
              <span key="high" className="bg-rose-600 text-white text-[9px] px-1 rounded-xs font-mono font-bold">
                H
              </span>
            );
          }
        } else if (algorithmId === 'linear' && idx === inspecting) {
          pointerBadges.push(
            <span key="ptr" className="bg-amber-600 text-white text-[9px] px-1 rounded-xs font-mono font-bold">
              PTR
            </span>
          );
        }

        return (
          <div key={idx} className="flex flex-col items-center gap-1.5 node-item">
            <div className="h-4 flex items-center gap-0.5">
              {pointerBadges}
            </div>
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border flex items-center justify-center font-mono font-bold text-sm sm:text-base select-none ${colorClass}`}
            >
              {val}
            </div>
            <span className="text-[10px] font-mono text-slate-400 select-none">
              {idx}
            </span>
          </div>
        );
      })}
    </div>
  );
};
