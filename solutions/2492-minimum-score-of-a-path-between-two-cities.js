/**
 * Minimum Score Of A Path Between Two Cities
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var minScore = function (n, roads) {
  const cityAdjacencies = Array.from({ length: n + 1 }, () => []);
  for (const currentRoadEntry of roads) {
    const startCity = currentRoadEntry[0];
    const endCity = currentRoadEntry[1];
    const wayDistance = currentRoadEntry[2];
    cityAdjacencies[startCity].push([endCity, wayDistance]);
    cityAdjacencies[endCity].push([startCity, wayDistance]);
  }

  const encounteredNodes = new Set();
  const bfsTraversalQueue = [1];
  let overallMinimumScore = Infinity;

  while (bfsTraversalQueue.length > 0) {
    const processingCity = bfsTraversalQueue.shift();

    if (encounteredNodes.has(processingCity)) {
      continue;
    }
    encounteredNodes.add(processingCity);

    for (const neighborInfo of cityAdjacencies[processingCity]) {
      const neighborNode = neighborInfo[0];
      const edgeLength = neighborInfo[1];

      overallMinimumScore = Math.min(overallMinimumScore, edgeLength);

      if (!encounteredNodes.has(neighborNode)) {
        bfsTraversalQueue.push(neighborNode);
      }
    }
  }

  return overallMinimumScore;
};
