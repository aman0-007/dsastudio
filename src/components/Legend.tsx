import React from 'react';

interface LegendProps {
  algorithmId: string;
}

export const Legend: React.FC<LegendProps> = ({ algorithmId }) => {
  const isGraph = algorithmId === 'graph_bfs' || algorithmId === 'graph_dfs';
  const isHashTable = algorithmId === 'hashtable';
  const isSudokuOrQueens = algorithmId === 'sudoku' || algorithmId === 'nqueens';
  const isHanoi = algorithmId === 'hanoi';

  return (
    <div className="sm:absolute sm:top-3 sm:right-3 mb-2 sm:mb-0 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[10px] sm:text-[11px] font-mono text-slate-600 bg-white/95 sm:backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-slate-200/70 shadow-xs z-10 select-none max-w-full">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-xs bg-slate-200 border border-slate-300"></span>
        <span>
          {isGraph
            ? 'Unvisited'
            : isHashTable
            ? 'Free/Slot'
            : isHanoi
            ? 'Inactive Peg'
            : isSudokuOrQueens
            ? 'Default/Clue'
            : 'Default'}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 border border-amber-500"></span>
        <span>
          {isGraph
            ? 'Current'
            : isHanoi
            ? 'Source Peg'
            : isSudokuOrQueens
            ? 'Testing'
            : 'Inspect'}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 border border-rose-600"></span>
        <span>
          {isHashTable
            ? 'Collision'
            : isGraph
            ? 'Frontier'
            : isHanoi
            ? 'Lifted Disk'
            : isSudokuOrQueens
            ? 'Conflict'
            : 'Action'}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 border border-emerald-600"></span>
        <span>
          {isGraph
            ? 'Visited'
            : isHashTable
            ? 'Found/Set'
            : isHanoi
            ? 'Target Peg'
            : isSudokuOrQueens
            ? 'Safe/Solved'
            : 'Sorted'}
        </span>
      </div>
      {algorithmId === 'quick' && (
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-indigo-500 border border-indigo-600"></span>
          <span>Pivot</span>
        </div>
      )}
    </div>
  );
};
