/**
 * Find the Length of the Longest Common Prefix
 * Time Complexity: O((N + M) * D)
 * Space Complexity: O(N * D)
*/
var longestCommonPrefix = function (arr1, arr2) {
    const storedPrefixes = new Set();
    let maximumLength = 0;

    for (const currentNumberA of arr1) {
        let prefixGenA = currentNumberA;
        while (prefixGenA > 0) {
            storedPrefixes.add(prefixGenA);
            prefixGenA = Math.floor(prefixGenA / 10);
        }
    }

    for (const currentNumberB of arr2) {
        let prefixGenB = currentNumberB;
        while (prefixGenB > 0) {
            if (storedPrefixes.has(prefixGenB)) {
                let prefixStringB = String(prefixGenB);
                let currentLengthB = prefixStringB.length;
                maximumLength = Math.max(maximumLength, currentLengthB);
            }
            prefixGenB = Math.floor(prefixGenB / 10);
        }
    }

    return maximumLength;
};