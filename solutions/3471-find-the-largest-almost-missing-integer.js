/**
 * Find the Largest Almost Missing Integer
 * Time Complexity: O(N * K)
 * Space Complexity: O(K + V)
 */
var largestInteger = function (nums, k) {
  const countsMap = new Map();
  const n = nums.length;

  for (let i = 0; i <= n - k; i++) {
    const currentSubarrayElements = new Set();

    for (let j = 0; j < k; j++) {
      currentSubarrayElements.add(nums[i + j]);
    }

    for (const num of currentSubarrayElements) {
      countsMap.set(num, (countsMap.get(num) || 0) + 1);
    }
  }

  let maxAlmostMissing = -1;

  for (const [num, count] of countsMap.entries()) {
    if (count === 1) {
      maxAlmostMissing = Math.max(maxAlmostMissing, num);
    }
  }

  return maxAlmostMissing;
};
