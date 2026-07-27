/**
 * Maximum Product of Two Elements in an Array
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxProduct = function (nums) {
  let largestElementValue = 0;
  let secondLargestElementValue = 0;

  let totalElements = nums.length;

  for (
    let currentIterationIndex = 0;
    currentIterationIndex < totalElements;
    currentIterationIndex++
  ) {
    let currentNumberValue = nums[currentIterationIndex];

    if (currentNumberValue > largestElementValue) {
      secondLargestElementValue = largestElementValue;
      largestElementValue = currentNumberValue;
    } else if (currentNumberValue > secondLargestElementValue) {
      secondLargestElementValue = currentNumberValue;
    }
  }

  let finalCalculatedProduct =
    (largestElementValue - 1) * (secondLargestElementValue - 1);
  return finalCalculatedProduct;
};
