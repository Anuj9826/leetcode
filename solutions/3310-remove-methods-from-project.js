/**
 * Remove Methods From Project
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var remainingMethods = function (n, k, invocations) {
  const adj = Array(n)
    .fill(null)
    .map(() => []);
  for (const [invoker, invoked] of invocations) {
    adj[invoker].push(invoked);
  }

  const isSuspicious = Array(n).fill(false);
  const stack = [k];
  isSuspicious[k] = true;

  while (stack.length > 0) {
    const currentMethod = stack.pop();

    for (const neighbor of adj[currentMethod]) {
      if (!isSuspicious[neighbor]) {
        isSuspicious[neighbor] = true;
        stack.push(neighbor);
      }
    }
  }

  let removalBlocked = false;
  for (const [invoker, invoked] of invocations) {
    if (isSuspicious[invoked] && !isSuspicious[invoker]) {
      removalBlocked = true;
      break;
    }
  }

  const remaining = [];
  if (removalBlocked) {
    for (let i = 0; i < n; i++) {
      remaining.push(i);
    }
  } else {
    for (let i = 0; i < n; i++) {
      if (!isSuspicious[i]) {
        remaining.push(i);
      }
    }
  }

  return remaining;
};
