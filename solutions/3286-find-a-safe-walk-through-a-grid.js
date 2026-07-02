/**
 * Find a Safe Walk Through a Grid
 * Time Complexity: O(M * N * H_max * log(M * N * H_max))
 * Space Complexity: O(M * N * H_max)
 */
var findSafeWalk = function (grid, health) {
  const m = grid.length;
  const n = grid[0].length;

  const heap = [];

  const push = (item) => {
    heap.push(item);

    let index = heap.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (heap[parent][0] >= heap[index][0]) break;

      [heap[parent], heap[index]] = [heap[index], heap[parent]];

      index = parent;
    }
  };

  const pop = () => {
    if (heap.length === 1) return heap.pop();

    const top = heap[0];
    heap[0] = heap.pop();

    let index = 0;

    while (true) {
      let largest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < heap.length && heap[left][0] > heap[largest][0]) {
        largest = left;
      }

      if (right < heap.length && heap[right][0] > heap[largest][0]) {
        largest = right;
      }

      if (largest === index) break;

      [heap[index], heap[largest]] = [heap[largest], heap[index]];

      index = largest;
    }

    return top;
  };

  const maxHealth = Array.from({ length: m }, () => Array(n).fill(-1));

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const startHealth = health - (grid[0][0] === 1 ? 1 : 0);

  if (startHealth <= 0) {
    return false;
  }

  push([startHealth, 0, 0]);
  maxHealth[0][0] = startHealth;

  while (heap.length) {
    const [currentHealth, row, col] = pop();

    if (currentHealth < maxHealth[row][col]) {
      continue;
    }

    if (row === m - 1 && col === n - 1) {
      return true;
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) {
        continue;
      }

      const newHealth = currentHealth - (grid[newRow][newCol] === 1 ? 1 : 0);

      if (newHealth > 0 && newHealth > maxHealth[newRow][newCol]) {
        maxHealth[newRow][newCol] = newHealth;
        push([newHealth, newRow, newCol]);
      }
    }
  }

  return false;
};
