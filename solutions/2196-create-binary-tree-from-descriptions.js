/**
 * Create Binary Tree From Descriptions
 * Time Complexity: O(D + N)
 * Space Complexity: O(N)
 */
var createBinaryTree = function (descriptions) {
  const treeNodesRegistry = new Map();
  const childValuesSet = new Set();

  for (const singleDescription of descriptions) {
    const currentParentValue = singleDescription[0];
    const currentChildValue = singleDescription[1];
    const isCurrentLeft = singleDescription[2];

    if (!treeNodesRegistry.has(currentParentValue)) {
      treeNodesRegistry.set(
        currentParentValue,
        new TreeNode(currentParentValue),
      );
    }
    if (!treeNodesRegistry.has(currentChildValue)) {
      treeNodesRegistry.set(currentChildValue, new TreeNode(currentChildValue));
    }

    childValuesSet.add(currentChildValue);

    const parentObject = treeNodesRegistry.get(currentParentValue);
    const childObject = treeNodesRegistry.get(currentChildValue);

    if (isCurrentLeft === 1) {
      parentObject.left = childObject;
    } else {
      parentObject.right = childObject;
    }
  }

  for (const nodeIdentifier of treeNodesRegistry.keys()) {
    if (!childValuesSet.has(nodeIdentifier)) {
      return treeNodesRegistry.get(nodeIdentifier);
    }
  }

  return null;
};
