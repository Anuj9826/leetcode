/**
 * Number of Ways to Assign Edge Weights I
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var assignEdgeWeights = function (edges) {
  const MOD = 1000000007n;

  const power = (base, exp) => {
    let res = 1n;
    let b = BigInt(base) % MOD;
    let e = BigInt(exp);

    while (e > 0n) {
      if (e % 2n === 1n) {
        res = (res * b) % MOD;
      }
      b = (b * b) % MOD;
      e = e / 2n;
    }
    return Number(res);
  };

  const nodeCount = edges.length + 1;

  const adj = Array.from({ length: nodeCount + 1 }, () => []);

  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  let maxDepth = 0;
  const queue = [[1, 0]];
  const visited = new Uint8Array(nodeCount + 1);
  visited[1] = 1;

  let head = 0;

  while (head < queue.length) {
    const [currNode, currDepth] = queue[head++];

    if (currDepth > maxDepth) {
      maxDepth = currDepth;
    }

    for (const neighbor of adj[currNode]) {
      if (visited[neighbor] === 0) {
        visited[neighbor] = 1;
        queue.push([neighbor, currDepth + 1]);
      }
    }
  }

  return power(2, maxDepth - 1);
};
