/**
 * Jump Game V
 * Intuition: This problem asks for the longest path in a directed acyclic graph (DAG) where nodes are array indices and edges represent valid jumps. Since we can start from any index and need to find the maximum number of visited indices, a Depth-First Search (DFS) with memoization is a suitable approach to explore all possible jump paths and store computed results to avoid redundant calculations. The crucial part of the jump condition is that all intermediate elements between the current index and the target index must be strictly smaller than the current index's value. This implies that if we encounter an element that is not strictly smaller, we cannot jump past it.
 * Approach: 1. Initialize a `jumpCountMemo` array to store the maximum jumps possible starting from each index, initially filled with 0s (or -1s, or any indicator for uncomputed state). 2. Iterate through each index of the input array. For each index, call a helper function `calculateMaxJumpsFrom` to determine the maximum jumps originating from that specific index. 3. `calculateMaxJumpsFrom(currentIndex)`:
 *    a. If `jumpCountMemo[currentIndex]` is already computed, return its stored value.
 *    b. Initialize `currentMaxJumps` to 1 (counting the `currentIndex` itself).
 *    c. Explore rightward jumps: Use a `while` loop to iterate `rightwardStep` from 1 up to `jumpDistanceLimit`.
 *        i. Calculate `targetRightIndex = currentIndex + rightwardStep`.
 *        ii. If `targetRightIndex` is within array bounds and `inputArray[currentIndex]` is strictly greater than `inputArray[targetRightIndex]`, recursively call `calculateMaxJumpsFrom(targetRightIndex)` and update `currentMaxJumps` with `Math.max(currentMaxJumps, 1 + resultOfRecursiveCall)`.
 *        iii. If either condition (bounds or value comparison) fails, break the loop, as we cannot jump past this point due to the intermediate value constraint.
 *    d. Explore leftward jumps: Use a `for` loop to iterate `leftwardStep` from 1 up to `jumpDistanceLimit`.
 *        i. Calculate `targetLeftIndex = currentIndex - leftwardStep`.
 *        ii. If `targetLeftIndex` is within array bounds and `inputArray[currentIndex]` is strictly greater than `inputArray[targetLeftIndex]`, recursively call `calculateMaxJumpsFrom(targetLeftIndex)` and update `currentMaxJumps` with `Math.max(currentMaxJumps, 1 + resultOfRecursiveCall)`.
 *        iii. If either condition fails, break the loop.
 *    e. Store `currentMaxJumps` in `jumpCountMemo[currentIndex]` and return it.
 * 4. Keep track of the `overallMaxJumps` found across all starting indices in the main loop and return it.
 * Dry Run: arr = [6,4,14,6,8,13,9,7,10,2,1,16], d = 2
 * totalLength = 12, jumpCountMemo = [0,0,...,0] (length 12), overallMaxJumps = 1
 *
 * Main loop for startIndex = 0 to 11:
 *
 * Call calculateMaxJumpsFrom(0) (arr[0]=6):
 *   jumpCountMemo[0] is 0. currentMaxJumps = 1.
 *   Rightward (while rightwardStep=1 to 2):
 *     rightwardStep = 1: targetRightIndex = 1 (arr[1]=4). 1 < 12 (T), 6 > 4 (T).
 *       calculateMaxJumpsFrom(1) (arr[1]=4):
 *         jumpCountMemo[1] is 0. currentMaxJumps_1 = 1.
 *         Rightward (while rightwardStep_1=1 to 2):
 *           rightwardStep_1 = 1: targetRightIndex_1 = 2 (arr[2]=14). 2 < 12 (T), 4 > 14 (F). Break.
 *         Leftward (for leftwardStep_1=1 to 2):
 *           leftwardStep_1 = 1: targetLeftIndex_1 = 0 (arr[0]=6). 0 >= 0 (T), 4 > 6 (F). Break.
 *         jumpCountMemo[1] = 1. Return 1.
 *       currentMaxJumps = Math.max(1, 1+1) = 2.
 *     rightwardStep = 2: targetRightIndex = 2 (arr[2]=14). 2 < 12 (T), 6 > 14 (F). Break.
 *   Leftward (for leftwardStep=1 to 2):
 *     leftwardStep = 1: targetLeftIndex = -1. -1 >= 0 (F). Break.
 *   jumpCountMemo[0] = 2. Return 2.
 * overallMaxJumps = Math.max(1, 2) = 2.
 *
 * Call calculateMaxJumpsFrom(1) (arr[1]=4):
 *   jumpCountMemo[1] is 1. Return 1.
 * overallMaxJumps = Math.max(2, 1) = 2.
 *
 * Call calculateMaxJumpsFrom(2) (arr[2]=14):
 *   jumpCountMemo[2] is 0. currentMaxJumps = 1.
 *   Rightward (while rightwardStep=1 to 2):
 *     rightwardStep = 1: targetRightIndex = 3 (arr[3]=6). 3 < 12 (T), 14 > 6 (T).
 *       calculateMaxJumpsFrom(3) (arr[3]=6):
 *         jumpCountMemo[3] is 0. currentMaxJumps_3 = 1.
 *         Rightward (while rightwardStep_3=1 to 2):
 *           rightwardStep_3 = 1: targetRightIndex_3 = 4 (arr[4]=8). 4 < 12 (T), 6 > 8 (F). Break.
 *         Leftward (for leftwardStep_3=1 to 2):
 *           leftwardStep_3 = 1: targetLeftIndex_3 = 2 (arr[2]=14). 2 >= 0 (T), 6 > 14 (F). Break.
 *         jumpCountMemo[3] = 1. Return 1.
 *       currentMaxJumps = Math.max(1, 1+1) = 2.
 *     rightwardStep = 2: targetRightIndex = 4 (arr[4]=8). 4 < 12 (T), 14 > 8 (T).
 *       calculateMaxJumpsFrom(4) (arr[4]=8):
 *         jumpCountMemo[4] is 0. currentMaxJumps_4 = 1.
 *         Rightward (while rightwardStep_4=1 to 2):
 *           rightwardStep_4 = 1: targetRightIndex_4 = 5 (arr[5]=13). 5 < 12 (T), 8 > 13 (F). Break.
 *         Leftward (for leftwardStep_4=1 to 2):
 *           leftwardStep_4 = 1: targetLeftIndex_4 = 3 (arr[3]=6). 3 >= 0 (T), 8 > 6 (T).
 *             jumpCountMemo[3] is 1. Return 1.
 *           currentMaxJumps_4 = Math.max(1, 1+1) = 2.
 *           leftwardStep_4 = 2: targetLeftIndex_4 = 2 (arr[2]=14). 2 >= 0 (T), 8 > 14 (F). Break.
 *         jumpCountMemo[4] = 2. Return 2.
 *       currentMaxJumps = Math.max(2, 1+2) = 3.
 *   Leftward (for leftwardStep=1 to 2):
 *     leftwardStep = 1: targetLeftIndex = 1 (arr[1]=4). 1 >= 0 (T), 14 > 4 (T).
 *       jumpCountMemo[1] is 1. Return 1.
 *     currentMaxJumps = Math.max(3, 1+1) = 3.
 *     leftwardStep = 2: targetLeftIndex = 0 (arr[0]=6). 0 >= 0 (T), 14 > 6 (T).
 *       jumpCountMemo[0] is 2. Return 2.
 *     currentMaxJumps = Math.max(3, 1+2) = 3.
 *   jumpCountMemo[2] = 3. Return 3.
 * overallMaxJumps = Math.max(2, 3) = 3.
 * ... (The process continues for all indices)
 * The final overallMaxJumps will be 4 (e.g., from 11 -> 8 -> 6 -> 4, or 11 -> 7 -> 5 -> 4, etc. for the original example).
 * Time Complexity: O(N * D)
 * Space Complexity: O(N)
 */
var maxJumps = function (arr, d) {
  const totalLength = arr.length;
  const jumpCountMemo = new Array(totalLength).fill(0);
  let overallMaxJumps = 1;

  function calculateMaxJumpsFrom(currentIndex) {
    if (jumpCountMemo[currentIndex] !== 0) {
      return jumpCountMemo[currentIndex];
    }

    let currentMaxJumps = 1;

    let rightwardStep = 1;
    while (rightwardStep <= d) {
      const targetRightIndex = currentIndex + rightwardStep;
      if (
        targetRightIndex < totalLength &&
        arr[currentIndex] > arr[targetRightIndex]
      ) {
        currentMaxJumps = Math.max(
          currentMaxJumps,
          1 + calculateMaxJumpsFrom(targetRightIndex),
        );
      } else {
        break;
      }
      rightwardStep++;
    }

    for (let leftwardStep = 1; leftwardStep <= d; leftwardStep++) {
      const targetLeftIndex = currentIndex - leftwardStep;
      if (targetLeftIndex >= 0 && arr[currentIndex] > arr[targetLeftIndex]) {
        currentMaxJumps = Math.max(
          currentMaxJumps,
          1 + calculateMaxJumpsFrom(targetLeftIndex),
        );
      } else {
        break;
      }
    }

    jumpCountMemo[currentIndex] = currentMaxJumps;
    return currentMaxJumps;
  }

  for (let startIndex = 0; startIndex < totalLength; startIndex++) {
    overallMaxJumps = Math.max(
      overallMaxJumps,
      calculateMaxJumpsFrom(startIndex),
    );
  }

  return overallMaxJumps;
};
