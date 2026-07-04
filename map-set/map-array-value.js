// パターン: Map<string, Array> — 1つのキーに複数エントリを紐づける
// 計算量: O(K)
//   - キーがなければ空配列を作成して push: O(1)
//   - K 件のクエリを処理: O(K) 合計
// ネストした出力ループは O(N + K)
//   - 外ループ: 部門数 N 回
//   - 内ループ: 全部門の合計エントリ数 = K 回（N × K にはならない）

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const queries = input.slice(N + 1).map((row) => row.split(' '));
const departmentMap = new Map();

// キーがなければその場で空配列を作成してから push
// → 2ループ（先に全キーを初期化）と同じ結果になる
for (const [department, transactionId, amount] of queries) {
  if (!departmentMap.has(department)) departmentMap.set(department, []);
  departmentMap.get(department).push([transactionId, amount]);
}

// Map は挿入順を保持するので登録順に出力される
for (const [department, transactions] of departmentMap) {
  console.log(department);
  for (const [transactionId, amount] of transactions) {
    console.log(transactionId, amount);
  }
  console.log('-----');
}


// --- 入力例 ---
// 3 6
// A
// B
// C
// A 1 100
// B 2 100
// A 3 500
// C 4 895
// C 5 890
// A 6 2685

// --- 出力例 ---
// A
// 1 100
// 3 500
// 6 2685
// -----
// B
// 2 100
// -----
// C
// 4 895
// 5 890
// -----
