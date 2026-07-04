// パターン: 2次元累積和（矩形クエリを O(1) で答える）
// 計算量:
//   前計算: O(H × W)（横方向 + 縦方向の2パス）
//   クエリ: O(1) × Q 回
//
// 構造: (H+1) × (W+1) の配列を作り、row 0 と col 0 を番兵（全部 0）にする
// 番兵の効果: r1=1 のとき prefix[r1-1] = prefix[0] = 0 になるので if 文不要
//
// クエリ公式（引数は 1 始まりインデックス）:
//   prefix[r2][c2]
//   - prefix[r1-1][c2]    ← 上の部分を引く
//   - prefix[r2][c1-1]    ← 左の部分を引く
//   + prefix[r1-1][c1-1]  ← 2回引いた角を足し戻す

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [H, W, N] = input[0].split(' ').map(Number);
const grid = input.slice(1, N + 1).map((row) => row.split(' ').map(Number));
const queries = input.slice(N + 1).map((row) => row.split(' ').map(Number));

// (H+1) × (W+1) で初期化（row 0 と col 0 が番兵）
const prefix = Array.from({ length: H + 1 }, () => new Array(W + 1).fill(0));

// 横方向の累積和（同じ行の1つ前の列を足す）
for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    prefix[i + 1][j + 1] = prefix[i + 1][j] + grid[i][j];
  }
}

// 縦方向の累積和（1行上を足す）
// i=1 スタート: i=0 は番兵行なので変更しない
for (let i = 1; i < H + 1; i++) {
  for (let j = 0; j < W + 1; j++) {
    prefix[i][j] += prefix[i - 1][j];
  }
}

// 矩形 (r1,c1)〜(r2,c2) の合計を O(1) で返す（1始まりインデックス）
function rangeSum2D(r1, c1, r2, c2) {
  return prefix[r2][c2] - prefix[r1 - 1][c2] - prefix[r2][c1 - 1] + prefix[r1 - 1][c1 - 1];
}

// クエリ処理
for (const query of queries) {
  const [r2, c2] = query;
  console.log(rangeSum2D(1, 1, r2, c2));
}
