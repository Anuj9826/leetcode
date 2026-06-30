/**
 * Number of Substrings Containing All Three Characters
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfSubstrings = function (s) {
  const characterFrequencies = [0, 0, 0];
  let totalSubstringsFound = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    characterFrequencies[s[windowEnd].charCodeAt(0) - 97]++;

    while (
      characterFrequencies[0] > 0 &&
      characterFrequencies[1] > 0 &&
      characterFrequencies[2] > 0
    ) {
      totalSubstringsFound += s.length - windowEnd;
      characterFrequencies[s[windowStart].charCodeAt(0) - 97]--;
      windowStart++;
    }
  }

  return totalSubstringsFound;
};
