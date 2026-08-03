/**
 * Stone Game III
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var stoneGameIII = function (stoneValue) {
  const totalLength = stoneValue.length;
  const memoizationTable = new Array(totalLength + 1).fill(null);

  function calculateMaxDifference(currentIndex) {
    if (currentIndex >= totalLength) {
      return 0;
    }
    if (memoizationTable[currentIndex] !== null) {
      return memoizationTable[currentIndex];
    }

    let maximumPossibleDiff = -Infinity;
    let currentPilesValue = 0;

    for (
      let numPiles = 1;
      numPiles <= 3 && currentIndex + numPiles - 1 < totalLength;
      numPiles++
    ) {
      currentPilesValue += stoneValue[currentIndex + numPiles - 1];
      const futureGameDiff = calculateMaxDifference(currentIndex + numPiles);
      maximumPossibleDiff = Math.max(
        maximumPossibleDiff,
        currentPilesValue - futureGameDiff,
      );
    }

    memoizationTable[currentIndex] = maximumPossibleDiff;
    return maximumPossibleDiff;
  }

  const finalAliceScoreDiff = calculateMaxDifference(0);

  if (finalAliceScoreDiff > 0) {
    return "Alice";
  }
  if (finalAliceScoreDiff < 0) {
    return "Bob";
  }
  return "Tie";
};
