/**
 * Total Waviness of Numbers in Range II
 * Time Complexity: O(log(N) * 2 * 2 * 11 * 11 * 10) = O(log(N))
 * Space Complexity: O(log(N) * 2 * 2 * 11 * 11) = O(log(N))
 */

var totalWaviness = function (num1, num2) {
  function solve(n) {
    if (n < 0) return 0;

    let sNum = String(n);
    let len = sNum.length;

    let memo = Array(len + 1)
      .fill(0)
      .map(() =>
        Array(2)
          .fill(0)
          .map(() =>
            Array(2)
              .fill(0)
              .map(() =>
                Array(11)
                  .fill(0)
                  .map(() => Array(11).fill(null)),
              ),
          ),
      );

    function dp(idx, tight, started, prevDigitVal, prevPrevDigitVal) {
      if (idx === len) {
        return { totalWaviness: 0, count: 1 };
      }

      let tIdx = tight ? 1 : 0;
      let sIdx = started ? 1 : 0;
      let pIdx = prevDigitVal + 1;
      let ppIdx = prevPrevDigitVal + 1;

      if (memo[idx][tIdx][sIdx][pIdx][ppIdx] !== null) {
        return memo[idx][tIdx][sIdx][pIdx][ppIdx];
      }

      let ansTotalWaviness = 0;
      let ansCount = 0;
      let upperLimit = tight ? parseInt(sNum[idx]) : 9;

      for (let d = 0; d <= upperLimit; d++) {
        let newTight = tight && d === upperLimit;

        let newStarted = started || d > 0;
        let newPrev = newStarted ? d : -1;
        let newPrevPrev = newStarted ? (started ? prevDigitVal : -1) : -1;

        let res = dp(idx + 1, newTight, newStarted, newPrev, newPrevPrev);

        ansTotalWaviness += res.totalWaviness;
        ansCount += res.count;

        if (started && prevPrevDigitVal !== -1) {
          if (
            (prevDigitVal > prevPrevDigitVal && prevDigitVal > d) ||
            (prevDigitVal < prevPrevDigitVal && prevDigitVal < d)
          ) {
            ansTotalWaviness += res.count;
          }
        }
      }

      return (memo[idx][tIdx][sIdx][pIdx][ppIdx] = {
        totalWaviness: ansTotalWaviness,
        count: ansCount,
      });
    }

    return dp(0, true, false, -1, -1).totalWaviness;
  }

  return solve(num2) - solve(num1 - 1);
};
