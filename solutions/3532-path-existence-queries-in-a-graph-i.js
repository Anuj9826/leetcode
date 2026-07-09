/**
 * Path Existence Queries in a Graph I
 * Time Complexity: O((N + Q) * α(N))
 * Space Complexity: O(N)
 */
class DSU {
  constructor(n) {
    this.parent = new Array(n);
    this.rank = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  find(i) {
    if (this.parent[i] === i) {
      return i;
    }
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);

    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
      return true;
    }
    return false;
  }
}

var pathExistenceQueries = function (n, nums, maxDiff, queries) {
  const dsu = new DSU(n);

  for (let i = 0; i < n - 1; i++) {
    if (nums[i + 1] - nums[i] <= maxDiff) {
      dsu.union(i, i + 1);
    }
  }

  const results = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const [ui, vi] = queries[i];
    results[i] = dsu.find(ui) === dsu.find(vi);
  }

  return results;
};
