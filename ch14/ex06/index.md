# ch14/ex06

## ProxyHandler

- Proxyオブジェクトを操作するための設定オブジェクト。
- Proxyはターゲットオブジェクトへの操作をカスタマイズするための仕組み。ProxyHandlerはそのカスタマイズの具体的な方法を定義する。

## get

- プロパティの取得時に呼び出される。
- 引数

  - target
    - プロキシされる元のオブジェクト。getでこのオブジェクトにアクセスすることで元のオブジェクトのプロパティやメソッドにアクセスすることができる。
  - prop
    - アクセスされるプロパティの名前またはシンボル。
  - receiver
    - プロキシ自体、あるいはプロキシを継承したオブジェクト。

- 参考サイト
  [MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
