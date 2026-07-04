// パターン: 複合キー (composite key) — 名前+暗証番号を1つのキーに結合する
// 効果: PIN照合をキーの一致で自動判定できる（間違いPINはキーがないので skip される）
// 計算量: O(N + K)
//   - N: 登録件数（Map 構築）
//   - K: クエリ数（Map 参照・更新はすべて O(1)）

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const registrations = input.slice(1, N + 1).map((row) => row.split(' '));
const queries = input.slice(N + 1).map((row) => row.split(' '));
const banks = new Map();

// 登録: "companyName pin" を複合キーにして残高を格納
for (const [companyName, pin, balance] of registrations) {
  const compositeKey = `${companyName} ${pin}`;
  banks.set(compositeKey, Number(balance));
}

// クエリ: 複合キーが一致しなければ PIN 不一致 → skip
for (const [companyName, pin, withdrawAmount] of queries) {
  const compositeKey = `${companyName} ${pin}`;
  if (!banks.has(compositeKey)) continue;
  banks.set(compositeKey, banks.get(compositeKey) - Number(withdrawAmount));
}

// 出力: 複合キーから会社名だけ取り出す（split で PIN を切り捨て）
for (const [compositeKey, balance] of banks) {
  const companyName = compositeKey.split(' ')[0];
  console.log(companyName, balance);
}


// --- 別アプローチ: オブジェクトを value にする ---
// キーが会社名のみ、PIN は value 内のプロパティとして持つ
// フィールドが増えたときはこちらの方が整理しやすい

// for (const [companyName, pin, balance] of registrations) {
//   banks.set(companyName, { pin, balance: Number(balance) });
// }

// for (const [companyName, pin, withdrawAmount] of queries) {
//   const company = banks.get(companyName);
//   if (!company || company.pin !== pin) continue;
//   company.balance -= Number(withdrawAmount);
// }

// for (const [companyName, { balance }] of banks) {
//   console.log(companyName, balance);
// }
