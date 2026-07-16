// パターン: 固定長スライディングウィンドウで文字列コマンドを検出する
// 計算量: O(|S|) — 1文字ずつ処理し、ウィンドウの更新は O(1)
//
// 命名の指針（このコードで適用したもの）:
//   stringLine  → inputChars  （内容が「文字の配列」だと一目で分かる）
//   str（ループ変数） → char （1文字を表す変数名）
//   arrayStr    → const arrayStr （let/constなし = 暗黙グローバルになるため必ず宣言する）
//
// マジックナンバーの排除:
//   5           → MAX_LENGTH  （コマンドの固定長を定数化）

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const inputChars = input[0].split('');
const MAX_LENGTH = 5;
const commands = {
  LLLRB: 'rolling',
  DDRRA: 'upper',
  AAAAA: 'rush',
};
let currentStr = '';

for (const char of inputChars) {
  currentStr += char;

  // ウィンドウが MAX_LENGTH を超えたら先頭を1文字削除
  if (currentStr.length > MAX_LENGTH) {
    const arrayStr = currentStr.split('');
    arrayStr.shift();
    currentStr = arrayStr.join('');
  }

  // コマンドに一致したら出力し、ウィンドウをリセット（文字を再利用しない）
  if (currentStr in commands) {
    console.log(commands[currentStr]);
    currentStr = '';
  }
}


// --- 入力例1 ---
// DDRRAAAAALLLRB
//
// --- 出力例1 ---
// upper
// rolling
