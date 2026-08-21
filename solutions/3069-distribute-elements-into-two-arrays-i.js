/**
 * Distribute Elements Into Two Arrays I
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var resultArray = function (nums) {
  const firstArray = [nums[0]];
  const secondArray = [nums[1]];

  for (let elementIndex = 2; elementIndex < nums.length; elementIndex++) {
    const lastIndexFirst = firstArray.length - 1;
    const lastElementFirst = firstArray[lastIndexFirst];

    const lastIndexSecond = secondArray.length - 1;
    const lastElementSecond = secondArray[lastIndexSecond];

    if (lastElementFirst > lastElementSecond) {
      firstArray.push(nums[elementIndex]);
    } else {
      secondArray.push(nums[elementIndex]);
    }
  }

  const combinedOutcome = [...firstArray, ...secondArray];
  return combinedOutcome;
};
