/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CategoryId, AlgorithmMetadata } from './types';
import {
  SORTING_ALGORITHMS,
  bubbleSortGen,
  quickSortGen,
  insertionSortGen,
  mergeSortGen,
  selectionSortGen,
  SortingStep,
} from './sorting';
import {
  SEARCHING_ALGORITHMS,
  linearSearchGen,
  binarySearchGen,
  jumpSearchGen,
  SearchingStep,
} from './searching';
import {
  DATASTRUCTURE_METADATA,
  BSTNode,
  buildDefaultBST,
  bstInsert,
  bstInorderGen,
  bstSearchGen,
  stackDemoGen,
  queueDemoGen,
  linkedListTraverseGen,
  linkedListInsertHeadGen,
  linkedListInsertTailGen,
  linkedListDeleteGen,
  buildDefaultGraph,
  buildStarGraph,
  graphBFSGen,
  graphDFSGen,
  buildDefaultHashTable,
  hashInsertGen,
  hashSearchGen,
  hashDeleteGen,
  hashDemoCycleGen,
  GraphState,
  HashTableState,
  CollisionMode,
  DSStep,
} from './datastructures';
import {
  BACKTRACKING_ALGORITHMS,
  sudokuSolverGen,
  nQueensGen,
  towerOfHanoiGen,
  SAMPLE_SUDOKU,
  cloneGrid,
  BacktrackingStep,
} from './backtracking';
import { Header } from './components/Header';
import { ControlToolbar } from './components/ControlToolbar';
import { VisualCanvas } from './components/VisualCanvas';
import { StatusBar } from './components/StatusBar';
import { AlgorithmInfoModal } from './components/AlgorithmInfoModal';

const DEFAULT_ARRAY = [38, 27, 43, 3, 9, 82, 10, 19, 50, 61, 23];
const DEFAULT_DS_LIST = [12, 28, 45, 67];

export default function App() {
  // Navigation & Algorithm state
  const [category, setCategory] = useState<CategoryId>('backtracking');
  const [algorithmId, setAlgorithmId] = useState<string>('hanoi');
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);

  // Data sets for sorting/searching
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [arrayInputStr, setArrayInputStr] = useState<string>(DEFAULT_ARRAY.join(', '));
  const [target, setTarget] = useState<number>(19);
  const [targetInput, setTargetInput] = useState<number>(19);

  // Data structure collections
  const [dsList, setDsList] = useState<number[]>(DEFAULT_DS_LIST);
  const [dsValInput, setDsValInput] = useState<number>(50);
  const [bstRoot, setBstRoot] = useState<BSTNode>(() => buildDefaultBST());

  // Graph state
  const [graphState, setGraphState] = useState<GraphState>(() => buildDefaultGraph());
  const [graphStartNode, setGraphStartNode] = useState<number>(0);
  const [graphTopology, setGraphTopology] = useState<'default' | 'star'>('default');

  // Hash Table state
  const [hashMode, setHashMode] = useState<CollisionMode>('chaining');
  const [hashTableState, setHashTableState] = useState<HashTableState>(() =>
    buildDefaultHashTable('chaining')
  );
  const [hashKeyInput, setHashKeyInput] = useState<number>(31);
  const [hashValInput, setHashValInput] = useState<string>('Omega');

  // Backtracking state
  const [sudokuGrid, setSudokuGrid] = useState<number[][]>(() => cloneGrid(SAMPLE_SUDOKU));
  const [nQueensSize, setNQueensSize] = useState<number>(4);
  const [hanoiDiskCount, setHanoiDiskCount] = useState<number>(3);

  // Visualizer step representations
  const [sortingStep, setSortingStep] = useState<SortingStep | null>(null);
  const [searchingStep, setSearchingStep] = useState<SearchingStep | null>(null);
  const [dsStep, setDsStep] = useState<DSStep | null>(null);
  const [backtrackingStep, setBacktrackingStep] = useState<BacktrackingStep | null>(null);

  // Playback execution state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepCount, setStepCount] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>(
    'Visualizer ready. Click Play or Step Forward.'
  );
  const [activeCodeLine, setActiveCodeLine] = useState<number | undefined>(undefined);

  // Speed (inverted: higher slider value = faster execution / smaller delay)
  const [speedSliderVal, setSpeedSliderVal] = useState<number>(400);

  // References for playback loop and generator
  const generatorRef = useRef<Generator<any> | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  isPlayingRef.current = isPlaying;

  // Calculate delay from slider value (inverted)
  const getDelay = useCallback(() => {
    const min = 40;
    const max = 1000;
    return max - speedSliderVal + min;
  }, [speedSliderVal]);

  // Current category algorithm list
  const currentAlgos = React.useMemo<AlgorithmMetadata[]>(() => {
    if (category === 'sorting') return Object.values(SORTING_ALGORITHMS);
    if (category === 'searching') return Object.values(SEARCHING_ALGORITHMS);
    if (category === 'datastructures') return Object.values(DATASTRUCTURE_METADATA);
    return Object.values(BACKTRACKING_ALGORITHMS);
  }, [category]);

  const currentMetadata = React.useMemo<AlgorithmMetadata>(() => {
    if (category === 'sorting') return SORTING_ALGORITHMS[algorithmId] || SORTING_ALGORITHMS.bubble;
    if (category === 'searching') return SEARCHING_ALGORITHMS[algorithmId] || SEARCHING_ALGORITHMS.linear;
    if (category === 'datastructures') return DATASTRUCTURE_METADATA[algorithmId] || DATASTRUCTURE_METADATA.hashtable;
    return BACKTRACKING_ALGORITHMS[algorithmId] || BACKTRACKING_ALGORITHMS.hanoi;
  }, [category, algorithmId]);

  // Create fresh generator based on active algorithm
  const createGenerator = useCallback(() => {
    switch (algorithmId) {
      case 'bubble':
        return bubbleSortGen(array);
      case 'quick':
        return quickSortGen(array);
      case 'insertion':
        return insertionSortGen(array);
      case 'merge':
        return mergeSortGen(array);
      case 'selection':
        return selectionSortGen(array);
      case 'linear':
        return linearSearchGen(array, target);
      case 'binary':
        return binarySearchGen(array, target);
      case 'jump':
        return jumpSearchGen(array, target);
      case 'stack':
        return stackDemoGen(dsList);
      case 'queue':
        return queueDemoGen(dsList);
      case 'bst':
        return bstInorderGen(bstRoot);
      case 'linkedlist':
        return linkedListTraverseGen(dsList);
      case 'graph_bfs':
        return graphBFSGen(graphState, graphStartNode);
      case 'graph_dfs':
        return graphDFSGen(graphState, graphStartNode);
      case 'hashtable':
        return hashDemoCycleGen(hashTableState);
      case 'sudoku':
        return sudokuSolverGen(sudokuGrid);
      case 'nqueens':
        return nQueensGen(nQueensSize);
      case 'hanoi':
        return towerOfHanoiGen(hanoiDiskCount);
      default:
        return towerOfHanoiGen(hanoiDiskCount);
    }
  }, [
    algorithmId,
    array,
    target,
    dsList,
    bstRoot,
    graphState,
    graphStartNode,
    hashTableState,
    sudokuGrid,
    nQueensSize,
    hanoiDiskCount,
  ]);

  // Handle single visual step render
  const applyStep = useCallback(
    (val: any) => {
      if (!val) return;
      if (val.msg) setStatusMessage(val.msg);
      if (val.codeLine !== undefined) setActiveCodeLine(val.codeLine);

      if (category === 'sorting') {
        setSortingStep(val as SortingStep);
      } else if (category === 'searching') {
        setSearchingStep(val as SearchingStep);
      } else if (category === 'datastructures') {
        setDsStep(val as DSStep);
        if (val.hashTable) {
          setHashTableState(val.hashTable);
        }
      } else {
        setBacktrackingStep(val as BacktrackingStep);
      }
    },
    [category]
  );

  // Pause playback
  const pause = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Step Forward action
  const stepForward = useCallback((): boolean => {
    if (!generatorRef.current) {
      generatorRef.current = createGenerator();
    }

    const { value, done } = generatorRef.current.next();
    if (done) {
      pause();
      return false;
    }

    setStepCount((prev) => prev + 1);
    applyStep(value);
    return true;
  }, [createGenerator, pause, applyStep]);

  // Play action
  const play = useCallback(() => {
    if (!generatorRef.current) {
      generatorRef.current = createGenerator();
    }
    setIsPlaying(true);

    const runLoop = () => {
      if (!isPlayingRef.current) return;
      const hasNext = stepForward();
      if (hasNext) {
        timerRef.current = setTimeout(runLoop, getDelay());
      } else {
        pause();
      }
    };

    timerRef.current = setTimeout(runLoop, getDelay());
  }, [createGenerator, stepForward, getDelay, pause]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  // Reset visualizer state
  const resetState = useCallback(() => {
    pause();
    generatorRef.current = null;
    setStepCount(0);
    setActiveCodeLine(undefined);

    if (category === 'sorting') {
      setSortingStep({
        arr: array,
        comparing: [],
        swapping: [],
        sorted: [],
        msg: 'Array reset. Ready to run.',
      });
      setStatusMessage('Array reset. Ready to run.');
    } else if (category === 'searching') {
      const displayArr = algorithmId === 'linear' ? array : [...array].sort((a, b) => a - b);
      setSearchingStep({
        arr: displayArr,
        inspecting: -1,
        found: -1,
        msg: `Ready to search for target: ${target}.`,
      });
      setStatusMessage(`Ready to search for target: ${target}.`);
    } else if (algorithmId === 'stack') {
      setDsStep({
        list: dsList,
        action: null,
        index: -1,
        msg: 'Stack reset. Use Demo or Push/Pop.',
      });
      setStatusMessage('Stack reset. Use Demo or Push/Pop.');
    } else if (algorithmId === 'queue') {
      setDsStep({
        list: dsList,
        action: null,
        index: -1,
        msg: 'Queue reset. Use Demo or Enqueue/Dequeue.',
      });
      setStatusMessage('Queue reset. Use Demo or Enqueue/Dequeue.');
    } else if (algorithmId === 'bst') {
      setDsStep({
        bst: bstRoot,
        activeNode: null,
        visited: [],
        msg: 'BST ready. Inorder traversal will visit nodes in ascending order.',
      });
      setStatusMessage('BST ready. Inorder traversal will visit nodes in ascending order.');
    } else if (algorithmId === 'linkedlist') {
      setDsStep({
        list: dsList,
        action: null,
        index: -1,
        msg: `Linked List ready with ${dsList.length} nodes. HEAD points to node 0 (${dsList[0]}).`,
      });
      setStatusMessage(`Linked List ready with ${dsList.length} nodes.`);
    } else if (algorithmId === 'graph_bfs' || algorithmId === 'graph_dfs') {
      const isBFS = algorithmId === 'graph_bfs';
      setDsStep({
        graph: graphState,
        activeNode: graphStartNode,
        activeEdge: null,
        visited: [],
        frontier: [graphStartNode],
        frontierType: isBFS ? 'queue' : 'stack',
        traversalOrder: [],
        msg: `Graph ready. ${isBFS ? 'BFS' : 'DFS'} from Node ${graphStartNode}. Click Play or Step.`,
      });
      setStatusMessage(`Graph ready. ${isBFS ? 'BFS' : 'DFS'} from Node ${graphStartNode}.`);
    } else if (algorithmId === 'hashtable') {
      setDsStep({
        hashTable: hashTableState,
        hashComputedIndex: null,
        hashActiveSlot: null,
        hashActiveKey: null,
        hashCollision: false,
        msg: `Hash Table initialized with size M = 7 (${hashMode === 'chaining' ? 'Separate Chaining' : 'Linear Probing'}).`,
      });
      setStatusMessage(`Hash Table ready (${hashMode === 'chaining' ? 'Separate Chaining' : 'Linear Probing'}).`);
    } else if (algorithmId === 'sudoku') {
      setBacktrackingStep({
        sudoku: {
          grid: cloneGrid(sudokuGrid),
          initialGrid: cloneGrid(SAMPLE_SUDOKU),
          row: -1,
          col: -1,
          val: 0,
          msg: 'Sudoku puzzle ready. Click Play or Step to run recursive Backtracking solver.',
        },
        msg: 'Sudoku puzzle ready.',
      });
      setStatusMessage('Sudoku puzzle ready. Click Play or Step to solve.');
    } else if (algorithmId === 'nqueens') {
      setBacktrackingStep({
        nqueens: {
          boardSize: nQueensSize,
          queens: Array(nQueensSize).fill(-1),
          currentRow: 0,
          currentCol: -1,
          msg: `N-Queens (${nQueensSize}×${nQueensSize}) chessboard ready. Click Play or Step.`,
        },
        msg: `N-Queens (${nQueensSize}×${nQueensSize}) chessboard ready.`,
      });
      setStatusMessage(`N-Queens (${nQueensSize}×${nQueensSize}) ready.`);
    } else if (algorithmId === 'hanoi') {
      const totalMoves = Math.pow(2, hanoiDiskCount) - 1;
      setBacktrackingStep({
        hanoi: {
          diskCount: hanoiDiskCount,
          pegs: {
            A: Array.from({ length: hanoiDiskCount }, (_, i) => hanoiDiskCount - i),
            B: [],
            C: [],
          },
          moveNumber: 0,
          totalMoves,
          msg: `Tower of Hanoi (${hanoiDiskCount} disks) ready. Required moves = ${totalMoves}. Click Play or Step.`,
        },
        msg: `Tower of Hanoi (${hanoiDiskCount} disks) ready.`,
      });
      setStatusMessage(`Tower of Hanoi (${hanoiDiskCount} disks) ready. Total moves: ${totalMoves}.`);
    }
  }, [
    pause,
    category,
    algorithmId,
    array,
    target,
    dsList,
    bstRoot,
    graphState,
    graphStartNode,
    hashTableState,
    hashMode,
    sudokuGrid,
    nQueensSize,
    hanoiDiskCount,
  ]);

  // On category switch
  const handleSelectCategory = useCallback(
    (cat: CategoryId) => {
      pause();
      generatorRef.current = null;
      setCategory(cat);

      if (cat === 'sorting') {
        setAlgorithmId('bubble');
      } else if (cat === 'searching') {
        setAlgorithmId('linear');
      } else if (cat === 'datastructures') {
        setAlgorithmId('hashtable');
      } else {
        setAlgorithmId('hanoi');
      }
    },
    [pause]
  );

  // On algorithm change
  const handleSelectAlgorithm = useCallback(
    (id: string) => {
      pause();
      generatorRef.current = null;
      setAlgorithmId(id);
    },
    [pause]
  );

  // Synchronize reset when category, algorithm, or base data changes
  useEffect(() => {
    resetState();
  }, [
    category,
    algorithmId,
    array,
    target,
    dsList,
    bstRoot,
    graphState,
    graphStartNode,
    hashTableState,
    sudokuGrid,
    nQueensSize,
    hanoiDiskCount,
    resetState,
  ]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stepForward();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        resetState();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, stepForward, resetState]);

  // Sorting / Searching Custom Array
  const handleApplyArray = () => {
    const parsed = arrayInputStr
      .split(',')
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length > 1) {
      const capped = parsed.slice(0, 16);
      setArray(capped);
      setArrayInputStr(capped.join(', '));
      resetState();
    }
  };

  const handleRandomizeArray = () => {
    const len = Math.floor(Math.random() * 5) + 8;
    const arr: number[] = [];
    for (let i = 0; i < len; i++) {
      arr.push(Math.floor(Math.random() * 88) + 10);
    }
    setArray(arr);
    setArrayInputStr(arr.join(', '));
    if (category === 'searching') {
      const newTarget = Math.random() > 0.3 ? arr[Math.floor(Math.random() * arr.length)] : 42;
      setTarget(newTarget);
      setTargetInput(newTarget);
    }
    resetState();
  };

  const handleApplySearchTarget = () => {
    handleApplyArray();
    if (!isNaN(targetInput)) {
      setTarget(targetInput);
      resetState();
    }
  };

  // Stack Manual Operations
  const handleStackPush = () => {
    if (!isNaN(dsValInput)) {
      pause();
      const updated = [...dsList, dsValInput];
      setDsList(updated);
      setDsStep({
        list: updated,
        action: 'pushed',
        index: updated.length - 1,
        msg: `Pushed ${dsValInput} onto the stack.`,
      });
      setStatusMessage(`Pushed ${dsValInput} onto the stack.`);
    }
  };

  const handleStackPop = () => {
    if (dsList.length > 0) {
      pause();
      const updated = [...dsList];
      const popped = updated.pop();
      setDsList(updated);
      setDsStep({
        list: updated,
        action: 'popped',
        val: popped,
        index: updated.length,
        msg: `Popped ${popped} from the stack.`
      });
      setStatusMessage(`Popped ${popped} from the stack.`);
    }
  };

  // Queue Manual Operations
  const handleQueueEnqueue = () => {
    if (!isNaN(dsValInput)) {
      pause();
      const updated = [...dsList, dsValInput];
      setDsList(updated);
      setDsStep({
        list: updated,
        action: 'enqueued',
        index: updated.length - 1,
        msg: `Enqueued ${dsValInput} at the rear.`,
      });
      setStatusMessage(`Enqueued ${dsValInput} at the rear.`);
    }
  };

  const handleQueueDequeue = () => {
    if (dsList.length > 0) {
      pause();
      const updated = [...dsList];
      const dequeued = updated.shift();
      setDsList(updated);
      setDsStep({
        list: updated,
        action: 'dequeued',
        val: dequeued,
        index: 0,
        msg: `Dequeued ${dequeued} from the front.`,
      });
      setStatusMessage(`Dequeued ${dequeued} from the front.`);
    }
  };

  // BST Manual Operations
  const handleBSTInsert = () => {
    if (!isNaN(dsValInput)) {
      pause();
      const newRoot = bstInsert(bstRoot, dsValInput);
      setBstRoot(newRoot);
      setDsStep({
        bst: newRoot,
        activeNode: dsValInput,
        visited: [],
        msg: `Inserted ${dsValInput} into the Binary Search Tree.`,
      });
      setStatusMessage(`Inserted ${dsValInput} into the Binary Search Tree.`);
    }
  };

  const handleBSTSample = () => {
    pause();
    const freshRoot = buildDefaultBST();
    setBstRoot(freshRoot);
    setDsStep({
      bst: freshRoot,
      activeNode: null,
      visited: [],
      msg: 'Reset sample Binary Search Tree with balanced values [15, 25, 35, 45, 55, 65, 75].',
    });
    setStatusMessage('Sample BST loaded.');
  };

  const handleBSTSearch = () => {
    if (!isNaN(dsValInput)) {
      pause();
      generatorRef.current = bstSearchGen(bstRoot, dsValInput);
      setIsPlaying(true);

      const runLoop = () => {
        if (!isPlayingRef.current) return;
        const hasNext = stepForward();
        if (hasNext) {
          timerRef.current = setTimeout(runLoop, getDelay());
        } else {
          pause();
        }
      };

      timerRef.current = setTimeout(runLoop, getDelay());
    }
  };

  // Linked List Manual Operations
  const handleLLInsertHead = () => {
    if (!isNaN(dsValInput)) {
      pause();
      const updated = [dsValInput, ...dsList];
      setDsList(updated);
      generatorRef.current = linkedListInsertHeadGen(dsList, dsValInput);
      stepForward();
    }
  };

  const handleLLInsertTail = () => {
    if (!isNaN(dsValInput)) {
      pause();
      const updated = [...dsList, dsValInput];
      setDsList(updated);
      generatorRef.current = linkedListInsertTailGen(dsList, dsValInput);
      stepForward();
    }
  };

  const handleLLDelete = () => {
    if (!isNaN(dsValInput)) {
      pause();
      generatorRef.current = linkedListDeleteGen(dsList, dsValInput);
      setIsPlaying(true);

      const runLoop = () => {
        if (!isPlayingRef.current) return;
        const hasNext = stepForward();
        if (hasNext) {
          timerRef.current = setTimeout(runLoop, getDelay());
        } else {
          setDsList((prev) => prev.filter((v) => v !== dsValInput));
          pause();
        }
      };

      timerRef.current = setTimeout(runLoop, getDelay());
    }
  };

  // Graph Operations
  const handleSelectGraphNode = (id: number) => {
    pause();
    setGraphStartNode(id);
    setStatusMessage(`Selected Node ${id} as start node. Click Play or Step.`);
  };

  const handleSwitchGraphTopology = () => {
    pause();
    if (graphTopology === 'default') {
      const star = buildStarGraph();
      setGraphState(star);
      setGraphTopology('star');
      setStatusMessage('Switched to Star Network topology.');
    } else {
      const def = buildDefaultGraph();
      setGraphState(def);
      setGraphTopology('default');
      setStatusMessage('Switched to Connected Mesh topology.');
    }
  };

  // Hash Table Operations
  const handleHashInsert = () => {
    if (!isNaN(hashKeyInput)) {
      pause();
      generatorRef.current = hashInsertGen(
        hashTableState,
        hashKeyInput,
        hashValInput || `Val_${hashKeyInput}`
      );
      setIsPlaying(true);

      const runLoop = () => {
        if (!isPlayingRef.current) return;
        const hasNext = stepForward();
        if (hasNext) {
          timerRef.current = setTimeout(runLoop, getDelay());
        } else {
          pause();
        }
      };

      timerRef.current = setTimeout(runLoop, getDelay());
    }
  };

  const handleHashSearch = () => {
    if (!isNaN(hashKeyInput)) {
      pause();
      generatorRef.current = hashSearchGen(hashTableState, hashKeyInput);
      setIsPlaying(true);

      const runLoop = () => {
        if (!isPlayingRef.current) return;
        const hasNext = stepForward();
        if (hasNext) {
          timerRef.current = setTimeout(runLoop, getDelay());
        } else {
          pause();
        }
      };

      timerRef.current = setTimeout(runLoop, getDelay());
    }
  };

  const handleHashDelete = () => {
    if (!isNaN(hashKeyInput)) {
      pause();
      generatorRef.current = hashDeleteGen(hashTableState, hashKeyInput);
      setIsPlaying(true);

      const runLoop = () => {
        if (!isPlayingRef.current) return;
        const hasNext = stepForward();
        if (hasNext) {
          timerRef.current = setTimeout(runLoop, getDelay());
        } else {
          pause();
        }
      };

      timerRef.current = setTimeout(runLoop, getDelay());
    }
  };

  const handleToggleHashMode = () => {
    pause();
    const nextMode: CollisionMode =
      hashMode === 'chaining' ? 'probing' : 'chaining';
    setHashMode(nextMode);
    const fresh = buildDefaultHashTable(nextMode);
    setHashTableState(fresh);
    setStatusMessage(
      `Switched collision mode to ${
        nextMode === 'chaining' ? 'Separate Chaining' : 'Linear Probing'
      }.`
    );
  };

  const handleHashSampleCollision = () => {
    pause();
    setHashKeyInput(31);
    setHashValInput('Omega');
    generatorRef.current = hashInsertGen(hashTableState, 31, 'Omega');
    setIsPlaying(true);

    const runLoop = () => {
      if (!isPlayingRef.current) return;
      const hasNext = stepForward();
      if (hasNext) {
        timerRef.current = setTimeout(runLoop, getDelay());
      } else {
        pause();
      }
    };

    timerRef.current = setTimeout(runLoop, getDelay());
  };

  const handleSelectHashKey = (key: number) => {
    setHashKeyInput(key);
    setStatusMessage(`Targeted Key ${key}. Ready to Lookup or Delete.`);
  };

  // Backtracking Operations
  const handleSudokuResetSample = () => {
    pause();
    const fresh = cloneGrid(SAMPLE_SUDOKU);
    setSudokuGrid(fresh);
    resetState();
  };

  const handleChangeNQueensSize = (size: number) => {
    pause();
    setNQueensSize(size);
  };

  const handleChangeHanoiDiskCount = (count: number) => {
    pause();
    setHanoiDiskCount(count);
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col selection:bg-slate-200 overflow-x-hidden max-w-full w-full">
      
      {/* Top Navigation */}
      <Header
        currentCategory={category}
        onSelectCategory={handleSelectCategory}
        algorithms={currentAlgos}
        selectedAlgoId={algorithmId}
        onSelectAlgorithm={handleSelectAlgorithm}
        currentComplexity={currentMetadata.complexity}
        showCodeModal={showCodeModal}
        onToggleCodeModal={() => setShowCodeModal((prev) => !prev)}
      />

      {/* Control Toolbar */}
      <ControlToolbar
        category={category}
        algorithmId={algorithmId}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onStepForward={stepForward}
        onReset={resetState}
        arrayInputStr={arrayInputStr}
        onChangeArrayInput={setArrayInputStr}
        onApplyArray={handleApplyArray}
        onRandomizeArray={handleRandomizeArray}
        targetInput={targetInput}
        onChangeTargetInput={setTargetInput}
        onApplySearchTarget={handleApplySearchTarget}
        dsValInput={dsValInput}
        onChangeDsVal={setDsValInput}
        onStackPush={handleStackPush}
        onStackPop={handleStackPop}
        onQueueEnqueue={handleQueueEnqueue}
        onQueueDequeue={handleQueueDequeue}
        onBSTInsert={handleBSTInsert}
        onBSTSample={handleBSTSample}
        onBSTSearch={handleBSTSearch}
        onLLInsertHead={handleLLInsertHead}
        onLLInsertTail={handleLLInsertTail}
        onLLDelete={handleLLDelete}
        graphStartNode={graphStartNode}
        onChangeGraphStartNode={handleSelectGraphNode}
        onSwitchGraphTopology={handleSwitchGraphTopology}
        hashKeyInput={hashKeyInput}
        onChangeHashKeyInput={setHashKeyInput}
        hashValInput={hashValInput}
        onChangeHashValInput={setHashValInput}
        onHashInsert={handleHashInsert}
        onHashSearch={handleHashSearch}
        onHashDelete={handleHashDelete}
        hashMode={hashMode}
        onToggleHashMode={handleToggleHashMode}
        onHashSampleCollision={handleHashSampleCollision}
        nQueensSize={nQueensSize}
        onChangeNQueensSize={handleChangeNQueensSize}
        onSudokuResetSample={handleSudokuResetSample}
        hanoiDiskCount={hanoiDiskCount}
        onChangeHanoiDiskCount={handleChangeHanoiDiskCount}
        speedSliderVal={speedSliderVal}
        onChangeSpeed={setSpeedSliderVal}
      />

      {/* Main Visual Canvas Area */}
      <main className="max-w-6xl w-full mx-auto px-3 sm:px-6 flex-1 flex flex-col gap-3 pb-6 overflow-hidden">
        <VisualCanvas
          category={category}
          algorithmId={algorithmId}
          sortingStep={sortingStep}
          searchingStep={searchingStep}
          dsStep={dsStep}
          backtrackingStep={backtrackingStep}
          onSelectBSTNode={(val) => {
            setDsValInput(val);
            setStatusMessage(`Selected BST node ${val}. Click "Search" or run Inorder demo.`);
          }}
          onSelectGraphNode={handleSelectGraphNode}
          onSelectHashKey={handleSelectHashKey}
        />

        {/* Status Box */}
        <StatusBar message={statusMessage} stepCount={stepCount} />
      </main>

      {/* Pseudocode & Complexity Modal */}
      {showCodeModal && (
        <AlgorithmInfoModal
          algorithm={currentMetadata}
          activeLine={activeCodeLine}
          onClose={() => setShowCodeModal(false)}
        />
      )}

    </div>
  );
}
