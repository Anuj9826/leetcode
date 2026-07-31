/**
 * Minimum Number of Pushes to Type Word II
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var minimumPushes = function (word) {
  const letterFrequencies = new Map();
  const wordLength = word.length;

  for (
    let currentCharacterIndex = 0;
    currentCharacterIndex < wordLength;
    currentCharacterIndex++
  ) {
    const characterKey = word[currentCharacterIndex];
    letterFrequencies.set(
      characterKey,
      (letterFrequencies.get(characterKey) || 0) + 1,
    );
  }

  const sortedFrequencies = Array.from(letterFrequencies.values());
  sortedFrequencies.sort((firstValue, secondValue) => secondValue - firstValue);

  let totalPushesAccumulator = 0;
  let pushAssignmentIndex = 0;
  const keyCapacity = 8;

  while (pushAssignmentIndex < sortedFrequencies.length) {
    const currentLetterCount = sortedFrequencies[pushAssignmentIndex];
    const pushCost = Math.floor(pushAssignmentIndex / keyCapacity) + 1;
    totalPushesAccumulator += currentLetterCount * pushCost;
    pushAssignmentIndex++;
  }

  return totalPushesAccumulator;
};
