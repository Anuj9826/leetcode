/**
 * Sorted GCD Pair Queries
 * Time Complexity: O(N + MAX_VAL * log(MAX_VAL) + Q log Q)
 * Space Complexity: O(MAX_VAL + Q)
 */
var gcdValues = function (nums, queries) {
  const MAX_VAL = 50000;

  const valueCounts = new Array(MAX_VAL + 1).fill(0);
  for (const num of nums) {
    valueCounts[num]++;
  }

  const gcdCounts = new Array(MAX_VAL + 1).fill(0);
  for (let g = MAX_VAL; g >= 1; g--) {
    let currentGMultiplesCount = 0;
    for (let m = g; m <= MAX_VAL; m += g) {
      currentGMultiplesCount += valueCounts[m];
    }

    let pairsWithGcdMultipleOfG =
      (currentGMultiplesCount * (currentGMultiplesCount - 1)) / 2;

    for (let k = 2; k * g <= MAX_VAL; k++) {
      pairsWithGcdMultipleOfG -= gcdCounts[k * g];
    }
    gcdCounts[g] = pairsWithGcdMultipleOfG;
  }

  const answer = new Array(queries.length);
  const processedQueries = [];
  for (let i = 0; i < queries.length; i++) {
    processedQueries.push({ value: queries[i], originalIndex: i });
  }

  processedQueries.sort((a, b) => a.value - b.value);

  let queryPointer = 0;
  let currentRank = 0;

  for (let g = 1; g <= MAX_VAL; g++) {
    while (
      queryPointer < processedQueries.length &&
      processedQueries[queryPointer].value < currentRank + gcdCounts[g]
    ) {
      answer[processedQueries[queryPointer].originalIndex] = g;
      queryPointer++;
    }
    currentRank += gcdCounts[g];
    if (queryPointer === processedQueries.length) {
      break;
    }
  }

  return answer;
};
