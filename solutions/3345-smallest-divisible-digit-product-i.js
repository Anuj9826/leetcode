/**
 * Smallest Divisible Digit Product I
 * Time Complexity: O((M - n + 1) * log10(M))
 * Space Complexity: O(1)
 */
var smallestNumber = function (n, t) {
  for (let currentNum = n; ; currentNum++) {
    let product = 1;
    let temp = currentNum;

    while (temp > 0) {
      const digit = temp % 10;
      if (digit === 0) {
        product = 0;
        break;
      }
      product *= digit;
      temp = Math.floor(temp / 10);
    }

    if (product % t === 0) {
      return currentNum;
    }
  }
};
