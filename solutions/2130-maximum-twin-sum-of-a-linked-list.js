/**
 * Maximum Twin Sum Of A Linked List
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var pairSum = function (head) {
  let slowIterator = head;
  let fastIterator = head;
  let endOfFirstHalf = null;

  while (fastIterator && fastIterator.next) {
    endOfFirstHalf = slowIterator;
    slowIterator = slowIterator.next;
    fastIterator = fastIterator.next.next;
  }

  endOfFirstHalf.next = null;

  let headOfSecondHalf = slowIterator;

  let previousItem = null;
  let currentItem = headOfSecondHalf;
  let nextItemToProcess = null;

  while (currentItem) {
    nextItemToProcess = currentItem.next;
    currentItem.next = previousItem;
    previousItem = currentItem;
    currentItem = nextItemToProcess;
  }

  let reversedSecondHalf = previousItem;

  let firstHalfCurrentNode = head;
  let secondHalfCurrentNode = reversedSecondHalf;
  let maxTwinSum = 0;

  while (secondHalfCurrentNode) {
    let currentPairSum = firstHalfCurrentNode.val + secondHalfCurrentNode.val;
    maxTwinSum = Math.max(maxTwinSum, currentPairSum);
    firstHalfCurrentNode = firstHalfCurrentNode.next;
    secondHalfCurrentNode = secondHalfCurrentNode.next;
  }

  return maxTwinSum;
};
