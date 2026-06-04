/**
 * Total Waviness of Numbers in Range I
 * Intuition: The problem asks for the sum of waviness for all numbers in a given range. Waviness for a single number depends on its digits forming peaks or valleys. Since the range [num1, num2] can be up to 10^5 numbers, and the maximum number is 10^5 (which has 6 digits), a straightforward iterative approach should be efficient enough.
 * Approach:
 * 1. Initialize a variable `totalWavinessSum` to 0. This will accumulate the waviness of all numbers in the range.
 * 2. Define a helper function, `calculateWavinessForNumber(num)`, which takes an integer and returns its waviness.
 *    a. Inside this helper, convert the number `num` to its string representation to easily access individual digits.
 *    b. Get the length of the string. If the length is less than 3, the waviness is 0 by definition, so return 0 immediately.
 *    c. Initialize `currentNumberWaviness` to 0.
 *    d. Iterate through the digits of the number from the second digit (index 1) up to the second-to-last digit (index `length - 2`). The first and last digits cannot be peaks or valleys.
 *    e. For each current digit at index `i`, retrieve its left neighbor (at `i-1`) and right neighbor (at `i+1`). Parse these characters to integers.
 *    f. Check if the `currentDigit` is strictly greater than both `leftDigit` and `rightDigit`. If so, it's a peak, and increment `currentNumberWaviness`.
 *    g. Otherwise, check if the `currentDigit` is strictly less than both `leftDigit` and `rightDigit`. If so, it's a valley, and increment `currentNumberWaviness`.
 *    h. After checking all relevant digits, return `currentNumberWaviness`.
 * 3. Loop through each number `num` from `num1` to `num2` (inclusive).
 * 4. In each iteration, call `calculateWavinessForNumber(num)` and add its returned value to `totalWavinessSum`.
 * 5. After the loop completes, return `totalWavinessSum`.
 * Dry Run: num1 = 120, num2 = 130
 * totalWavinessSum = 0
 *
 * num = 120:
 *   calculateWavinessForNumber(120):
 *     numStr = "120", len = 3
 *     currentNumberWaviness = 0
 *     i = 1:
 *       leftDigit = 1, currentDigit = 2, rightDigit = 0
 *       2 > 1 && 2 > 0 -> true (Peak)
 *       currentNumberWaviness = 1
 *     Returns 1.
 *   totalWavinessSum = 0 + 1 = 1
 *
 * num = 121:
 *   calculateWavinessForNumber(121):
 *     numStr = "121", len = 3
 *     currentNumberWaviness = 0
 *     i = 1:
 *       leftDigit = 1, currentDigit = 2, rightDigit = 1
 *       2 > 1 && 2 > 1 -> true (Peak)
 *       currentNumberWaviness = 1
 *     Returns 1.
 *   totalWavinessSum = 1 + 1 = 2
 *
 * num = 122:
 *   calculateWavinessForNumber(122):
 *     numStr = "122", len = 3
 *     currentNumberWaviness = 0
 *     i = 1:
 *       leftDigit = 1, currentDigit = 2, rightDigit = 2
 *       2 > 1 && 2 > 2 -> false
 *       2 < 1 && 2 < 2 -> false
 *     Returns 0.
 *   totalWavinessSum = 2 + 0 = 2
 *
 * ... (similarly for 123-129, they return 0) ...
 *
 * num = 130:
 *   calculateWavinessForNumber(130):
 *     numStr = "130", len = 3
 *     currentNumberWaviness = 0
 *     i = 1:
 *       leftDigit = 1, currentDigit = 3, rightDigit = 0
 *       3 > 1 && 3 > 0 -> true (Peak)
 *       currentNumberWaviness = 1
 *     Returns 1.
 *   totalWavinessSum = 2 + 1 = 3
 *
 * Loop ends. Return 3. (Matches Example 1)
 *
 * Time Complexity: O((num2 - num1 + 1) * log10(num2)).
 *   The outer loop runs `num2 - num1 + 1` times. In the worst case, this is `10^5` iterations.
 *   Inside the loop, `calculateWavinessForNumber` converts the number to a string (O(log10(num)) for number of digits) and then iterates through its digits. The maximum number of digits for `10^5` is 6. So, the inner loop runs at most 6-2=4 times.
 *   Thus, the complexity of `calculateWavinessForNumber` is effectively constant, O(log10(num)) or O(1) considering small fixed digit count.
 *   Therefore, the total time complexity is dominated by the outer loop, O(N * D) where N is the range size and D is the number of digits. Given D is a small constant (max 6), it's approximately O(N).
 * Space Complexity: O(log10(num)).
 *   The space used is primarily for storing the string representation of the current number inside `calculateWavinessForNumber`. The maximum number of digits is 6, so this is effectively constant space, O(1).
 */
var totalWaviness = function(num1, num2) {
    let totalWavinessSum = 0;

    function calculateWavinessForNumber(num) {
        const numStr = String(num);
        const len = numStr.length;

        if (len < 3) {
            return 0;
        }

        let currentNumberWaviness = 0;
        for (let i = 1; i < len - 1; i++) {
            const leftDigit = parseInt(numStr[i - 1]);
            const currentDigit = parseInt(numStr[i]);
            const rightDigit = parseInt(numStr[i + 1]);

            if (currentDigit > leftDigit && currentDigit > rightDigit) {
                currentNumberWaviness++;
            } else if (currentDigit < leftDigit && currentDigit < rightDigit) {
                currentNumberWaviness++;
            }
        }
        return currentNumberWaviness;
    }

    for (let num = num1; num <= num2; num++) {
        totalWavinessSum += calculateWavinessForNumber(num);
    }

    return totalWavinessSum;
};