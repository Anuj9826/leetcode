/**
 * Number of Unique XOR Triplets I
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var uniqueXorTriplets = function (nums) {
  const n = nums.length;

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }
  const B = Math.floor(Math.log2(n)) + 1;
  return 1 << B;
};
