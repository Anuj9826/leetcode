/**
 * Jump Game IV
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minJumps = function (arr) {
  const arrLength = arr.length;
  if (arrLength <= 1) {
    return 0;
  }

  const valIndexMap = new Map();
  for (let arrayIteration = 0; arrayIteration < arrLength; arrayIteration++) {
    if (!valIndexMap.has(arr[arrayIteration])) {
      valIndexMap.set(arr[arrayIteration], []);
    }
    valIndexMap.get(arr[arrayIteration]).push(arrayIteration);
  }

  const processedIndices = new Set();
  const currentLevelQueue = [];
  processedIndices.add(0);
  currentLevelQueue.push(0);
  let jumpCount = 0;

  while (currentLevelQueue.length > 0) {
    let currentLevelItems = currentLevelQueue.length;
    const nextLevelQueue = [];

    for (let levelIndex = 0; levelIndex < currentLevelItems; levelIndex++) {
      const processingIndex = currentLevelQueue.shift();

      if (processingIndex === arrLength - 1) {
        return jumpCount;
      }

      const nextIdxForward = processingIndex + 1;
      if (nextIdxForward < arrLength && !processedIndices.has(nextIdxForward)) {
        processedIndices.add(nextIdxForward);
        nextLevelQueue.push(nextIdxForward);
      }

      const nextIdxBackward = processingIndex - 1;
      if (nextIdxBackward >= 0 && !processedIndices.has(nextIdxBackward)) {
        processedIndices.add(nextIdxBackward);
        nextLevelQueue.push(nextIdxBackward);
      }

      const matchingValueIndices = valIndexMap.get(arr[processingIndex]);
      if (matchingValueIndices) {
        for (
          let sameValIter = 0;
          sameValIter < matchingValueIndices.length;
          sameValIter++
        ) {
          const targetIndex = matchingValueIndices[sameValIter];
          if (!processedIndices.has(targetIndex)) {
            processedIndices.add(targetIndex);
            nextLevelQueue.push(targetIndex);
          }
        }
        valIndexMap.delete(arr[processingIndex]);
      }
    }
    currentLevelQueue.push(...nextLevelQueue);
    jumpCount++;
  }

  return -1;
};
