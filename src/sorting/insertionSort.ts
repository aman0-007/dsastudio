import { SortingStep } from './types';

export function* insertionSortGen(inputArr: number[]): Generator<SortingStep> {
  const arr = [...inputArr];
  const n = arr.length;
  const sorted: number[] = [0];

  yield {
    arr: [...arr],
    comparing: [],
    swapping: [],
    sorted: [0],
    msg: `Initial state: arr[0] (${arr[0]}) considered sorted trivially.`,
    codeLine: 1
  };

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    yield {
      arr: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      msg: `Selected arr[${i}] (${key}) as key to insert into sorted prefix.`,
      codeLine: 2
    };

    while (j >= 0 && arr[j] > key) {
      yield {
        arr: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        msg: `arr[${j}] (${arr[j]}) > key (${key}) — shifting element right to arr[${j + 1}].`,
        codeLine: 4
      };

      arr[j + 1] = arr[j];

      yield {
        arr: [...arr],
        comparing: [],
        swapping: [j + 1],
        sorted: [...sorted],
        msg: `Shifted ${arr[j + 1]} to index ${j + 1}.`,
        codeLine: 5
      };

      j--;
    }

    arr[j + 1] = key;
    sorted.push(i);

    yield {
      arr: [...arr],
      comparing: [],
      swapping: [j + 1],
      sorted: [...sorted],
      msg: `Inserted key (${key}) into slot arr[${j + 1}].`,
      codeLine: 7
    };
  }

  yield {
    arr: [...arr],
    comparing: [],
    swapping: [],
    sorted: arr.map((_, i) => i),
    msg: 'Insertion Sort complete! Array is fully sorted.',
    codeLine: 8
  };
}
