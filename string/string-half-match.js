// パターン: 文字列の前半・後半を比較して部分置換する
// 計算量: O(N × L)  N=単語数、L=文字列長（比較・スライスがO(L)）
//
// ポイント:
//   - 奇数文字数のとき、中央の文字は前半・後半の両方に含まれる
//     → 前半 = slice(0, Math.round(L/2))、後半 = slice(Math.floor(L/2))
//     → この2つの式では、前半の長さと後半の長さは常に同じ値になる（中央文字を重複カウントするため）
//   - 「置き換えずに残す側」の長さは、上の前半/後半の長さそのものではなく
//     S.length - 相手側の長さ、という引き算で導出する必要がある
//     （奇数文字数のとき、前半長・後半長と、残す側の長さが一致しないため）
//   - 文字列は immutable なので `str.replace(x, y)` は新しい文字列を返すだけで元は変わらない。
//     ただし `replace(文字列, ...)` は「最初に見つかった一致箇所」を置換するだけなので、
//     置き換えたい部分が文字列中に重複して出現する場合は意図しない位置を置換してしまう。
//     → 位置を保証したいときは slice で組み立て直す方が安全。

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const S = input[1];
const arr = input.slice(2);
const FORBIDDEN_WORDS = 'banned';
const halfLeft = (str) => str.slice(0, Math.round(str.length / 2));
const halfRight = (str) => str.slice(Math.floor(str.length / 2));
const isMatch = (a, b) => a === b;
const leftS = halfLeft(S);
const rightS = halfRight(S);
const HALF_LENGTH = S.length - rightS.length;
const repeat = 'x'.repeat(leftS.length);

for (const str of arr) {
  if (str.length !== S.length) {
    console.log(str);
    continue;
  }

  const targetLeft = halfLeft(str);
  const targetRight = halfRight(str);
  const isLeftMatch = isMatch(targetLeft, leftS);
  const isRightMatch = isMatch(targetRight, rightS);

  if (isLeftMatch && isRightMatch) {
    console.log(FORBIDDEN_WORDS);
    continue;
  }

  if (isLeftMatch) {
    console.log([repeat, str.slice(leftS.length)].join(''));
    continue;
  }

  if (isRightMatch) {
    console.log([str.slice(0, HALF_LENGTH), repeat].join(''));
    continue;
  }

  console.log(str);
}

// --- 入力例1 ---
// 5
// paiza
// paaaa
// paiza
// paisa
// zaiza
// ab
//
// --- 出力例1 ---
// paaaa
// banned
// xxxsa
// zaxxx
// ab

// --- 入力例2 ---
// 1
// ab
// abababa
//
// --- 出力例2 ---
// abababa
