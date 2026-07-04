# algorithm-study

アルゴリズムと計算量を意識したコーディング学習のリポジトリです。

日々の学習として、各実装の計算量（ビッグO記法）を明示しながらコードを書くことを習慣にしています。

## 学習内容

### Map / Set
| ファイル | 内容 |
|---|---|
| `map-set/map-composite-key.js` | 複合キーによる照合パターン |
| `map-set/map-array-value.js` | Map<string, Array> で複数エントリを紐づけるパターン |
| `map-set/map-sort-descending.js` | Map + Set で集計し、複合条件でソートするパターン |

### 累積和（Prefix Sum）
| ファイル | 内容 |
|---|---|
| `prefix-sum/prefix-sum-1d.js` | 1次元累積和による区間クエリ O(1) |
| `prefix-sum/prefix-sum-2d.js` | 2次元累積和による矩形クエリ O(1) |

### Set
| ファイル | 内容 |
|---|---|
| `set/sort-set.js` | Set を使った重複排除とソートのパターン |

## 計算量の考え方

各ファイルにビッグO記法でコメントを記載しています。

| 記法 | N=10万のとき | 判定 |
|---|---|---|
| O(1) | 1回 | 余裕 |
| O(N) | 10万回 | 余裕 |
| O(N log N) | 約170万回 | 余裕 |
| O(N²) | 100億回 | TLE |
