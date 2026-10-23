import { AlgorithmMetadata } from '../types';
import { linearSearchGen } from './linearSearch';
import { binarySearchGen } from './binarySearch';
import { jumpSearchGen } from './jumpSearch';

export * from './types';
export * from './linearSearch';
export * from './binarySearch';
export * from './jumpSearch';

export const SEARCHING_ALGORITHMS: Record<string, AlgorithmMetadata> = {
  linear: {
    id: 'linear',
    name: 'Linear Search',
    category: 'searching',
    complexity: 'O(n)',
    bestTime: 'O(1)',
    worstTime: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Linear Search sequentially checks each element of the list from left to right until a match is found or the entire list has been searched. It requires no prior sorting and works on arbitrary lists.',
    algorithmSteps: [
      '1. Start from the leftmost element of the array (index 0).',
      '2. Compare current element arr[i] with target value.',
      '3. If arr[i] == target, return index i immediately (success).',
      '4. If not equal, move pointer forward to index i + 1.',
      '5. Repeat steps 2-4 until reaching the end of the array.',
      '6. If the end is reached without a match, return -1 (element not found).'
    ],
    javaCode: `public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        // Traverse through all array elements
        for (int i = 0; i < arr.length; i++) {
            // Check if current element matches target
            if (arr[i] == target) {
                return i; // Target found at index i
            }
        }
        return -1; // Target not present in array
    }
}`,
    pythonCode: `def linear_search(arr, target):
    # Iterate through elements with indices
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Match found
    return -1  # Target not found`,
    pseudocode: [
      'for i = 0 to n - 1:',
      '  if arr[i] == target:',
      '    return i',
      'return -1'
    ]
  },
  binary: {
    id: 'binary',
    name: 'Binary Search',
    category: 'searching',
    complexity: 'O(log n)',
    bestTime: 'O(1)',
    worstTime: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Binary Search is an exceptionally efficient algorithm for finding an item in a sorted list. It works by repeatedly halving the search interval: comparing the middle element, then discarding the half where the target cannot exist.',
    algorithmSteps: [
      '1. Verify array is sorted. Initialize low = 0 and high = n - 1.',
      '2. Calculate midpoint: mid = low + (high - low) / 2.',
      '3. If arr[mid] == target, return mid (target located).',
      '4. If arr[mid] < target, target must be in the right half: set low = mid + 1.',
      '5. If arr[mid] > target, target must be in the left half: set high = mid - 1.',
      '6. Repeat steps 2-5 while low <= high. If low > high, target is not present.'
    ],
    javaCode: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Check if target is present at mid
            if (arr[mid] == target) {
                return mid;
            }

            // If target greater, ignore left half
            if (arr[mid] < target) {
                low = mid + 1;
            } else {
                // If target is smaller, ignore right half
                high = mid - 1;
            }
        }

        return -1; // Target not found
    }
}`,
    pythonCode: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        # Check if target is at mid
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1  # Search right half
        else:
            high = mid - 1  # Search left half

    return -1  # Not found`,
    pseudocode: [
      'low = 0, high = n - 1',
      'while low <= high:',
      '  mid = floor((low + high) / 2)',
      '  if arr[mid] == target: return mid',
      '  else if arr[mid] < target: low = mid + 1',
      '  else: high = mid - 1',
      'return -1'
    ]
  },
  jump: {
    id: 'jump',
    name: 'Jump Search',
    category: 'searching',
    complexity: 'O(√n)',
    bestTime: 'O(1)',
    worstTime: 'O(√n)',
    spaceComplexity: 'O(1)',
    description: 'Jump Search works on sorted arrays by jumping ahead by fixed steps of size √n, checking block boundaries until finding a block that could contain the target, and then performing a linear search backwards or forwards within that block.',
    algorithmSteps: [
      '1. Given sorted array of size n, determine jump step size m = √n.',
      '2. Jump forward by m indices: arr[0], arr[m], arr[2m], ... until arr[k * m] >= target.',
      '3. Once arr[curr] >= target, the target must lie in range [(curr - m) .. curr].',
      '4. Perform linear search starting from (curr - m).',
      '5. If element is found, return its index.',
      '6. If the block is exhausted without match, return -1.'
    ],
    javaCode: `public class JumpSearch {
    public static int jumpSearch(int[] arr, int target) {
        int n = arr.length;
        // Finding block size to be jumped
        int step = (int) Math.floor(Math.sqrt(n));

        // Finding the block where element is present (if it is present)
        int prev = 0;
        for (int minStep = Math.min(step, n) - 1; 
             arr[minStep] < target; 
             minStep = Math.min(step, n) - 1) {
            prev = step;
            step += (int) Math.floor(Math.sqrt(n));
            if (prev >= n) return -1;
        }

        // Doing a linear search for target in block beginning with prev
        while (arr[prev] < target) {
            prev++;
            // If we reached next block or end of array, element is not present
            if (prev == Math.min(step, n)) return -1;
        }

        // If element is found
        if (arr[prev] == target) return prev;

        return -1;
    }
}`,
    pythonCode: `import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    
    prev = 0
    # Jump until we find a block where target may exist
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
            
    # Linear search inside the identified block
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
            
    if arr[prev] == target:
        return prev
        
    return -1`,
    pseudocode: [
      'm = floor(sqrt(n)), prev = 0',
      'while arr[min(m, n) - 1] < target:',
      '  prev = m, m += floor(sqrt(n))',
      '  if prev >= n: return -1',
      'while arr[prev] < target:',
      '  prev++',
      '  if prev == min(m, n): return -1',
      'if arr[prev] == target: return prev'
    ]
  }
};
