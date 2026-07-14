/**
 * Find the Number of Subsequences With Equal GCD
 * Time Complexity: O(N × 201²)
 * Space Complexity: O(201²)
 */
var subsequencePairCount = function (nums) {
  const MOD = 1e9 + 7;
  const MAX = 200;

  const gcd = (a, b) => {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const gcdTable = Array.from(
    { length: MAX + 1 },
    () => new Int32Array(MAX + 1),
  );
  for (let i = 0; i <= MAX; i++) {
    for (let j = 0; j <= MAX; j++) {
      if (i === 0) gcdTable[i][j] = j;
      else if (j === 0) gcdTable[i][j] = i;
      else gcdTable[i][j] = gcd(i, j);
    }
  }

  let dp = new Int32Array(201 * 201);
  dp[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    let next_dp = new Int32Array(201 * 201);

    for (let j = 0; j < 40401; j++) {
      if (dp[j] > 0) {
        let ways = dp[j];
        let g1 = Math.floor(j / 201);
        let g2 = j % 201;

        next_dp[j] = (next_dp[j] + ways) % MOD;

        let ng1 = gcdTable[g1][x];
        let idx1 = ng1 * 201 + g2;
        next_dp[idx1] = (next_dp[idx1] + ways) % MOD;

        let ng2 = gcdTable[g2][x];
        let idx2 = g1 * 201 + ng2;
        next_dp[idx2] = (next_dp[idx2] + ways) % MOD;
      }
    }
    dp = next_dp;
  }

  let ans = 0;

  for (let g = 1; g <= MAX; g++) {
    ans = (ans + dp[g * 201 + g]) % MOD;
  }

  return ans;
};
