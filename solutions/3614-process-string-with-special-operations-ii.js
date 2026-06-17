/**
 * Process String with Special Operations II
 * Time Complexity: O(S)
 * Space Complexity: O(S)
 */
var processStr = function (s, k) {
  let currentLength = 0n;
  const opHistory = [];
  const charHistory = [];

  k = BigInt(k);

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= "a" && char <= "z") {
      currentLength++;
      charHistory.push(char);
      opHistory.push({ type: "literal", charIndex: charHistory.length - 1 });
    } else if (char === "*") {
      if (currentLength > 0n) {
        currentLength--;
        opHistory.push({ type: "remove" });
      }
    } else if (char === "#") {
      currentLength *= 2n;
      opHistory.push({ type: "duplicate" });
    } else if (char === "%") {
      opHistory.push({ type: "reverse" });
    }
  }

  if (k >= currentLength || k < 0n) {
    return ".";
  }

  let currentK = k;
  let currentSegmentLength = currentLength;

  for (let i = opHistory.length - 1; i >= 0; i--) {
    const op = opHistory[i];

    if (op.type === "literal") {
      if (currentK === currentSegmentLength - 1n) {
        return charHistory[op.charIndex];
      } else {
        currentSegmentLength--;
      }
    } else if (op.type === "remove") {
      currentSegmentLength++;
    } else if (op.type === "reverse") {
      if (currentSegmentLength > 0n) {
        currentK = currentSegmentLength - 1n - currentK;
      }
    } else if (op.type === "duplicate") {
      if (currentSegmentLength > 0n) {
        currentK = currentK % (currentSegmentLength / 2n);
        currentSegmentLength = currentSegmentLength / 2n;
      }
    }
  }

  return ".";
};
