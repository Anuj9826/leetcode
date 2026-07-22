/**
 * Find Greatest Common Divisor Of Array
 * Time Complexity: O(N + log(max_val))
 * Space Complexity: O(log(max_val))
 */
var findGCD = function (nums) {
  function computeGreatestCommonDivisor(firstNumber, secondNumber) {
    if (secondNumber === 0) {
      return firstNumber;
    }
    return computeGreatestCommonDivisor(
      secondNumber,
      firstNumber % secondNumber,
    );
  }

  let currentMinimumValue = Number.POSITIVE_INFINITY;
  let currentMaximumValue = Number.NEGATIVE_INFINITY;
  let elementPointer = 0;
  const totalElements = nums.length;

  while (elementPointer < totalElements) {
    const currentElement = nums[elementPointer];
    if (currentElement < currentMinimumValue) {
      currentMinimumValue = currentElement;
    }
    if (currentElement > currentMaximumValue) {
      currentMaximumValue = currentElement;
    }
    elementPointer++;
  }

  return computeGreatestCommonDivisor(currentMinimumValue, currentMaximumValue);
};
