/**
 * Jump Game IX
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxValue = function (nums) {
  const n = nums.length;
  const parent = new Array(n);
  const maxVal = new Array(n);

  for (let i = 0; i < n; i++) {
    parent[i] = i;
    maxVal[i] = nums[i];
  }

  function find(i) {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  }

  function union(i, j) {
    let rootI = find(i);
    let rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      maxVal[rootJ] = Math.max(maxVal[rootI], maxVal[rootJ]);
    }
  }

  let stack = [];

  for (let i = 0; i < n; i++) {
    let currentMax = nums[i];
    let poppedCount = 0;
    while (stack.length > 0 && stack[stack.length - 1].max_val > nums[i]) {
      let comp = stack.pop();
      union(i, comp.root_idx);

      if (poppedCount === 0) {
        currentMax = Math.max(currentMax, comp.max_val);
      }
      poppedCount++;
    }

    stack.push({ max_val: currentMax, root_idx: i });
  }

  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    ans[i] = maxVal[find(i)];
  }

  return ans;
};
