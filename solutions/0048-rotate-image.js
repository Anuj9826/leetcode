/**
 * Rotate Image
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var rotate = function (matrix) {
  const matrixLength = matrix.length;

  for (
    let layerIndex = 0;
    layerIndex < Math.floor(matrixLength / 2);
    layerIndex++
  ) {
    const firstBound = layerIndex;
    const lastBound = matrixLength - 1 - layerIndex;

    for (
      let positionIndex = 0;
      positionIndex < lastBound - firstBound;
      positionIndex++
    ) {
      const holdingValue = matrix[firstBound][firstBound + positionIndex];

      matrix[firstBound][firstBound + positionIndex] =
        matrix[lastBound - positionIndex][firstBound];

      matrix[lastBound - positionIndex][firstBound] =
        matrix[lastBound][lastBound - positionIndex];

      matrix[lastBound][lastBound - positionIndex] =
        matrix[firstBound + positionIndex][lastBound];

      matrix[firstBound + positionIndex][lastBound] = holdingValue;
    }
  }
};
