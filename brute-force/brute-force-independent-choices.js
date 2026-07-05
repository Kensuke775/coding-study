// パターン: 全探索（独立した選択肢ごとにループをネストする）
// 計算量: O(N^2 × 5^2)  N≦8なので最大でも C(8,2)×25 = 700回程度、余裕で間に合う
//
// 問題の考え方（ラッキーナンバー）:
//   N個の数字から2個選ぶ全ての組み合わせについて、
//   それぞれの数字に「+1, -1, 先頭に1, 末尾に1, 何もしない」の5パターンを独立に試し、
//   差の絶対値が最小になる組み合わせを探す。
//
// 設計のポイント:
//   - 「選択肢が複数independentにある」問題は、選択肢の数だけループをネストする。
//     このケースは3つの独立した選択がある:
//       ① どの2つの数字を選ぶか（ペア i, j）
//       ② 1つ目の数字にどの操作をするか（5択）
//       ③ 2つ目の数字にどの操作をするか（5択）
//     → for文を3段（実質i, jで2段+a, bで2段の計4段）ネストする
//   - ペアの列挙は `j = i + 1` からスタートすることで、i<jの組み合わせだけを重複なく網羅する
//   - 各数字の5パターンは、ループの外側で先に計算しておく（同じ変換を繰り返さない）
//   - 最小値は「見つけるたびに更新する」形（Math.min の再代入）で追う。初期値はInfinity
//
// 再帰 vs ループの使い分け:
//   - 再帰が向いているのは「同じ判断がNの数だけ繰り返される」ケース（例: 部分集合の列挙）
//   - 今回は「選ぶ数が常に固定（2つの数字、5択×2）」なので、再帰より単純にループを重ねる方が合っている
//
// 計算量の注意点:
//   - 内側のループ（a, b）は常に5固定で、Nに応じて増えるわけではない。
//     Nに依存する部分（外側のi, jループ）と、定数の部分（内側のa, bループ）を分けて考えること。

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const N = Number(input[0]);
const line = input.slice(1).map(Number);
const ADD_NUM = 1;
let luckyNumber = Infinity;

const arr = line.map((cell) => {
  const minus = cell - ADD_NUM;
  const plus = cell + ADD_NUM;
  const addFlont = Number(String(cell) + String(ADD_NUM));
  const addLast = Number(String(ADD_NUM) + String(cell));
  return [minus, plus, addFlont, addLast, cell];
});

for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    for (let a = 0; a < arr[i].length; a++) {
      for (let b = 0; b < arr[j].length; b++) {
        const diff = Math.abs(arr[i][a] - arr[j][b]);
        luckyNumber = Math.min(diff, luckyNumber);
      }
    }
  }
}

console.log(luckyNumber);

// --- 入力例1 ---
// 3
// 111
// 222
// 333
//
// --- 出力例1 ---
// 109

// --- 入力例2 ---
// 5
// 123
// 456
// 789
// 901
// 234
//
// --- 出力例2 ---
// 3
