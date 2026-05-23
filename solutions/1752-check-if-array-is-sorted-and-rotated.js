/**
 * Check if Array Is Sorted and Rotated
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var check = function (nums) {
  let descentOccurrences = 0;
  const inputLength = nums.length;

  for (let currentIndex = 0; currentIndex < inputLength - 1; currentIndex++) {
    if (nums[currentIndex] > nums[currentIndex + 1]) {
      descentOccurrences++;
    }
  }

  if (nums[inputLength - 1] > nums[0]) {
    descentOccurrences++;
  }

  return descentOccurrences <= 1;
};
