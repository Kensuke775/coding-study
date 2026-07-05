// 累積和 paizaランク C
// 計算量: O(N + K)
//   - prefix 構築: O(N)
//   - クエリ応答: O(1) × K = O(K)
//   - 2ループは順番実行（加算）なので N × K にはならない
//
// クエリ Q_i は 1始まりインデックス
// prefix[Q_i] = A_1 から A_{Q_i} までの合計（番兵により変換不要）

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const nums = input.slice(1, N + 1).map(Number);
const ans = input.slice(1 + N).map(Number);

const prefix = new Array(nums.length + 1).fill(0);
for (let i = 0; i < nums.length; i++) {
  prefix[i + 1] = prefix[i] + nums[i];
}

for (let i = 0; i < K; i++) {
  console.log(prefix[ans[i]]);
}


// --- 入力例1 ---
// 3 1
// 69
// 12
// 28
// 3
//
// --- 出力例1 ---
// 109

// --- 入力例2 ---
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
// -29
// 30
// 30
