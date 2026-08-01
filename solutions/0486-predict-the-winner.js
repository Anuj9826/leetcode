/**
 * Predict the Winner
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var predictTheWinner = function (nums) {
  const lengthOfNums = nums.length;
  const scoreDifferences = new Array(lengthOfNums).fill(0);

  for (let leftIndex = lengthOfNums - 1; leftIndex >= 0; leftIndex--) {
    scoreDifferences[leftIndex] = nums[leftIndex];
    for (
      let rightIndex = leftIndex + 1;
      rightIndex < lengthOfNums;
      rightIndex++
    ) {
      const takeLeft = nums[leftIndex] - scoreDifferences[rightIndex];
      const takeRight = nums[rightIndex] - scoreDifferences[rightIndex - 1];
      scoreDifferences[rightIndex] = Math.max(takeLeft, takeRight);
    }
  }

  return scoreDifferences[lengthOfNums - 1] >= 0;
};
