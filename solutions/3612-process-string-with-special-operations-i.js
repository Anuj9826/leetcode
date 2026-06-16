/**
 * Process String with Special Operations I
 * Time Complexity: O(2^N)
 * Space Complexity: O(2^N)
 */
var processStr = function (s) {
  let resultArr = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= "a" && char <= "z") {
      resultArr.push(char);
    } else if (char === "*") {
      if (resultArr.length > 0) {
        resultArr.pop();
      }
    } else if (char === "#") {
      resultArr = resultArr.concat(resultArr);
    } else if (char === "%") {
      resultArr.reverse();
    }
  }

  return resultArr.join("");
};
