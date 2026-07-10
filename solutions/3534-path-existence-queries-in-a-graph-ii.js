/**
 * Path Existence Queries in a Graph II
 * - Time Complexity: O(N log N + N * K + Q * K)
 * - Space Complexity: O(N * K)
 */

var pathExistenceQueries = function (n, nums, maxDiff, queries) {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = { val: nums[i], id: i };
  }
  arr.sort((a, b) => a.val - b.val);

  const pos = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    pos[arr[i].id] = i;
  }

  const R = new Int32Array(n);
  let j = 0;
  for (let i = 0; i < n; i++) {
    while (j < n && arr[j].val <= arr[i].val + maxDiff) {
      j++;
    }
    R[i] = j - 1;
  }

  const L = new Int32Array(n);
  j = 0;
  for (let i = 0; i < n; i++) {
    while (arr[i].val - arr[j].val > maxDiff) {
      j++;
    }
    L[i] = j;
  }

  const K = 19;
  const upR = new Int32Array(K * n);
  const upL = new Int32Array(K * n);

  for (let i = 0; i < n; i++) {
    upR[i] = R[i];
    upL[i] = L[i];
  }

  for (let k = 1; k < K; k++) {
    let currOffset = k * n;
    let prevOffset = (k - 1) * n;
    for (let i = 0; i < n; i++) {
      upR[currOffset + i] = upR[prevOffset + upR[prevOffset + i]];
      upL[currOffset + i] = upL[prevOffset + upL[prevOffset + i]];
    }
  }

  const ans = new Int32Array(queries.length);
  for (let q = 0; q < queries.length; q++) {
    const u_prime = pos[queries[q][0]];
    const v_prime = pos[queries[q][1]];

    if (u_prime === v_prime) {
      ans[q] = 0;
    } else if (u_prime < v_prime) {
      if (upR[(K - 1) * n + u_prime] < v_prime) {
        ans[q] = -1;
      } else {
        let curr = u_prime;
        let steps = 0;
        for (let k = K - 1; k >= 0; k--) {
          if (upR[k * n + curr] < v_prime) {
            curr = upR[k * n + curr];
            steps += 1 << k;
          }
        }
        ans[q] = steps + 1;
      }
    } else {
      if (upL[(K - 1) * n + u_prime] > v_prime) {
        ans[q] = -1;
      } else {
        let curr = u_prime;
        let steps = 0;
        for (let k = K - 1; k >= 0; k--) {
          if (upL[k * n + curr] > v_prime) {
            curr = upL[k * n + curr];
            steps += 1 << k;
          }
        }
        ans[q] = steps + 1;
      }
    }
  }

  return Array.from(ans);
};
