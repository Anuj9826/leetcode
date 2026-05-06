/**
 * Rotating the Box
 * Time Complexity: O(m * n)
 * Space Complexity: O(n * m)
 */
var rotateTheBox = function (inputMatrix) {
  const originalHeight = inputMatrix.length;
  const originalWidth = inputMatrix[0].length;

  const rotatedBoxState = Array.from({ length: originalWidth }, () =>
    new Array(originalHeight).fill("."),
  );

  let currentOriginalRow = 0;
  while (currentOriginalRow < originalHeight) {
    let availablePlacementRow = originalWidth - 1;
    let currentOriginalCol = originalWidth - 1;

    while (currentOriginalCol >= 0) {
      const currentCellContent =
        inputMatrix[currentOriginalRow][currentOriginalCol];

      if (currentCellContent === "*") {
        const newColumnIndex = originalHeight - 1 - currentOriginalRow;
        rotatedBoxState[currentOriginalCol][newColumnIndex] = "*";
        availablePlacementRow = currentOriginalCol - 1;
      } else if (currentCellContent === "#") {
        const newColumnIndex = originalHeight - 1 - currentOriginalRow;
        rotatedBoxState[availablePlacementRow][newColumnIndex] = "#";
        availablePlacementRow--;
      }
      currentOriginalCol--;
    }
    currentOriginalRow++;
  }

  return rotatedBoxState;
};
