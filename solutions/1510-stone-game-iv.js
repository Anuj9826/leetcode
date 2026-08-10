/**
 * Stone Game IV
 * Time Complexity: O(n * sqrt(n))
 * Space Complexity: O(n)
 */
var winnerSquareGame = function (n) {
  const memoizationTable = new Array(n + 1).fill(false);

  for (
    let currentStoneAmount = 1;
    currentStoneAmount <= n;
    currentStoneAmount++
  ) {
    for (
      let squareFactor = 1;
      squareFactor * squareFactor <= currentStoneAmount;
      squareFactor++
    ) {
      let subtractedQuantity = squareFactor * squareFactor;
      let stonesRemaining = currentStoneAmount - subtractedQuantity;
      if (!memoizationTable[stonesRemaining]) {
        memoizationTable[currentStoneAmount] = true;
        break;
      }
    }
  }

  return memoizationTable[n];
};
