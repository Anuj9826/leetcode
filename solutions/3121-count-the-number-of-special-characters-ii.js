/**
 * Count the Number of Special Characters II
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfSpecialChars = function (word) {
  const lastLowerIndex = Array(26).fill(-1);
  const firstUpperIndex = Array(26).fill(Infinity);

  const aCharCode = "a".charCodeAt(0);
  const ACharCode = "A".charCodeAt(0);

  for (let i = 0; i < word.length; i++) {
    const charCode = word.charCodeAt(i);

    if (charCode >= aCharCode && charCode <= aCharCode + 25) {
      const idx = charCode - aCharCode;
      lastLowerIndex[idx] = i;
    } else if (charCode >= ACharCode && charCode <= ACharCode + 25) {
      const idx = charCode - ACharCode;
      if (firstUpperIndex[idx] === Infinity) {
        firstUpperIndex[idx] = i;
      }
    }
  }

  let specialCharCount = 0;
  for (let j = 0; j < 26; j++) {
    if (lastLowerIndex[j] !== -1 && firstUpperIndex[j] !== Infinity) {
      if (lastLowerIndex[j] < firstUpperIndex[j]) {
        specialCharCount++;
      }
    }
  }

  return specialCharCount;
};
