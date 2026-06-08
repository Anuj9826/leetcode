/**
 * Partition Array According To Given Pivot
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var pivotArray = function (nums, pivot) {
  const totalLength = nums.length;
  const resultArray = new Array(totalLength);

  let lessWriterIndex = 0;
  for (
    let iterateCountOne = 0;
    iterateCountOne < totalLength;
    iterateCountOne++
  ) {
    const currentNumberOne = nums[iterateCountOne];
    if (currentNumberOne < pivot) {
      resultArray[lessWriterIndex] = currentNumberOne;
      lessWriterIndex++;
    }
  }

  const firstPivotIndex = lessWriterIndex;
  let equalWriterIndex = firstPivotIndex;
  for (
    let iterateCountTwo = 0;
    iterateCountTwo < totalLength;
    iterateCountTwo++
  ) {
    const currentNumberTwo = nums[iterateCountTwo];
    if (currentNumberTwo === pivot) {
      resultArray[equalWriterIndex] = currentNumberTwo;
      equalWriterIndex++;
    }
  }

  const firstGreaterIndex = equalWriterIndex;
  let greaterWriterIndex = firstGreaterIndex;
  for (
    let iterateCountThree = 0;
    iterateCountThree < totalLength;
    iterateCountThree++
  ) {
    const currentNumberThree = nums[iterateCountThree];
    if (currentNumberThree > pivot) {
      resultArray[greaterWriterIndex] = currentNumberThree;
      greaterWriterIndex++;
    }
  }

  return resultArray;
};
