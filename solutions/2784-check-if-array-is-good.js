/**
 * Check if Array is Good
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isGood = function (nums) {
  const maxVal = Math.max(...nums);

  if (nums.length !== maxVal + 1) {
    return false;
  }

  const valueCounts = new Array(maxVal + 1).fill(0);

  for (let currentIdx = 0; currentIdx < nums.length; currentIdx++) {
    const numberEntry = nums[currentIdx];
    if (numberEntry < 1 || numberEntry > maxVal) {
      return false;
    }
    valueCounts[numberEntry]++;
  }

  for (let checkValue = 1; checkValue < maxVal; checkValue++) {
    if (valueCounts[checkValue] !== 1) {
      return false;
    }
  }

  return valueCounts[maxVal] === 2;
};
