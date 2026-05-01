/**
 * Rotate Function
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxRotateFunction = function (nums) {
  let arrayLength = nums.length;

  let totalSumOfElements = nums.reduce(
    (currentSum, elementValue) => currentSum + elementValue,
    0,
  );

  let currentFunctionValue = nums.reduce(
    (sumProducts, elementNumber, elementIndex) =>
      sumProducts + elementIndex * elementNumber,
    0,
  );

  let maximumFunctionResult = currentFunctionValue;

  for (let rotationCount = 1; rotationCount < arrayLength; rotationCount++) {
    let valueFromPreviousEnd = nums[arrayLength - rotationCount];
    currentFunctionValue =
      currentFunctionValue +
      totalSumOfElements -
      arrayLength * valueFromPreviousEnd;
    maximumFunctionResult = Math.max(
      maximumFunctionResult,
      currentFunctionValue,
    );
  }

  return maximumFunctionResult;
};
