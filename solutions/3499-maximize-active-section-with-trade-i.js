/**
 * Maximize Active Section with Trade
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxActiveSectionsAfterTrade = function (s) {
  let initialOnes = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      initialOnes++;
    }
  }

  const t = "1" + s + "1";

  const L = [];
  const W = [];

  const blocks = [];

  let count = 1;

  for (let i = 1; i < t.length; i++) {
    if (t[i] === t[i - 1]) {
      count++;
    } else {
      blocks.push({
        char: t[i - 1],
        len: count,
      });
      count = 1;
    }
  }

  blocks.push({
    char: t[t.length - 1],
    len: count,
  });

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].char === "0") {
      L.push(blocks[i].len);
    } else if (i > 0 && i < blocks.length - 1) {
      W.push(blocks[i].len);
    }
  }

  const m = L.length;

  if (m <= 1) {
    return initialOnes;
  }

  const prefMax = new Int32Array(m);
  const suffMax = new Int32Array(m);

  prefMax[0] = L[0];

  for (let i = 1; i < m; i++) {
    prefMax[i] = Math.max(prefMax[i - 1], L[i]);
  }

  suffMax[m - 1] = L[m - 1];

  for (let i = m - 2; i >= 0; i--) {
    suffMax[i] = Math.max(suffMax[i + 1], L[i]);
  }

  let maxGain = 0;

  for (let i = 0; i < m - 1; i++) {
    let maxOther = -Infinity;

    if (i > 0) {
      maxOther = Math.max(maxOther, prefMax[i - 1]);
    }

    if (i + 2 < m) {
      maxOther = Math.max(maxOther, suffMax[i + 2]);
    }

    const gain = Math.max(L[i] + L[i + 1], maxOther - W[i]);

    maxGain = Math.max(maxGain, gain);
  }

  return initialOnes + maxGain;
};
