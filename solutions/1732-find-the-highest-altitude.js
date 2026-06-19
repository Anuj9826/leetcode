/**
 * Find the Highest Altitude
 * Time Complexity: O(n), where n is the length of the `gain` array, as we iterate through the array once.
 * Space Complexity: O(1), as we only use a few constant-space variables.
 */
var largestAltitude = function (gain) {
  let currentAltitudeValue = 0;
  let maximumAltitudeReached = 0;
  let gainArrayLength = gain.length;

  for (
    let gainElementIndex = 0;
    gainElementIndex < gainArrayLength;
    gainElementIndex++
  ) {
    currentAltitudeValue += gain[gainElementIndex];
    if (currentAltitudeValue > maximumAltitudeReached) {
      maximumAltitudeReached = currentAltitudeValue;
    }
  }

  return maximumAltitudeReached;
};
