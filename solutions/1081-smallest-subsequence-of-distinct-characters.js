/**
 * Smallest Subsequence Of Distinct Characters
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var smallestSubsequence = function (inputString) {
  const lastIndexPositions = new Map();
  for (let loopIndex = 0; loopIndex < inputString.length; loopIndex++) {
    lastIndexPositions.set(inputString[loopIndex], loopIndex);
  }

  const processingStack = [];
  const charactersVisited = new Set();

  for (
    let currentScanIndex = 0;
    currentScanIndex < inputString.length;
    currentScanIndex++
  ) {
    const charFromInput = inputString[currentScanIndex];

    if (charactersVisited.has(charFromInput)) {
      continue;
    }

    while (
      processingStack.length > 0 &&
      processingStack[processingStack.length - 1] > charFromInput &&
      lastIndexPositions.get(processingStack[processingStack.length - 1]) >
        currentScanIndex
    ) {
      const stackTopChar = processingStack.pop();
      charactersVisited.delete(stackTopChar);
    }

    processingStack.push(charFromInput);
    charactersVisited.add(charFromInput);
  }

  return processingStack.join("");
};
