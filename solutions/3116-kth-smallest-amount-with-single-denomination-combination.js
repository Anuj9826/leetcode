/**
 * Kth Smallest Amount With Single Denomination Combination
 * Time Complexity: O(2^n * log(k * min(coins)))
 * Space Complexity: O(2^n)
 */
var findKthSmallest = function (coins, k) {
  const gcd = (valueA, valueB) => {
    let first = valueA;
    let second = valueB;
    while (second !== 0) {
      const remainder = first % second;
      first = second;
      second = remainder;
    }
    return first;
  };

  const lcm = (valueA, valueB) => {
    return (valueA / gcd(valueA, valueB)) * valueB;
  };

  const coinCount = coins.length;
  const lcmsBySubsetSize = Array.from({ length: coinCount + 1 }, () => []);
  const subsetLimit = 1 << coinCount;
  for (let subsetMask = 1; subsetMask < subsetLimit; subsetMask++) {
    let subsetLcm = 1;
    let bitsSet = 0;
    for (let coinIndex = 0; coinIndex < coinCount; coinIndex++) {
      if ((subsetMask >> coinIndex) & 1) {
        subsetLcm = lcm(subsetLcm, coins[coinIndex]);
        bitsSet++;
      }
    }
    lcmsBySubsetSize[bitsSet].push(subsetLcm);
  }

  const countAmountsAtMost = (limit) => {
    let amountCount = 0;
    for (let subsetSize = 1; subsetSize <= coinCount; subsetSize++) {
      const sign = subsetSize % 2 === 1 ? 1 : -1;
      const lcms = lcmsBySubsetSize[subsetSize];
      for (let lcmIndex = 0; lcmIndex < lcms.length; lcmIndex++) {
        amountCount += Math.floor(limit / lcms[lcmIndex]) * sign;
      }
    }
    return amountCount;
  };

  let smallestCoin = coins[0];
  for (let coinIndex = 1; coinIndex < coinCount; coinIndex++) {
    smallestCoin = Math.min(smallestCoin, coins[coinIndex]);
  }

  let searchLow = 1;
  let searchHigh = k * smallestCoin;
  while (searchLow < searchHigh) {
    const searchMid = Math.floor((searchLow + searchHigh) / 2);
    if (countAmountsAtMost(searchMid) >= k) {
      searchHigh = searchMid;
    } else {
      searchLow = searchMid + 1;
    }
  }

  return searchLow;
};
