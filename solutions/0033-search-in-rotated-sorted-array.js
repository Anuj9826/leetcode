/**
 * Search in Rotated Sorted Array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var search = function (nums, target) {
    let lowPointer = 0;
    let highPointer = nums.length;
    const firstElement = nums[0];

    while (lowPointer < highPointer) {
        const midPoint = Math.floor((lowPointer + highPointer) / 2);
        let effectiveValue;

        const isMidSmall = nums[midPoint] < firstElement;
        const isTargetSmall = target < firstElement;

        if (isMidSmall === isTargetSmall) {
            effectiveValue = nums[midPoint];
        } else if (isTargetSmall) {
            effectiveValue = -Infinity;
        } else {
            effectiveValue = Infinity;
        }

        if (effectiveValue < target) {
            lowPointer = midPoint + 1;
        } else if (effectiveValue > target) {
            highPointer = midPoint;
        } else {
            return midPoint;
        }
    }

    return -1;
};