// パターン: スライディングウィンドウ（固定サイズ K の区間の最大・最小を求める）
// 計算量: O(N)
//   - 最初の窓: O(K)
//   - 以降: 右端を足して左端を引くだけ = O(1) × N 回
//   - 累積和と違い「事前計算なし、窓を動かしながら更新」
//
// 累積和との使い分け:
//   累積和     → 任意の区間 [left, right] を O(1) で答えたい（区間がバラバラ）
//   スライディング → 固定サイズ K の窓を順にずらして最大・最小を探す
//
// 円形レーン（circular）対応: 配列を2倍にして i=0〜N-1 でスライドする

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const prices = input.slice(1).map(Number);

// 円形対応: 配列を2倍に繋げる
const circularPrices = [...prices, ...prices];

// 最初の窓の合計を計算
let windowSum = circularPrices.slice(0, K).reduce((acc, val) => acc + val, 0);
let maxSum = windowSum;

// 窓を1つずつずらす: 右端を足して左端を引く
for (let i = K; i < K + N - 1; i++) {
  windowSum += circularPrices[i];       // 右端を追加
  windowSum -= circularPrices[i - K];   // 左端を除去
  maxSum = Math.max(maxSum, windowSum);
}

console.log(maxSum);


// --- 入力例1 ---
// 5 3
// 100
// 200
// 300
// 400
// 500
//
// --- 出力例1 ---
// 1200

// --- 入力例2 ---
// 7 2
// 1000
// 200
// 500
// 600
// 300
// 300
// 2000
//
// --- 出力例2 ---
// 3000





//①全探索
// let maxPriceCombination = -Infinity;
// for (let i = 0; i < N; i++) {
//   let total = 0;
//   for (let j = 0; j < K; j++) {
//     total += lines[(i + j) % N];
//   }
//   maxPriceCombination = Math.max(maxPriceCombination, total);
// }
// console.log(maxPriceCombination);


//②sliceで繋げるパターン 全探査と変わらない計算量
// const conectline = [...lines, ...lines];
// let sum = -Infinity;
// for (let i = 0; i < N; i++) {
//   const range = i + K;
//   const target = conectline.slice(i, range);
//   let total = target.reduce((acc, item) => acc + item, 0);
//   sum = Math.max(sum, total);
// }
// console.log(sum);
