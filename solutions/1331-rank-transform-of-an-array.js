/**
 * Rank Transform of an Array
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var arrayRankTransform = function (arr) {
  if (arr.length === 0) {
    return [];
  }

  let initialIndexedValues = [];
  for (let indexPosition = 0; indexPosition < arr.length; indexPosition++) {
    initialIndexedValues.push({
      elementValue: arr[indexPosition],
      originalPosition: indexPosition,
    });
  }

  initialIndexedValues.sort(
    (itemA, itemB) => itemA.elementValue - itemB.elementValue,
  );

  let transformedRanks = new Array(arr.length);
  let currentRanking = 1;
  let previousElementValue = null;

  transformedRanks[initialIndexedValues[0].originalPosition] = currentRanking;
  previousElementValue = initialIndexedValues[0].elementValue;

  for (
    let sortIterator = 1;
    sortIterator < initialIndexedValues.length;
    sortIterator++
  ) {
    const currentDataItem = initialIndexedValues[sortIterator];
    if (currentDataItem.elementValue > previousElementValue) {
      currentRanking++;
    }
    transformedRanks[currentDataItem.originalPosition] = currentRanking;
    previousElementValue = currentDataItem.elementValue;
  }

  return transformedRanks;
};
