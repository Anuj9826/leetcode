/**
 * Minimum Common Value
 * Time Complexity: O(M + N)
 * Space Complexity: O(M + N)
 */
var getCommon = function (nums1, nums2) {
  const findCommonRecursive = (arrayOne, indexA, arrayTwo, indexB) => {
    if (indexA >= arrayOne.length || indexB >= arrayTwo.length) {
      return -1;
    }

    const valueOne = arrayOne[indexA];
    const valueTwo = arrayTwo[indexB];

    if (valueOne === valueTwo) {
      return valueOne;
    } else if (valueOne < valueTwo) {
      return findCommonRecursive(arrayOne, indexA + 1, arrayTwo, indexB);
    } else {
      return findCommonRecursive(arrayOne, indexA, arrayTwo, indexB + 1);
    }
  };

  return findCommonRecursive(nums1, 0, nums2, 0);
};
