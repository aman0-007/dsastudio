import { NQueensStep, BacktrackingStep } from './types';

export function* nQueensGen(boardSize: number = 4): Generator<BacktrackingStep> {
  const queens: number[] = Array(boardSize).fill(-1);

  yield {
    nqueens: {
      boardSize,
      queens: [...queens],
      currentRow: 0,
      currentCol: -1,
      msg: `N-Queens (${boardSize}x${boardSize}): Goal is to place ${boardSize} queens with no two attacking each other.`,
      codeLine: 1,
    },
    msg: `N-Queens (${boardSize}x${boardSize}): Goal is to place ${boardSize} queens with no two attacking each other.`,
    codeLine: 1,
  };

  function isSafe(row: number, col: number): { safe: boolean; conflictQueen?: { row: number; col: number } } {
    for (let r = 0; r < row; r++) {
      const c = queens[r];
      // Check column conflict
      if (c === col) {
        return { safe: false, conflictQueen: { row: r, col: c } };
      }
      // Check diagonal conflict
      if (Math.abs(c - col) === Math.abs(r - row)) {
        return { safe: false, conflictQueen: { row: r, col: c } };
      }
    }
    return { safe: true };
  }

  function* solveRow(row: number): Generator<BacktrackingStep, boolean, unknown> {
    if (row >= boardSize) {
      return true; // All N queens placed safely
    }

    for (let col = 0; col < boardSize; col++) {
      const { safe, conflictQueen } = isSafe(row, col);

      if (!safe) {
        yield {
          nqueens: {
            boardSize,
            queens: [...queens],
            currentRow: row,
            currentCol: col,
            isConflict: true,
            conflictQueen: conflictQueen || null,
            msg: `Row ${row}, Col ${col}: Conflict! Under attack by Queen at [${conflictQueen?.row}, ${conflictQueen?.col}] (column/diagonal).`,
            codeLine: 3,
          },
          msg: `Row ${row}, Col ${col}: Conflict with Queen at [${conflictQueen?.row}, ${conflictQueen?.col}].`,
          codeLine: 3,
        };
        continue;
      }

      // Valid placement: place queen
      queens[row] = col;

      yield {
        nqueens: {
          boardSize,
          queens: [...queens],
          currentRow: row,
          currentCol: col,
          isConflict: false,
          msg: `Placed Queen 👑 safely at Row ${row}, Col ${col}. Moving to Row ${row + 1}.`,
          codeLine: 4,
        },
        msg: `Placed Queen 👑 safely at Row ${row}, Col ${col}. Moving to Row ${row + 1}.`,
        codeLine: 4,
      };

      const solved: boolean = yield* solveRow(row + 1);
      if (solved) return true;

      // Backtrack: remove queen
      queens[row] = -1;

      yield {
        nqueens: {
          boardSize,
          queens: [...queens],
          currentRow: row,
          currentCol: col,
          isBacktracking: true,
          msg: `Branch failure in lower rows. Backtracking: Removed Queen from Row ${row}, Col ${col}.`,
          codeLine: 6,
        },
        msg: `Backtracking: Removed Queen from Row ${row}, Col ${col}.`,
        codeLine: 6,
      };
    }

    return false;
  }

  const success: boolean = yield* solveRow(0);

  yield {
    nqueens: {
      boardSize,
      queens: [...queens],
      currentRow: -1,
      currentCol: -1,
      isSolved: success,
      msg: success
        ? `N-Queens Solved! All ${boardSize} queens successfully placed with 0 conflicts.`
        : `No solution exists for ${boardSize}x${boardSize} board.`,
      codeLine: 7,
    },
    msg: success
      ? `N-Queens Solved! All ${boardSize} queens successfully placed.`
      : 'No solution found.',
    codeLine: 7,
  };
}
