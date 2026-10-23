import { SudokuStep, BacktrackingStep } from './types';

// Clean standard sample puzzle with ~25 empty cells for smooth interactive visualization
export const SAMPLE_SUDOKU: number[][] = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

export function cloneGrid(grid: number[][]): number[][] {
  return grid.map((row) => [...row]);
}

function isValid(
  grid: number[][],
  row: number,
  col: number,
  num: number
): { valid: boolean; conflicts: { row: number; col: number }[] } {
  const conflicts: { row: number; col: number }[] = [];

  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === num) {
      conflicts.push({ row, col: c });
    }
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === num) {
      conflicts.push({ row: r, col });
    }
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const curR = startRow + r;
      const curC = startCol + c;
      if ((curR !== row || curC !== col) && grid[curR][curC] === num) {
        if (!conflicts.some((p) => p.row === curR && p.col === curC)) {
          conflicts.push({ row: curR, col: curC });
        }
      }
    }
  }

  return { valid: conflicts.length === 0, conflicts };
}

export function* sudokuSolverGen(inputGrid: number[][]): Generator<BacktrackingStep> {
  const grid = cloneGrid(inputGrid);
  const initialGrid = cloneGrid(inputGrid);

  yield {
    sudoku: {
      grid: cloneGrid(grid),
      initialGrid,
      row: -1,
      col: -1,
      val: 0,
      msg: 'Sudoku puzzle loaded. Commencing recursive Backtracking solver.',
      codeLine: 1,
    },
    msg: 'Sudoku puzzle loaded. Commencing recursive Backtracking solver.',
    codeLine: 1,
  };

  function* solve(): Generator<BacktrackingStep, boolean, unknown> {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] === 0) {
          // Found an empty cell, attempt digits 1 through 9
          for (let num = 1; num <= 9; num++) {
            const { valid, conflicts } = isValid(grid, r, c, num);

            if (!valid) {
              yield {
                sudoku: {
                  grid: cloneGrid(grid),
                  initialGrid,
                  row: r,
                  col: c,
                  val: num,
                  isConflict: true,
                  conflictCoords: conflicts,
                  msg: `Testing ${num} at [${r}, ${c}]: Conflict in row/col/3x3 box with existing ${num}.`,
                  codeLine: 3,
                },
                msg: `Testing ${num} at [${r}, ${c}]: Conflict in row/col/3x3 box with existing ${num}.`,
                codeLine: 3,
              };
              continue;
            }

            // Valid choice, place tentatively
            grid[r][c] = num;

            yield {
              sudoku: {
                grid: cloneGrid(grid),
                initialGrid,
                row: r,
                col: c,
                val: num,
                isConflict: false,
                msg: `Placed candidate ${num} at [${r}, ${c}]. Recursing to next empty cell.`,
                codeLine: 4,
              },
              msg: `Placed candidate ${num} at [${r}, ${c}]. Recursing to next empty cell.`,
              codeLine: 4,
            };

            const solved: boolean = yield* solve();
            if (solved) return true;

            // Backtrack: remove candidate
            grid[r][c] = 0;

            yield {
              sudoku: {
                grid: cloneGrid(grid),
                initialGrid,
                row: r,
                col: c,
                val: 0,
                isBacktracking: true,
                msg: `Dead end reached deeper in branch. Backtracking: cleared cell [${r}, ${c}].`,
                codeLine: 6,
              },
              msg: `Dead end reached deeper in branch. Backtracking: cleared cell [${r}, ${c}].`,
              codeLine: 6,
            };
          }

          return false; // All 1-9 failed, trigger backtrack in parent
        }
      }
    }

    return true; // All cells filled
  }

  const isComplete: boolean = yield* solve();

  yield {
    sudoku: {
      grid: cloneGrid(grid),
      initialGrid,
      row: -1,
      col: -1,
      val: 0,
      isSolved: isComplete,
      msg: isComplete
        ? 'Sudoku puzzle completely solved using Backtracking!'
        : 'Puzzle has no valid solution.',
      codeLine: 7,
    },
    msg: isComplete
      ? 'Sudoku puzzle completely solved using Backtracking!'
      : 'Puzzle has no valid solution.',
    codeLine: 7,
  };
}
