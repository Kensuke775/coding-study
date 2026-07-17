// パターン: グリッド上でマンハッタン距離を使った範囲塗りつぶし
// 計算量: O(H × W × D²) — 爆弾ごとに (2D+1)² のマスをチェック
//
// マンハッタン距離 = |行の差| + |列の差|
// オフセット (di, dj) を使うと = Math.abs(di) + Math.abs(dj) で計算できる
//
// 注意: 爆弾を先に全部収集してから爆発させる
//       処理中に grid を書き換えると、まだ未処理の爆弾が '#' で上書きされて見えなくなるため

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [H, W] = input[0].split(' ').map(Number);
const grid = input.slice(1).map((row) => row.split(''));

// 爆弾の位置(bombRow, bombCol)を中心に威力power以内のマスを塗る
function toBomb(bombRow, bombCol, power) {
  for (let di = -power; di <= power; di++) {
    for (let dj = -power; dj <= power; dj++) {
      const targetRow = bombRow + di;
      const targetCol = bombCol + dj;
      // グリッド外はスキップ
      if (targetRow < 0 || targetRow >= H || targetCol < 0 || targetCol >= W) continue;
      // マンハッタン距離がpowerを超えるマスはスキップ
      if (Math.abs(di) + Math.abs(dj) > power) continue;
      grid[targetRow][targetCol] = '#';
    }
  }
}

// 先に全爆弾の位置を収集してから爆発させる
const bombs = [];
for (let h = 0; h < H; h++) {
  for (let w = 0; w < W; w++) {
    if (grid[h][w] !== '.') {
      bombs.push([h, w, Number(grid[h][w])]);
    }
  }
}

for (const [row, col, power] of bombs) {
  toBomb(row, col, power);
}

console.log(grid.map((row) => row.join('')).join('\n'));


// --- 入力例1 ---
// 5 5
// 0..0.
// .2..0
// .....
// ....1
// .0...
//
// --- 出力例1 ---
// ####.
// #####
// ###.#
// .#.##
// .#..#
