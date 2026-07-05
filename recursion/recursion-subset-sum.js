// パターン: 再帰による全探索（部分集合の列挙 / 各要素を「含める・含めない」で分岐）
// 計算量: O(2^N)  各要素につき2択の分岐があるため
//   - N ≦ 15〜20程度なら余裕（2^15 = 32768）
//   - 枝刈り（if (total > MAX) return;）で、上限を超えた時点の探索を打ち切る
//
// ポイント:
//   - 配列の要素数は、入力から解析した値（N）ではなく arr.length を使う方が安全。
//     実際に操作しているデータ自体から長さを取ることで、入力解析側にズレがあっても影響を受けない。
//   - 使わない変数は分割代入で `_` にして明示的に捨てる。
//   - 関数の末尾にある意味のない `return;` は削除する（書いても書かなくても動作は同じ）。

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [_, MAX] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number);
let maxSum = -Infinity;

function combination(idx, total) {
  if (total > MAX) return;
  if (arr.length === idx) {
    maxSum = Math.max(maxSum, total);
    return;
  }
  combination(idx + 1, total + arr[idx]); // このコップを含める
  combination(idx + 1, total); // このコップを含めない
}

combination(0, 0);

console.log(maxSum);

// --- 入力例1 ---
// 3 100
// 30
// 40
// 50
//
// --- 出力例1 ---
// 90

// --- 入力例2 ---
// 5 100
// 99
// 98
// 97
// 96
// 5
//
// --- 出力例2 ---
// 99
