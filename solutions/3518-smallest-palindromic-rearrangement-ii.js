/**
 * Smallest Palindromic Rearrangement II
 * Time Complexity: O(N + L * A)
 * Space Complexity: O(L + A)
 */
var smallestPalindrome = function (s, k) {
  const n = s.length;
  const halfLen = Math.floor(n / 2);

  const charCounts = new Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    charCounts[s.charCodeAt(i) - 97]++;
  }

  let middleChar = "";
  if (n % 2 === 1) {
    for (let i = 0; i < 26; i++) {
      if (charCounts[i] % 2 === 1) {
        middleChar = String.fromCharCode(97 + i);
        charCounts[i]--;
        break;
      }
    }
  }

  for (let i = 0; i < 26; i++) {
    charCounts[i] /= 2;
  }

  const LOG_FACTORIALS = new Array(halfLen + 1);
  LOG_FACTORIALS[0] = 0;
  for (let i = 1; i <= halfLen; i++) {
    LOG_FACTORIALS[i] = LOG_FACTORIALS[i - 1] + Math.log(i);
  }

  k--;

  const getPermutationsCount = (remainingLength, currentCounts) => {
    if (remainingLength === 0) {
      return 1;
    }

    let logNumerator = LOG_FACTORIALS[remainingLength];
    let logDenominator = 0;
    for (let i = 0; i < 26; i++) {
      logDenominator += LOG_FACTORIALS[currentCounts[i]];
    }

    const logPerms = logNumerator - logDenominator;

    if (logPerms > Math.log(k + 1) + 1e-9) {
      return k + 2;
    } else {
      return Math.round(Math.exp(logPerms));
    }
  };

  const resultHalf = [];
  const currentCountsSnapshot = charCounts.slice();

  for (let i = 0; i < halfLen; i++) {
    let charFound = false;
    for (let charIdx = 0; charIdx < 26; charIdx++) {
      if (currentCountsSnapshot[charIdx] > 0) {
        currentCountsSnapshot[charIdx]--;

        const remainingLength = halfLen - (i + 1);
        const numPerms = getPermutationsCount(
          remainingLength,
          currentCountsSnapshot,
        );

        if (k < numPerms) {
          resultHalf.push(String.fromCharCode(97 + charIdx));
          charFound = true;
          break;
        } else {
          k -= numPerms;
          currentCountsSnapshot[charIdx]++;
        }
      }
    }
    if (!charFound) {
      return "";
    }
  }

  const firstHalfStr = resultHalf.join("");
  const secondHalfStr = resultHalf.reverse().join("");

  return firstHalfStr + middleChar + secondHalfStr;
};
