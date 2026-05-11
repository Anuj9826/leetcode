/**
 * Separate the Digits in an Array
 * Time Complexity: O(S)
 * Space Complexity: O(S)
 */
var separateDigits = function (nums) {
  const resultantArray = [];

  for (const numberToProcess of nums) {
    const stringRepresentation = String(numberToProcess);
    for (
      let innerIndex = 0;
      innerIndex < stringRepresentation.length;
      innerIndex++
    ) {
      const digitCharacter = stringRepresentation[innerIndex];
      const convertedDigit = Number(digitCharacter);
      resultantArray.push(convertedDigit);
    }
  }

  return resultantArray;
};
