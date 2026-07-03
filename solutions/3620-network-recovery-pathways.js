/**
 * Network Recovery Pathways
 * Time Complexity: O((N + M) * log(MAX_COST))
 * Space Complexity: O(N + M)
 */
var findMaxPathScore = function (edges, online, k) {
  const n = online.length;

  let left = 0;
  let right = 1_000_000_000;
  let ans = -1;

  const check = (minEdgeScore) => {
    const dist = new Array(n).fill(Infinity);
    dist[0] = 0;

    const currentAdj = Array.from({ length: n }, () => []);
    const inDegree = new Array(n).fill(0);

    for (const [u, v, cost] of edges) {
      if (cost >= minEdgeScore) {
        if (v === n - 1 || online[v]) {
          currentAdj[u].push([v, cost]);
          inDegree[v]++;
        }
      }
    }

    const q = [];
    for (let i = 0; i < n; i++) {
      if (inDegree[i] === 0) {
        q.push(i);
      }
    }

    let head = 0;
    while (head < q.length) {
      const u = q[head++];
      const canPropagate = dist[u] !== Infinity;

      for (const [v, cost] of currentAdj[u]) {
        if (canPropagate) {
          if (dist[u] + cost < dist[v]) {
            dist[v] = dist[u] + cost;
          }
        }
        inDegree[v]--;
        if (inDegree[v] === 0) {
          q.push(v);
        }
      }
    }

    return dist[n - 1] <= k;
  };

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (check(mid)) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
};
