import { SearchingStep } from './types';

export function* linearSearchGen(arr: number[], target: number): Generator<SearchingStep> {
  yield {
    arr,
    inspecting: -1,
    found: -1,
    msg: `Starting Linear Search across ${arr.length} elements for target ${target}.`,
    codeLine: 1
  };

  for (let i = 0; i < arr.length; i++) {
    yield {
      arr,
      inspecting: i,
      found: -1,
      msg: `Index ${i}: Comparing value ${arr[i]} with target ${target}.`,
      codeLine: 2
    };

    if (arr[i] === target) {
      yield {
        arr,
        inspecting: -1,
        found: i,
        msg: `Match found! Element ${target} exists at index ${i}.`,
        codeLine: 3
      };
      return;
    }
  }

  yield {
    arr,
    inspecting: -1,
    found: -1,
    msg: `Search exhausted. Target element ${target} was not found in the array.`,
    codeLine: 4
  };
}
