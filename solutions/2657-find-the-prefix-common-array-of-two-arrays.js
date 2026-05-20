/**
 * Find the Prefix Common Array of Two Arrays
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findThePrefixCommonArray = function (A, B) {
  const lengthOfArrays = A.length;
  const resultCollection = new Array(lengthOfArrays);
  const presentInA = new Array(lengthOfArrays + 1).fill(false);
  const presentInB = new Array(lengthOfArrays + 1).fill(false);
  let totalCurrentCommon = 0;

  for (let indexIterator = 0; indexIterator < lengthOfArrays; indexIterator++) {
    const valueFromA = A[indexIterator];
    const valueFromB = B[indexIterator];

    if (!presentInA[valueFromA] && presentInB[valueFromA]) {
      totalCurrentCommon++;
    }
    presentInA[valueFromA] = true;

    if (!presentInB[valueFromB] && presentInA[valueFromB]) {
      totalCurrentCommon++;
    }
    presentInB[valueFromB] = true;

    resultCollection[indexIterator] = totalCurrentCommon;
  }

  return resultCollection;
};
