import React from 'react';
import { NQueensStep } from '../backtracking/types';
import { Crown, CheckCircle2, AlertOctagon, RotateCcw } from 'lucide-react';

interface NQueensViewProps {
  step: NQueensStep;
}

export const NQueensView: React.FC<NQueensViewProps> = ({ step }) => {
  const {
    boardSize,
    queens,
    currentRow,
    currentCol,
    isConflict,
    isBacktracking,
    isSolved,
    conflictQueen,
  } = step;

  const placedCount = queens.filter((c) => c !== -1).length;

  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative min-h-[350px] px-2 py-1 select-none">
      
      {/* Top Banner / Status */}
      <div className="w-full flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">
            {boardSize}×{boardSize} Chessboard
          </span>
          <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-bold">
            Queens Placed: {placedCount} / {boardSize}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isConflict && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md animate-pulse">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Attacking Conflict</span>
            </span>
          )}
          {isBacktracking && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Backtrack</span>
            </span>
          )}
          {isSolved && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All Queens Safe!</span>
            </span>
          )}
        </div>
      </div>

      {/* Checkered Chessboard */}
      <div className="flex-1 flex items-center justify-center py-2 w-full max-w-[320px] sm:max-w-[360px] aspect-square">
        <div
          style={{
            gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`,
          }}
          className="grid border-4 border-slate-800 rounded-xl shadow-md overflow-hidden w-full h-full"
        >
          {Array.from({ length: boardSize }).map((_, r) =>
            Array.from({ length: boardSize }).map((_, c) => {
              const isDarkSquare = (r + c) % 2 === 1;
              const hasQueen = queens[r] === c;
              const isTestingHere = currentRow === r && currentCol === c;
              const isConflictSource =
                isConflict &&
                conflictQueen &&
                conflictQueen.row === r &&
                conflictQueen.col === c;

              let squareBg = isDarkSquare ? 'bg-slate-200/90' : 'bg-white';
              let squareHighlight = '';

              if (isSolved && hasQueen) {
                squareBg = 'bg-emerald-500 text-white shadow-inner';
              } else if (isTestingHere) {
                if (isConflict) {
                  squareBg = 'bg-rose-500 text-white animate-pulse ring-2 ring-rose-300';
                } else if (isBacktracking) {
                  squareBg = 'bg-amber-300 text-amber-950';
                } else {
                  squareBg = 'bg-amber-400 text-amber-950 ring-2 ring-amber-300';
                }
              } else if (isConflictSource) {
                squareHighlight = 'ring-4 ring-rose-500 bg-rose-100 z-10';
              } else if (hasQueen) {
                squareBg = 'bg-slate-900 text-white shadow-xs';
              }

              return (
                <div
                  key={`${r}-${c}`}
                  className={`flex flex-col items-center justify-center relative font-mono transition-colors duration-150 ${squareBg} ${squareHighlight}`}
                >
                  {/* Row and Col Coordinates on edge squares */}
                  {c === 0 && (
                    <span className="absolute top-0.5 left-1 text-[8px] font-bold opacity-40 select-none">
                      {r}
                    </span>
                  )}
                  {r === boardSize - 1 && (
                    <span className="absolute bottom-0.5 right-1 text-[8px] font-bold opacity-40 select-none">
                      {c}
                    </span>
                  )}

                  {/* Queen Display */}
                  {(hasQueen || (isTestingHere && !isBacktracking)) && (
                    <div className="flex flex-col items-center justify-center animate-in zoom-in-50 duration-150">
                      <span className="text-xl sm:text-2xl filter drop-shadow-xs select-none">
                        👑
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom Legend */}
      <div className="w-full pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="text-sm">👑</span>
            <span>Placed Queen</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 border border-amber-500"></span>
            <span>Testing</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 border border-rose-600"></span>
            <span>Attacked</span>
          </span>
        </div>
        <span className="hidden sm:inline">Row, Column &amp; Diagonal Safety</span>
      </div>

    </div>
  );
};
