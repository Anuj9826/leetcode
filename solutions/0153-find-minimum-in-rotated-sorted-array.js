/**
 * Find Minimum in Rotated Sorted Array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var findMin = function (nums) {
  let minValStored = nums[0];
  let startIndex = 0;
  let endIndex = nums.length - 1;

  while (startIndex <= endIndex) {
    let middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (nums[startIndex] <= nums[endIndex]) {
      minValStored = Math.min(minValStored, nums[startIndex]);
      break;
    }

    if (nums[middleIndex] >= nums[startIndex]) {
      minValStored = Math.min(minValStored, nums[startIndex]);
      startIndex = middleIndex + 1;
    } else {
      minValStored = Math.min(minValStored, nums[middleIndex]);
      endIndex = middleIndex - 1;
    }
  }

  return minValStored;
};
