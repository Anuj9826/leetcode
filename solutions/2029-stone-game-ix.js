/**
 * Stone Game Ix
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var stoneGameIX = function (inputStonesCollection) {
  const modulusCounts = [0, 0, 0];
  let stoneIterator = 0;
  while (stoneIterator < inputStonesCollection.length) {
    const currentStoneElement = inputStonesCollection[stoneIterator];
    modulusCounts[currentStoneElement % 3]++;
    stoneIterator++;
  }

  const countZeroMod = modulusCounts[0];
  const countOneMod = modulusCounts[1];
  const countTwoMod = modulusCounts[2];

  if (countZeroMod % 2 === 0) {
    return countOneMod >= 1 && countTwoMod >= 1;
  } else {
    const differenceOneTwo = Math.abs(countOneMod - countTwoMod);
    return differenceOneTwo > 2;
  }
};
