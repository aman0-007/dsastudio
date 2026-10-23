import React from 'react';
import { SudokuStep } from '../backtracking/types';
import { CheckCircle2, AlertOctagon, RotateCcw } from 'lucide-react';

interface SudokuViewProps {
  step: SudokuStep;
}

export const SudokuView: React.FC<SudokuViewProps> = ({ step }) => {
  const {
    grid,
    initialGrid,
    row: activeRow,
    col: activeCol,
    val: activeVal,
    isConflict,
    isBacktracking,
    isSolved,
    conflictCoords = [],
  } = step;

  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative min-h-[350px] px-2 py-1 select-none">
      
      {/* Top Banner / Status */}
      <div className="w-full flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-700">Sudoku 9×9 Grid</span>
          {activeRow !== -1 && activeCol !== -1 && (
            <span className="text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
              Cell [{activeRow}, {activeCol}]
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isConflict && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md animate-pulse">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Conflict with digit {activeVal}</span>
            </span>
          )}
          {isBacktracking && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Backtracking</span>
            </span>
          )}
          {isSolved && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Puzzle Solved!</span>
            </span>
          )}
        </div>
      </div>

      {/* 9x9 Sudoku Grid */}
      <div className="flex-1 flex items-center justify-center py-2 w-full max-w-[340px] sm:max-w-[380px] aspect-square">
        <div className="grid grid-cols-9 border-2 border-slate-800 bg-white rounded-lg shadow-xs overflow-hidden w-full h-full">
          {grid.map((rowArr, r) =>
            rowArr.map((val, c) => {
              const isInitialClue = initialGrid[r][c] !== 0;
              const isCurrentCell = activeRow === r && activeCol === c;
              const isConflictPartner = conflictCoords.some(
                (coord) => coord.row === r && coord.col === c
              );

              // 3x3 Subgrid Borders
              const borderRight =
                c % 3 === 2 && c !== 8 ? 'border-r-2 border-r-slate-800' : 'border-r border-r-slate-200';
              const borderBottom =
                r % 3 === 2 && r !== 8 ? 'border-b-2 border-b-slate-800' : 'border-b border-b-slate-200';

              let cellBg = isInitialClue ? 'bg-slate-100/70' : 'bg-white';
              let textColor = isInitialClue ? 'text-slate-900 font-extrabold' : 'text-indigo-600 font-bold';

              if (isSolved) {
                cellBg = isInitialClue ? 'bg-emerald-50 text-emerald-950 font-bold' : 'bg-emerald-100 text-emerald-800 font-extrabold';
              } else if (isCurrentCell) {
                if (isConflict) {
                  cellBg = 'bg-rose-500 text-white font-extrabold ring-2 ring-rose-300';
                  textColor = 'text-white';
                } else if (isBacktracking) {
                  cellBg = 'bg-amber-300 text-amber-950 font-extrabold';
                  textColor = 'text-amber-950';
                } else {
                  cellBg = 'bg-amber-400 text-amber-950 font-extrabold ring-2 ring-amber-300';
                  textColor = 'text-amber-950';
                }
              } else if (isConflictPartner) {
                cellBg = 'bg-rose-100 text-rose-800 ring-1 ring-rose-400 font-extrabold';
                textColor = 'text-rose-900';
              }

              return (
                <div
                  key={`${r}-${c}`}
                  className={`flex items-center justify-center font-mono text-xs sm:text-sm transition-colors duration-150 ${borderRight} ${borderBottom} ${cellBg} ${textColor}`}
                >
                  {val !== 0 ? val : isCurrentCell && activeVal !== 0 ? activeVal : ''}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Legend & Guide */}
      <div className="w-full pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-200 border border-slate-300"></span>
            <span>Clue</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 border border-amber-500"></span>
            <span>Trying</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 border border-rose-600"></span>
            <span>Conflict</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 border border-emerald-600"></span>
            <span>Solved</span>
          </span>
        </div>
        <span className="hidden sm:inline">Row, Column &amp; 3×3 Box Constraints</span>
      </div>

    </div>
  );
};
