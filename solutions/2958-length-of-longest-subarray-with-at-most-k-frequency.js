/**
 * Length Of Longest Subarray With At Most K Frequency
 * Time Complexity: O(N log N)
 * Space Complexity: O(U)
 */
var maxSubarrayLength = function (numsArray, maxFrequencyLimit) {
  function checkValidity(
    currentCandidateLength,
    sourceArray,
    allowedFrequency,
  ) {
    if (currentCandidateLength === 0) {
      return true;
    }
    if (currentCandidateLength > sourceArray.length) {
      return false;
    }

    const elementsFrequencyMap = new Map();
    let violationCounter = 0;

    for (
      let currentInitialIndex = 0;
      currentInitialIndex < currentCandidateLength;
      currentInitialIndex++
    ) {
      const valueAtCurrentInitial = sourceArray[currentInitialIndex];
      const previousOccurrence =
        elementsFrequencyMap.get(valueAtCurrentInitial) || 0;
      elementsFrequencyMap.set(valueAtCurrentInitial, previousOccurrence + 1);
      if (previousOccurrence + 1 === allowedFrequency + 1) {
        violationCounter++;
      }
    }

    if (violationCounter === 0) {
      return true;
    }

    for (
      let slideIterationIndex = currentCandidateLength;
      slideIterationIndex < sourceArray.length;
      slideIterationIndex++
    ) {
      const valueToEvict =
        sourceArray[slideIterationIndex - currentCandidateLength];
      const valueToInclude = sourceArray[slideIterationIndex];

      const countBeforeEviction = elementsFrequencyMap.get(valueToEvict);
      if (countBeforeEviction === allowedFrequency + 1) {
        violationCounter--;
      }
      elementsFrequencyMap.set(valueToEvict, countBeforeEviction - 1);

      const countBeforeInclusion =
        elementsFrequencyMap.get(valueToInclude) || 0;
      elementsFrequencyMap.set(valueToInclude, countBeforeInclusion + 1);
      if (countBeforeInclusion + 1 === allowedFrequency + 1) {
        violationCounter++;
      }

      if (violationCounter === 0) {
        return true;
      }
    }

    return false;
  }

  let minimumLengthPossible = 0;
  let maximumLengthPossible = numsArray.length;
  let finalLongestLength = 0;

  while (minimumLengthPossible <= maximumLengthPossible) {
    const midpointLength = Math.floor(
      (minimumLengthPossible + maximumLengthPossible) / 2,
    );

    if (midpointLength === 0) {
      minimumLengthPossible = 1;
      continue;
    }

    if (checkValidity(midpointLength, numsArray, maxFrequencyLimit)) {
      finalLongestLength = midpointLength;
      minimumLengthPossible = midpointLength + 1;
    } else {
      maximumLengthPossible = midpointLength - 1;
    }
  }

  return finalLongestLength;
};
