/**
 * Count Subarrays With Majority Element I
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var countMajoritySubarrays = function (nums, target) {
  const n = nums.length;

  class FenwickTree {
    constructor(size) {
      this.tree = new Array(size + 1).fill(0);
      this.size = size;
    }

    update(index, delta) {
      if (index <= 0 || index > this.size) {
        return;
      }
      while (index <= this.size) {
        this.tree[index] += delta;
        index += index & -index;
      }
    }

    query(index) {
      if (index <= 0) {
        return 0;
      }
      if (index > this.size) {
        index = this.size;
      }
      let sum = 0;
      while (index > 0) {
        sum += this.tree[index];
        index -= index & -index;
      }
      return sum;
    }
  }

  const bitOffset = n + 1;
  const bitSize = 2 * n + 1;
  const bit = new FenwickTree(bitSize);

  let ans = 0;
  let currentSum = 0;

  bit.update(0 + bitOffset, 1);

  for (let k = 0; k < n; k++) {
    const value = nums[k] === target ? 1 : -1;
    currentSum += value;

    ans += bit.query(currentSum + bitOffset - 1);

    bit.update(currentSum + bitOffset, 1);
  }

  return ans;
};
