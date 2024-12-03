# ch15.01-03/ex09

## 以下のhtmlを開き、ボタン押下時のコンソール出力結果を確認しなさい。次にcaptureの値を変更しdivとbuttonのコンソール出力順序が逆になることを確認しなさい。更にscript中のコメント1.～4.の指示に従いカスタムイベントの関連コードを完成させなさい。最後にブラウザのデバッグツール(Chromeの場合はDeveloper ToolのEvent Listners)で、btn等に登録されているイベントをそれぞれ確認しなさい。

- 以下のhtmlを開き、ボタン押下時のコンソール出力結果を確認しなさい。
  - 出力結果
    - div buttonが表示される
- 次にcaptureの値を変更しdivとbuttonのコンソール出力順序が逆になることを確認しなさい。
  - falseにしたら逆になった。
- 更にscript中のコメント1.～4.の指示に従いカスタムイベントの関連コードを完成させなさい。
  - 作成した。
- 最後にブラウザのデバッグツール(Chromeの場合はDeveloper ToolのEvent Listners)で、btn等に登録されているイベントをそれぞれ確認しなさい。

  - div
    - click
  - btn
    - click

- バブリング
  - 下から上に行く
- キャプチャリング

## 参考サイト

- [Qiita Reactで発生しうるXSS脆弱性](https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de)

- [ZENN ReactにおけるXSS](https://zenn.dev/yuuhu04/books/xss-anti-pattern-of-react-and-vue/viewer/xss-over-react)

- [React 危険を冒して内部HTMLをセットする](https://ja.react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html)
