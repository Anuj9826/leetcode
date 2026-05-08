/**
 * Minimum Jumps to Reach End via Prime Teleportation
 * Time Complexity: O(MAX_NUM * log log MAX_NUM + N + K)
 * Space Complexity: O(MAX_NUM + N)
 */

const MAX_NUM = 1000000;

const isPrime = new Uint8Array(MAX_NUM + 1);
isPrime.fill(1);

isPrime[0] = isPrime[1] = 0;

for (let p = 2; p * p <= MAX_NUM; p++) {
  if (isPrime[p]) {
    for (let multiple = p * p; multiple <= MAX_NUM; multiple += p) {
      isPrime[multiple] = 0;
    }
  }
}

var minJumps = function (nums) {
  const n = nums.length;

  if (n === 1) return 0;

  let maxVal = 0;
  const valToIndices = new Map();

  for (let i = 0; i < n; i++) {
    const val = nums[i];

    if (val > maxVal) {
      maxVal = val;
    }

    let indices = valToIndices.get(val);

    if (indices === undefined) {
      indices = [];
      valToIndices.set(val, indices);
    }

    indices.push(i);
  }

  const dist = new Int32Array(n).fill(-1);
  const queue = new Int32Array(n);

  let head = 0;
  let tail = 0;

  dist[0] = 0;
  queue[tail++] = 0;

  const primeUsed = new Uint8Array(maxVal + 1);

  while (head < tail) {
    const currIdx = queue[head++];
    const currentJumps = dist[currIdx];

    const next1 = currIdx + 1;

    if (next1 < n && dist[next1] === -1) {
      if (next1 === n - 1) {
        return currentJumps + 1;
      }

      dist[next1] = currentJumps + 1;
      queue[tail++] = next1;
    }

    const next2 = currIdx - 1;

    if (next2 >= 0 && dist[next2] === -1) {
      dist[next2] = currentJumps + 1;
      queue[tail++] = next2;
    }

    const val = nums[currIdx];

    if (isPrime[val] && !primeUsed[val]) {
      primeUsed[val] = 1;

      for (let mult = val; mult <= maxVal; mult += val) {
        const indices = valToIndices.get(mult);

        if (indices !== undefined) {
          for (let i = 0; i < indices.length; i++) {
            const targetIdx = indices[i];

            if (dist[targetIdx] === -1) {
              if (targetIdx === n - 1) {
                return currentJumps + 1;
              }

              dist[targetIdx] = currentJumps + 1;
              queue[tail++] = targetIdx;
            }
          }

          valToIndices.delete(mult);
        }
      }
    }
  }

  return -1;
};
