/**
 * Number of Ways to Assign Edge Weights II
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N log N)
 */

var assignEdgeWeights = function (edges, queries) {
  const N = edges.length + 1;
  const MOD = 1000000007;

  const MAX_LOG_N = 18;

  const adj = Array.from({ length: N + 1 }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const depth = new Int32Array(N + 1).fill(0);
  const parent = Array.from({ length: N + 1 }, () =>
    new Int32Array(MAX_LOG_N).fill(0),
  );

  const queue = [1];
  const visited = new Uint8Array(N + 1);
  visited[1] = 1;

  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    for (const v of adj[u]) {
      if (!visited[v]) {
        visited[v] = 1;
        parent[v][0] = u;
        depth[v] = depth[u] + 1;
        queue.push(v);
      }
    }
  }

  for (let j = 1; j < MAX_LOG_N; j++) {
    for (let i = 1; i <= N; i++) {
      if (parent[i][j - 1] !== 0) {
        parent[i][j] = parent[parent[i][j - 1]][j - 1];
      }
    }
  }

  function getLCA(u, v) {
    if (depth[u] < depth[v]) {
      [u, v] = [v, u];
    }

    let diff = depth[u] - depth[v];
    for (let j = MAX_LOG_N - 1; j >= 0; j--) {
      if ((diff >> j) & 1) {
        u = parent[u][j];
      }
    }

    if (u === v) return u;

    for (let j = MAX_LOG_N - 1; j >= 0; j--) {
      if (parent[u][j] !== parent[v][j]) {
        u = parent[u][j];
        v = parent[v][j];
      }
    }
    return parent[u][0];
  }

  function power(base, exp) {
    let res = 1n;
    let b = BigInt(base);
    let e = BigInt(exp);
    const m = BigInt(MOD);

    while (e > 0n) {
      if (e % 2n === 1n) res = (res * b) % m;
      b = (b * b) % m;
      e = e / 2n;
    }
    return Number(res);
  }

  const results = [];
  for (const [u, v] of queries) {
    if (u === v) {
      results.push(0);
      continue;
    }

    const lca = getLCA(u, v);
    const k = depth[u] + depth[v] - 2 * depth[lca];

    results.push(power(2, k - 1));
  }

  return results;
};
