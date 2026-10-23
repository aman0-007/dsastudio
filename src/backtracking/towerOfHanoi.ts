import { HanoiStep, BacktrackingStep } from './types';

export function* towerOfHanoiGen(diskCount: number = 3): Generator<BacktrackingStep> {
  const totalMoves = Math.pow(2, diskCount) - 1;
  let moveNumber = 0;

  // Pegs hold disk sizes from bottom (largest) to top (smallest)
  // e.g. for 3 disks: [3, 2, 1]
  const pegs: { A: number[]; B: number[]; C: number[] } = {
    A: Array.from({ length: diskCount }, (_, i) => diskCount - i),
    B: [],
    C: [],
  };

  yield {
    hanoi: {
      diskCount,
      pegs: {
        A: [...pegs.A],
        B: [...pegs.B],
        C: [...pegs.C],
      },
      moveNumber: 0,
      totalMoves,
      msg: `Tower of Hanoi (${diskCount} disks): Move all disks from Peg A to Peg C. Minimum required moves = 2^${diskCount} - 1 = ${totalMoves}.`,
      codeLine: 1,
    },
    msg: `Tower of Hanoi initialized with ${diskCount} disks. Total moves needed: ${totalMoves}.`,
    codeLine: 1,
  };

  function* moveDisk(
    n: number,
    from: 'A' | 'B' | 'C',
    to: 'A' | 'B' | 'C',
    aux: 'A' | 'B' | 'C'
  ): Generator<BacktrackingStep, void, unknown> {
    if (n === 1) {
      const disk = pegs[from].pop()!;
      pegs[to].push(disk);
      moveNumber++;

      yield {
        hanoi: {
          diskCount,
          pegs: {
            A: [...pegs.A],
            B: [...pegs.B],
            C: [...pegs.C],
          },
          movedDisk: disk,
          fromPeg: from,
          toPeg: to,
          moveNumber,
          totalMoves,
          msg: `Move #${moveNumber}/${totalMoves}: Moved Disk ${disk} from Peg ${from} → Peg ${to}.`,
          codeLine: 3,
        },
        msg: `Move #${moveNumber}: Moved Disk ${disk} from Peg ${from} → Peg ${to}.`,
        codeLine: 3,
      };
      return;
    }

    // Step 1: Move top n-1 disks from source to aux using dest as buffer
    yield* moveDisk(n - 1, from, aux, to);

    // Step 2: Move the nth disk directly from source to dest
    const disk = pegs[from].pop()!;
    pegs[to].push(disk);
    moveNumber++;

    yield {
      hanoi: {
        diskCount,
        pegs: {
          A: [...pegs.A],
          B: [...pegs.B],
          C: [...pegs.C],
        },
        movedDisk: disk,
        fromPeg: from,
        toPeg: to,
        moveNumber,
        totalMoves,
        msg: `Move #${moveNumber}/${totalMoves}: Moved largest available Disk ${disk} from Peg ${from} → Peg ${to}.`,
        codeLine: 4,
      },
      msg: `Move #${moveNumber}: Moved Disk ${disk} from Peg ${from} → Peg ${to}.`,
      codeLine: 4,
    };

    // Step 3: Move n-1 disks from aux to dest using source as buffer
    yield* moveDisk(n - 1, aux, to, from);
  }

  yield* moveDisk(diskCount, 'A', 'C', 'B');

  yield {
    hanoi: {
      diskCount,
      pegs: {
        A: [...pegs.A],
        B: [...pegs.B],
        C: [...pegs.C],
      },
      moveNumber,
      totalMoves,
      isSolved: true,
      msg: `Tower of Hanoi Solved! All ${diskCount} disks successfully transferred to Peg C in exactly ${totalMoves} moves.`,
      codeLine: 6,
    },
    msg: `Tower of Hanoi Solved in ${totalMoves} moves!`,
    codeLine: 6,
  };
}
