/**
 * Minimum Moves to Make Array Complementary
 * Time Complexity: O(n + limit)
 * Space Complexity: O(limit)
 */
var minMoves = function (nums, limit) {
  const arrayLength = nums.length;
  const deltaChanges = new Array(2 * limit + 2).fill(0);
  let minimumAchievedMoves = arrayLength;

  for (let pairIndex = 0; pairIndex < arrayLength / 2; pairIndex++) {
    const elementOne = nums[pairIndex];
    const elementTwo = nums[arrayLength - 1 - pairIndex];

    const minimumVal = Math.min(elementOne, elementTwo);
    const maximumVal = Math.max(elementOne, elementTwo);
    const pairCurrentSum = elementOne + elementTwo;

    const lowerBoundOneMove = minimumVal + 1;
    const upperBoundOneMove = maximumVal + limit;

    deltaChanges[2] += 2;
    deltaChanges[lowerBoundOneMove] -= 1;
    deltaChanges[pairCurrentSum] -= 1;
    deltaChanges[pairCurrentSum + 1] += 1;
    deltaChanges[upperBoundOneMove + 1] += 1;
  }

  let currentSweepMoves = 0;
  for (
    let targetSumCandidate = 2;
    targetSumCandidate <= 2 * limit;
    targetSumCandidate++
  ) {
    currentSweepMoves += deltaChanges[targetSumCandidate];
    minimumAchievedMoves = Math.min(minimumAchievedMoves, currentSweepMoves);
  }

  return minimumAchievedMoves;
};
