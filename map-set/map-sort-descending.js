// パターン: Map + Set で集計し、複合条件でソートして出力する
// 計算量: O(K log K)
//   - K: クエリ数（Map/Set への登録は O(1) × K = O(K)）
//   - ソートが支配的: O(K log K)

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const N = Number(input[0]);
const queries = input.slice(1, N + 1).map((row) => row.split(' '));
const superchat = new Map();
const membership = new Set();

for (const [senderName, action, amountStr] of queries) {
  if (action === 'give') {
    const currentAmount = superchat.get(senderName) ?? 0;
    superchat.set(senderName, Number(amountStr) + currentAmount);
  } else {
    membership.add(senderName);
  }
}

// sort の中での複合ソート:
//   第1キー: 金額の降順 (b[1] - a[1])
//   第2キー（同額のとき）: 名前の降順
//     localeCompare(target) → 呼び出し元 < target なら負、大なら正
//     b[0].localeCompare(a[0]) → b が a より前なら正 → b が先に来る → 降順
const superchatResult = [...superchat.entries()].sort((a, b) => {
  if (a[1] === b[1]) return b[0].localeCompare(a[0]);
  return b[1] - a[1];
});

const membershipResult = [...membership].sort();

console.log(superchatResult.map((entry) => entry[0]).join('\n'));
console.log(membershipResult.join('\n'));
