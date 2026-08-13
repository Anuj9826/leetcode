/**
 * Longest Substring Of One Repeating Character
 * Time Complexity: O(N + K log N)
 * Space Complexity: O(N + K)
 */
var longestRepeating = function (s, queryCharacters, queryIndices) {
  const stringCharacters = s.split("");
  const stringSize = stringCharacters.length;
  const queryArrayChars = queryCharacters;
  const queryArrayIndices = queryIndices;
  const queryArrayCount = queryArrayIndices.length;
  const finalResults = [];

  class SegmentTreeNode {
    constructor() {
      this.leftConsecutive = 0;
      this.rightConsecutive = 0;
      this.maxConsecutive = 0;
      this.totalSegmentSize = 0;
    }
  }

  const treeArray = new Array(4 * stringSize);
  for (
    let loopInitCounter = 0;
    loopInitCounter < 4 * stringSize;
    loopInitCounter++
  ) {
    treeArray[loopInitCounter] = new SegmentTreeNode();
  }

  function buildSegmentTree(
    currentNodeIdx,
    segmentRangeStart,
    segmentRangeEnd,
  ) {
    if (segmentRangeStart === segmentRangeEnd) {
      treeArray[currentNodeIdx].leftConsecutive = 1;
      treeArray[currentNodeIdx].rightConsecutive = 1;
      treeArray[currentNodeIdx].maxConsecutive = 1;
      treeArray[currentNodeIdx].totalSegmentSize = 1;
      return;
    }

    const middlePoint = Math.floor((segmentRangeStart + segmentRangeEnd) / 2);
    const leftChildIndex = 2 * currentNodeIdx;
    const rightChildIndex = 2 * currentNodeIdx + 1;

    buildSegmentTree(leftChildIndex, segmentRangeStart, middlePoint);
    buildSegmentTree(rightChildIndex, middlePoint + 1, segmentRangeEnd);

    mergeNodeData(currentNodeIdx, segmentRangeStart, segmentRangeEnd);
  }

  function mergeNodeData(nodeToMergeIdx, nodeRangeStart, nodeRangeEnd) {
    const leftMergeChildIdx = 2 * nodeToMergeIdx;
    const rightMergeChildIdx = 2 * nodeToMergeIdx + 1;
    const mergeMidPoint = Math.floor((nodeRangeStart + nodeRangeEnd) / 2);

    treeArray[nodeToMergeIdx].totalSegmentSize =
      treeArray[leftMergeChildIdx].totalSegmentSize +
      treeArray[rightMergeChildIdx].totalSegmentSize;

    if (
      treeArray[leftMergeChildIdx].totalSegmentSize ===
        treeArray[leftMergeChildIdx].leftConsecutive &&
      mergeMidPoint + 1 <= nodeRangeEnd &&
      stringCharacters[mergeMidPoint] === stringCharacters[mergeMidPoint + 1]
    ) {
      treeArray[nodeToMergeIdx].leftConsecutive =
        treeArray[leftMergeChildIdx].totalSegmentSize +
        treeArray[rightMergeChildIdx].leftConsecutive;
    } else {
      treeArray[nodeToMergeIdx].leftConsecutive =
        treeArray[leftMergeChildIdx].leftConsecutive;
    }

    if (
      treeArray[rightMergeChildIdx].totalSegmentSize ===
        treeArray[rightMergeChildIdx].rightConsecutive &&
      mergeMidPoint >= nodeRangeStart &&
      stringCharacters[mergeMidPoint] === stringCharacters[mergeMidPoint + 1]
    ) {
      treeArray[nodeToMergeIdx].rightConsecutive =
        treeArray[rightMergeChildIdx].totalSegmentSize +
        treeArray[leftMergeChildIdx].rightConsecutive;
    } else {
      treeArray[nodeToMergeIdx].rightConsecutive =
        treeArray[rightMergeChildIdx].rightConsecutive;
    }

    treeArray[nodeToMergeIdx].maxConsecutive = Math.max(
      treeArray[leftMergeChildIdx].maxConsecutive,
      treeArray[rightMergeChildIdx].maxConsecutive,
    );

    if (
      mergeMidPoint >= nodeRangeStart &&
      mergeMidPoint + 1 <= nodeRangeEnd &&
      stringCharacters[mergeMidPoint] === stringCharacters[mergeMidPoint + 1]
    ) {
      treeArray[nodeToMergeIdx].maxConsecutive = Math.max(
        treeArray[nodeToMergeIdx].maxConsecutive,
        treeArray[leftMergeChildIdx].rightConsecutive +
          treeArray[rightMergeChildIdx].leftConsecutive,
      );
    }
  }

  function updateSegmentTree(
    updateRootIdx,
    updateRangeStart,
    updateRangeEnd,
    targetIdx,
  ) {
    if (targetIdx < updateRangeStart || targetIdx > updateRangeEnd) {
      return;
    }

    if (updateRangeStart === updateRangeEnd) {
      return;
    }

    const updateMidValue = Math.floor((updateRangeStart + updateRangeEnd) / 2);
    const childLeft = 2 * updateRootIdx;
    const childRight = 2 * updateRootIdx + 1;

    updateSegmentTree(childLeft, updateRangeStart, updateMidValue, targetIdx);
    updateSegmentTree(
      childRight,
      updateMidValue + 1,
      updateRangeEnd,
      targetIdx,
    );

    mergeNodeData(updateRootIdx, updateRangeStart, updateRangeEnd);
  }

  buildSegmentTree(1, 0, stringSize - 1);

  for (
    let queryExecutionIndex = 0;
    queryExecutionIndex < queryArrayCount;
    queryExecutionIndex++
  ) {
    const currentModificationIndex = queryArrayIndices[queryExecutionIndex];
    const newCharacterValue = queryArrayChars[queryExecutionIndex];

    stringCharacters[currentModificationIndex] = newCharacterValue;
    updateSegmentTree(1, 0, stringSize - 1, currentModificationIndex);

    finalResults.push(treeArray[1].maxConsecutive);
  }

  return finalResults;
};
