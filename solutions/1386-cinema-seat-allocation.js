/**
 * Cinema Seat Allocation
 * Time Complexity: O(R)
 * Space Complexity: O(R)
 */
var maxNumberOfFamilies = function (totalRows, reservedSeatPositions) {
  const rowToReservedSeatsMap = new Map();

  for (const [currentSeatRow, seatColumnNumber] of reservedSeatPositions) {
    if (!rowToReservedSeatsMap.has(currentSeatRow)) {
      rowToReservedSeatsMap.set(currentSeatRow, new Set());
    }
    rowToReservedSeatsMap.get(currentSeatRow).add(seatColumnNumber);
  }

  let maximumFamilyGroups = 2 * (totalRows - rowToReservedSeatsMap.size);

  for (const occupiedColumnsInRow of rowToReservedSeatsMap.values()) {
    let currentFamilyCount = 0;

    const canFitLeftGroup =
      !occupiedColumnsInRow.has(2) &&
      !occupiedColumnsInRow.has(3) &&
      !occupiedColumnsInRow.has(4) &&
      !occupiedColumnsInRow.has(5);
    const canFitRightGroup =
      !occupiedColumnsInRow.has(6) &&
      !occupiedColumnsInRow.has(7) &&
      !occupiedColumnsInRow.has(8) &&
      !occupiedColumnsInRow.has(9);
    const canFitMiddleGroup =
      !occupiedColumnsInRow.has(4) &&
      !occupiedColumnsInRow.has(5) &&
      !occupiedColumnsInRow.has(6) &&
      !occupiedColumnsInRow.has(7);

    if (canFitLeftGroup && canFitRightGroup) {
      currentFamilyCount = 2;
    } else if (canFitLeftGroup || canFitRightGroup || canFitMiddleGroup) {
      currentFamilyCount = 1;
    }

    maximumFamilyGroups += currentFamilyCount;
  }

  return maximumFamilyGroups;
};
