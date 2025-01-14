# ch17/ex07

## TypeScriptのトランスパイルは@babel/preset-typescriptやtscによって可能だが、それぞれの違いを調べなさい。

- @babel/preset-typescript、@babel/preset-env
    - Babelのプリセットの1つ
    - TypeScript→@babel/preset-typescript→@babel/preset-env→JavaScriptの順でトランスパイルされるらしい
    - 自動ポリフィル？というもののおかげでPromiseのような組み込みオブジェクトもトランスパイルの対象になるとのこと
    - 型チェックは実行されない
- tsc
    - TypeScriptの開発チームが提供している公式(？)のトランスパイラ
    - トランスパイルの対象がJavaScriptの構文だけ(参考リンク1に例がある)
    - Promiseなどの組み込みオブジェクトは構文ではないため対象から外れるらしい
    - 型チェックを実行する
## 参考リンク

1. [みどりのさるのエンジニア](https://t-yng.jp/post/tsc-and-babel)
1. [Babel vs. TypeSctipt: Choosing the right compiler for your project](https://blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/)
