import React from 'react';
import { DSStep } from '../datastructures/types';

interface StackViewProps {
  step: DSStep;
}

export const StackView: React.FC<StackViewProps> = ({ step }) => {
  const list = step.list || [];
  const { action, index } = step;

  // We show top element at the top
  const reversedList = [...list].map((val, originalIdx) => ({
    val,
    originalIdx,
    isTop: originalIdx === list.length - 1
  })).reverse();

  return (
    <div className="w-full h-full flex flex-col justify-end items-center px-4 pb-2 min-h-[320px]">
      <div className="flex flex-col items-center">
        <div className="text-[11px] font-mono text-slate-500 mb-2 font-medium">
          ▼ TOP (LIFO: Push &amp; Pop happen here)
        </div>

        <div className="border-b-4 border-x-4 border-slate-300 rounded-b-xl p-3 min-h-[230px] w-56 sm:w-64 flex flex-col justify-end bg-slate-50/50 shadow-inner">
          {reversedList.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs font-mono">
              Stack is Empty
            </div>
          ) : (
            reversedList.map(({ val, originalIdx, isTop }) => {
              let colorClass = "bg-slate-100 text-slate-800 border-slate-300";

              if (action === 'inspect' && originalIdx === index) {
                colorClass = "bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-200";
              } else if (action === 'pushed' && originalIdx === index) {
                colorClass = "bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-200";
              } else if (action === 'push-start' && originalIdx === index) {
                colorClass = "bg-blue-500 text-white border-blue-600 scale-105";
              }

              return (
                <div
                  key={originalIdx}
                  className={`w-full h-10 rounded-lg border flex items-center justify-between px-3 font-mono text-sm font-semibold mb-1.5 node-item shadow-xs ${colorClass}`}
                >
                  <span className="text-xs text-slate-400 font-normal">[{originalIdx}]</span>
                  <span className="text-base">{val}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    {isTop ? 'TOP' : ''}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
