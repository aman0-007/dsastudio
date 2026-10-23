import { SortingStep } from './types';

export function* bubbleSortGen(inputArr: number[]): Generator<SortingStep> {
  const arr = [...inputArr];
  const n = arr.length;
  const sorted: number[] = [];

  yield {
    arr: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    msg: `Starting Bubble Sort with ${n} elements.`,
    codeLine: 1
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        arr: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        msg: `Inspecting arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
        codeLine: 3
      };

      if (arr[j] > arr[j + 1]) {
        yield {
          arr: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          msg: `${arr[j]} > ${arr[j + 1]} — Swapping adjacent elements.`,
          codeLine: 4
        };

        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        yield {
          arr: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          msg: `Swapped to: [..., ${arr[j]}, ${arr[j + 1]}, ...].`,
          codeLine: 5
        };
      }
    }
    sorted.push(n - i - 1);
  }

  yield {
    arr: [...arr],
    comparing: [],
    swapping: [],
    sorted: arr.map((_, idx) => idx),
    msg: 'Bubble Sort complete! All elements positioned in sorted order.',
    codeLine: 7
  };
}
