/**
 * Number of ZigZag Arrays II
 * Time Complexity: O((2k)^3 * log(n))
 * Space Complexity: O((2k)^2)
 */

const MOD = 1000000007;
const MOD_BIG = 1000000007n;

function multiply(A, B, size) {
  const B_T = Array(size);
  for (let j = 0; j < size; j++) {
    B_T[j] = new Int32Array(size);
    for (let k_idx = 0; k_idx < size; k_idx++) {
      B_T[j][k_idx] = B[k_idx][j];
    }
  }

  const C = Array(size);
  for (let i = 0; i < size; i++) {
    C[i] = new Int32Array(size);
    const a_i = A[i];
    for (let j = 0; j < size; j++) {
      const b_t_j = B_T[j];
      let sum = 0n;

      for (let k_idx = 0; k_idx < size; k_idx++) {
        const valA = a_i[k_idx];
        const valB = b_t_j[k_idx];
        if (valA !== 0 && valB !== 0) {
          sum += BigInt(valA) * BigInt(valB);
        }
      }
      C[i][j] = Number(sum % MOD_BIG);
    }
  }
  return C;
}

function matrixPower(A, p, size) {
  let res = Array(size);
  for (let i = 0; i < size; i++) {
    res[i] = new Int32Array(size);
    res[i][i] = 1;
  }

  let currentMatrix = A;
  while (p > 0) {
    if (p % 2 === 1) {
      res = multiply(res, currentMatrix, size);
    }
    currentMatrix = multiply(currentMatrix, currentMatrix, size);
    p = Math.floor(p / 2);
  }
  return res;
}

var zigZagArrays = function (n, l, r) {
  const k = r - l + 1;

  if (k <= 1) return n === 1 ? k : 0;
  if (n === 1) return k % MOD;
  if (n === 2) return Number((BigInt(k) * BigInt(k - 1)) % MOD_BIG);

  const T = Array(k);
  for (let y = 0; y < k; y++) {
    T[y] = new Int32Array(k);
    for (let z = k - y; z < k; z++) {
      T[y][z] = 1;
    }
  }

  const T_pow = matrixPower(T, n - 2, k);

  let total = 0n;
  for (let y = 0; y < k; y++) {
    for (let z = 0; z < k; z++) {
      if (T_pow[y][z] !== 0 && z !== 0) {
        total = (total + BigInt(T_pow[y][z]) * BigInt(z)) % MOD_BIG;
      }
    }
  }
  return Number((total * 2n) % MOD_BIG);
};
