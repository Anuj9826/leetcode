/**
 * Jump Game III
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var canReach = function (arr, start) {
  const processedLocations = new Set();

  const traverseJumps = (currentPosition, inputArray, visitedTracker) => {
    if (currentPosition < 0 || currentPosition >= inputArray.length) {
      return false;
    }

    if (visitedTracker.has(currentPosition)) {
      return false;
    }

    if (inputArray[currentPosition] === 0) {
      return true;
    }

    visitedTracker.add(currentPosition);

    const moveDistance = inputArray[currentPosition];
    const nextPositionPositive = currentPosition + moveDistance;
    const nextPositionNegative = currentPosition - moveDistance;

    const resultFromForwardJump = traverseJumps(
      nextPositionPositive,
      inputArray,
      visitedTracker,
    );
    if (resultFromForwardJump) {
      return true;
    }

    const resultFromBackwardJump = traverseJumps(
      nextPositionNegative,
      inputArray,
      visitedTracker,
    );
    if (resultFromBackwardJump) {
      return true;
    }

    return false;
  };

  return traverseJumps(start, arr, processedLocations);
};
