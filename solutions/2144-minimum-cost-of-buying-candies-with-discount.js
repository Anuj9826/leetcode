/**
 * Minimum Cost Of Buying Candies With Discount
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimumCost = function (candiesInputArray) {
  const sortedCosts = [...candiesInputArray].sort(
    (candyPriceA, candyPriceB) => candyPriceB - candyPriceA,
  );
  let totalAccumulatedCost = 0;
  let itemIndex = 0;

  while (itemIndex < sortedCosts.length) {
    totalAccumulatedCost += sortedCosts[itemIndex];
    const secondCandyOffset = 1;
    if (itemIndex + secondCandyOffset < sortedCosts.length) {
      totalAccumulatedCost += sortedCosts[itemIndex + secondCandyOffset];
    }
    itemIndex += 3;
  }

  return totalAccumulatedCost;
};
