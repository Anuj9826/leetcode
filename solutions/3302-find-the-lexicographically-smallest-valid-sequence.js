/**
 * Find the Lexicographically Smallest Valid Sequence
 * Time Complexity: O(n + m)
 * Space Complexity: O(m)
 */
var validSequence = function (word1, word2) {
  const n = word1.length;
  const m = word2.length;

  const answer = new Array(m);
  const last = new Array(m).fill(-1);

  let i = n - 1;
  let j = m - 1;

  while (i >= 0 && j >= 0) {
    if (word1[i] === word2[j]) {
      last[j] = i;
      j--;
    }

    i--;
  }

  let canSkip = true;
  j = 0;
  for (i = 0; i < n; i++) {
    if (j === m) {
      break;
    }

    if (word1[i] === word2[j]) {
      answer[j] = i;
      j++;
    } else if (canSkip && (j === m - 1 || i < last[j + 1])) {
      answer[j] = i;
      j++;
      canSkip = false;
    }
  }

  return j === m ? answer : [];
};
