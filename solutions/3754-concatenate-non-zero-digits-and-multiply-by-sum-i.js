/**
 * Concatenate Non-Zero Digits and Multiply by Sum I
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var sumAndMultiply = function (n) {
  let nStr = n.toString();
  let xStr = "";

  for (let i = 0; i < nStr.length; i++) {
    if (nStr[i] !== "0") {
      xStr += nStr[i];
    }
  }

  let x = Number(xStr);
  let sum = 0;

  let tempX = x;
  while (tempX > 0) {
    sum += tempX % 10;
    tempX = Math.floor(tempX / 10);
  }

  return x * sum;
};
