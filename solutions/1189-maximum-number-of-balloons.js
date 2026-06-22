/**
 * Maximum Number of Balloons
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxNumberOfBalloons = function (text) {
  const textCharCounts = new Map();

  for (const inputChar of text) {
    const currentCount = textCharCounts.get(inputChar) || 0;
    textCharCounts.set(inputChar, currentCount + 1);
  }

  const bCount = textCharCounts.get("b") || 0;
  const aCount = textCharCounts.get("a") || 0;
  const lCount = textCharCounts.get("l") || 0;
  const oCount = textCharCounts.get("o") || 0;
  const nCount = textCharCounts.get("n") || 0;

  const potentialBalloonsB = bCount;
  const potentialBalloonsA = aCount;
  const potentialBalloonsL = Math.floor(lCount / 2);
  const potentialBalloonsO = Math.floor(oCount / 2);
  const potentialBalloonsN = nCount;

  const totalBalloons = Math.min(
    potentialBalloonsB,
    potentialBalloonsA,
    potentialBalloonsL,
    potentialBalloonsO,
    potentialBalloonsN,
  );

  return totalBalloons;
};
