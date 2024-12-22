# ch15.01-03/ex04

## index1.html と index2.html についてなるべく速くスクリプトがロードされて画面に"Hello"と表示されるようにしなさい。

### ただし、以下の書き換えのみが許可される。

1. script タグに async="true"を付与
2. script タグに defer="true"を付与
3. js 内の処理を document.addEventListener("domcontentloaded", () => {})で囲む
4. js 内の処理を window.addEventListener("load", () => {})で囲む

## どの書き換えが最も早く完了するか

## 各実行結果

- 回答
- 1
  - 1と4が最速
  - loadにして待たないと、ライブラリが準備しきれないまま表示される懸念があるため3は✖
- 2

  - 2だけでOK
  - 要素だけそろえば問題ないため、deferのみでOK
  - ドキュメントの読み込みさえ終わればいいので、index.jsをいじる必要はない
    [解説の参考Qiita記事](https://qiita.com/phanect/items/82c85ea4b8f9c373d684)

- 個人の結論

  - index1は1,2,3を組み合わせると早そう
  - index2についてはあまり差がないか、むしろ遅くなってしまうという結果だった。
  - 後で計測しなおしたりもしたが、計測結果がまばらで結論がうまく出せなかった。

- デフォルトのコード

  - index1
    - 終了　97ミリ秒
    - DOMContentLoaded　139ミリ秒
    - 読み込み　139ミリ秒
  - index2
    - 終了　34ミリ秒
    - DOMContentLoaded　34ミリ秒
    - 読み込み　35ミリ秒

- script タグに async="true"を付与

  - index1
    - 終了　103ミリ秒
    - DOMContentLoaded　136ミリ秒
    - 読み込み　136ミリ秒
  - index2
    - 終了　29ミリ秒
    - DOMContentLoaded　26ミリ秒
    - 読み込み　30ミリ秒

- script タグに defer="true"を付与

  - index1
    - 終了　73ミリ秒
    - DOMContentLoaded　103ミリ秒
    - 読み込み　103ミリ秒
  - index2
    - 終了　51ミリ秒
    - DOMContentLoaded　47ミリ秒
    - 読み込み　54ミリ秒

- js 内の処理を document.addEventListener("domcontentloaded", () => {})で囲む

  - index1
    - 終了　72ミリ秒
    - DOMContentLoaded　106ミリ秒
    - 読み込み　106ミリ秒
  - index2
    - 終了　31ミリ秒
    - DOMContentLoaded　33ミリ秒
    - 読み込み　34ミリ秒

- js 内の処理を window.addEventListener("load", () => {})で囲む

  - index1
    - 終了　236ミリ秒
    - DOMContentLoaded　275ミリ秒
    - 読み込み　278ミリ秒
  - index2
    - 終了　38ミリ秒
    - DOMContentLoaded　38ミリ秒
    - 読み込み　39ミリ秒

- 1,2,3の組み合わせ

  - index1
    - 終了　57ミリ秒
    - DOMContentLoaded　81ミリ秒
    - 読み込み　82ミリ秒
  - index2
    - 終了　83ミリ秒
    - DOMContentLoaded　70ミリ秒
    - 読み込み　84ミリ秒

- index1=1,2,3の組み合わせ、index2=1,3

  - index1
    - 終了　60ミリ秒
    - DOMContentLoaded　80ミリ秒
    - 読み込み　80ミリ秒
  - index2
    - 終了　41ミリ秒
    - DOMContentLoaded　41ミリ秒
    - 読み込み　41ミリ秒

- index1=1,2,3の組み合わせ、index2=1
  - index1
    - 終了　52ミリ秒
    - DOMContentLoaded　74ミリ秒
    - 読み込み　74ミリ秒
  - index2
    - 終了　60ミリ秒
    - DOMContentLoaded　52ミリ秒
    - 読み込み　62ミリ秒
