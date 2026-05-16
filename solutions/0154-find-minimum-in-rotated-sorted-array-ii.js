/**
 * Find Minimum in Rotated Sorted Array II
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findMin = function (nums) {
  let initialIndex = 0;
  let finalIndex = nums.length - 1;

  while (initialIndex < finalIndex) {
    let midPoint = Math.floor(initialIndex + (finalIndex - initialIndex) / 2);

    if (nums[midPoint] < nums[finalIndex]) {
      finalIndex = midPoint;
    } else if (nums[midPoint] > nums[finalIndex]) {
      initialIndex = midPoint + 1;
    } else {
      finalIndex--;
    }
  }

  return nums[initialIndex];
};
