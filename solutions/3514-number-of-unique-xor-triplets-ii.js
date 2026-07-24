/**
 * Number of Unique XOR Triplets II
 * Time Complexity: O(N * M)
 * Space Complexity: O(N * M)
 */
var uniqueXorTriplets = function (nums) {
  const MAX_XOR_VALUE_PLUS_ONE = 2048;

  const isPresent = new Uint8Array(MAX_XOR_VALUE_PLUS_ONE);
  const uniqueVals = [];

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    if (isPresent[val] === 0) {
      isPresent[val] = 1;
      uniqueVals.push(val);
    }
  }

  const v2 = new Uint8Array(MAX_XOR_VALUE_PLUS_ONE);
  const numUnique = uniqueVals.length;

  for (let i = 0; i < numUnique; i++) {
    const u = uniqueVals[i];
    for (let j = i; j < numUnique; j++) {
      v2[u ^ uniqueVals[j]] = 1;
    }
  }

  const v3 = new Uint8Array(MAX_XOR_VALUE_PLUS_ONE);

  for (let x = 0; x < MAX_XOR_VALUE_PLUS_ONE; x++) {
    if (v2[x] === 1) {
      for (let i = 0; i < numUnique; i++) {
        v3[x ^ uniqueVals[i]] = 1;
      }
    }
  }

  let uniqueCount = 0;
  for (let i = 0; i < MAX_XOR_VALUE_PLUS_ONE; i++) {
    if (v3[i] === 1) {
      uniqueCount++;
    }
  }

  return uniqueCount;
};
