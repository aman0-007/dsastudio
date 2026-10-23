import React from 'react';
import { CategoryId, AlgorithmMetadata } from '../types';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  currentCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  algorithms: AlgorithmMetadata[];
  selectedAlgoId: string;
  onSelectAlgorithm: (id: string) => void;
  currentComplexity: string;
  showCodeModal: boolean;
  onToggleCodeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  algorithms,
  selectedAlgoId,
  onSelectAlgorithm,
  currentComplexity,
  showCodeModal,
  onToggleCodeModal,
}) => {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4">
        
        {/* Top bar on mobile / Left section on desktop */}
        <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-mono text-xs sm:text-sm font-semibold tracking-tighter shadow-xs shrink-0">
              &lt;/&gt;
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 text-sm tracking-tight leading-none">DSA Studio</span>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">visual.engine</span>
            </div>
          </div>

          {/* On mobile: Algorithm Select & Code Button positioned right on top row */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <select
              value={selectedAlgoId}
              onChange={(e) => onSelectAlgorithm(e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-2 py-1.5 outline-hidden focus:border-slate-400 focus:ring-1 focus:ring-slate-300 max-w-[140px] truncate"
            >
              {algorithms.map((algo) => (
                <option key={algo.id} value={algo.id}>
                  {algo.name}
                </option>
              ))}
            </select>

            <button
              onClick={onToggleCodeModal}
              title="View Code & Algorithms"
              className={`p-1.5 rounded-lg border text-xs flex items-center justify-center transition-all cursor-pointer ${
                showCodeModal
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Categories Navigation: 4 tabs (Sorting | Searching | Data Structures | Backtracking) */}
        <nav className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/70 text-xs sm:text-sm font-medium w-full sm:w-auto overflow-hidden">
          <button
            onClick={() => onSelectCategory('sorting')}
            className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
              currentCategory === 'sorting'
                ? 'text-slate-900 bg-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sorting
          </button>
          <button
            onClick={() => onSelectCategory('searching')}
            className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
              currentCategory === 'searching'
                ? 'text-slate-900 bg-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Searching
          </button>
          <button
            onClick={() => onSelectCategory('datastructures')}
            className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center whitespace-nowrap ${
              currentCategory === 'datastructures'
                ? 'text-slate-900 bg-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Data Structures
          </button>
          <button
            onClick={() => onSelectCategory('backtracking')}
            className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center whitespace-nowrap ${
              currentCategory === 'backtracking'
                ? 'text-slate-900 bg-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Backtracking
          </button>
        </nav>

        {/* Desktop Only: Algorithm Selector, Complexity & Code viewer toggle */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <select
            value={selectedAlgoId}
            onChange={(e) => onSelectAlgorithm(e.target.value)}
            className="text-xs sm:text-sm font-medium bg-white border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 outline-hidden focus:border-slate-400 focus:ring-2 focus:ring-slate-100 cursor-pointer max-w-[190px] truncate"
          >
            {algorithms.map((algo) => (
              <option key={algo.id} value={algo.id}>
                {algo.name}
              </option>
            ))}
          </select>

          <span
            title="Time Complexity"
            className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap"
          >
            {currentComplexity}
          </span>

          <button
            onClick={onToggleCodeModal}
            title="Algorithm Guide & Code"
            className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              showCodeModal
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">Code &amp; Logic</span>
          </button>
        </div>

      </div>
    </header>
  );
};
