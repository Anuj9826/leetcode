/**
 * Minimum Number of Pushes to Type Word I
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumPushes = function (word) {
  const letterFrequencies = new Array(26).fill(0);

  for (const characterInput of word) {
    const charCodeOffset = characterInput.charCodeAt(0) - 97;
    letterFrequencies[charCodeOffset]++;
  }

  letterFrequencies.sort((firstFreq, secondFreq) => secondFreq - firstFreq);

  let totalPushesAccumulator = 0;
  const keySlots = 8;

  for (
    let frequencyIndex = 0;
    frequencyIndex < letterFrequencies.length;
    frequencyIndex++
  ) {
    const currentFrequencyValue = letterFrequencies[frequencyIndex];
    if (currentFrequencyValue === 0) {
      break;
    }

    const pressPosition = Math.floor(frequencyIndex / keySlots) + 1;
    totalPushesAccumulator += currentFrequencyValue * pressPosition;
  }

  return totalPushesAccumulator;
};
