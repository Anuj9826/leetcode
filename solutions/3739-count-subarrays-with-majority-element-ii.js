/**
 * Count Subarrays With Majority Element II
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

class FenwickTree {
  constructor(size) {
    this.tree = new Array(size).fill(0);
    this.size = size;
  }

  update(index, delta) {
    while (index < this.size) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }

  query(index) {
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  }
}

var countMajoritySubarrays = function (nums, target) {
  const n = nums.length;

  const b = new Array(n);
  for (let i = 0; i < n; i++) {
    b[i] = nums[i] === target ? 1 : -1;
  }

  let currentPrefixSum = 0;
  let ans = 0;

  const offset = n;
  const fenwickTreeLogicalMaxIndex = 2 * n;
  const fenwickTreeArraySize = fenwickTreeLogicalMaxIndex + 1 + 1;
  const ft = new FenwickTree(fenwickTreeArraySize);

  ft.update(0 + offset + 1, 1);

  for (let j = 0; j < n; j++) {
    currentPrefixSum += b[j];
    ans += ft.query(currentPrefixSum + offset);
    ft.update(currentPrefixSum + offset + 1, 1);
  }

  return ans;
};
