import { SearchingStep } from './types';

export function* binarySearchGen(arr: number[], target: number): Generator<SearchingStep> {
  // Binary search operates on a sorted array
  const sorted = [...arr].sort((a, b) => a - b);
  let low = 0;
  let high = sorted.length - 1;

  yield {
    arr: sorted,
    low,
    high,
    mid: -1,
    inspecting: -1,
    found: -1,
    msg: `Array prepared & sorted in ascending order. Initial search window [${low}..${high}].`,
    codeLine: 1
  };

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    yield {
      arr: sorted,
      low,
      high,
      mid,
      inspecting: mid,
      found: -1,
      msg: `Calculated middle index: ${mid} (value: ${sorted[mid]}). Comparing against target ${target}.`,
      codeLine: 3
    };

    if (sorted[mid] === target) {
      yield {
        arr: sorted,
        low,
        high,
        mid,
        inspecting: -1,
        found: mid,
        msg: `Target ${target} located precisely at index ${mid}!`,
        codeLine: 4
      };
      return;
    } else if (sorted[mid] < target) {
      yield {
        arr: sorted,
        low,
        high,
        mid,
        inspecting: mid,
        found: -1,
        msg: `${sorted[mid]} < ${target}. Target must be in right half. Adjusting low = ${mid + 1}.`,
        codeLine: 6
      };
      low = mid + 1;
    } else {
      yield {
        arr: sorted,
        low,
        high,
        mid,
        inspecting: mid,
        found: -1,
        msg: `${sorted[mid]} > ${target}. Target must be in left half. Adjusting high = ${mid - 1}.`,
        codeLine: 8
      };
      high = mid - 1;
    }
  }

  yield {
    arr: sorted,
    low,
    high,
    mid: -1,
    inspecting: -1,
    found: -1,
    msg: `Target ${target} was not found in the array. Search window closed.`,
    codeLine: 9
  };
}
