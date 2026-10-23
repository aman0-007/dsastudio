export interface SudokuStep {
  grid: number[][];
  initialGrid: number[][];
  row: number;
  col: number;
  val: number;
  isConflict?: boolean;
  isBacktracking?: boolean;
  isSolved?: boolean;
  conflictCoords?: { row: number; col: number }[];
  msg: string;
  codeLine?: number;
}

export interface NQueensStep {
  boardSize: number;
  queens: number[]; // queens[row] = col, or -1 if no queen in row
  currentRow: number;
  currentCol: number;
  isConflict?: boolean;
  isBacktracking?: boolean;
  isSolved?: boolean;
  conflictQueen?: { row: number; col: number } | null;
  msg: string;
  codeLine?: number;
}

export interface HanoiStep {
  diskCount: number;
  pegs: {
    A: number[];
    B: number[];
    C: number[];
  };
  movedDisk?: number;
  fromPeg?: 'A' | 'B' | 'C';
  toPeg?: 'A' | 'B' | 'C';
  moveNumber: number;
  totalMoves: number;
  isSolved?: boolean;
  msg: string;
  codeLine?: number;
}

export interface BacktrackingStep {
  sudoku?: SudokuStep;
  nqueens?: NQueensStep;
  hanoi?: HanoiStep;
  msg: string;
  codeLine?: number;
}
