import React from 'react';
import { DSStep } from '../datastructures/types';

interface QueueViewProps {
  step: DSStep;
}

export const QueueView: React.FC<QueueViewProps> = ({ step }) => {
  const list = step.list || [];
  const { action, index } = step;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 min-h-[320px]">
      <div className="w-full max-w-2xl flex flex-col items-center">
        
        {/* Direction guidance */}
        <div className="flex items-center gap-3 w-full justify-between px-2 text-xs font-mono text-slate-500 mb-2 font-medium">
          <span className="flex items-center gap-1">
            <span className="text-rose-600 font-bold">←</span> Dequeue (Out from Front)
          </span>
          <span className="flex items-center gap-1">
            Enqueue (In at Rear) <span className="text-emerald-600 font-bold">←</span>
          </span>
        </div>

        {/* Pipeline container */}
        <div className="w-full border-y-2 border-dashed border-slate-300 py-4 px-4 flex items-center gap-3 overflow-x-auto min-h-[110px] bg-slate-50/50 rounded-xl custom-scrollbar shadow-inner">
          {list.length === 0 ? (
            <div className="w-full text-center text-slate-400 text-xs font-mono py-4">
              Queue is Empty
            </div>
          ) : (
            list.map((val, idx) => {
              let colorClass = "bg-white text-slate-800 border-slate-300 shadow-xs";

              if (action === 'enqueued' && idx === index) {
                colorClass = "bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-200";
              } else if (action === 'enqueue-start' && idx === index) {
                colorClass = "bg-blue-500 text-white border-blue-600";
              } else if (action === 'inspect' && idx === index) {
                colorClass = "bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-200";
              }

              const isFront = idx === 0;
              const isRear = idx === list.length - 1;

              return (
                <div key={idx} className="flex flex-col items-center gap-1 shrink-0 node-item">
                  <span className="text-[10px] font-mono font-bold text-slate-500 h-3.5">
                    {isFront ? 'FRONT' : isRear ? 'REAR' : ''}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${colorClass}`}
                  >
                    {val}
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">
                    [{idx}]
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
