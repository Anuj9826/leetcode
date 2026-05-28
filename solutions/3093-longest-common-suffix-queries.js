/**
 * Longest Common Suffix Queries
 * Time Complexity: O(S_container + S_query)
 * Space Complexity: O(S_container)
 */
var stringIndices = function (wordsContainer, wordsQuery) {
  function updateBestStringInfo(node, newLength, newIndex) {
    if (newLength < node.bestStringInfo.length) {
      node.bestStringInfo.length = newLength;
      node.bestStringInfo.index = newIndex;
    } else if (newLength === node.bestStringInfo.length) {
      if (newIndex < node.bestStringInfo.index) {
        node.bestStringInfo.index = newIndex;
      }
    }
  }

  const root = {
    children: new Map(),
    bestStringInfo: { length: Infinity, index: -1 },
  };

  for (let i = 0; i < wordsContainer.length; i++) {
    const word = wordsContainer[i];
    const wordLength = word.length;

    let currentNode = root;
    updateBestStringInfo(currentNode, wordLength, i);

    for (let j = wordLength - 1; j >= 0; j--) {
      const char = word[j];
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, {
          children: new Map(),
          bestStringInfo: { length: Infinity, index: -1 },
        });
      }
      currentNode = currentNode.children.get(char);
      updateBestStringInfo(currentNode, wordLength, i);
    }
  }

  const ans = [];
  for (let i = 0; i < wordsQuery.length; i++) {
    const query = wordsQuery[i];
    const queryLength = query.length;

    let currentNode = root;
    let deepestNodeReached = root;

    for (let j = queryLength - 1; j >= 0; j--) {
      const char = query[j];
      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char);
        deepestNodeReached = currentNode;
      } else {
        break;
      }
    }
    ans.push(deepestNodeReached.bestStringInfo.index);
  }

  return ans;
};
