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
