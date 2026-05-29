/**
 * Minimum Element After Replacement With Digit Sum
 * Intuition: Each number needs to be transformed by replacing it with the sum of its digits. After all transformations, we simply need to find the minimum value among these new numbers. This can be efficiently done in a single pass.
 * Approach: 1. Initialize a variable `minSum` to a very large value (e.g., `Infinity`) to store the minimum sum encountered. 2. Iterate through each `num` in the input array `nums`. 3. For each `num`, calculate its digit sum: initialize `currentSum = 0`, then repeatedly add `num % 10` to `currentSum` and update `num = Math.floor(num / 10)` until `num` becomes 0. 4. After calculating `currentSum`, compare it with `minSum` and update `minSum = Math.min(minSum, currentSum)`. 5. After iterating through all numbers, return `minSum`.
 * Dry Run:
 * nums = [999, 19, 199]
 * 1. minSum = Infinity
 * 2. num = 999:
 *    currentNum = 999, currentSum = 0
 *    - currentNum = 999: currentSum += 9 (9), currentNum = 99
 *    - currentNum = 99: currentSum += 9 (18), currentNum = 9
 *    - currentNum = 9: currentSum += 9 (27), currentNum = 0
 *    Digit sum for 999 is 27.
 *    minSum = Math.min(Infinity, 27) = 27
 * 3. num = 19:
 *    currentNum = 19, currentSum = 0
 *    - currentNum = 19: currentSum += 9 (9), currentNum = 1
 *    - currentNum = 1: currentSum += 1 (10), currentNum = 0
 *    Digit sum for 19 is 10.
 *    minSum = Math.min(27, 10) = 10
 * 4. num = 199:
 *    currentNum = 199, currentSum = 0
 *    - currentNum = 199: currentSum += 9 (9), currentNum = 19
 *    - currentNum = 19: currentSum += 9 (18), currentNum = 1
 *    - currentNum = 1: currentSum += 1 (19), currentNum = 0
 *    Digit sum for 199 is 19.
 *    minSum = Math.min(10, 19) = 10
 * 5. All numbers processed. Return minSum (10).
 * Time Complexity: O(N * log10(M)), where N is the length of `nums` and M is the maximum value in `nums`. The `log10(M)` factor comes from calculating the sum of digits for each number, which depends on the number of digits. Given M <= 10^4, log10(M) is at most 5, making it effectively O(N).
 * Space Complexity: O(1) as only a few constant extra variables are used.
 */
var minElement = function (nums) {
  let minSum = Infinity;

  for (let i = 0; i < nums.length; i++) {
    let currentNum = nums[i];
    let currentDigitSum = 0;

    // Calculate the sum of digits for currentNum
    while (currentNum > 0) {
      currentDigitSum += currentNum % 10;
      currentNum = Math.floor(currentNum / 10);
    }

    // Update minSum if currentDigitSum is smaller
    minSum = Math.min(minSum, currentDigitSum);
  }

  return minSum;
};
