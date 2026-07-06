/**
 * Remove Covered Intervals
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var removeCoveredIntervals = function (intervals) {
  intervals.sort((leftInterval, rightInterval) => {
    if (leftInterval[0] !== rightInterval[0]) {
      return leftInterval[0] - rightInterval[0];
    }
    return rightInterval[1] - leftInterval[1];
  });

  let uncoveredIntervalsCount = 1;
  let currentMaxEnd = intervals[0][1];

  for (
    let iterationIndex = 1;
    iterationIndex < intervals.length;
    iterationIndex++
  ) {
    const currentProcessedInterval = intervals[iterationIndex];
    const processedIntervalEnd = currentProcessedInterval[1];

    if (processedIntervalEnd > currentMaxEnd) {
      uncoveredIntervalsCount++;
      currentMaxEnd = processedIntervalEnd;
    }
  }

  return uncoveredIntervalsCount;
};
