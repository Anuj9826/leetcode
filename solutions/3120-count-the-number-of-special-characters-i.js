/**
 * Count the Number of Special Characters I
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfSpecialChars = function (word) {
  const seenLower = new Array(26).fill(false);
  const seenUpper = new Array(26).fill(false);

  for (const char of word) {
    const charCode = char.charCodeAt(0);
    if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) {
      const index = charCode - "a".charCodeAt(0);
      seenLower[index] = true;
    } else if (charCode >= "A".charCodeAt(0) && charCode <= "Z".charCodeAt(0)) {
      const index = charCode - "A".charCodeAt(0);
      seenUpper[index] = true;
    }
  }

  let specialCount = 0;
  for (let i = 0; i < 26; i++) {
    if (seenLower[i] && seenUpper[i]) {
      specialCount++;
    }
  }

  return specialCount;
};
