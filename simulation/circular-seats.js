// パターン: 円形配列のシミュレーション
// 計算量: O(m × n) — グループ数 × 座席数（n,m ≤ 100 なので最大1万回）
//
// 命名の指針（このコードで適用したもの）:
//   n, m          → seatCount, groupCount  （1文字変数は意味が伝わらない）
//   lines         → groups                  （入力形式ではなくドメインの意味で）
//   isSitMemo     → occupiedSeats           （isSit は英語として不自然、Memo は不要）
//   formatNum     → toSeatIndex             （何をする関数か明確に）
//   N（ループ内） → seatIndex               （大文字1文字は定数・型に見える）

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [seatCount, groupCount] = input[0].split(' ').map(Number);
const occupiedSeats = new Array(seatCount).fill(false);
const groups = input.slice(1).map((row) => row.split(' ').map(Number));

// 1始まりの座席番号を 0始まりのインデックスに変換（円形対応）
function toSeatIndex(startSeat, offset) {
  return (startSeat + offset - 1) % seatCount;
}

let seatedCount = 0;

for (const [people, startSeat] of groups) {
  let canSit = true;

  // 全座席が空いているか確認
  for (let i = 0; i < people; i++) {
    if (occupiedSeats[toSeatIndex(startSeat, i)]) {
      canSit = false;
      break;
    }
  }

  if (!canSit) continue;

  // 全員着席
  for (let i = 0; i < people; i++) {
    occupiedSeats[toSeatIndex(startSeat, i)] = true;
    seatedCount++;
  }
}

console.log(seatedCount);


// --- 入力例1 ---
// 6 3
// 3 2
// 1 6
// 2 5
//
// --- 出力例1 ---
// 4

// --- 入力例2 ---
// 12 6
// 4 6
// 4 8
// 4 10
// 4 12
// 4 2
// 4 4
//
// --- 出力例2 ---
// 12
