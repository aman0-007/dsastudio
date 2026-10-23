import { SortingStep } from './types';

export function* quickSortGen(inputArr: number[]): Generator<SortingStep> {
  const arr = [...inputArr];
  const sortedIndices = new Set<number>();

  function* partition(low: number, high: number): Generator<SortingStep, number, unknown> {
    const pivot = arr[high];
    let i = low - 1;

    yield {
      arr: [...arr],
      pivot: high,
      comparing: [],
      swapping: [],
      sorted: Array.from(sortedIndices),
      msg: `Chosen pivot: ${pivot} at index ${high}. Partitioning range [${low}..${high}].`,
      codeLine: 2
    };

    for (let j = low; j < high; j++) {
      yield {
        arr: [...arr],
        pivot: high,
        comparing: [j, high],
        swapping: [],
        sorted: Array.from(sortedIndices),
        msg: `Comparing arr[${j}] (${arr[j]}) with pivot ${pivot}.`,
        codeLine: 4
      };

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          yield {
            arr: [...arr],
            pivot: high,
            comparing: [],
            swapping: [i, j],
            sorted: Array.from(sortedIndices),
            msg: `${arr[j]} < ${pivot}. Swapping arr[${i}] (${arr[i]}) and arr[${j}] (${arr[j]}).`,
            codeLine: 6
          };
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }

    yield {
      arr: [...arr],
      pivot: high,
      comparing: [],
      swapping: [i + 1, high],
      sorted: Array.from(sortedIndices),
      msg: `Moving pivot ${pivot} to its final partition slot at index ${i + 1}.`,
      codeLine: 8
    };

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    sortedIndices.add(i + 1);
    return i + 1;
  }

  function* quickSort(low: number, high: number): Generator<SortingStep, void, unknown> {
    if (low <= high) {
      if (low === high) {
        sortedIndices.add(low);
        yield {
          arr: [...arr],
          comparing: [],
          swapping: [],
          sorted: Array.from(sortedIndices),
          msg: `Single element at index ${low} is trivially sorted.`,
          codeLine: 1
        };
        return;
      }

      const pi: number = yield* partition(low, high);
      yield* quickSort(low, pi - 1);
      yield* quickSort(pi + 1, high);
    }
  }

  yield* quickSort(0, arr.length - 1);

  yield {
    arr: [...arr],
    comparing: [],
    swapping: [],
    sorted: arr.map((_, i) => i),
    msg: 'Quick Sort completed successfully! All elements partition-sorted.',
    codeLine: 10
  };
}
