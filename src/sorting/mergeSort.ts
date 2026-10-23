import { SortingStep } from './types';

export function* mergeSortGen(inputArr: number[]): Generator<SortingStep> {
  const arr = [...inputArr];
  const sortedIndices = new Set<number>();

  function* merge(start: number, mid: number, end: number): Generator<SortingStep, void, unknown> {
    const leftArr = arr.slice(start, mid + 1);
    const rightArr = arr.slice(mid + 1, end + 1);

    yield {
      arr: [...arr],
      comparing: [start, end],
      swapping: [],
      sorted: Array.from(sortedIndices),
      msg: `Merging sub-arrays [${start}..${mid}] and [${mid + 1}..${end}].`,
      codeLine: 4
    };

    let i = 0;
    let j = 0;
    let k = start;

    while (i < leftArr.length && j < rightArr.length) {
      yield {
        arr: [...arr],
        comparing: [start + i, mid + 1 + j],
        swapping: [],
        sorted: Array.from(sortedIndices),
        msg: `Comparing ${leftArr[i]} and ${rightArr[j]}.`,
        codeLine: 5
      };

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      yield {
        arr: [...arr],
        comparing: [],
        swapping: [k],
        sorted: Array.from(sortedIndices),
        msg: `Placed ${arr[k]} at index ${k}.`,
        codeLine: 6
      };
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      yield {
        arr: [...arr],
        comparing: [],
        swapping: [k],
        sorted: Array.from(sortedIndices),
        msg: `Remaining element ${leftArr[i]} placed at index ${k}.`,
        codeLine: 7
      };
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      yield {
        arr: [...arr],
        comparing: [],
        swapping: [k],
        sorted: Array.from(sortedIndices),
        msg: `Remaining element ${rightArr[j]} placed at index ${k}.`,
        codeLine: 8
      };
      j++;
      k++;
    }

    for (let idx = start; idx <= end; idx++) {
      sortedIndices.add(idx);
    }
  }

  function* mergeSort(start: number, end: number): Generator<SortingStep, void, unknown> {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      yield* mergeSort(start, mid);
      yield* mergeSort(mid + 1, end);
      yield* merge(start, mid, end);
    }
  }

  yield* mergeSort(0, arr.length - 1);

  yield {
    arr: [...arr],
    comparing: [],
    swapping: [],
    sorted: arr.map((_, i) => i),
    msg: 'Merge Sort complete! Sub-arrays recursively merged in sorted order.',
    codeLine: 9
  };
}
