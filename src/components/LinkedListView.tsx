import React from 'react';
import { DSStep } from '../datastructures/types';
import { ArrowRight } from 'lucide-react';

interface LinkedListViewProps {
  step: DSStep;
}

export const LinkedListView: React.FC<LinkedListViewProps> = ({ step }) => {
  const list = step.list || [];
  const { action, index, activePointer } = step;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-2 sm:px-4 min-h-[320px]">
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* Linked list diagram container */}
        <div className="w-full border border-slate-200/90 py-8 px-4 flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto min-h-[160px] bg-slate-50/50 rounded-2xl custom-scrollbar shadow-inner">
          {list.length === 0 ? (
            <div className="text-center text-slate-400 text-xs font-mono py-8">
              Linked List is Empty. Insert a node to get started.
            </div>
          ) : (
            list.map((val, idx) => {
              const isHead = idx === 0;
              const isTail = idx === list.length - 1;
              const isCurrent = idx === index;

              let colorClass = "bg-white text-slate-800 border-slate-300 shadow-xs";

              if (action === 'delete-node' && isCurrent) {
                colorClass = "bg-rose-500 text-white border-rose-600 scale-95 opacity-80 ring-2 ring-rose-300";
              } else if (action === 'traverse' && isCurrent) {
                colorClass = "bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-300";
              } else if ((action === 'insert-head' || action === 'insert-tail') && isCurrent) {
                colorClass = "bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300 scale-105";
              }

              return (
                <div key={idx} className="flex items-center shrink-0">
                  <div className="flex flex-col items-center gap-1.5 node-item">
                    {/* Pointer badge above node */}
                    <div className="h-5 flex items-center justify-center">
                      {isHead && (
                        <span className="text-[10px] font-mono font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-sm shadow-xs">
                          HEAD
                        </span>
                      )}
                      {!isHead && isCurrent && (
                        <span className="text-[10px] font-mono font-bold bg-amber-600 text-white px-1.5 py-0.5 rounded-sm shadow-xs">
                          {activePointer || 'PTR'}
                        </span>
                      )}
                      {!isHead && !isCurrent && isTail && (
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          TAIL
                        </span>
                      )}
                    </div>

                    {/* Node representation: [ Data | Next ] */}
                    <div className={`flex border rounded-xl overflow-hidden transition-all ${colorClass}`}>
                      <div className="w-11 h-12 flex items-center justify-center font-mono font-bold text-sm sm:text-base px-2">
                        {val}
                      </div>
                      <div className="w-6 h-12 border-l border-inherit bg-slate-100/60 flex items-center justify-center text-slate-400 text-xs font-mono">
                        ●
                      </div>
                    </div>

                    {/* Node Index label below */}
                    <span className="text-[10px] font-mono text-slate-400">
                      Node {idx}
                    </span>
                  </div>

                  {/* Arrow pointing to next node */}
                  <div className="px-1.5 sm:px-2 flex flex-col items-center text-slate-400">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    <span className="text-[8px] font-mono text-slate-400">next</span>
                  </div>
                </div>
              );
            })
          )}

          {/* NULL terminator */}
          {list.length > 0 && (
            <div className="flex flex-col items-center shrink-0 pl-1">
              <div className="h-5"></div>
              <div className="w-12 h-12 rounded-xl border border-dashed border-slate-300 bg-slate-100/50 flex items-center justify-center font-mono text-xs font-bold text-slate-400">
                null
              </div>
              <span className="text-[10px] font-mono text-slate-400">End</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
