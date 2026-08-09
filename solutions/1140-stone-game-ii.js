/**
 * Stone Game II
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var stoneGameII = function (piles) {
  const pileCount = piles.length;
  const memoizationMap = new Map();
  const precomputedSuffixSums = new Array(pileCount + 1).fill(0);

  for (
    let currentItemIndex = pileCount - 1;
    currentItemIndex >= 0;
    currentItemIndex--
  ) {
    precomputedSuffixSums[currentItemIndex] =
      precomputedSuffixSums[currentItemIndex + 1] + piles[currentItemIndex];
  }

  function computeMaxStones(currentPileOffset, currentMValueLimit) {
    if (currentPileOffset >= pileCount) {
      return 0;
    }

    if (2 * currentMValueLimit >= pileCount - currentPileOffset) {
      return precomputedSuffixSums[currentPileOffset];
    }

    const memoKeyForState = `${currentPileOffset},${currentMValueLimit}`;
    if (memoizationMap.has(memoKeyForState)) {
      return memoizationMap.get(memoKeyForState);
    }

    let optimalScoreForCurrentPlayer = -Infinity;
    for (
      let choicesForPiles = 1;
      choicesForPiles <= 2 * currentMValueLimit;
      choicesForPiles++
    ) {
      const nextPileOffset = currentPileOffset + choicesForPiles;
      const nextMValueLimit = Math.max(currentMValueLimit, choicesForPiles);
      const opponentBestResponse = computeMaxStones(
        nextPileOffset,
        nextMValueLimit,
      );

      const totalRemainingStoneSum = precomputedSuffixSums[currentPileOffset];
      const currentPlayersScoreThisTurn =
        totalRemainingStoneSum - opponentBestResponse;

      optimalScoreForCurrentPlayer = Math.max(
        optimalScoreForCurrentPlayer,
        currentPlayersScoreThisTurn,
      );
    }

    memoizationMap.set(memoKeyForState, optimalScoreForCurrentPlayer);
    return optimalScoreForCurrentPlayer;
  }

  return computeMaxStones(0, 1);
};
