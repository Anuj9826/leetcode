/**
 * Maximum Length Substring With Two Occurrences
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var maximumLengthSubstring = function (s) {
  let maxLengthFound = 0;
  const charFrequencyTracker = new Map();

  for (
    let windowStartPointer = 0, windowEndPointer = 0;
    windowEndPointer < s.length;
    windowEndPointer++
  ) {
    const characterAtWindowEnd = s[windowEndPointer];
    charFrequencyTracker.set(
      characterAtWindowEnd,
      (charFrequencyTracker.get(characterAtWindowEnd) || 0) + 1,
    );

    while (charFrequencyTracker.get(characterAtWindowEnd) > 2) {
      const characterAtWindowStart = s[windowStartPointer];
      const occurrencesToRemove =
        charFrequencyTracker.get(characterAtWindowStart) - 1;
      charFrequencyTracker.set(characterAtWindowStart, occurrencesToRemove);
      if (occurrencesToRemove === 0) {
        charFrequencyTracker.delete(characterAtWindowStart);
      }
      windowStartPointer++;
    }

    maxLengthFound = Math.max(
      maxLengthFound,
      windowEndPointer - windowStartPointer + 1,
    );
  }

  return maxLengthFound;
};
