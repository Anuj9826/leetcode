/**
 * Delete The Middle Node Of A Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var deleteMiddle = function (head) {
  if (!head || !head.next) {
    return null;
  }

  let precedingNode = null;
  let slowRunner = head;
  let fastRunner = head;

  while (fastRunner && fastRunner.next) {
    precedingNode = slowRunner;
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;
  }

  precedingNode.next = slowRunner.next;

  return head;
};
