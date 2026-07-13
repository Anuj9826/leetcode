/**
 * Sequential Digits
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var sequentialDigits = function (low, high) {
  let generatedNumbers = [];

  for (let firstDigit = 1; firstDigit <= 9; firstDigit++) {
    let currentSequence = firstDigit;
    generatedNumbers.push(currentSequence);

    for (
      let nextAppendedDigit = firstDigit + 1;
      nextAppendedDigit <= 9;
      nextAppendedDigit++
    ) {
      currentSequence = currentSequence * 10 + nextAppendedDigit;
      generatedNumbers.push(currentSequence);
    }
  }

  let resultNumbers = [];
  for (
    let currentNumberIndex = 0;
    currentNumberIndex < generatedNumbers.length;
    currentNumberIndex++
  ) {
    let candidateNumber = generatedNumbers[currentNumberIndex];
    if (candidateNumber >= low && candidateNumber <= high) {
      resultNumbers.push(candidateNumber);
    }
  }

  resultNumbers.sort((valA, valB) => valA - valB);

  return resultNumbers;
};
