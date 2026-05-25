/**
 * Jump Game VII
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var canReach = function (s, minJump, maxJump) {
  const stringLength = s.length;
  const canAccess = new Array(stringLength).fill(false);
  canAccess[0] = true;

  const exploreQueue = [0];
  let maxJumpedSoFar = 0;

  while (exploreQueue.length > 0) {
    const currentIndex = exploreQueue.shift();

    const potentialJumpMin = currentIndex + minJump;
    const potentialJumpMax = Math.min(currentIndex + maxJump, stringLength - 1);

    let explorationPoint = Math.max(potentialJumpMin, maxJumpedSoFar + 1);

    for (; explorationPoint <= potentialJumpMax; explorationPoint++) {
      if (s[explorationPoint] === "0") {
        if (explorationPoint === stringLength - 1) {
          return true;
        }
        if (!canAccess[explorationPoint]) {
          canAccess[explorationPoint] = true;
          exploreQueue.push(explorationPoint);
        }
      }
    }
    maxJumpedSoFar = Math.max(maxJumpedSoFar, potentialJumpMax);
  }

  return false;
};
