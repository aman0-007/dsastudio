import { SortingStep } from './types';

export function* selectionSortGen(inputArr: number[]): Generator<SortingStep> {
  const arr = [...inputArr];
  const n = arr.length;
  const sorted: number[] = [];

  yield {
    arr: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    msg: `Starting Selection Sort with ${n} elements.`,
    codeLine: 1
  };

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    yield {
      arr: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      msg: `Pass ${i + 1}: Setting current minimum candidate at index ${i} (${arr[i]}).`,
      codeLine: 2
    };

    for (let j = i + 1; j < n; j++) {
      yield {
        arr: [...arr],
        comparing: [j, minIdx],
        swapping: [],
        sorted: [...sorted],
        msg: `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}).`,
        codeLine: 3
      };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        yield {
          arr: [...arr],
          comparing: [minIdx],
          swapping: [],
          sorted: [...sorted],
          msg: `New minimum found at index ${minIdx} (${arr[minIdx]}).`,
          codeLine: 4
        };
      }
    }

    if (minIdx !== i) {
      yield {
        arr: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        msg: `Swapping arr[${i}] (${arr[i]}) with minimum element arr[${minIdx}] (${arr[minIdx]}).`,
        codeLine: 5
      };

      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      yield {
        arr: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        msg: `Swapped! Element ${arr[i]} placed at its correct sorted position.`,
        codeLine: 6
      };
    }

    sorted.push(i);
  }

  sorted.push(n - 1);

  yield {
    arr: [...arr],
    comparing: [],
    swapping: [],
    sorted: arr.map((_, idx) => idx),
    msg: 'Selection Sort complete! All elements in sorted order.',
    codeLine: 7
  };
}
