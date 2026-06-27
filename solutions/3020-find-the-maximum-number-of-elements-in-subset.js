/**
 * Find the Maximum Number of Elements in Subset
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var maximumLength = function (nums) {
  const counts = new Map();
  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  let maxLen = 1;

  if (counts.has(1)) {
    let countOnes = counts.get(1);
    if (countOnes % 2 === 0) {
      countOnes -= 1;
    }
    maxLen = Math.max(maxLen, countOnes);
  }

  for (const s of counts.keys()) {
    if (s === 1) {
      continue;
    }

    let currentVal = s;
    let currentChainLen = 1;

    while (true) {
      const nextVal = currentVal * currentVal;

      if (nextVal > 1000000000 || !counts.has(nextVal)) {
        break;
      }

      if (counts.get(currentVal) < 2) {
        break;
      }

      currentChainLen += 2;
      currentVal = nextVal;
    }

    maxLen = Math.max(maxLen, currentChainLen);
  }

  return maxLen;
};
