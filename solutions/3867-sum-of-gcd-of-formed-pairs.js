/**
 * Sum of GCD of Formed Pairs
 * Time Complexity: O(N log N + N log(maxVal))
 * Space Complexity: O(N)
 */
var gcdSum = function (nums) {
  function calculateGcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  const n = nums.length;
  const prefixGcd = new Array(n);
  let currentMax = 0;

  for (let i = 0; i < n; i++) {
    currentMax = Math.max(currentMax, nums[i]);
    prefixGcd[i] = calculateGcd(nums[i], currentMax);
  }

  prefixGcd.sort((a, b) => a - b);

  let totalGcdSum = 0;
  let left = 0;
  let right = n - 1;

  while (left < right) {
    totalGcdSum += calculateGcd(prefixGcd[left], prefixGcd[right]);
    left++;
    right--;
  }

  return totalGcdSum;
};
