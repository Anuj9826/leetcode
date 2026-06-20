/**
 * Maximum Building Height
 * Time Complexity: O(R log R)
 * Space Complexity: O(R)
 */
var maxBuilding = function (n, restrictions) {
  const numBuildings = n;
  const initialRestrictionsArray = restrictions;

  const allRestrictionsData = initialRestrictionsArray.slice();
  allRestrictionsData.push([1, 0]);
  allRestrictionsData.push([numBuildings, numBuildings - 1]);

  allRestrictionsData.sort(
    (restrictionA, restrictionB) => restrictionA[0] - restrictionB[0],
  );

  const totalRestrictionEntries = allRestrictionsData.length;

  for (
    let forwardPassIndex = 1;
    forwardPassIndex < totalRestrictionEntries;
    forwardPassIndex++
  ) {
    const currentEntryForward = allRestrictionsData[forwardPassIndex];
    const previousEntryForward = allRestrictionsData[forwardPassIndex - 1];

    const currentIdForward = currentEntryForward[0];
    const currentMaxHeightForward = currentEntryForward[1];
    const previousIdForward = previousEntryForward[0];
    const previousMaxHeightForward = previousEntryForward[1];

    const possibleHeightFromPrev =
      previousMaxHeightForward + (currentIdForward - previousIdForward);
    const finalHeightAfterForwardPass = Math.min(
      currentMaxHeightForward,
      possibleHeightFromPrev,
    );
    allRestrictionsData[forwardPassIndex][1] = finalHeightAfterForwardPass;
  }

  for (
    let backwardPassIndex = totalRestrictionEntries - 2;
    backwardPassIndex >= 0;
    backwardPassIndex--
  ) {
    const currentEntryBackward = allRestrictionsData[backwardPassIndex];
    const nextEntryBackward = allRestrictionsData[backwardPassIndex + 1];

    const currentIdBackward = currentEntryBackward[0];
    const currentMaxHeightBackward = currentEntryBackward[1];
    const nextIdBackward = nextEntryBackward[0];
    const nextMaxHeightBackward = nextEntryBackward[1];

    const possibleHeightFromNext =
      nextMaxHeightBackward + (nextIdBackward - currentIdBackward);
    const finalHeightAfterBackwardPass = Math.min(
      currentMaxHeightBackward,
      possibleHeightFromNext,
    );
    allRestrictionsData[backwardPassIndex][1] = finalHeightAfterBackwardPass;
  }

  let maximumOverallHeight = 0;

  for (
    let peakCalculationIndex = 1;
    peakCalculationIndex < totalRestrictionEntries;
    peakCalculationIndex++
  ) {
    const leftSegmentEntry = allRestrictionsData[peakCalculationIndex - 1];
    const rightSegmentEntry = allRestrictionsData[peakCalculationIndex];

    const leftSegmentId = leftSegmentEntry[0];
    const leftSegmentHeight = leftSegmentEntry[1];
    const rightSegmentId = rightSegmentEntry[0];
    const rightSegmentHeight = rightSegmentEntry[1];

    const segmentIdentifierDistance = rightSegmentId - leftSegmentId;
    const segmentHeightDifferenceValue = Math.abs(
      rightSegmentHeight - leftSegmentHeight,
    );

    const potentialPeakHeight =
      Math.max(leftSegmentHeight, rightSegmentHeight) +
      Math.floor(
        (segmentIdentifierDistance - segmentHeightDifferenceValue) / 2,
      );
    maximumOverallHeight = Math.max(maximumOverallHeight, potentialPeakHeight);
  }

  return maximumOverallHeight;
};
