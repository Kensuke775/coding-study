// パターン: 1次元累積和（区間クエリを O(1) で答える）
// 計算量:
//   前計算: O(N)
//   クエリ: O(1) × K 回 = O(K)
//   合計: O(N + K)  ← 毎回ループする O(N × K) より大幅に速い
//
// 構造:
//   prefix[0] = 0（番兵）
//   prefix[i+1] = prefix[i] + nums[i]
//   区間 [left, right] の合計 = prefix[right + 1] - prefix[left]
//
// インデックス注意:
//   nums は 0 始まり
//   クエリが 1 始まりで渡される場合は left-1, right-1 に変換してから渡す

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const nums = input.slice(1, N + 1).map(Number);
const queries = input.slice(1 + N).map((row) => row.split(' ').map(Number));

// 前計算: O(N)
const prefix = new Array(nums.length + 1).fill(0);
for (let i = 0; i < nums.length; i++) {
  prefix[i + 1] = prefix[i] + nums[i];
}

// 区間 [left, right] の合計を O(1) で返す（0始まりインデックス）
function rangeSum(left, right) {
  return prefix[right + 1] - prefix[left];
}

// クエリ処理: O(K)
// クエリが [left, right] の2値の場合:
for (const [left, right] of queries) {
  console.log(rangeSum(left, right));
}

// クエリが右端1値だけ（先頭から right まで）の場合:
// for (const [right] of queries) {
//   console.log(rangeSum(0, right - 1)); // 1始まりを 0始まりに変換
// }


// --- 入力例1（クエリ: 右端1値） ---
// 3 1
// 69
// 12
// 28
// 3
//
// --- 出力例1 ---
// 109  ← 69 + 12 + 28

// --- 入力例2（クエリ: 右端1値） ---
// 10 3
// 45
// 74
// -94
// 68
// -63
// 19
// -47
// -69
// 38
// 60
// 9
// 5
// 5
//
// --- 出力例2 ---
// -29  ← 先頭から9番目まで
// 30   ← 先頭から5番目まで
// 30
