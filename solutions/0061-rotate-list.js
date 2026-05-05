/**
 * Rotate List
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var rotateRight = function (head, k) {
  if (!head || !head.next || k === 0) {
    return head;
  }

  let currentTraversal = head;
  let listTotalLength = 0;
  let originalListTail = null;

  while (currentTraversal) {
    listTotalLength++;
    originalListTail = currentTraversal;
    currentTraversal = currentTraversal.next;
  }

  let actualRotations = k % listTotalLength;

  if (actualRotations === 0) {
    return head;
  }

  originalListTail.next = head;

  let stepsToBreak = listTotalLength - actualRotations;

  let newTailFinder = head;
  for (let stepCount = 1; stepCount < stepsToBreak; stepCount++) {
    newTailFinder = newTailFinder.next;
  }

  let rotatedListHead = newTailFinder.next;
  newTailFinder.next = null;

  return rotatedListHead;
};
