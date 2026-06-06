/**
 * Left and Right Sum Differences
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var leftRightDifference = function (nums) {
  const arrayLength = nums.length;

  const leftPrefixSums = new Array(arrayLength).fill(0);
  const rightSuffixSums = new Array(arrayLength).fill(0);
  const answerResult = new Array(arrayLength);

  let runningLeftSum = 0;
  for (let indexForward = 0; indexForward < arrayLength; indexForward++) {
    leftPrefixSums[indexForward] = runningLeftSum;
    runningLeftSum += nums[indexForward];
  }

  let runningRightSum = 0;
  for (
    let indexBackward = arrayLength - 1;
    indexBackward >= 0;
    indexBackward--
  ) {
    rightSuffixSums[indexBackward] = runningRightSum;
    runningRightSum += nums[indexBackward];
  }

  for (
    let currentPosition = 0;
    currentPosition < arrayLength;
    currentPosition++
  ) {
    answerResult[currentPosition] = Math.abs(
      leftPrefixSums[currentPosition] - rightSuffixSums[currentPosition],
    );
  }

  return answerResult;
};
