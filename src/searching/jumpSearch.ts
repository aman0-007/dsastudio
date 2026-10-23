import { SearchingStep } from './types';

export function* jumpSearchGen(inputArr: number[], target: number): Generator<SearchingStep> {
  const arr = [...inputArr].sort((a, b) => a - b);
  const n = arr.length;
  const stepSize = Math.floor(Math.sqrt(n));

  yield {
    arr,
    inspecting: -1,
    found: -1,
    msg: `Sorted array for Jump Search. Array size n = ${n}, optimal block jump step size = √${n} ≈ ${stepSize}.`,
    codeLine: 1
  };

  let prev = 0;
  let curr = stepSize;

  yield {
    arr,
    inspecting: Math.min(curr, n) - 1,
    low: prev,
    high: Math.min(curr, n) - 1,
    found: -1,
    msg: `Checking block boundary index ${Math.min(curr, n) - 1} (value: ${arr[Math.min(curr, n) - 1]}) against target ${target}.`,
    codeLine: 2
  };

  // Finding the block where element is present
  while (arr[Math.min(curr, n) - 1] < target) {
    prev = curr;
    curr += stepSize;

    if (prev >= n) {
      yield {
        arr,
        inspecting: -1,
        found: -1,
        msg: `Target ${target} exceeds all array elements. Not found.`,
        codeLine: 4
      };
      return;
    }

    yield {
      arr,
      inspecting: Math.min(curr, n) - 1,
      low: prev,
      high: Math.min(curr, n) - 1,
      found: -1,
      msg: `Jumped ahead by ${stepSize} to index ${Math.min(curr, n) - 1} (value: ${arr[Math.min(curr, n) - 1]}).`,
      codeLine: 3
    };
  }

  yield {
    arr,
    inspecting: prev,
    low: prev,
    high: Math.min(curr, n) - 1,
    found: -1,
    msg: `Target ${target} is within block range [${prev}..${Math.min(curr, n) - 1}]. Commencing linear search inside block.`,
    codeLine: 5
  };

  // Linear search inside identified block
  while (arr[prev] < target) {
    prev++;

    if (prev === Math.min(curr, n)) {
      yield {
        arr,
        inspecting: -1,
        found: -1,
        msg: `Linear search reached block end without matching. Target ${target} not in array.`,
        codeLine: 7
      };
      return;
    }

    yield {
      arr,
      inspecting: prev,
      low: prev,
      high: Math.min(curr, n) - 1,
      found: -1,
      msg: `Scanning index ${prev} (value: ${arr[prev]}).`,
      codeLine: 6
    };
  }

  if (arr[prev] === target) {
    yield {
      arr,
      inspecting: -1,
      found: prev,
      low: prev,
      high: prev,
      msg: `Target ${target} successfully located at index ${prev}!`,
      codeLine: 8
    };
    return;
  }

  yield {
    arr,
    inspecting: -1,
    found: -1,
    msg: `Target ${target} not found in array.`,
    codeLine: 9
  };
}
