/**
 * Weighted Word Mapping
 * Time Complexity: O(N * L)
 * Space Complexity: O(N)
 */
var mapWordWeights = function (words, weights) {
  const mappedCharacters = [];
  const aCharCode = "a".charCodeAt(0);

  for (const word of words) {
    let currentWordWeight = 0;
    for (const char of word) {
      const charIndex = char.charCodeAt(0) - aCharCode;
      currentWordWeight += weights[charIndex];
    }

    const mappedIndex = currentWordWeight % 26;
    const targetCharCode = aCharCode + (25 - mappedIndex);
    mappedCharacters.push(String.fromCharCode(targetCharCode));
  }

  return mappedCharacters.join("");
};
