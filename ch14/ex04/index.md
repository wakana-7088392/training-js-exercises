# ch14/ex04

## Symbol.toPrimitive

- シンボルで、あるオブジェクトを対応するプリミティブ値に変換するために呼び出される関数値のプロパティ
- toString(),valueOf()の順番が決まっているが、それを独自に設定できるもの
- 引数で独自のhintを受け取り、その引数の内容でプリミティブ値を修正する

  - 変数名が仮にobjの場合
    - +obj："number"
    - \`${obj}`："string"
    - obj + ""："default"

- 引数の変数名はMDNではhintが使われている
- 引数がどの型かを条件分岐で判別し、独自の返値を設定することができる

- 参考サイト
  [MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
