import React from 'react';
import { CategoryId } from '../types';
import { CollisionMode } from '../datastructures/types';
import { Play, Pause, StepForward, RotateCcw } from 'lucide-react';

interface ControlToolbarProps {
  category: CategoryId;
  algorithmId: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepForward: () => void;
  onReset: () => void;
  // Sorting & Searching inputs
  arrayInputStr: string;
  onChangeArrayInput: (val: string) => void;
  onApplyArray: () => void;
  onRandomizeArray: () => void;
  targetInput: number;
  onChangeTargetInput: (val: number) => void;
  onApplySearchTarget: () => void;
  // Stack / Queue / BST / Linked List inputs
  dsValInput: number;
  onChangeDsVal: (val: number) => void;
  onStackPush: () => void;
  onStackPop: () => void;
  onQueueEnqueue: () => void;
  onQueueDequeue: () => void;
  onBSTInsert: () => void;
  onBSTSample: () => void;
  onBSTSearch: () => void;
  onLLInsertHead: () => void;
  onLLInsertTail: () => void;
  onLLDelete: () => void;
  // Graph inputs
  graphStartNode: number;
  onChangeGraphStartNode: (id: number) => void;
  onSwitchGraphTopology: () => void;
  // Hash Table inputs
  hashKeyInput: number;
  onChangeHashKeyInput: (val: number) => void;
  hashValInput: string;
  onChangeHashValInput: (val: string) => void;
  onHashInsert: () => void;
  onHashSearch: () => void;
  onHashDelete: () => void;
  hashMode: CollisionMode;
  onToggleHashMode: () => void;
  onHashSampleCollision: () => void;
  // Backtracking inputs
  nQueensSize: number;
  onChangeNQueensSize: (size: number) => void;
  onSudokuResetSample: () => void;
  hanoiDiskCount: number;
  onChangeHanoiDiskCount: (count: number) => void;
  // Speed
  speedSliderVal: number;
  onChangeSpeed: (val: number) => void;
}

export const ControlToolbar: React.FC<ControlToolbarProps> = ({
  category,
  algorithmId,
  isPlaying,
  onTogglePlay,
  onStepForward,
  onReset,
  arrayInputStr,
  onChangeArrayInput,
  onApplyArray,
  onRandomizeArray,
  targetInput,
  onChangeTargetInput,
  onApplySearchTarget,
  dsValInput,
  onChangeDsVal,
  onStackPush,
  onStackPop,
  onQueueEnqueue,
  onQueueDequeue,
  onBSTInsert,
  onBSTSample,
  onBSTSearch,
  onLLInsertHead,
  onLLInsertTail,
  onLLDelete,
  graphStartNode,
  onChangeGraphStartNode,
  onSwitchGraphTopology,
  hashKeyInput,
  onChangeHashKeyInput,
  hashValInput,
  onChangeHashValInput,
  onHashInsert,
  onHashSearch,
  onHashDelete,
  hashMode,
  onToggleHashMode,
  onHashSampleCollision,
  nQueensSize,
  onChangeNQueensSize,
  onSudokuResetSample,
  hanoiDiskCount,
  onChangeHanoiDiskCount,
  speedSliderVal,
  onChangeSpeed,
}) => {
  const isGraph = algorithmId === 'graph_bfs' || algorithmId === 'graph_dfs';
  const isHashTable = algorithmId === 'hashtable';

  return (
    <section className="max-w-6xl w-full mx-auto px-3 sm:px-6 pt-3 sm:pt-5 pb-2 sm:pb-3">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        
        {/* Row 1 on mobile: Primary Controls (Play, Step, Reset) + Speed Slider */}
        <div className="flex items-center justify-between sm:justify-start gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onTogglePlay}
              className={`h-9 px-3.5 sm:px-4 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all active:scale-95 shadow-xs cursor-pointer ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              onClick={onStepForward}
              title="Step Forward (1 tick) [Arrow Right]"
              className="h-9 px-2.5 sm:px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <StepForward className="w-3.5 h-3.5" />
              <span>Step</span>
            </button>

            <button
              onClick={onReset}
              title="Reset to initial state [R]"
              className="h-9 px-2.5 sm:px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Speed slider inline on mobile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 shrink-0">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap">Speed</span>
            <input
              type="range"
              min="50"
              max="1000"
              step="25"
              value={speedSliderVal}
              onChange={(e) => onChangeSpeed(Number(e.target.value))}
              className="w-16 sm:w-24 accent-slate-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
          </div>
        </div>

        {/* Row 2 on mobile: Dynamic Context-Aware Input Bar */}
        <div className="flex items-center gap-2 w-full md:flex-1 md:justify-center md:max-w-xl">
          {category === 'sorting' && (
            <div className="flex items-center gap-1.5 w-full">
              <input
                type="text"
                value={arrayInputStr}
                onChange={(e) => onChangeArrayInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onApplyArray()}
                placeholder="e.g. 38, 27, 43, 3, 9"
                className="flex-1 min-w-0 text-xs sm:text-sm font-mono border border-slate-200 rounded-lg px-2.5 py-1.5 focus:border-slate-400 focus:outline-hidden bg-slate-50/50 focus:bg-white transition-all"
              />
              <button
                onClick={onApplyArray}
                className="h-8 px-2.5 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg whitespace-nowrap cursor-pointer transition-all active:scale-95"
              >
                Apply
              </button>
              <button
                onClick={onRandomizeArray}
                className="h-8 px-2.5 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg whitespace-nowrap cursor-pointer transition-all active:scale-95"
              >
                Random
              </button>
            </div>
          )}

          {category === 'searching' && (
            <div className="flex items-center gap-1.5 w-full">
              <input
                type="text"
                value={arrayInputStr}
                onChange={(e) => onChangeArrayInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onApplySearchTarget()}
                placeholder="Array values"
                className="flex-1 min-w-0 text-xs sm:text-sm font-mono border border-slate-200 rounded-lg px-2 py-1.5 focus:border-slate-400 focus:outline-hidden bg-slate-50/50 focus:bg-white transition-all"
              />
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium font-mono">Tgt:</span>
                <input
                  type="number"
                  value={targetInput}
                  onChange={(e) => onChangeTargetInput(Number(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && onApplySearchTarget()}
                  className="w-12 sm:w-14 text-xs sm:text-sm font-mono border border-slate-200 rounded-lg px-1.5 py-1.5 focus:border-slate-400 focus:outline-hidden bg-slate-50/50 focus:bg-white text-center font-bold"
                />
              </div>
              <button
                onClick={onApplySearchTarget}
                className="h-8 px-2 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer transition-all active:scale-95 shrink-0"
              >
                Set
              </button>
              <button
                onClick={onRandomizeArray}
                className="h-8 px-2 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer transition-all active:scale-95 shrink-0"
              >
                Rand
              </button>
            </div>
          )}

          {category === 'datastructures' && algorithmId === 'stack' && (
            <div className="flex items-center gap-2 w-full justify-between sm:justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-mono">Val:</span>
                <input
                  type="number"
                  value={dsValInput}
                  onChange={(e) => onChangeDsVal(Number(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && onStackPush()}
                  placeholder="Val"
                  className="w-14 sm:w-16 text-xs font-mono border border-slate-200 rounded-lg px-2 py-1.5 focus:border-slate-400 focus:outline-hidden text-center font-bold"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onStackPush}
                  className="h-8 px-3 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer active:scale-95 transition-all shadow-2xs"
                >
                  Push
                </button>
                <button
                  onClick={onStackPop}
                  className="h-8 px-3 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer active:scale-95 transition-all"
                >
                  Pop
                </button>
              </div>
            </div>
          )}

          {category === 'datastructures' && algorithmId === 'queue' && (
            <div className="flex items-center gap-2 w-full justify-between sm:justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-mono">Val:</span>
                <input
                  type="number"
                  value={dsValInput}
                  onChange={(e) => onChangeDsVal(Number(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && onQueueEnqueue()}
                  placeholder="Val"
                  className="w-14 sm:w-16 text-xs font-mono border border-slate-200 rounded-lg px-2 py-1.5 focus:border-slate-400 focus:outline-hidden text-center font-bold"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onQueueEnqueue}
                  className="h-8 px-3 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer active:scale-95 transition-all shadow-2xs"
                >
                  Enqueue
                </button>
                <button
                  onClick={onQueueDequeue}
                  className="h-8 px-3 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer active:scale-95 transition-all"
                >
                  Dequeue
                </button>
              </div>
            </div>
          )}

          {category === 'datastructures' && algorithmId === 'bst' && (
            <div className="flex items-center gap-1.5 flex-wrap w-full justify-between sm:justify-center">
              <input
                type="number"
                value={dsValInput}
                onChange={(e) => onChangeDsVal(Number(e.target.value))}
                onKeyDown={(e) => e.key === 'Enter' && onBSTInsert()}
                placeholder="Val"
                className="w-14 text-xs font-mono border border-slate-200 rounded-lg px-2 py-1.5 focus:border-slate-400 focus:outline-hidden text-center font-bold"
              />
              <button
                onClick={onBSTInsert}
                className="h-8 px-2.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer active:scale-95 transition-all shadow-2xs"
              >
                Insert
              </button>
              <button
                onClick={onBSTSearch}
                className="h-8 px-2.5 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer active:scale-95 transition-all"
              >
                Search
              </button>
              <button
                onClick={onBSTSample}
                className="h-8 px-2 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer active:scale-95 transition-all whitespace-nowrap"
              >
                Sample Tree
              </button>
            </div>
          )}

          {category === 'datastructures' && algorithmId === 'linkedlist' && (
            <div className="flex items-center gap-1.5 flex-wrap w-full justify-between sm:justify-center">
              <input
                type="number"
                value={dsValInput}
                onChange={(e) => onChangeDsVal(Number(e.target.value))}
                onKeyDown={(e) => e.key === 'Enter' && onLLInsertHead()}
                placeholder="Val"
                className="w-14 text-xs font-mono border border-slate-200 rounded-lg px-2 py-1.5 focus:border-slate-400 focus:outline-hidden text-center font-bold"
              />
              <button
                onClick={onLLInsertHead}
                title="Insert at beginning"
                className="h-8 px-2.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer active:scale-95 transition-all shadow-2xs"
              >
                + Head
              </button>
              <button
                onClick={onLLInsertTail}
                title="Insert at end"
                className="h-8 px-2.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg cursor-pointer active:scale-95 transition-all shadow-2xs"
              >
                + Tail
              </button>
              <button
                onClick={onLLDelete}
                title="Delete node with value"
                className="h-8 px-2 text-xs font-medium border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer active:scale-95 transition-all"
              >
                Delete
              </button>
            </div>
          )}

          {category === 'datastructures' && isGraph && (
            <div className="flex items-center gap-2 flex-wrap w-full justify-between sm:justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-mono font-medium">Start Node:</span>
                <select
                  value={graphStartNode}
                  onChange={(e) => onChangeGraphStartNode(Number(e.target.value))}
                  className="h-8 px-2 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-lg outline-hidden cursor-pointer"
                >
                  {[0, 1, 2, 3, 4, 5].map((id) => (
                    <option key={id} value={id}>
                      Node {id}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={onSwitchGraphTopology}
                className="h-8 px-2.5 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer active:scale-95 transition-all"
              >
                Switch Layout
              </button>
            </div>
          )}

          {category === 'datastructures' && isHashTable && (
            <div className="flex items-center gap-1.5 flex-wrap w-full justify-between sm:justify-center">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-mono text-slate-500 font-bold">Key:</span>
                <input
                  type="number"
                  value={hashKeyInput}
                  onChange={(e) => onChangeHashKeyInput(Number(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && onHashInsert()}
                  placeholder="Key"
                  className="w-14 text-xs font-mono border border-slate-200 rounded-lg px-1.5 py-1.5 focus:border-slate-400 focus:outline-hidden text-center font-bold"
                />
              </div>

              <input
                type="text"
                value={hashValInput}
                onChange={(e) => onChangeHashValInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onHashInsert()}
                placeholder="Val"
                className="w-16 sm:w-20 text-xs font-mono border border-slate-200 rounded-lg px-2 py-1.5 focus:border-slate-400 focus:outline-hidden"
              />

              <button
                onClick={onHashInsert}
                title="Insert into Hash Table"
                className="h-8 px-2.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer active:scale-95 transition-all shadow-2xs"
              >
                Insert
              </button>

              <button
                onClick={onHashSearch}
                title="Search / Lookup key"
                className="h-8 px-2.5 text-xs font-medium border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer active:scale-95 transition-all"
              >
                Lookup
              </button>

              <button
                onClick={onHashDelete}
                title="Delete key"
                className="h-8 px-2 text-xs font-medium border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer active:scale-95 transition-all"
              >
                Delete
              </button>

              <button
                onClick={onToggleHashMode}
                title="Switch Collision Resolution Mode"
                className="h-8 px-2 text-[11px] font-mono font-medium border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer active:scale-95 transition-all whitespace-nowrap"
              >
                {hashMode === 'chaining' ? 'Chaining' : 'Probing'}
              </button>

              <button
                onClick={onHashSampleCollision}
                title="Insert a key that collides with an existing slot"
                className="h-8 px-2 text-[11px] font-mono font-semibold bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 rounded-lg cursor-pointer active:scale-95 transition-all whitespace-nowrap"
              >
                + Collision Demo
              </button>
            </div>
          )}

          {category === 'backtracking' && algorithmId === 'sudoku' && (
            <div className="flex items-center gap-2 flex-wrap w-full justify-between sm:justify-center">
              <span className="text-xs font-mono text-slate-500">9×9 Puzzle:</span>
              <button
                onClick={onSudokuResetSample}
                className="h-8 px-3 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer active:scale-95 transition-all shadow-2xs"
              >
                Reload Sample Puzzle
              </button>
            </div>
          )}

          {category === 'backtracking' && algorithmId === 'nqueens' && (
            <div className="flex items-center gap-2 flex-wrap w-full justify-between sm:justify-center">
              <span className="text-xs font-mono text-slate-500 font-medium">Board Size:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                {[4, 5, 6, 8].map((size) => (
                  <button
                    key={size}
                    onClick={() => onChangeNQueensSize(size)}
                    className={`h-7 px-2.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                      nQueensSize === size
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {size}×{size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {category === 'backtracking' && algorithmId === 'hanoi' && (
            <div className="flex items-center gap-2 flex-wrap w-full justify-between sm:justify-center">
              <span className="text-xs font-mono text-slate-500 font-medium">Disks:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                {[3, 4, 5].map((count) => (
                  <button
                    key={count}
                    onClick={() => onChangeHanoiDiskCount(count)}
                    className={`h-7 px-3 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                      hanoiDiskCount === count
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {count} Disks ({Math.pow(2, count) - 1} moves)
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
