# ch15.04-10/ex13

## 15.4-10.11 では #/ や #/active といった URL を利用した。少し昔だとこのような URL は #!/ や #!/active と ! を付けることもあった (もしかしたら職場でそのようなコードを見るかもしれない)。このような形式を当時は hashbang と呼んだ。どうしてこのようなスタイルが存在したのだろうか。

## 回答

- Ajaxを利用するため。
  - AjaxのコンテンツをSEO(検索エンジン最適化)の観点から固定リンクにしたいが、一部のブラウザがURLを変更できない、という背景から、JavaScriptでフラグメントが変更できる仕組みが作られた。
  - Googleが「#!」を「?_escaped_fragment_=」に変換してクロール可能にする仕様を公開したらしい。それでFacebook等で使われたらしい。

## 参考サイト

- [Ajax (AngularJS)のSPAでSEO対策をする (その1: hashbangって何？)](https://mame0112.hatenablog.com/entry/2015/06/06/025650)
- [XMLの第一人者Tim Bray氏「URLに#!入れるな」](https://gihyo.jp/dev/clip/01/orangenews/vol62/0005)
