/**
 * Count the Number of Complete Components
 * Time Complexity: O(N + E)
 * Space Complexity: O(N + E)
 */
var countCompleteComponents = function (n, edges) {
  const adjacencyStructure = Array.from({ length: n }, () => new Set());
  edges.forEach((edgeData) => {
    const firstNode = edgeData[0];
    const secondNode = edgeData[1];
    adjacencyStructure[firstNode].add(secondNode);
    adjacencyStructure[secondNode].add(firstNode);
  });

  const visitedGlobalNodes = new Set();
  let totalCompleteComponents = 0;

  const traverseComponent = (currentNodeId) => {
    const currentExploredComponent = new Set([currentNodeId]);
    const bfsQueue = [currentNodeId];
    visitedGlobalNodes.add(currentNodeId);

    while (bfsQueue.length > 0) {
      const activeNode = bfsQueue.shift();
      adjacencyStructure[activeNode].forEach((adjacentNode) => {
        if (!visitedGlobalNodes.has(adjacentNode)) {
          currentExploredComponent.add(adjacentNode);
          bfsQueue.push(adjacentNode);
          visitedGlobalNodes.add(adjacentNode);
        }
      });
    }
    return currentExploredComponent;
  };

  const verifyCompleteness = (potentialComponent) => {
    const componentNodeCount = potentialComponent.size;
    return [...potentialComponent].every((componentVertex) => {
      if (adjacencyStructure[componentVertex].size !== componentNodeCount - 1) {
        return false;
      }
      return [...adjacencyStructure[componentVertex]].every((connectedPeer) =>
        potentialComponent.has(connectedPeer),
      );
    });
  };

  for (let initialVertex = 0; initialVertex < n; initialVertex++) {
    if (!visitedGlobalNodes.has(initialVertex)) {
      const currentComp = traverseComponent(initialVertex);
      if (verifyCompleteness(currentComp)) {
        totalCompleteComponents++;
      }
    }
  }

  return totalCompleteComponents;
};
