# ch15.01-03/ex09

## React, jQuery などの主要なフロントエンドフレームワークを選び、そのフレームワークを使っていればどのように XSS 対策がされるか、また使っていてもどのような XSS の危険が残るか記述しなさい。

- React

  - XSS対策
    - JSX内の埋め込みは基本的にHTMLとして解釈されないようにエスケープされるらしい。
  - 残っているXSSの危険
    - dangerouslySetInnerHTML
      - React公式が提供しているオプション。
      - エスケープを無効化するため、Reactの対策が機能しなくなる。
      - 公式ドキュメントでも、XSS脆弱性が発生するため注意するよう呼びかけられている。
    - hrefタグ
      - hrefタグにデータを渡すとエスケープされなくなるらしい。
      - そのため、hrefを経由して悪質なリンクを埋め込むことが可能となりXSSが発生しうる。

## 参考サイト

- [Qiita Reactで発生しうるXSS脆弱性](https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de)

- [ZENN ReactにおけるXSS](https://zenn.dev/yuuhu04/books/xss-anti-pattern-of-react-and-vue/viewer/xss-over-react)

- [React 危険を冒して内部HTMLをセットする](https://ja.react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html)
