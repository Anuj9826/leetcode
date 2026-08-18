/**
 * Stone Game V
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var stoneGameV = function (stoneValue) {
  const stoneCount = stoneValue.length;
  const cumulativeSums = Array.from({ length: stoneCount + 1 }, () => 0);

  for (let segmentIndex = 0; segmentIndex < stoneCount; segmentIndex++) {
    cumulativeSums[segmentIndex + 1] =
      cumulativeSums[segmentIndex] + stoneValue[segmentIndex];
  }

  const memo = Array.from({ length: stoneCount }, () =>
    new Array(stoneCount).fill(-1),
  );

  function calculateMaxScore(startPosition, endPosition) {
    if (startPosition >= endPosition) {
      return 0;
    }
    if (memo[startPosition][endPosition] !== -1) {
      return memo[startPosition][endPosition];
    }

    let maxAchievedScore = 0;

    for (
      let divisionPoint = startPosition;
      divisionPoint < endPosition;
      divisionPoint++
    ) {
      const leftSegmentSum =
        cumulativeSums[divisionPoint + 1] - cumulativeSums[startPosition];
      const rightSegmentSum =
        cumulativeSums[endPosition + 1] - cumulativeSums[divisionPoint + 1];

      let currentIterationScore;
      if (leftSegmentSum === rightSegmentSum) {
        const scoreFromKeepingLeft =
          leftSegmentSum + calculateMaxScore(startPosition, divisionPoint);
        const scoreFromKeepingRight =
          rightSegmentSum + calculateMaxScore(divisionPoint + 1, endPosition);
        currentIterationScore = Math.max(
          scoreFromKeepingLeft,
          scoreFromKeepingRight,
        );
      } else if (leftSegmentSum > rightSegmentSum) {
        currentIterationScore =
          rightSegmentSum + calculateMaxScore(divisionPoint + 1, endPosition);
      } else {
        // leftSegmentSum < rightSegmentSum
        currentIterationScore =
          leftSegmentSum + calculateMaxScore(startPosition, divisionPoint);
      }
      maxAchievedScore = Math.max(maxAchievedScore, currentIterationScore);
    }

    memo[startPosition][endPosition] = maxAchievedScore;
    return maxAchievedScore;
  }

  return calculateMaxScore(0, stoneCount - 1);
};
