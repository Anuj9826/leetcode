/**
 * Smallest Divisible Digit Product II
 * Time Complexity: O(N * 9 + 60^2 * 6)
 * Space Complexity: O(N + 60^2)
 */
var smallestNumber = function (num, t) {
  let t_rem = t;
  let req = [0, 0, 0, 0];
  const primes = [2, 3, 5, 7];

  for (let i = 0; i < 4; i++) {
    while (t_rem % primes[i] === 0) {
      req[i]++;
      t_rem /= primes[i];
    }
  }

  if (t_rem > 1) return "-1";
  let dp = Array.from({ length: 60 }, () => new Int32Array(60).fill(1e9));
  dp[0][0] = 0;
  const moves = [
    [1, 0],
    [0, 1],
    [2, 0],
    [1, 1],
    [3, 0],
    [0, 2],
  ];

  for (let i = 0; i < 60; ++i) {
    for (let j = 0; j < 60; ++j) {
      if (i === 0 && j === 0) continue;
      for (let [di, dj] of moves) {
        let pi = Math.max(0, i - di);
        let pj = Math.max(0, j - dj);
        dp[i][j] = Math.min(dp[i][j], dp[pi][pj] + 1);
      }
    }
  }

  let n = num.length;
  let numArr = num.split("");

  for (let i = 0; i < n; i++) {
    if (numArr[i] === "0") {
      for (let j = i; j < n; j++) {
        numArr[j] = "1";
      }
      break;
    }
  }

  let pref = [[0, 0, 0, 0]];
  for (let i = 0; i < n; i++) {
    let cur = [...pref[pref.length - 1]];
    let d = parseInt(numArr[i]);
    if (d === 2 || d === 6) cur[0]++;
    if (d === 4) cur[0] += 2;
    if (d === 8) cur[0] += 3;
    if (d === 3 || d === 6) cur[1]++;
    if (d === 9) cur[1] += 2;
    if (d === 5) cur[2]++;
    if (d === 7) cur[3]++;
    pref.push(cur);
  }

  const check = (c2, c3, c5, c7, rem_len) => {
    let n2 = Math.max(0, req[0] - c2);
    let n3 = Math.max(0, req[1] - c3);
    let n5 = Math.max(0, req[2] - c5);
    let n7 = Math.max(0, req[3] - c7);
    return n5 + n7 + dp[n2][n3] <= rem_len;
  };

  if (check(pref[n][0], pref[n][1], pref[n][2], pref[n][3], 0)) {
    return numArr.join("");
  }

  for (let i = n - 1; i >= 0; i--) {
    let base = pref[i];
    let startD = parseInt(numArr[i]) + 1;
    for (let d = startD; d <= 9; d++) {
      let c2 = base[0],
        c3 = base[1],
        c5 = base[2],
        c7 = base[3];
      if (d === 2 || d === 6) c2++;
      if (d === 4) c2 += 2;
      if (d === 8) c2 += 3;
      if (d === 3 || d === 6) c3++;
      if (d === 9) c3 += 2;
      if (d === 5) c5++;
      if (d === 7) c7++;

      if (check(c2, c3, c5, c7, n - 1 - i)) {
        let resArr = numArr.slice(0, i);
        resArr.push(String(d));
        for (let j = i + 1; j < n; j++) {
          for (let next_d = 1; next_d <= 9; next_d++) {
            let nc2 = c2,
              nc3 = c3,
              nc5 = c5,
              nc7 = c7;
            if (next_d === 2 || next_d === 6) nc2++;
            if (next_d === 4) nc2 += 2;
            if (next_d === 8) nc2 += 3;
            if (next_d === 3 || next_d === 6) nc3++;
            if (next_d === 9) nc3 += 2;
            if (next_d === 5) nc5++;
            if (next_d === 7) nc7++;
            if (check(nc2, nc3, nc5, nc7, n - 1 - j)) {
              resArr.push(String(next_d));
              c2 = nc2;
              c3 = nc3;
              c5 = nc5;
              c7 = nc7;
              break;
            }
          }
        }
        return resArr.join("");
      }
    }
  }

  let target_len = Math.max(n + 1, req[2] + req[3] + dp[req[0]][req[1]]);
  let resArr = [];
  let c2 = 0,
    c3 = 0,
    c5 = 0,
    c7 = 0;

  for (let j = 0; j < target_len; j++) {
    for (let next_d = 1; next_d <= 9; next_d++) {
      let nc2 = c2,
        nc3 = c3,
        nc5 = c5,
        nc7 = c7;
      if (next_d === 2 || next_d === 6) nc2++;
      if (next_d === 4) nc2 += 2;
      if (next_d === 8) nc2 += 3;
      if (next_d === 3 || next_d === 6) nc3++;
      if (next_d === 9) nc3 += 2;
      if (next_d === 5) nc5++;
      if (next_d === 7) nc7++;

      if (check(nc2, nc3, nc5, nc7, target_len - 1 - j)) {
        resArr.push(String(next_d));
        c2 = nc2;
        c3 = nc3;
        c5 = nc5;
        c7 = nc7;
        break;
      }
    }
  }

  return resArr.join("");
};
