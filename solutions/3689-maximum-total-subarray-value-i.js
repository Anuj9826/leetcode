/**
 * Maximum Total Subarray Value I
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxTotalValue = function (nums, k) {
  let maxVal = nums[0];
  let minVal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxVal = Math.max(maxVal, nums[i]);
    minVal = Math.min(minVal, nums[i]);
  }

  const singleMaxValue = maxVal - minVal;
  return singleMaxValue * k;
};
