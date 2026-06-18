/**
 * Angle Between Hands of a Clock
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var angleClock = function (hourInput, minuteInput) {
  const minuteDegreePerUnit = 6;
  const currentMinuteHandAngle = minuteInput * minuteDegreePerUnit;

  const hourDegreePerUnit = 30;
  const hourDegreePerMinuteContribution = 0.5;

  const normalizedHour = hourInput % 12;
  const baseHourAngle = normalizedHour * hourDegreePerUnit;
  const minuteInfluenceAngle = minuteInput * hourDegreePerMinuteContribution;
  const totalHourHandAngle = baseHourAngle + minuteInfluenceAngle;

  const angularDelta = Math.abs(currentMinuteHandAngle - totalHourHandAngle);
  const complementaryAngle = 360 - angularDelta;

  const smallestAngle = Math.min(angularDelta, complementaryAngle);

  return smallestAngle;
};
