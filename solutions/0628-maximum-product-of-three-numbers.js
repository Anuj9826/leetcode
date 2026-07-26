/**
 * Maximum Product of Three Numbers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maximumProduct = function (nums) {
  let firstLargest = -Infinity;
  let secondLargest = -Infinity;
  let thirdLargest = -Infinity;

  let firstSmallest = Infinity;
  let secondSmallest = Infinity;

  for (let currentNumber of nums) {
    if (currentNumber > firstLargest) {
      thirdLargest = secondLargest;
      secondLargest = firstLargest;
      firstLargest = currentNumber;
    } else if (currentNumber > secondLargest) {
      thirdLargest = secondLargest;
      secondLargest = currentNumber;
    } else if (currentNumber > thirdLargest) {
      thirdLargest = currentNumber;
    }

    if (currentNumber < firstSmallest) {
      secondSmallest = firstSmallest;
      firstSmallest = currentNumber;
    } else if (currentNumber < secondSmallest) {
      secondSmallest = currentNumber;
    }
  }

  const productOptionOne = firstSmallest * secondSmallest * firstLargest;
  const productOptionTwo = firstLargest * secondLargest * thirdLargest;

  return Math.max(productOptionOne, productOptionTwo);
};
