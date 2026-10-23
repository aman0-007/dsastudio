import { AlgorithmMetadata } from '../types';
import { bubbleSortGen } from './bubbleSort';
import { quickSortGen } from './quickSort';
import { insertionSortGen } from './insertionSort';
import { mergeSortGen } from './mergeSort';
import { selectionSortGen } from './selectionSort';

export * from './types';
export * from './bubbleSort';
export * from './quickSort';
export * from './insertionSort';
export * from './mergeSort';
export * from './selectionSort';

export const SORTING_ALGORITHMS: Record<string, AlgorithmMetadata> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    category: 'sorting',
    complexity: 'O(n²)',
    bestTime: 'O(n)',
    worstTime: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. Larger elements gradually "bubble" to the end of the list.',
    algorithmSteps: [
      '1. Start at the first element (index 0).',
      '2. Compare the current element with the next element (arr[j] > arr[j + 1]).',
      '3. If current element is greater, swap them.',
      '4. Move to the next pair and repeat until reaching the unsorted boundary.',
      '5. After each full pass, the largest unsorted element is settled at its final position.',
      '6. Repeat the process for the remaining n - 1 elements until no swaps are needed.'
    ],
    javaCode: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j + 1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no elements were swapped, array is already sorted
            if (!swapped) break;
        }
    }
}`,
    pythonCode: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no swap occurred, list is sorted
        if not swapped:
            break
    return arr`,
    pseudocode: [
      'for i = 0 to n - 1:',
      '  for j = 0 to n - i - 1:',
      '    if arr[j] > arr[j + 1]:',
      '      swap(arr[j], arr[j + 1])',
      '  mark arr[n - i - 1] as sorted'
    ]
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    category: 'sorting',
    complexity: 'O(n log n)',
    bestTime: 'O(n log n)',
    worstTime: 'O(n²)',
    spaceComplexity: 'O(log n)',
    description: 'Quick Sort is an efficient divide-and-conquer algorithm. It selects a "pivot" element from the array and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot, then recursively sorts the sub-arrays.',
    algorithmSteps: [
      '1. Choose a pivot element (commonly the rightmost element).',
      '2. Partition step: reorder array so all elements smaller than pivot come before it, and greater elements after it.',
      '3. Place the pivot into its final sorted index.',
      '4. Recursively apply Quick Sort to the sub-array of smaller elements (left of pivot).',
      '5. Recursively apply Quick Sort to the sub-array of larger elements (right of pivot).',
      '6. Base case: sub-arrays with 0 or 1 elements are already sorted.'
    ],
    javaCode: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // pi is partitioning index, arr[pi] is at right place
            int pi = partition(arr, low, high);

            // Recursively sort elements before and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // choosing last element as pivot
        int i = (low - 1);

        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        // Swap pivot into its correct location
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }
}`,
    pythonCode: `def quick_sort(arr, low, high):
    if low < high:
        # Partition the array around pivot
        pi = partition(arr, low, high)
        
        # Recursively sort left and right halves
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            
    # Place pivot in its correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    pseudocode: [
      'quickSort(low, high):',
      '  if low < high:',
      '    pi = partition(low, high)',
      '    quickSort(low, pi - 1)',
      '    quickSort(pi + 1, high)'
    ]
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    category: 'sorting',
    complexity: 'O(n²)',
    bestTime: 'O(n²)',
    worstTime: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Selection Sort repeatedly finds the minimum element from the unsorted segment of the array and puts it at the beginning. The array is maintained in two parts: sorted subarray at the left and unsorted subarray at the right.',
    algorithmSteps: [
      '1. Set minIndex = current index i.',
      '2. Scan the remainder of the array (from i + 1 to n - 1) to find the smallest element.',
      '3. Update minIndex whenever an element smaller than arr[minIndex] is encountered.',
      '4. After the inner scan, swap the found minimum element with arr[i].',
      '5. Advance the boundary of the sorted subarray by 1.',
      '6. Repeat until the entire array is sorted.'
    ],
    javaCode: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            // Find minimum element in unsorted array
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap the found minimum element with arr[i]
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`,
    pythonCode: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        # Find minimum element in unsorted segment
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap minimum element with current slot
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    pseudocode: [
      'for i = 0 to n - 2:',
      '  minIdx = i',
      '  for j = i + 1 to n - 1:',
      '    if arr[j] < arr[minIdx]: minIdx = j',
      '  swap(arr[i], arr[minIdx])',
      '  mark arr[i] as sorted'
    ]
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    category: 'sorting',
    complexity: 'O(n²)',
    bestTime: 'O(n)',
    worstTime: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Insertion Sort builds the final sorted array one element at a time. It iterates through the array, consuming one input element each step, and inserting it into its correct position within the sorted subarray.',
    algorithmSteps: [
      '1. Start from the second element (index 1), assuming element 0 is already sorted.',
      '2. Store the current element as the "key".',
      '3. Compare the key with elements in the sorted portion from right to left.',
      '4. Shift each element that is greater than key one position to the right.',
      '5. Insert the key into the vacated position.',
      '6. Repeat until all elements have been processed.'
    ],
    javaCode: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;

            // Move elements of arr[0..i-1] that are greater than key
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`,
    pythonCode: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    pseudocode: [
      'for i = 1 to n - 1:',
      '  key = arr[i], j = i - 1',
      '  while j >= 0 and arr[j] > key:',
      '    arr[j + 1] = arr[j], j--',
      '  arr[j + 1] = key'
    ]
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    category: 'sorting',
    complexity: 'O(n log n)',
    bestTime: 'O(n log n)',
    worstTime: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Merge Sort is an efficient, comparison-based, divide-and-conquer algorithm. It divides the array into two halves, calls itself for the two halves, and then merges the two sorted halves.',
    algorithmSteps: [
      '1. Divide: calculate mid = (left + right) / 2.',
      '2. Conquer: recursively sort the left half arr[left..mid].',
      '3. Conquer: recursively sort the right half arr[mid+1..right].',
      '4. Combine: merge the two sorted halves into a single sorted array using temporary pointers.',
      '5. Copy merged elements back to original array.',
      '6. Base case: single element arrays require no sorting.'
    ],
    javaCode: `public class MergeSort {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;

            // Sort first and second halves
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);

            // Merge the sorted halves
            merge(arr, l, m, r);
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;

        int[] L = new int[n1];
        int[] R = new int[n2];

        System.arraycopy(arr, l, L, 0, n1);
        System.arraycopy(arr, m + 1, R, 0, n2);

        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }

        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`,
    pythonCode: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        # Recursively sort both halves
        merge_sort(L)
        merge_sort(R)

        i = j = k = 0
        # Merge sorted halves back into arr
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr`,
    pseudocode: [
      'mergeSort(arr, l, r):',
      '  if l < r:',
      '    m = (l + r) / 2',
      '    mergeSort(arr, l, m)',
      '    mergeSort(arr, m + 1, r)',
      '    merge(arr, l, m, r)'
    ]
  }
};
