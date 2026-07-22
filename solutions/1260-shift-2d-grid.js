/**
 * Shift 2d Grid
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var shiftGrid = function (grid, k) {
  const totalRows = grid.length;
  const totalColumns = grid[0].length;
  const allElementsCount = totalRows * totalColumns;

  const actualShiftsNeeded = k % allElementsCount;

  const newlyArrangedGrid = Array(totalRows)
    .fill(null)
    .map(() => Array(totalColumns).fill(0));

  for (let originalRow = 0; originalRow < totalRows; originalRow++) {
    for (
      let originalColumn = 0;
      originalColumn < totalColumns;
      originalColumn++
    ) {
      const flatOriginalIndex = originalRow * totalColumns + originalColumn;
      const flatShiftedIndex =
        (flatOriginalIndex + actualShiftsNeeded) % allElementsCount;

      const newGridRow = Math.floor(flatShiftedIndex / totalColumns);
      const newGridColumn = flatShiftedIndex % totalColumns;

      newlyArrangedGrid[newGridRow][newGridColumn] =
        grid[originalRow][originalColumn];
    }
  }

  return newlyArrangedGrid;
};
