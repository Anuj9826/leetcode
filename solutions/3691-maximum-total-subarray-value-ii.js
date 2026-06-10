/**
 * Maximum Total Subarray Value II
 * Time Complexity: O(N * log(MAX_VAL))
 * Space Complexity: O(N)
 */

var maxTotalValue = function (nums, k) {
  const n = nums.length;
  const LOG = Math.floor(Math.log2(n)) + 1;

  const max_st = Array.from({ length: n }, () => new Int32Array(LOG));
  const min_st = Array.from({ length: n }, () => new Int32Array(LOG));

  for (let i = 0; i < n; i++) {
    max_st[i][0] = nums[i];
    min_st[i][0] = nums[i];
  }

  for (let j = 1; j < LOG; j++) {
    for (let i = 0; i + (1 << j) <= n; i++) {
      max_st[i][j] = Math.max(
        max_st[i][j - 1],
        max_st[i + (1 << (j - 1))][j - 1],
      );
      min_st[i][j] = Math.min(
        min_st[i][j - 1],
        min_st[i + (1 << (j - 1))][j - 1],
      );
    }
  }

  function getVal(l, r) {
    if (l > r) return 0;
    const j = Math.floor(Math.log2(r - l + 1));
    const mx = Math.max(max_st[l][j], max_st[r - (1 << j) + 1][j]);
    const mn = Math.min(min_st[l][j], min_st[r - (1 << j) + 1][j]);
    return mx - mn;
  }

  class MaxHeap {
    constructor() {
      this.data = [];
    }
    push(val, l, r) {
      this.data.push({ val, l, r });
      this.up(this.data.length - 1);
    }
    pop() {
      if (this.data.length === 0) return null;
      const top = this.data[0];
      const bottom = this.data.pop();
      if (this.data.length > 0) {
        this.data[0] = bottom;
        this.down(0);
      }
      return top;
    }
    up(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.data[i].val > this.data[p].val) {
          const temp = this.data[i];
          this.data[i] = this.data[p];
          this.data[p] = temp;
          i = p;
        } else {
          break;
        }
      }
    }
    down(i) {
      const len = this.data.length;
      while ((i << 1) + 1 < len) {
        let left = (i << 1) + 1;
        let right = left + 1;
        let largest = i;
        if (this.data[left].val > this.data[largest].val) largest = left;
        if (right < len && this.data[right].val > this.data[largest].val)
          largest = right;
        if (largest !== i) {
          const temp = this.data[i];
          this.data[i] = this.data[largest];
          this.data[largest] = temp;
          i = largest;
        } else {
          break;
        }
      }
    }
  }

  const heap = new MaxHeap();

  heap.push(getVal(0, n - 1), 0, n - 1);

  let totalValue = 0;

  for (let i = 0; i < k; i++) {
    const top = heap.pop();
    if (!top) break;

    totalValue += top.val;
    const { l, r } = top;

    if (l + 1 <= r) {
      heap.push(getVal(l + 1, r), l + 1, r);
    }

    if (l === 0 && r - 1 >= l) {
      heap.push(getVal(l, r - 1), l, r - 1);
    }
  }

  return totalValue;
};
