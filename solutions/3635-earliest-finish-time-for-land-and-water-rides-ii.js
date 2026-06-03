/**
 * Earliest Finish Time for Land and Water Rides II
 * Time Complexity: O((N+M) log(max(N,M)))
 * Space Complexity: O(N+M)
 */
var earliestFinishTime = function (
  landStartTime,
  landDuration,
  waterStartTime,
  waterDuration,
) {
  const calculateMinFinishForOrder = (firstCategory, secondCategory) => {
    if (firstCategory.length === 0 || secondCategory.length === 0) {
      return Infinity;
    }

    const secondParsed = secondCategory.map((ride) => ({
      start: ride.start,
      duration: ride.duration,
      finish: ride.start + ride.duration,
    }));
    secondParsed.sort((a, b) => a.start - b.start);

    const n2 = secondParsed.length;

    const prefixMinDuration = new Array(n2);
    if (n2 > 0) {
      prefixMinDuration[0] = secondParsed[0].duration;
      for (let i = 1; i < n2; i++) {
        prefixMinDuration[i] = Math.min(
          prefixMinDuration[i - 1],
          secondParsed[i].duration,
        );
      }
    }

    const suffixMinFinish = new Array(n2);
    if (n2 > 0) {
      suffixMinFinish[n2 - 1] = secondParsed[n2 - 1].finish;
      for (let i = n2 - 2; i >= 0; i--) {
        suffixMinFinish[i] = Math.min(
          suffixMinFinish[i + 1],
          secondParsed[i].finish,
        );
      }
    }

    let minTotalFinish = Infinity;

    for (const firstRide of firstCategory) {
      const firstFinishTime = firstRide.start + firstRide.duration;

      let low = 0;
      let high = n2;
      let k = n2;

      while (low < high) {
        let mid = Math.floor(low + (high - low) / 2);
        if (secondParsed[mid].start >= firstFinishTime) {
          k = mid;
          high = mid;
        } else {
          low = mid + 1;
        }
      }

      let currentCandidateFinish = Infinity;

      if (k > 0) {
        currentCandidateFinish = Math.min(
          currentCandidateFinish,
          firstFinishTime + prefixMinDuration[k - 1],
        );
      }

      if (k < n2) {
        currentCandidateFinish = Math.min(
          currentCandidateFinish,
          suffixMinFinish[k],
        );
      }

      minTotalFinish = Math.min(minTotalFinish, currentCandidateFinish);
    }

    return minTotalFinish;
  };

  const landRides = landStartTime.map((start, i) => ({
    start: start,
    duration: landDuration[i],
  }));
  const waterRides = waterStartTime.map((start, i) => ({
    start: start,
    duration: waterDuration[i],
  }));

  const minFinishLandThenWater = calculateMinFinishForOrder(
    landRides,
    waterRides,
  );
  const minFinishWaterThenLand = calculateMinFinishForOrder(
    waterRides,
    landRides,
  );

  return Math.min(minFinishLandThenWater, minFinishWaterThenLand);
};
