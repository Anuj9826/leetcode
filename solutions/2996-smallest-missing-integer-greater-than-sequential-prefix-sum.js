/**
 * Smallest Missing Integer Greater Than Sequential Prefix Sum
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */
var missingInteger = function (nums) {
  let longestPrefixSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      longestPrefixSum += nums[i];
    } else {
      break;
    }
  }

  const numSet = new Set(nums);

  let currentMissing = longestPrefixSum;
  while (numSet.has(currentMissing)) {
    currentMissing++;
  }

  return currentMissing;
};
