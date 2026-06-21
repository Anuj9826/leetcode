/**
 * Maximum Ice Cream Bars
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maxIceCream = function (costs, coins) {
  let numberOfBars = 0;
  let remainingBalance = coins;

  costs.sort((priceA, priceB) => priceA - priceB);

  for (let loopIndex = 0; loopIndex < costs.length; loopIndex++) {
    let currentItemCost = costs[loopIndex];
    if (currentItemCost <= remainingBalance) {
      numberOfBars++;
      remainingBalance -= currentItemCost;
    } else {
      break;
    }
  }

  return numberOfBars;
};
