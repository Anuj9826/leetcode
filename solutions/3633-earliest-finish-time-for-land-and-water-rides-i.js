/**
 * Earliest Finish Time for Land and Water Rides I
 * Time Complexity: O(n * m)
 * Space Complexity: O(1)
 */
var earliestFinishTime = function (
  landStartTime,
  landDuration,
  waterStartTime,
  waterDuration,
) {
  let minOverallFinishTime = Infinity;

  for (let i = 0; i < landStartTime.length; i++) {
    const currentLandStartTime = landStartTime[i];
    const currentLandDuration = landDuration[i];

    for (let j = 0; j < waterStartTime.length; j++) {
      const currentWaterStartTime = waterStartTime[j];
      const currentWaterDuration = waterDuration[j];

      const landFinishTime = currentLandStartTime + currentLandDuration;
      const waterStartAfterLand = Math.max(
        landFinishTime,
        currentWaterStartTime,
      );
      const finishTimeLW = waterStartAfterLand + currentWaterDuration;
      minOverallFinishTime = Math.min(minOverallFinishTime, finishTimeLW);

      const waterFinishTime = currentWaterStartTime + currentWaterDuration;
      const landStartAfterWater = Math.max(
        waterFinishTime,
        currentLandStartTime,
      );
      const finishTimeWL = landStartAfterWater + currentLandDuration;
      minOverallFinishTime = Math.min(minOverallFinishTime, finishTimeWL);
    }
  }

  return minOverallFinishTime;
};
