/**
 * Block Placement Queries
 * Intuition: The problem involves maintaining available space on a number line, marking points as blocked, and querying for the maximum contiguous free segment within a specified range. This is a classic application for a segment tree data structure. Each node in the segment tree will represent a range of points and store information about the maximum free segment within that range, as well as prefix and suffix free segments to enable efficient merging of results.
 * Approach:
 * 1.  Define a `SegmentTreeNode` structure: Each node represents a range `[L, R]` of points on the number line. It stores the following properties:
 *     *   `maxFree`: The maximum length of a contiguous free segment *within* the range `[L, R]`.
 *     *   `leftFree`: The length of the free segment starting at `L` and extending rightwards.
 *     *   `rightFree`: The length of the free segment ending at `R` and extending leftwards.
 *     *   `isBlocked`: A boolean flag, `true` if all points in `[L, R]` are blocked, `false` otherwise.
 *     *   `len`: The total number of points in the range, calculated as `R - L + 1`.
 * 2.  `MAX_X_COORD` and `N_POINTS`: The maximum x-coordinate is `50000`. We need to handle points from `0` to `50000` inclusive. Thus, `N_POINTS = 50001`. The segment tree will be built over these `N_POINTS`.
 * 3.  `mergeNodes` function: This crucial helper function takes two `SegmentTreeNode` objects (typically representing the left and right children of a parent node) and returns a new `SegmentTreeNode` representing their combined state.
 *     *   `len` is simply the sum of children's lengths.
 *     *   `isBlocked` is true if both children are entirely blocked.
 *     *   `leftFree` is initially the `leftFree` of the left child. If the left child's entire range is free, then its `leftFree` is extended by the `leftFree` of the right child.
 *     *   `rightFree` is similarly computed, starting with the right child's `rightFree` and potentially extending with the left child's `rightFree`.
 *     *   `maxFree` is the maximum of three values: the `maxFree` of the left child, the `maxFree` of the right child, and the sum of the left child's `rightFree` and the right child's `leftFree` (this covers free segments that span across the boundary between the two children).
 * 4.  `build` function: This function initializes the segment tree. It's a recursive process. For a leaf node (representing a single point `L == R`), it sets `maxFree=1`, `leftFree=1`, `rightFree=1`, `isBlocked=false`, and `len=1` (as all points are initially free). For internal nodes, it recursively builds its children and then merges their results using `mergeNodes`.
 * 5.  `update` function: For a type 1 query `[1, x]`, this function marks point `x` as blocked. It recursively traverses the tree to find the leaf node corresponding to `x`. Once found, it updates that leaf node's properties to reflect it being blocked (all free lengths become 0, `isBlocked=true`). Then, it propagates these changes upwards by re-merging nodes on the path back to the root.
 * 6.  `query` function: For a type 2 query `[2, x_range_end, sz]`, this function queries the segment tree for the range `[0, x_range_end]`. It's a recursive function that returns a `SegmentTreeNode` representing the combined state of the queried range. If a node's range is entirely outside the query range, it returns a dummy node (with `len=0`). If entirely inside, it returns the node's stored properties. For partial overlaps, it recursively queries its children and merges their results. The `maxFree` property of the returned node indicates the maximum contiguous free space available within `[0, x_range_end]`.
 * 7.  Main `getResults` function: Initializes the segment tree once by calling `build`. Then, it iterates through `queries`. For type 1, it calls `update`. For type 2, it calls `query` for the range `[0, x_range_end]` and checks if the `maxFree` value from the query result is greater than or equal to `sz`. This boolean result is added to the `results` array.
 *
 * Dry Run: Example 1: `queries = [[1,2],[2,3,3],[2,3,1],[2,2,2]]`
 * - `MAX_X_COORD = 50000`, `N_POINTS = 50001`.
 * - `build(1, 0, 50000)`: The segment tree is initialized. All points from `0` to `50000` are free. The root node has `maxFree = 50001`.
 * - `queries[0] = [1, 2]`: `update(1, 0, 50000, 2)`. Point `2` is marked as blocked. The segment tree is updated; for instance, the node covering `[0, 3]` might now have `maxFree = 2` (corresponding to the `[0, 1]` segment).
 * - `queries[1] = [2, 3, 3]`: `query(1, 0, 50000, 0, 3)`. This returns a `SegmentTreeNode` representing the range `[0, 3]`. In this range, points `0, 1, 3` are free, and `2` is blocked. The longest contiguous free segment is `[0, 1]` (length 2). So, `queryResultNode.maxFree` is 2. `2 >= 3` is `false`. `results.push(false)`.
 * - `queries[2] = [2, 3, 1]`: `query(1, 0, 50000, 0, 3)`. `queryResultNode.maxFree` is again 2. `2 >= 1` is `true`. `results.push(true)`.
 * - `queries[3] = [2, 2, 2]`: `query(1, 0, 50000, 0, 2)`. This returns a `SegmentTreeNode` for `[0, 2]`. Points `0, 1` are free, `2` is blocked. The longest contiguous free segment is `[0, 1]` (length 2). So, `queryResultNode.maxFree` is 2. `2 >= 2` is `true`. `results.push(true)`.
 * - Final `results = [false, true, true]`. This matches the example output.
 *
 * Time Complexity: O(N_POINTS + Q * log(N_POINTS))
 * Space Complexity: O(N_POINTS)
 */

var getResults = function (queries) {
  let maxX = 0;
  for (let i = 0; i < queries.length; i++) {
    if (queries[i][1] > maxX) {
      maxX = queries[i][1];
    }
  }

  maxX = Math.max(1, Math.min(maxX, 50000));
  const treeSize = (maxX + 5) * 4;
  const maxFree = new Int32Array(treeSize);
  const leftFree = new Int32Array(treeSize);
  const rightFree = new Int32Array(treeSize);
  const nodeLen = new Int32Array(treeSize);

  function build(nodeIdx, L, R) {
    nodeLen[nodeIdx] = R - L + 1;
    if (L === R) {
      maxFree[nodeIdx] = 1;
      leftFree[nodeIdx] = 1;
      rightFree[nodeIdx] = 1;
    } else {
      const M = Math.floor((L + R) / 2);
      const leftChild = 2 * nodeIdx;
      const rightChild = 2 * nodeIdx + 1;

      build(leftChild, L, M);
      build(rightChild, M + 1, R);
      pushUp(nodeIdx, leftChild, rightChild);
    }
  }

  function pushUp(nodeIdx, leftChild, rightChild) {
    leftFree[nodeIdx] = leftFree[leftChild];
    if (leftFree[leftChild] === nodeLen[leftChild]) {
      leftFree[nodeIdx] += leftFree[rightChild];
    }

    rightFree[nodeIdx] = rightFree[rightChild];
    if (rightFree[rightChild] === nodeLen[rightChild]) {
      rightFree[nodeIdx] += rightFree[leftChild];
    }

    maxFree[nodeIdx] = Math.max(
      maxFree[leftChild],
      maxFree[rightChild],
      rightFree[leftChild] + leftFree[rightChild],
    );
  }

  function update(nodeIdx, L, R, targetIdx) {
    if (L === R) {
      maxFree[nodeIdx] = 0;
      leftFree[nodeIdx] = 0;
      rightFree[nodeIdx] = 0;
    } else {
      const M = Math.floor((L + R) / 2);
      const leftChild = 2 * nodeIdx;
      const rightChild = 2 * nodeIdx + 1;

      if (targetIdx <= M) {
        update(leftChild, L, M, targetIdx);
      } else {
        update(rightChild, M + 1, R, targetIdx);
      }
      pushUp(nodeIdx, leftChild, rightChild);
    }
  }

  function query(nodeIdx, L, R, queryL, queryR) {
    if (R < queryL || L > queryR) return null;

    if (queryL <= L && R <= queryR) {
      return {
        maxFree: maxFree[nodeIdx],
        leftFree: leftFree[nodeIdx],
        rightFree: rightFree[nodeIdx],
        len: nodeLen[nodeIdx],
      };
    }

    const M = Math.floor((L + R) / 2);
    const leftRes = query(2 * nodeIdx, L, M, queryL, queryR);
    const rightRes = query(2 * nodeIdx + 1, M + 1, R, queryL, queryR);

    if (!leftRes) return rightRes;
    if (!rightRes) return leftRes;

    let mergedLeftFree = leftRes.leftFree;
    if (leftRes.leftFree === leftRes.len) {
      mergedLeftFree += rightRes.leftFree;
    }

    let mergedRightFree = rightRes.rightFree;
    if (rightRes.rightFree === rightRes.len) {
      mergedRightFree += leftRes.rightFree;
    }

    return {
      maxFree: Math.max(
        leftRes.maxFree,
        rightRes.maxFree,
        leftRes.rightFree + rightRes.leftFree,
      ),
      leftFree: mergedLeftFree,
      rightFree: mergedRightFree,
      len: leftRes.len + rightRes.len,
    };
  }

  build(1, 0, maxX);
  update(1, 0, maxX, 0);

  const results = [];

  for (let i = 0; i < queries.length; i++) {
    const type = queries[i][0];

    if (type === 1) {
      update(1, 0, maxX, queries[i][1]);
    } else {
      const x_range_end = queries[i][1];
      const sz = queries[i][2];

      let maxFreePoints = 0;
      if (x_range_end > 1) {
        const res = query(1, 0, maxX, 1, x_range_end - 1);
        if (res) maxFreePoints = res.maxFree;
      }

      results.push(maxFreePoints + 1 >= sz);
    }
  }

  return results;
};
