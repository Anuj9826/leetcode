/**
 * Maximum Element After Decreasing and Rearranging
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maximumElementAfterDecrementingAndRearranging = function (arrInput) {
  arrInput.sort((firstValue, secondValue) => firstValue - secondValue);

  let maximumAchievable = 1;
  let iterationCounter = 1;
  let totalLength = arrInput.length;

  while (iterationCounter < totalLength) {
    if (arrInput[iterationCounter] > maximumAchievable) {
      maximumAchievable++;
    }
    iterationCounter++;
  }

  return maximumAchievable;
};
