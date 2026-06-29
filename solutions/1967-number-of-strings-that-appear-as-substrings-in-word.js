/**
 * Number of Strings That Appear as Substrings in Word
 * Time Complexity: O(P * W * M)
 * Space Complexity: O(1)
 */
var numOfStrings = function (patterns, word) {
  let matchingStringsCount = 0;
  let patternArrayLength = patterns.length;

  for (
    let patternIndex = 0;
    patternIndex < patternArrayLength;
    patternIndex++
  ) {
    let currentPatternToEvaluate = patterns[patternIndex];
    if (word.includes(currentPatternToEvaluate)) {
      matchingStringsCount++;
    }
  }

  return matchingStringsCount;
};
