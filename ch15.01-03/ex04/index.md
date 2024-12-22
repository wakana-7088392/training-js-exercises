# ch15.01-03/ex04

## グローバルオブジェクトを参照する方法を、ブラウザ内、node内、ブラウザnode問わずの３種記しなさい。

- window(ブラウザ)
- global(node)
- globalThis(ブラウザnode問わず)

## ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度記しなさい。

- 参考サイト(「MDN/Window」と「Node.js/Global objects」)の一覧を見て、Windowにしかなさそうなプロパティ、メソッドを探索
  - closed：プロパティ。現在のウィンドウがとじているかを示す。
  - cookieStore：現在の文書コンテキストのCookieStoreオブジェクトへの参照を返す。
  - credentialless：現在の文書が無信頼の「iframe」内で読み込まれたかどうかを示す論理値を返す。
  - crossOriginIsolated：webサイトがオリジン間分離状態にあるかどうかを示す論理値を返す。
  - devicePixelRatio：現在のディスプレイの物理ピクセルと端末非依存ピクセルの比率。
  - document：指定ウィンドウにある文書への参照を返す。
  - documentPictureInPicture：現在の文書コンテキストのピクチャインピクチャウィンドウへの参照を返す。
  - flameElement：ウィンドウが埋め込まれた要素を返す。埋め込まれていない場合はnullを返す。
  - flames：現在のウィンドウでのサブフレームの配列を返す。
  - history：historyオブジェクトへの参照を返す。

## グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたかを記しなさい。

- undefinedはグローバルオブジェクトのプロパティとして定義されていた。
- どんな問題があったか
  - かつてのES仕様(ES3)ではundefinedを上書きすることが可能だったため、予期しない動作が発生する可能性があった。
    - 上書きができてしまうため、未定義を意味するundefinedに値を定義できてしまう。
  - ES5以降は設定も書き込みも不可なプロパティとなったため、こういった問題は起こらなくなった。

## 参考サイト

- [MDN/Global object](https://developer.mozilla.org/ja/docs/Glossary/Global_object)
- [【JavaScript基礎】グローバルオブジェクトについて](https://kde.hateblo.jp/entry/2017/06/25/205733)
- [現代のJavaScriptチュートリアル/グローバルオブジェクト](https://ja.javascript.info/global-object)
- [JavaScriptでundefinedの使用が推奨されない理由](https://zenn.dev/lollipop_onl/articles/eoz-using-undef-on-js)
- [MDN/Window](https://developer.mozilla.org/ja/docs/Web/API/Window)
- [Node.js/Global objects](https://nodejs.org/api/globals.html#global-objects)
