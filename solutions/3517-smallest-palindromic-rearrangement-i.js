/**
 * Smallest Palindromic Rearrangement I
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var smallestPalindrome = function (s) {
  const charCounts = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    charCounts[s.charCodeAt(i) - 97]++;
  }

  const firstHalfChars = [];
  let middleChar = "";

  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(97 + i);
    const count = charCounts[i];

    for (let j = 0; j < Math.floor(count / 2); j++) {
      firstHalfChars.push(char);
    }

    if (count % 2 === 1) {
      middleChar = char;
    }
  }

  const firstHalfString = firstHalfChars.join("");
  const secondHalfString = firstHalfString.split("").reverse().join("");

  return firstHalfString + middleChar + secondHalfString;
};
