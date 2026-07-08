/**
 * Concatenate Non-Zero Digits and Multiply by Sum II
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N + Q)
 */
var sumAndMultiply = function (s, queries) {
  const MOD = 1000000007n;
  const n = s.length;

  const pow10 = new Array(n + 1).fill(1n);
  const count = new Array(n + 1).fill(0);
  const sum = new Array(n + 1).fill(0n);
  const x = new Array(n + 1).fill(0n);

  for (let i = 0; i < n; i++) {
    const d = Number(s[i]);

    pow10[i + 1] = (pow10[i] * 10n) % MOD;
    count[i + 1] = count[i] + (d !== 0 ? 1 : 0);
    sum[i + 1] = sum[i] + BigInt(d);

    if (d !== 0) {
      x[i + 1] = (x[i] * 10n + BigInt(d)) % MOD;
    } else {
      x[i + 1] = x[i];
    }
  }

  const ans = [];
  for (const [l, r] of queries) {
    const countDiff = count[r + 1] - count[l];
    let x_val = (x[r + 1] - ((x[l] * pow10[countDiff]) % MOD) + MOD) % MOD;
    let sum_val = sum[r + 1] - sum[l];

    ans.push(Number((x_val * sum_val) % MOD));
  }

  return ans;
};
