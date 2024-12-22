# Webpackでバンドルした時の各main.jsの中身とp.276の上のコードとの比較

- p.276の上のコード

```javascript:p.276の上のコード
    const modules = {};
    function require(moduleName) { return modules[moduleName]; }

    modules["set.js"] = (function() {
        const exports = {};

        // sets.jsファイルの内容をここに記述する。
        export.BitSet = class BitSet {. . .};

        return exports;
    }());

    modules["stats.js"] = (function() {
        const exports = {}

        // stats.jsファイルの内容をここに記述する。
        const sum = (x, y) => x + y;
        const square = x => x * x;
        exports.mean = (data) => data.reduce(sum) / data.length;
        exports.stddev = function (d) {};
    })
```

- 比較結果(バンドルのコードは各main.js参照)

  - none
    - コード自体には差がないが、module名がファイル名ではなく数値になっている。呼び出し時もその数値で呼んでいる。
  - development
    - コードがevalにまとめられている。
  - production
    - 全てが1行に集約されている。

- 皆さんの回答、解説
  - none
    - ファイル全体が1つの即時実行関数
    - コメントブロックが生成されている
    - 最適化をしていない。The module cacheという文言が追記されている箇所がある。
  - development
    - 開発者向けのコメントが生成されている
    - evalで即時実行しているので、リアルタイムに判定している
  - production
    - ファイルサイズを小さくする最適化が行われている
    - 今どきのウェブサイト系って画面が表示されるまでに時間がかかると逃げてしまう。それを避けるためになるべくサイズを小さくしたい。開発側以上に小さくしてくれる。
