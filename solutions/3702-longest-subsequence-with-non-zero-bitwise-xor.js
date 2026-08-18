/**
 * Longest Subsequence With Non-Zero Bitwise XOR
 * Intuition: The goal is to find the longest subsequence with a non-zero bitwise XOR sum. The longest possible subsequence is the entire array itself. If the XOR sum of all elements in the array is non-zero, then the entire array is the desired subsequence, and its length (nums.length) is the answer. If the XOR sum of all elements is zero, we cannot use the entire array. In this scenario, to achieve a non-zero XOR sum, we must remove at least one element. If we remove an element `nums[i]`, the XOR sum of the remaining `n-1` elements becomes `(totalXOR_of_all_elements) ^ nums[i]`. Since the `totalXOR_of_all_elements` is 0 in this case, the XOR sum of the remaining elements simplifies to `0 ^ nums[i] = nums[i]`. Therefore, if there exists at least one non-zero number `nums[i]` in the array, we can remove it. The remaining `n-1` elements will then form a subsequence with a non-zero XOR sum (`nums[i]`), and this would be the longest possible length given the full array's XOR sum is zero. The only special case is if all elements in `nums` are zero. In this specific situation, any subsequence will consist only of zeros, resulting in an XOR sum of zero. Thus, no such subsequence exists, and the answer should be 0.
 * Approach: 1. Initialize `totalXOR` to 0 and `hasNonZeroElement` to `false`. 2. Iterate through `nums`: for each `num`, update `totalXOR` by XORing it with `num`, and set `hasNonZeroElement` to `true` if `num` is non-zero. 3. After the loop, if `totalXOR` is non-zero, return `nums.length`. 4. If `totalXOR` is zero, check `hasNonZeroElement`: if `true`, return `nums.length - 1`; otherwise (if `false`, meaning all elements were zero), return `0`.
 * Dry Run: nums = [1,2,3]
 *   1. `n = 3`. `totalXOR = 0`. `hasNonZeroElement = false`.
 *   2. Loop:
 *      - `num = 1`: `totalXOR = 0 ^ 1 = 1`. `1 != 0`, so `hasNonZeroElement = true`.
 *      - `num = 2`: `totalXOR = 1 ^ 2 = 3`. `2 != 0`, `hasNonZeroElement` remains `true`.
 *      - `num = 3`: `totalXOR = 3 ^ 3 = 0`. `3 != 0`, `hasNonZeroElement` remains `true`.
 *   3. End of loop: `totalXOR = 0`, `hasNonZeroElement = true`.
 *   4. Check `totalXOR`: it is `0`.
 *   5. Check `hasNonZeroElement`: it is `true`.
 *   6. Return `nums.length - 1` which is `3 - 1 = 2`.
 * Dry Run: nums = [0,0,0]
 *   1. `n = 3`. `totalXOR = 0`. `hasNonZeroElement = false`.
 *   2. Loop:
 *      - `num = 0`: `totalXOR = 0 ^ 0 = 0`. `0 == 0`, `hasNonZeroElement` remains `false`.
 *      - `num = 0`: `totalXOR = 0 ^ 0 = 0`. `0 == 0`, `hasNonZeroElement` remains `false`.
 *      - `num = 0`: `totalXOR = 0 ^ 0 = 0`. `0 == 0`, `hasNonZeroElement` remains `false`.
 *   3. End of loop: `totalXOR = 0`, `hasNonZeroElement = false`.
 *   4. Check `totalXOR`: it is `0`.
 *   5. Check `hasNonZeroElement`: it is `false`.
 *   6. Return `0`.
 * Time Complexity: O(N), where N is the length of the `nums` array. We iterate through the array exactly once.
 * Space Complexity: O(1), as we use a constant amount of extra space for variables.
*/
var longestSubsequence = function(nums) {
    let totalXOR = 0;
    let hasNonZeroElement = false;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        totalXOR ^= nums[i];
        if (nums[i] !== 0) {
            hasNonZeroElement = true;
        }
    }

    if (totalXOR !== 0) {
        return n;
    } else {
        if (hasNonZeroElement) {
            return n - 1;
        } else {
            return 0;
        }
    }
};