/**
 * Find Missing Elements
 * Time Complexity: O(N + R)
 * Space Complexity: O(N + R)
 */
var findMissingElements = function (nums) {
  const minVal = Math.min(...nums);
  const maxVal = Math.max(...nums);
  const numSet = new Set(nums);
  const missingElements = [];

  for (let i = minVal; i <= maxVal; i++) {
    if (!numSet.has(i)) {
      missingElements.push(i);
    }
  }

  return missingElements;
};
