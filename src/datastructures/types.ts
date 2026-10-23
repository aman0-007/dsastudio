export class BSTNode {
  val: number;
  left: BSTNode | null;
  right: BSTNode | null;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export type DSActionType = 
  | 'push-start' 
  | 'pushed' 
  | 'popped' 
  | 'enqueue-start' 
  | 'enqueued' 
  | 'dequeued' 
  | 'inspect' 
  | 'insert-head'
  | 'insert-tail'
  | 'delete-node'
  | 'traverse'
  | 'graph-visit'
  | 'graph-edge'
  | 'hash-compute'
  | 'hash-collision'
  | 'hash-insert'
  | 'hash-search'
  | 'hash-found'
  | 'hash-not-found'
  | 'hash-delete'
  | null;

export interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
}

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  adjacencyList: Record<number, number[]>;
}

export interface HashItem {
  key: number;
  value: string;
}

export type CollisionMode = 'chaining' | 'probing';

export interface HashTableState {
  size: number;
  mode: CollisionMode;
  chains: HashItem[][];
  probingSlots: (HashItem | null | 'DELETED')[];
}

export interface DSStep {
  list?: number[];
  action?: DSActionType;
  index?: number;
  val?: number;
  bst?: BSTNode | null;
  activeNode?: number | null;
  visited?: number[];
  isProcessed?: boolean;
  msg: string;
  codeLine?: number;
  activePointer?: 'HEAD' | 'CURR' | 'TAIL' | 'NEW' | null;
  // Graph data structures
  graph?: GraphState;
  activeEdge?: { from: number; to: number } | null;
  frontier?: number[];
  frontierType?: 'queue' | 'stack';
  traversalOrder?: number[];
  // Hash Table data structures
  hashTable?: HashTableState;
  hashComputedIndex?: number | null;
  hashCollision?: boolean;
  hashActiveKey?: number | null;
  hashActiveSlot?: number | null;
  hashActiveChainIndex?: number | null;
  hashProbeCount?: number;
}
