/**
 * Find the Safest Path in a Grid
 * Time Complexity: O(N^2 * log(N))
 * Space Complexity: O(N^2)
 */
var maximumSafenessFactor = function (grid) {
  const n = grid.length;
  const distToThief = Array(n)
    .fill(0)
    .map(() => Array(n).fill(-1));
  const q = [];

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        q.push([r, c]);
        distToThief[r][c] = 0;
      }
    }
  }

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let head = 0;
  while (head < q.length) {
    const [r, c] = q[head++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (
        nr >= 0 &&
        nr < n &&
        nc >= 0 &&
        nc < n &&
        distToThief[nr][nc] === -1
      ) {
        distToThief[nr][nc] = distToThief[r][c] + 1;
        q.push([nr, nc]);
      }
    }
  }

  let low = 0;
  let high = 2 * (n - 1);
  let ans = 0;

  const canReach = (safenessThreshold) => {
    if (
      distToThief[0][0] < safenessThreshold ||
      distToThief[n - 1][n - 1] < safenessThreshold
    ) {
      return false;
    }

    const pathQ = [[0, 0]];
    const visited = Array(n)
      .fill(0)
      .map(() => Array(n).fill(false));
    visited[0][0] = true;
    let pathHead = 0;

    while (pathHead < pathQ.length) {
      const [r, c] = pathQ[pathHead++];

      if (r === n - 1 && c === n - 1) {
        return true;
      }

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (
          nr >= 0 &&
          nr < n &&
          nc >= 0 &&
          nc < n &&
          !visited[nr][nc] &&
          distToThief[nr][nc] >= safenessThreshold
        ) {
          visited[nr][nc] = true;
          pathQ.push([nr, nc]);
        }
      }
    }
    return false;
  };

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canReach(mid)) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return ans;
};
