/**
 * Number of ZigZag Arrays I
 * Time Complexity: O(N * D)
 * Space Complexity: O(D)
 */
var zigZagArrays = function (n, l, r) {
  const MOD = 1000000007;
  const D = r - l + 1;
  let prevDpInc = new Array(D).fill(0);
  let prevDpDec = new Array(D).fill(0);

  for (let v_idx = 0; v_idx < D; v_idx++) {
    const currentVal = v_idx + l;
    prevDpInc[v_idx] = currentVal - l;
    prevDpDec[v_idx] = r - currentVal;
  }

  for (let i = 3; i <= n; i++) {
    let currDpInc = new Array(D).fill(0);
    let currDpDec = new Array(D).fill(0);
    let prefixSumIncPrev = new Array(D).fill(0);
    let prefixSumDecPrev = new Array(D).fill(0);

    let currentSumInc = 0;
    let currentSumDec = 0;
    for (let v_idx = 0; v_idx < D; v_idx++) {
      currentSumInc = (currentSumInc + prevDpInc[v_idx]) % MOD;
      currentSumDec = (currentSumDec + prevDpDec[v_idx]) % MOD;
      prefixSumIncPrev[v_idx] = currentSumInc;
      prefixSumDecPrev[v_idx] = currentSumDec;
    }

    for (let v_idx = 0; v_idx < D; v_idx++) {
      if (v_idx > 0) {
        currDpInc[v_idx] = prefixSumDecPrev[v_idx - 1];
      } else {
        currDpInc[v_idx] = 0;
      }

      if (v_idx < D - 1) {
        const totalSumInc = prefixSumIncPrev[D - 1];
        const sumUpToCurrent = prefixSumIncPrev[v_idx];
        currDpDec[v_idx] = (totalSumInc - sumUpToCurrent + MOD) % MOD;
      } else {
        currDpDec[v_idx] = 0;
      }
    }

    prevDpInc = currDpInc;
    prevDpDec = currDpDec;
  }

  let totalCount = 0;
  for (let v_idx = 0; v_idx < D; v_idx++) {
    totalCount = (totalCount + prevDpInc[v_idx]) % MOD;
    totalCount = (totalCount + prevDpDec[v_idx]) % MOD;
  }

  return totalCount;
};
