/**
 * Number of Paths with Max Score
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var pathsWithMaxScore = function (boardInput) {
  const boardSize = boardInput.length;
  const moduloValue = 1000000007;

  const pathScoresAndCounts = Array.from({ length: boardSize }, () =>
    new Array(boardSize).fill(null).map(() => [-Infinity, 0]),
  );

  pathScoresAndCounts[boardSize - 1][boardSize - 1] = [0, 1];

  const possibleMoveOffsets = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  for (
    let currentGridRow = boardSize - 1;
    currentGridRow >= 0;
    currentGridRow--
  ) {
    for (
      let currentGridColumn = boardSize - 1;
      currentGridColumn >= 0;
      currentGridColumn--
    ) {
      if (boardInput[currentGridRow][currentGridColumn] === "X") {
        pathScoresAndCounts[currentGridRow][currentGridColumn] = [-Infinity, 0];
        continue;
      }

      if (
        currentGridRow === boardSize - 1 &&
        currentGridColumn === boardSize - 1
      ) {
        continue;
      }

      const squareNumericValue =
        boardInput[currentGridRow][currentGridColumn] === "E"
          ? 0
          : Number(boardInput[currentGridRow][currentGridColumn]);

      let currentMaxCollectedScore = -Infinity;
      let currentPathWayCount = 0;

      for (const [deltaRow, deltaColumn] of possibleMoveOffsets) {
        const sourceRow = currentGridRow + deltaRow;
        const sourceColumn = currentGridColumn + deltaColumn;

        if (sourceRow >= boardSize || sourceColumn >= boardSize) {
          continue;
        }

        const priorPathsCount = pathScoresAndCounts[sourceRow][sourceColumn][1];
        if (priorPathsCount === 0) {
          continue;
        }

        const priorScoreValue = pathScoresAndCounts[sourceRow][sourceColumn][0];
        const prospectiveTotalScore = priorScoreValue + squareNumericValue;

        if (prospectiveTotalScore > currentMaxCollectedScore) {
          currentMaxCollectedScore = prospectiveTotalScore;
          currentPathWayCount = priorPathsCount;
        } else if (prospectiveTotalScore === currentMaxCollectedScore) {
          currentPathWayCount =
            (currentPathWayCount + priorPathsCount) % moduloValue;
        }
      }
      pathScoresAndCounts[currentGridRow][currentGridColumn] = [
        currentMaxCollectedScore,
        currentPathWayCount,
      ];
    }
  }

  const finalScoreResult = pathScoresAndCounts[0][0];
  if (finalScoreResult[1] === 0) {
    return [0, 0];
  }
  return finalScoreResult;
};
