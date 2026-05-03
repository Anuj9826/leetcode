/**
 * Rotate String
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var rotateString = function (s, goal) {
  const stringSLen = s.length;
  const stringGoalLen = goal.length;

  if (stringSLen !== stringGoalLen) {
    return false;
  }

  if (stringSLen === 0) {
    return true;
  }

  const doubledSourceString = s + s;
  const foundIndex = doubledSourceString.indexOf(goal);

  return foundIndex !== -1;
};
