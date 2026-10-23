import React from 'react';
import { DSStep, HashItem } from '../datastructures/types';
import { ArrowRight, AlertTriangle, Hash, Sparkles } from 'lucide-react';

interface HashTableViewProps {
  step: DSStep;
  onSelectKey?: (key: number) => void;
}

export const HashTableView: React.FC<HashTableViewProps> = ({
  step,
  onSelectKey,
}) => {
  const table = step.hashTable;
  if (!table) return null;

  const { mode, size, chains, probingSlots } = table;
  const activeSlot = step.hashActiveSlot;
  const computedIndex = step.hashComputedIndex;
  const isCollision = step.hashCollision;
  const activeKey = step.hashActiveKey;
  const activeChainIndex = step.hashActiveChainIndex;
  const probeCount = step.hashProbeCount;

  return (
    <div className="w-full h-full flex flex-col justify-between items-center relative min-h-[340px] px-2 py-1 select-none">
      
      {/* Top Header: Formula & Mode */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            <Hash className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-800">
              Formula: h(key) = key % {size}
            </span>
          </div>
          {computedIndex !== null && computedIndex !== undefined && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
              Computed Slot = [{computedIndex}]
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-500 font-medium">Mode:</span>
          <span
            className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
              mode === 'chaining'
                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            {mode === 'chaining' ? 'Separate Chaining' : 'Linear Probing'}
          </span>
        </div>
      </div>

      {/* Collision Alert Banner */}
      {isCollision && (
        <div className="w-full my-1.5 py-1.5 px-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between gap-2 text-rose-800 text-xs font-medium animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              Collision at slot [{activeSlot}]! Slot already occupied by existing data.
            </span>
          </div>
          <span className="font-mono text-[11px] font-bold bg-rose-100 px-2 py-0.5 rounded-md text-rose-900">
            {mode === 'chaining' ? 'Appending to Chain' : `Probe Step #${probeCount || 1}`}
          </span>
        </div>
      )}

      {/* Main Table Visualization Canvas */}
      <div className="w-full flex-1 overflow-y-auto py-2 custom-scrollbar max-h-[260px] sm:max-h-[300px]">
        {mode === 'chaining' ? (
          /* Separate Chaining Visualizer */
          <div className="space-y-2 w-full max-w-2xl mx-auto">
            {chains.map((chain, slotIdx) => {
              const isSlotActive = activeSlot === slotIdx;
              const isTargetSlot = computedIndex === slotIdx;

              let slotHeaderColor = 'bg-slate-100 text-slate-700 border-slate-200';
              if (isSlotActive) {
                slotHeaderColor = isCollision
                  ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-200'
                  : 'bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-200';
              } else if (isTargetSlot) {
                slotHeaderColor = 'bg-indigo-100 text-indigo-900 border-indigo-300';
              }

              return (
                <div
                  key={slotIdx}
                  className="flex items-center gap-2 sm:gap-3 p-1.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  {/* Bucket Index Header */}
                  <div
                    className={`w-14 sm:w-16 h-10 rounded-lg border flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0 ${slotHeaderColor}`}
                  >
                    <span className="text-[9px] uppercase tracking-wider opacity-75">Slot</span>
                    <span>[{slotIdx}]</span>
                  </div>

                  {/* Chain of items (Linked List) */}
                  <div className="flex items-center gap-1.5 flex-1 overflow-x-auto custom-scrollbar py-0.5">
                    {chain.length === 0 ? (
                      <span className="text-slate-400 font-mono text-[11px] italic px-2">
                        null (empty)
                      </span>
                    ) : (
                      chain.map((item, nodeIdx) => {
                        const isNodeActive =
                          isSlotActive &&
                          (activeChainIndex === nodeIdx ||
                            (activeKey !== null && item.key === activeKey));

                        const isMatchFound =
                          step.action === 'hash-found' && item.key === activeKey;

                        let nodeColor =
                          'bg-white text-slate-800 border-slate-300 shadow-2xs';

                        if (isMatchFound) {
                          nodeColor =
                            'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-md ring-2 ring-emerald-300';
                        } else if (isNodeActive) {
                          nodeColor =
                            'bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-300';
                        }

                        return (
                          <div key={nodeIdx} className="flex items-center shrink-0">
                            <div
                              onClick={() => onSelectKey?.(item.key)}
                              title={`Click to target Key ${item.key}`}
                              className={`flex flex-col items-center justify-center px-2.5 py-1 rounded-lg border font-mono text-xs cursor-pointer transition-all hover:scale-105 ${nodeColor}`}
                            >
                              <span className="font-bold text-[12px]">
                                Key: {item.key}
                              </span>
                              <span className="text-[10px] opacity-80 truncate max-w-[80px]">
                                "{item.value}"
                              </span>
                            </div>

                            {/* Linked List pointer */}
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0" />
                          </div>
                        );
                      })
                    )}

                    {/* Chain Terminator */}
                    {chain.length > 0 && (
                      <span className="text-slate-400 font-mono text-[10px] shrink-0">
                        null
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Linear Probing Visualizer */
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 w-full max-w-3xl mx-auto">
            {probingSlots.map((slot, slotIdx) => {
              const isSlotActive = activeSlot === slotIdx;
              const isComputed = computedIndex === slotIdx;
              const isOccupied = slot !== null && slot !== 'DELETED';
              const isDeleted = slot === 'DELETED';
              const isFound =
                step.action === 'hash-found' &&
                isOccupied &&
                (slot as HashItem).key === activeKey;

              let slotColor = 'bg-white border-slate-200 text-slate-700';

              if (isFound) {
                slotColor =
                  'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300 scale-105 shadow-md';
              } else if (isSlotActive) {
                slotColor = isCollision
                  ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300'
                  : 'bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-300';
              } else if (isDeleted) {
                slotColor = 'bg-slate-50 border-dashed border-slate-300 text-slate-400';
              } else if (isComputed) {
                slotColor = 'bg-indigo-50 border-indigo-200 text-indigo-900';
              }

              return (
                <div
                  key={slotIdx}
                  onClick={() => {
                    if (isOccupied) onSelectKey?.((slot as HashItem).key);
                  }}
                  className={`flex flex-col items-center justify-between p-2 rounded-xl border min-h-[90px] font-mono transition-all ${slotColor} ${
                    isOccupied ? 'cursor-pointer hover:border-slate-400' : ''
                  }`}
                >
                  <div className="w-full flex items-center justify-between text-[10px] font-bold text-inherit opacity-75">
                    <span>[{slotIdx}]</span>
                    {isComputed && <span className="text-[9px]">h(k)</span>}
                  </div>

                  <div className="text-center my-1">
                    {isOccupied ? (
                      <>
                        <div className="text-xs sm:text-sm font-bold">
                          Key: {(slot as HashItem).key}
                        </div>
                        <div className="text-[10px] opacity-80 truncate max-w-[75px]">
                          "{(slot as HashItem).value}"
                        </div>
                      </>
                    ) : isDeleted ? (
                      <span className="text-[10px] font-semibold text-slate-400">
                        Tombstone (DEL)
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Empty</span>
                    )}
                  </div>

                  <div className="text-[9px] text-inherit opacity-60">
                    {isOccupied ? 'Occupied' : isDeleted ? 'Deleted' : 'Free'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Guidance Info */}
      <div className="w-full pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
        <span>Click any node in table to target its key for Lookup or Delete</span>
        <span className="hidden sm:inline">
          Average Time: O(1) &bull; Worst Case: O(n)
        </span>
      </div>

    </div>
  );
};
