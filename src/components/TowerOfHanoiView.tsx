import React from 'react';
import { HanoiStep } from '../backtracking/types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface TowerOfHanoiViewProps {
  step: HanoiStep;
}

// Colors for disks 1 to 5
const DISK_COLORS: Record<number, string> = {
  1: 'bg-emerald-500 border-emerald-600 text-white',
  2: 'bg-sky-500 border-sky-600 text-white',
  3: 'bg-indigo-500 border-indigo-600 text-white',
  4: 'bg-amber-500 border-amber-600 text-white',
  5: 'bg-rose-500 border-rose-600 text-white',
};

export const TowerOfHanoiView: React.FC<TowerOfHanoiViewProps> = ({ step }) => {
  const {
    diskCount,
    pegs,
    movedDisk,
    fromPeg,
    toPeg,
    moveNumber,
    totalMoves,
    isSolved,
  } = step;

  const progressPct = totalMoves > 0 ? (moveNumber / totalMoves) * 100 : 0;

  // Maximum width of largest disk
  const maxWidthPx = 140;
  const minWidthPx = 45;

  const getDiskWidth = (diskVal: number) => {
    if (diskCount === 1) return maxWidthPx;
    const ratio = (diskVal - 1) / (diskCount - 1);
    return minWidthPx + ratio * (maxWidthPx - minWidthPx);
  };

  const pegLabels: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
  const pegSubtitles: Record<'A' | 'B' | 'C', string> = {
    A: 'Source',
    B: 'Auxiliary',
    C: 'Target',
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative min-h-[350px] px-2 py-1 select-none">
      
      {/* Top Progress & Move Status */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">Tower of Hanoi</span>
          <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-bold">
            Move: {moveNumber} / {totalMoves}
          </span>
          {fromPeg && toPeg && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
              <span>Peg {fromPeg}</span>
              <ArrowRight className="w-3 h-3" />
              <span>Peg {toPeg}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Progress bar */}
          <div className="flex-1 sm:w-36 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              style={{ width: `${progressPct}%` }}
              className="h-full bg-emerald-500 transition-all duration-300"
            />
          </div>

          {isSolved && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Complete!</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Pegs & Disks Stage */}
      <div className="flex-1 w-full max-w-2xl flex items-end justify-around px-2 sm:px-6 pt-6 pb-2">
        {pegLabels.map((pegKey) => {
          const diskList = pegs[pegKey] || [];
          const isSource = fromPeg === pegKey;
          const isTarget = toPeg === pegKey;

          let pegPostColor = 'bg-slate-300';
          if (isTarget) pegPostColor = 'bg-emerald-400';
          else if (isSource) pegPostColor = 'bg-amber-400';

          return (
            <div
              key={pegKey}
              className="flex-1 flex flex-col items-center justify-end relative h-56 mx-1 sm:mx-3"
            >
              {/* Peg Post */}
              <div
                className={`w-2.5 sm:w-3 h-44 rounded-t-md transition-colors duration-200 absolute bottom-3 z-0 ${pegPostColor}`}
              />

              {/* Stacked Disks on this Peg (bottom to top) */}
              <div className="w-full flex flex-col-reverse items-center justify-start pb-3 z-10 gap-1 min-h-[160px]">
                {diskList.map((diskVal) => {
                  const isJustMoved = movedDisk === diskVal && isTarget;
                  const diskWidth = getDiskWidth(diskVal);
                  const colorClass =
                    DISK_COLORS[diskVal] || 'bg-slate-700 text-white';

                  return (
                    <div
                      key={diskVal}
                      style={{ width: `${diskWidth}px` }}
                      className={`h-7 sm:h-8 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-xs shadow-xs transition-all duration-200 node-item ${colorClass} ${
                        isJustMoved
                          ? 'scale-105 ring-2 ring-emerald-300 shadow-md'
                          : ''
                      }`}
                    >
                      <span>{diskVal}</span>
                    </div>
                  );
                })}
              </div>

              {/* Peg Wooden Base Platform */}
              <div
                className={`w-full h-3 rounded-md border transition-all z-20 ${
                  isTarget
                    ? 'bg-emerald-600 border-emerald-700'
                    : isSource
                    ? 'bg-amber-500 border-amber-600'
                    : 'bg-slate-700 border-slate-800'
                }`}
              />

              {/* Peg Label & Role */}
              <div className="flex flex-col items-center mt-2">
                <span className="font-mono font-bold text-xs text-slate-800">
                  Peg {pegKey}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {pegSubtitles[pegKey]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Guidance Info */}
      <div className="w-full pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span>Rule: Never place a larger disk on top of a smaller disk</span>
        </div>
        <span className="hidden sm:inline">Recurrence: T(n) = 2T(n-1) + 1</span>
      </div>

    </div>
  );
};
