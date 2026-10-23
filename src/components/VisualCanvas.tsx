import React from 'react';
import { CategoryId } from '../types';
import { SortingStep } from '../sorting/types';
import { SearchingStep } from '../searching/types';
import { DSStep } from '../datastructures/types';
import { BacktrackingStep } from '../backtracking/types';
import { Legend } from './Legend';
import { SortingView } from './SortingView';
import { SearchingView } from './SearchingView';
import { StackView } from './StackView';
import { QueueView } from './QueueView';
import { BSTView } from './BSTView';
import { LinkedListView } from './LinkedListView';
import { GraphView } from './GraphView';
import { HashTableView } from './HashTableView';
import { SudokuView } from './SudokuView';
import { NQueensView } from './NQueensView';
import { TowerOfHanoiView } from './TowerOfHanoiView';

interface VisualCanvasProps {
  category: CategoryId;
  algorithmId: string;
  sortingStep?: SortingStep | null;
  searchingStep?: SearchingStep | null;
  dsStep?: DSStep | null;
  backtrackingStep?: BacktrackingStep | null;
  onSelectBSTNode?: (val: number) => void;
  onSelectGraphNode?: (id: number) => void;
  onSelectHashKey?: (key: number) => void;
}

export const VisualCanvas: React.FC<VisualCanvasProps> = ({
  category,
  algorithmId,
  sortingStep,
  searchingStep,
  dsStep,
  backtrackingStep,
  onSelectBSTNode,
  onSelectGraphNode,
  onSelectHashKey,
}) => {
  const isGraph = algorithmId === 'graph_bfs' || algorithmId === 'graph_dfs';
  const isHashTable = algorithmId === 'hashtable';

  return (
    <div className="relative bg-white border border-slate-200/90 rounded-2xl shadow-xs flex-1 min-h-[360px] p-3 sm:p-6 flex flex-col justify-center items-center overflow-hidden w-full max-w-full">
      
      {/* Legend Badge */}
      <Legend algorithmId={algorithmId} />

      {/* Main Canvas Dynamic Routing */}
      <div className="w-full h-full flex justify-center items-center relative min-h-[300px] overflow-hidden">
        {category === 'sorting' && sortingStep && (
          <SortingView step={sortingStep} />
        )}

        {category === 'searching' && searchingStep && (
          <SearchingView step={searchingStep} algorithmId={algorithmId} />
        )}

        {category === 'datastructures' && algorithmId === 'stack' && dsStep && (
          <StackView step={dsStep} />
        )}

        {category === 'datastructures' && algorithmId === 'queue' && dsStep && (
          <QueueView step={dsStep} />
        )}

        {category === 'datastructures' && algorithmId === 'bst' && dsStep && (
          <BSTView step={dsStep} onSelectNode={onSelectBSTNode} />
        )}

        {category === 'datastructures' && algorithmId === 'linkedlist' && dsStep && (
          <LinkedListView step={dsStep} />
        )}

        {category === 'datastructures' && isGraph && dsStep && (
          <GraphView step={dsStep} onSelectStartNode={onSelectGraphNode} />
        )}

        {category === 'datastructures' && isHashTable && dsStep && (
          <HashTableView step={dsStep} onSelectKey={onSelectHashKey} />
        )}

        {category === 'backtracking' && algorithmId === 'sudoku' && backtrackingStep?.sudoku && (
          <SudokuView step={backtrackingStep.sudoku} />
        )}

        {category === 'backtracking' && algorithmId === 'nqueens' && backtrackingStep?.nqueens && (
          <NQueensView step={backtrackingStep.nqueens} />
        )}

        {category === 'backtracking' && algorithmId === 'hanoi' && backtrackingStep?.hanoi && (
          <TowerOfHanoiView step={backtrackingStep.hanoi} />
        )}
      </div>

    </div>
  );
};
