import { AlgorithmMetadata } from '../types';
import { sudokuSolverGen, SAMPLE_SUDOKU, cloneGrid } from './sudokuSolver';
import { nQueensGen } from './nQueens';
import { towerOfHanoiGen } from './towerOfHanoi';

export * from './types';
export * from './sudokuSolver';
export * from './nQueens';
export * from './towerOfHanoi';

export const BACKTRACKING_ALGORITHMS: Record<string, AlgorithmMetadata> = {
  hanoi: {
    id: 'hanoi',
    name: 'Tower of Hanoi',
    category: 'backtracking',
    complexity: 'O(2^N)',
    bestTime: 'O(2^N)',
    worstTime: 'O(2^N)',
    spaceComplexity: 'O(N)',
    description: 'A classic mathematical puzzle and recursive problem. It consists of three pegs and N disks of different sizes. The objective is to move the entire stack to another peg obeying three rules: move only one disk at a time, each move takes upper disk, and no disk may be placed on top of a smaller disk.',
    algorithmSteps: [
      '1. Base Case: If n == 1, move disk 1 directly from Source to Destination and return.',
      '2. Step 1 (Divide): Recursively move the top n - 1 disks from Source to Auxiliary peg using Destination as buffer.',
      '3. Step 2 (Conquer): Move the remaining largest nth disk directly from Source to Destination peg.',
      '4. Step 3 (Combine): Recursively move the n - 1 disks from Auxiliary to Destination peg using Source as buffer.',
      '5. Total moves required = 2^N - 1 (proven by recurrence T(n) = 2T(n-1) + 1).'
    ],
    javaCode: `public class TowerOfHanoi {
    public static void solveHanoi(int n, char fromPeg, char toPeg, char auxPeg) {
        // Base case: only one disk to move
        if (n == 1) {
            System.out.println("Move disk 1 from " + fromPeg + " to " + toPeg);
            return;
        }

        // Step 1: Move top n-1 disks from Source to Auxiliary
        solveHanoi(n - 1, fromPeg, auxPeg, toPeg);

        // Step 2: Move the nth disk from Source to Destination
        System.out.println("Move disk " + n + " from " + fromPeg + " to " + toPeg);

        // Step 3: Move the n-1 disks from Auxiliary to Destination
        solveHanoi(n - 1, auxPeg, toPeg, fromPeg);
    }

    public static void main(String[] args) {
        int n = 3; // Number of disks
        solveHanoi(n, 'A', 'C', 'B'); // A is source, C is destination, B is helper
    }
}`,
    pythonCode: `def tower_of_hanoi(n, from_peg, to_peg, aux_peg):
    # Base case: only 1 disk to move
    if n == 1:
        print(f"Move disk 1 from {from_peg} to {to_peg}")
        return

    # Step 1: Move top n-1 disks from from_peg to aux_peg
    tower_of_hanoi(n - 1, from_peg, aux_peg, to_peg)

    # Step 2: Move the nth disk from from_peg to to_peg
    print(f"Move disk {n} from {from_peg} to {to_peg}")

    # Step 3: Move n-1 disks from aux_peg to to_peg
    tower_of_hanoi(n - 1, aux_peg, to_peg, from_peg)

# Example usage:
# tower_of_hanoi(3, 'A', 'C', 'B')`,
    pseudocode: [
      'solveHanoi(n, from, to, aux):',
      '  if n == 1:',
      '    move disk 1 from from to to',
      '    return',
      '  solveHanoi(n - 1, from, aux, to)',
      '  move disk n from from to to',
      '  solveHanoi(n - 1, aux, to, from)'
    ]
  },
  sudoku: {
    id: 'sudoku',
    name: 'Sudoku Solver (Backtracking)',
    category: 'backtracking',
    complexity: 'O(9^(n*n))',
    bestTime: 'O(1)',
    worstTime: 'O(9^81)',
    spaceComplexity: 'O(n*n)',
    description: 'Sudoku is solved using depth-first recursive backtracking. It finds an empty cell, tries valid numbers 1-9 checking row, column, and 3x3 subgrid constraints, and backtracks immediately whenever a conflict or dead end is reached.',
    algorithmSteps: [
      '1. Find the first empty cell (row, col) with value 0.',
      '2. If no empty cells remain, the puzzle is solved! Return true.',
      '3. Try candidate digits 1 through 9:',
      '   a. Check if digit is valid in the current row, column, and 3x3 box.',
      '   b. If valid, tentatively place the digit: grid[row][col] = digit.',
      '   c. Recursively call solve() on the remaining puzzle.',
      '   d. If the recursive call succeeds, return true.',
      '   e. If it fails, BACKTRACK: reset grid[row][col] = 0 and try the next digit.',
      '4. If no digits 1-9 work, return false to trigger backtracking in the caller.'
    ],
    javaCode: `public class SudokuSolver {
    public static boolean solveSudoku(int[][] grid) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (grid[row][col] == 0) {
                    for (int num = 1; num <= 9; num++) {
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num;

                            if (solveSudoku(grid)) {
                                return true;
                            }

                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private static boolean isValid(int[][] grid, int row, int col, int num) {
        for (int i = 0; i < 9; i++) {
            if (grid[row][i] == num || grid[i][col] == num) return false;
        }
        int startRow = row - row % 3;
        int startCol = col - col % 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] == num) return false;
            }
        }
        return true;
    }
}`,
    pythonCode: `def solve_sudoku(grid):
    for row in range(9):
        for col in range(9):
            if grid[row][col] == 0:
                for num in range(1, 10):
                    if is_valid(grid, row, col, num):
                        grid[row][col] = num
                        if solve_sudoku(grid):
                            return True
                        grid[row][col] = 0  # Backtrack
                return False
    return True`,
    pseudocode: [
      'solveSudoku(grid):',
      '  find empty cell (r, c)',
      '  if none: return true (solved)',
      '  for num = 1 to 9:',
      '    if isValid(grid, r, c, num):',
      '      grid[r][c] = num',
      '      if solveSudoku(grid): return true',
      '      grid[r][c] = 0 (backtrack)',
      '  return false'
    ]
  },
  nqueens: {
    id: 'nqueens',
    name: 'N-Queens Problem',
    category: 'backtracking',
    complexity: 'O(N!)',
    bestTime: 'O(N)',
    worstTime: 'O(N!)',
    spaceComplexity: 'O(N)',
    description: 'The N-Queens puzzle is the problem of placing N chess queens on an N×N chessboard so that no two queens attack each other (no two queens share the same row, column, or diagonal). Backtracking prunes attacking branches early.',
    algorithmSteps: [
      '1. Start in the leftmost row (row 0).',
      '2. If all rows have queens placed (row == N), return true (success).',
      '3. Try placing a queen in all columns of the current row:',
      '   a. Check if placing queen at (row, col) is safe (no attack along column or both diagonals).',
      '   b. If safe, record queen position: queens[row] = col.',
      '   c. Recurse to place queens in row + 1.',
      '   d. If placement leads to a solution, return true.',
      '   e. If not, BACKTRACK: remove queen from (row, col) and try next col.',
      '4. If all columns in row are tried and fail, return false to trigger backtrack in row - 1.'
    ],
    javaCode: `public class NQueens {
    public static boolean solveNQueens(int n) {
        int[] queens = new int[n];
        return solveRow(0, queens, n);
    }

    private static boolean solveRow(int row, int[] queens, int n) {
        if (row == n) return true;

        for (int col = 0; col < n; col++) {
            if (isSafe(row, col, queens)) {
                queens[row] = col;
                if (solveRow(row + 1, queens, n)) return true;
                queens[row] = -1; // Backtrack
            }
        }
        return false;
    }

    private static boolean isSafe(int row, int col, int[] queens) {
        for (int r = 0; r < row; r++) {
            int c = queens[r];
            if (c == col || Math.abs(c - col) == Math.abs(r - row)) return false;
        }
        return true;
    }
}`,
    pythonCode: `def solve_n_queens(n):
    queens = [-1] * n
    
    def is_safe(row, col):
        for r in range(row):
            c = queens[r]
            if c == col or abs(c - col) == abs(r - row):
                return False
        return True

    def place_queen(row):
        if row == n: return True
        for col in range(n):
            if is_safe(row, col):
                queens[row] = col
                if place_queen(row + 1): return True
                queens[row] = -1  # Backtrack
        return False

    return queens if place_queen(0) else None`,
    pseudocode: [
      'solveRow(row):',
      '  if row == N: return true',
      '  for col = 0 to N - 1:',
      '    if isSafe(row, col):',
      '      queens[row] = col',
      '      if solveRow(row + 1): return true',
      '      queens[row] = -1 (backtrack)',
      '  return false'
    ]
  }
};
